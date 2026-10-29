# 本地模组补丁（唯一入口）

整合包用 packwiz 分发：`mods/*.jar` 由 `mods/*.pw.toml` 里的 URL 下载，
`packwiz update` / `packwiz refresh` 会**按哈希覆盖**这些 jar。
所以补丁不写成「改过的 jar 散落在 mods 里」，而是集中到这一个脚本，随时可重新应用。

## 用法

```bat
python patches\apply-patches.py            :: 应用全部补丁（幂等）
python patches\apply-patches.py --check    :: 只检查：全部就绪返回 0，否则返回 1
python patches\apply-patches.py --revert   :: 还原（用 originals/ 做字节级精确还原）
```

`sync.bat` 里已接入：同步前会自动 `--check`，发现被 packwiz 覆盖就自动补回。

## 当前包含的补丁

| id | 目标 | 症状 | 做法 |
|---|---|---|---|
| `mesplicedterminal-ae2lt-package-move` | `mesplicedterminal-0.0.3.0.jar` | 打开 **ME 拼接终端** 直接掉线（`NoClassDefFoundError: com/moakiee/ae2lt/client/TextureToggleButton`） | ae2lt 2.1.2-beta4 把类移进了 `client.widgets` / `client.frequency`，改写 class 常量池里的包路径；**不改 ae2lt 版本** |
| `ae2-batchcraft-guisync-30000` | `ae2-batchcraft-1.21.1-1.0.3-neoforge.jar` | **样板编码终端** 打不开（`declares the same sync id twice: 30000`） | 该 id 与 `recursiveae2patternprovider` 撞车，把 batchcraft 的 `@GuiSync` 改为未被占用的 `30500` |

> 三个菜单名（`PatternEncodingTermMenu` / `WETMenu` / `TianshuPatternEncodingTermMenu`）
> 报的都是同一个 30000 —— 后两者继承前者，重复字段被继承下去了。

## 目录说明

- `apply-patches.py` — 全部补丁逻辑，**要加补丁就改这里**
- `originals/` — 未打补丁的原始 jar，`--revert` 用；**不入库**（`.gitignore` 已忽略）

## 新增一个补丁

在 `PATCHES` 列表里加一项：

```python
{
    "id": "短横线标识",
    "jar": "mods 里的文件名",
    "original_sha256": "未打补丁时的 sha256",
    "why": MEST_WHY,          # 多行说明，给以后的自已看
    "probe": mest_probe,      # 返回 (has_old, has_new)
    "op": mest_op,            # direction>0 应用、<0 还原
},
```

`probe` 是判断状态的唯一依据（而不是哈希），所以模组重新下载后依然能正确识别。

## 注意：这套补丁只作用于**本机**

`mods/*.jar` 在 `.gitignore` 里被忽略，不会进仓库，也不会随 packwiz 分发给玩家。
也就是说：**你自己的客户端修好了，玩家下载到的仍是未修补的版本**。

要让玩家也生效，二选一：

1. **随包分发修补后的 jar**（推荐，截图级一次性）：
   删掉对应 `mods/*.pw.toml`，把修补后的 jar 放进 `mods/`，
   并在 `.gitignore` / `.packwizignore` 里加白名单；缺点是这几个模组不再自动更新。
2. **只本地修**：等上游发布兼容版本，更新后删掉对应补丁项即可。

## 回滚

```bat
python patches\apply-patches.py --revert
```

会从 `originals/` 拷回原始 jar 并校验 sha256，字节级一致（packwiz 的哈希校验也能通过）。

