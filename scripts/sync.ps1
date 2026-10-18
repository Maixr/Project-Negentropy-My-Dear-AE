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

# --- 1. 重建索引 ---
Step '重建 index.toml'
$regen = & node scripts/regen-index.mjs 2>&1
$regen | ForEach-Object { Write-Host ('  ' + $_) }
if ($LASTEXITCODE -ne 0) { Die '索引重建失败' }

# --- 2. 校验 ---
Step '校验整合包'
$verify = & node scripts/verify-pack.mjs 2>&1
$verify | ForEach-Object { Write-Host ('  ' + $_) }
if ($LASTEXITCODE -ne 0) { Die '校验未通过，已中止（没有提交任何东西）' }

# --- 3. 汇总 ---
Step '汇总改动'
& git add -A
$staged = & git diff --cached --numstat
if (-not $staged) {
    Ok '没有需要提交的改动 —— 远程仓库已是最新'
    exit 0
}
$perTop = @{}
foreach ($line in (& git diff --cached --name-only)) {
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
    $parts = @()
    if ($perTop.ContainsKey('kubejs')) { $parts += 'kubejs' }
    if ($perTop.ContainsKey('config')) { $parts += 'config' }
    if ($perTop.ContainsKey('mods'))   { $parts += 'mods' }
    $Message = 'chore: 同步 ' + ($parts -join ' / ') + ' 改动'
}
& git commit -q -m $Message
if ($LASTEXITCODE -ne 0) { Die '提交失败' }
$sha = (& git rev-parse --short HEAD)
Ok ($sha + '  ' + $Message)

# --- 5. 推送 ---
Step '推送到 GitHub'
$env:GIT_TERMINAL_PROMPT = '0'
$push = & git push origin main 2>&1
$push | ForEach-Object { Write-Host ('  ' + $_) }
if ($LASTEXITCODE -ne 0) { Die '推送失败（检查网络/凭据）' }

$repoUrl = 'https://github.com/Maixr/Project-Negentropy-My-Dear-AE'
Write-Host ''
Write-Host '========================================' -ForegroundColor Green
Write-Host '  同步完成' -ForegroundColor Green
Write-Host ('  提交: ' + $sha) -ForegroundColor Green
Write-Host ('  CI  : ' + $repoUrl + '/actions') -ForegroundColor Green
Write-Host '========================================' -ForegroundColor Green
