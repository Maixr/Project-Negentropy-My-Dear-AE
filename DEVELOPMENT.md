# 开发指南

## 环境

| 项 | 版本 |
|---|---|
| Minecraft | 1.21.1 |
| NeoForge | 21.1.251 |
| Java | **21**（不要用 22+，多个模组在更高版本有竞态问题） |
| KubeJS | 2101.7.2 |

---

## 脚本生效方式

| 目录 | 生效方式 |
|---|---|
| `kubejs/server_scripts/` | 游戏内 `/reload` |
| `kubejs/client_scripts/` | 重进世界（JEI 在此时重建配方表） |
| `kubejs/startup_scripts/` | **必须重启游戏** |
| `kubejs/data/` `kubejs/assets/` | `F3+T` 或重启 |
| `config/` | 重启 |
| `pack.toml` / `index.toml` | 玩家端重跑 packwiz-installer |

---

## 加一个模组

1. 去 Modrinth 找到项目页
2. 下载后，用 packwiz 生成元数据（或手写 `mods/<slug>.pw.toml`）：

```toml
name = "模组内部名"
filename = "实际的-jar-文件名.jar"
side = "both"

[download]
hash-format = "sha512"
hash = "<jar 的 sha512>"
url = "https://cdn.modrinth.com/data/.../....jar"

[update]
[update.modrinth]
mod-id = "<project_id>"
version = "<version_number>"
```

3. 跑 `node scripts/regen-index.mjs`
4. `node scripts/verify-pack.mjs` 确认通过

**不在 Modrinth 上的** → 记进 [docs/manual-mods.md](docs/manual-mods.md)，不要把 jar 提交进 `mods/`
（除非是本仓库自研的）。

---

## 提交前自查

```bash
node scripts/regen-index.mjs     # 改了 kubejs/ 或 config/ 就必须跑
node scripts/verify-pack.mjs     # 等价 CI
```

CI 还会额外检查：

- `kubejs/**/*.js` 语法（`node --check`）
- `config/` `kubejs/` `defaultconfigs/` 下所有 JSON 可解析
- 没有 >100MB 的归档文件

---

## 硬规则（踩过的坑）

### KubeJS
- **`kubejs/data/` 和 `kubejs/assets/` 下文件名必须全小写**
  含大写会触发 `Invalid file name` → `KubeJSErrorScreen` → **卡住进不了游戏**
- 备份文件不要放进 `server_scripts/` 等目录（会被递归加载）
- 每条配方写唯一 `.id(...)`，否则可能互相覆盖
- 配方**输入**用 `item` / `tag`，**输出**用 `id`

### 配置
- `config/ae2webintegration/ae2webintegration.toml` **含明文密码，已 gitignore，永远不要提交**
- 大型媒体（`*.mp4`）不进库
- 各存档独立的会话数据不进库（`config/jei/world/`、`config/inventoryprofilesnext/*/`）

### packwiz
- `index.toml` 由脚本生成，**不要手改**
- 改了任何受跟踪的文件都要重跑 `regen-index.mjs`，否则 CI 会报哈希不符

---

## 已知问题

| 现象 | 原因 / 状态 |
|---|---|
| 区块卸载时 `ConcurrentModificationException`（`PersistentEntitySectionManager:171`） | 原版实体段管理的竞态，被女仆模组的区块卸载传送触发。见 issue |
| 锻造台变成工作台界面 | Visual Workbench 劫持 `CraftingTableBlock` 子类；靠 `kubejs/data/visualworkbench/tags/block/unaltered_workbenches.json` 排除 |
| `Skipping Entity with id pasterdream:meltdream_crystal_block` | 旧版 PasterDream 遗留的非法实体，加载时自动跳过，无害 |
| `ae2cs` 配方不生效 | 它的 recipe type 带 `_recipe_serializer` 后缀 |

---

## 分支与发布

- `main` — 稳定可玩
- 功能分支 → PR → CI 通过后合并
- 打 tag `v0.x.y` → 自动构建 Release 包
