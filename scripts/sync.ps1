<#
    一键同步整合包到 GitHub

    用法：
        .\scripts\sync.ps1                     # 自动生成提交信息
        .\scripts\sync.ps1 "feat: 新增任务线"   # 自定义提交信息
        .\scripts\sync.ps1 -Force              # 游戏还开着也强行同步（不推荐）

    做的事：检查游戏 → 重建 index → 校验 → 提交 → 推送
#>
param(
    [Parameter(Position = 0)][string]$Message,
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Step($t) { Write-Host ("`n> " + $t) -ForegroundColor Cyan }
function Ok($t)   { Write-Host ("  [OK] " + $t) -ForegroundColor Green }
function Warn($t) { Write-Host ("  [!!] " + $t) -ForegroundColor Yellow }
function Die($t)  { Write-Host ("  [XX] " + $t) -ForegroundColor Red; exit 1 }

# 跑外部程序。
# 直接用 & 跑 git/node 时，它们往 stderr 写的正常输出（git push 进度、
# node 警告）会被 PowerShell 包成 NativeCommandError，配合
# $ErrorActionPreference=Stop 会直接中断脚本 —— 出现过「推送成功了但
# 脚本报错退出」的假故障。这里临时降级为 Continue，并显式取退出码。
function RunNative($exe, [string[]]$argv) {
    $prev = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        $out = & $exe @argv 2>&1
        $code = $LASTEXITCODE
    } finally {
        $ErrorActionPreference = $prev
    }
    $text = @($out | ForEach-Object { "$_" })
    return [pscustomobject]@{ Output = $text; Code = $code }
}

# --- 0. 前置检查 ---
Step '检查环境'

$java = Get-CimInstance Win32_Process -Filter "Name='javaw.exe' OR Name='java.exe'" -ErrorAction SilentlyContinue
if ($java -and -not $Force) {
    Warn ('游戏正在运行 (PID ' + ($java.ProcessId -join ', ') + ')')
    Warn '游戏会实时改写 config/（FTB Quests、JEI 历史），现在同步会得到一份马上过期的索引。'
    Write-Host ''
    Write-Host '  请先完全退出游戏，然后重新运行本脚本。' -ForegroundColor Yellow
    Write-Host '  确实要强行同步就加 -Force。' -ForegroundColor DarkGray
    exit 2
}
if ($java) { Warn '游戏正在运行，已用 -Force 忽略（索引可能过期）' }
else { Ok '游戏未运行' }

if (-not (Test-Path '.git')) { Die '当前目录不是 git 仓库' }
if (-not (Test-Path 'scripts/regen-index.mjs')) { Die '找不到 scripts/regen-index.mjs' }
Ok '仓库结构正常'

# --- 0.5 本地模组补丁（packwiz 更新会覆盖 jar，这里自动补回）---
Step '检查本地模组补丁'
if (Test-Path 'patches/apply-patches.py') {
    $rc = RunNative 'python' @('patches/apply-patches.py', '--check')
    if ($rc.Code -eq 0) {
        Ok '补丁已全部就位'
    } else {
        Warn '有补丁未应用（多半是 packwiz 刚更新过这几个模组），正在自动补上…'
        $ra = RunNative 'python' @('patches/apply-patches.py')
        $ra.Output | ForEach-Object { Write-Host ('  ' + $_) }
        if ($ra.Code -ne 0) {
            Warn '补丁未能全部应用 —— 请手动运行: python patches/apply-patches.py'
        } else {
            Ok '补丁已重新应用'
        }
    }
} else {
    Warn '找不到 patches/apply-patches.py，跳过'
}

# --- 1. 先暂存，再重建索引 ---
# ★ 顺序不能反：regen-index.mjs 的文件清单来自 `git ls-files`（读暂存区）。
#   若先 regen 再 add，本次新增的文件在 regen 那一刻还没进暂存区，
#   就永远进不了 index.toml —— 要等下一次同步才补上，而那时它已经不算「新增」了。
#   历史上就是这样漏掉了 entropy_tech / JEIGuess 两个自研 jar 和 7 个 server_script。
Step '暂存改动（必须早于索引重建）'
$null = RunNative "git" @("add", "-A")

Step '重建 index.toml'
$r1 = RunNative 'node' @('scripts/regen-index.mjs')
$r1.Output | ForEach-Object { Write-Host ('  ' + $_) }
if ($r1.Code -ne 0) { Die '索引重建失败' }

# regen 会改写 index.toml / pack.toml，需要再暂存一次
$null = RunNative "git" @("add", "-A")

# --- 2. 校验 ---
Step '校验整合包'
$r2 = RunNative 'node' @('scripts/verify-pack.mjs')
$r2.Output | ForEach-Object { Write-Host ('  ' + $_) }
if ($r2.Code -ne 0) { Die '校验未通过，已中止（没有提交任何东西）' }

# --- 3. 汇总 ---
Step '汇总改动'
$diff = RunNative "git" @("diff", "--cached", "--numstat")
if (-not $diff.Output -or $diff.Output.Count -eq 0) {
    Ok '没有需要提交的改动 —— 远程仓库已是最新'
    exit 0
}
$names = RunNative "git" @("diff", "--cached", "--name-only")
$perTop = @{}
foreach ($line in $names.Output) {
    if (-not $line) { continue }
    $top = ($line -split '/')[0]
    if (-not $perTop.ContainsKey($top)) { $perTop[$top] = 0 }
    $perTop[$top] = $perTop[$top] + 1
}
$perTop.GetEnumerator() | Sort-Object Value -Descending | ForEach-Object {
    Write-Host ('  ' + $_.Key.PadRight(22) + $_.Value)
}

# --- 4. 提交 ---
Step '提交'
if (-not $Message) {
    # 按顶层目录自动生成，kubejs/config/mods 排前面（最有意义）
    $order = @('kubejs', 'config', 'mods')
    $parts = @()
    foreach ($k in $order) { if ($perTop.ContainsKey($k)) { $parts += $k } }
    foreach ($k in $perTop.Keys) { if ($order -notcontains $k) { $parts += $k } }
    if ($parts.Count -eq 0) { $Message = 'chore: 同步改动' }
    else { $Message = 'chore: 同步 ' + ($parts -join ' / ') + ' 改动' }
}
$c = RunNative "git" @("commit", "-q", "-m", $Message)
if ($c.Code -ne 0) { $c.Output | ForEach-Object { Write-Host ('  ' + $_) }; Die '提交失败' }
$sha = (RunNative "git" @("rev-parse", "--short", "HEAD")).Output[0]
Ok ($sha + '  ' + $Message)

# --- 5. 推送 ---
Step '推送到 GitHub'
$env:GIT_TERMINAL_PROMPT = '0'
$p1 = RunNative "git" @("push", "origin", "main")
$p1.Output | ForEach-Object { Write-Host ('  ' + $_) }
if ($p1.Code -ne 0) { Die '推送失败（网络 / SSH 密钥 / 远端冲突）' }

$repoUrl = 'https://github.com/Maixr/Project-Negentropy-My-Dear-AE'
Write-Host ''
Write-Host '========================================' -ForegroundColor Green
Write-Host '  同步完成' -ForegroundColor Green
Write-Host ('  提交: ' + $sha) -ForegroundColor Green
Write-Host ('  CI  : ' + $repoUrl + '/actions') -ForegroundColor Green
Write-Host '========================================' -ForegroundColor Green
