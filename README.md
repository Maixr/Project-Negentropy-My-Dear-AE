# Project Negentropy — My Dear AE

NeoForge 1.21.1 科技整合包。以 **AE2（应用能源）** 为核心，串联 **机械动力 / 通用机械 / 铁砧工艺**，
并做了大量配方重写、进度编排与汉化补全。

> 本仓库只放**可协作的源码部分**（KubeJS 脚本、配置、文档、模组清单）。
> 模组本体与存档不入库 —— 见 [模组清单](modlist.md)。

---

## 目录结构

```
├── kubejs/             KubeJS 脚本与资源（★ 主要开发内容）
│   ├── server_scripts/     配方、事件（/reload 生效）
│   ├── client_scripts/     客户端（JEI 隐藏等，需重进世界）
│   ├── startup_scripts/    物品/方块注册（需重启）
│   ├── data/               数据包（维度、世界生成、标签）
│   └── assets/             语言文件、贴图
├── config/             模组配置（已脱敏）
├── defaultconfigs/     新建世界时的默认配置
├── modpack-docs/       设计与改动说明
├── modlist.md          模组清单（331 个，自动生成）
└── LICENSE
```

---

## 怎么搭起来

1. 装 **NeoForge 21.1.251** + **Minecraft 1.21.1**
2. 按 [modlist.md](modlist.md) 装齐模组（或向维护者要整合包）
3. 把本仓库的 `kubejs/` `config/` `defaultconfigs/` 覆盖到游戏实例根目录
4. 需要的话自己也调一下 `config/ae2webintegration/ae2webintegration.toml`（密码已清空）

---

## 开发约定

**脚本生效方式**

| 目录 | 生效方式 |
|---|---|
| `server_scripts/` | 游戏内 `/reload` |
| `client_scripts/` | 重进世界（JEI 在此时重建） |
| `startup_scripts/` | **必须重启游戏** |
| `data/` `assets/` | `F3+T` 或重启 |

**KubeJS 硬性要求**

- `kubejs/data/` 和 `kubejs/assets/` 下**文件名必须全小写**
  （含大写字母会触发 `Invalid file name` → 弹错误界面卡住启动）
- 备份文件**不要**放进 `server_scripts/` 等目录（会被递归加载）
- 每条配方都写唯一 `.id(...)`，否则可能互相覆盖
- **输入**用 `item` / `tag`，**输出**用 `id`

**提交前自查**

- [ ] `node --check` 过所有改动的 `.js`
- [ ] 没把存档/日志/模组/密钥带进来
- [ ] `kubejs/data` `kubejs/assets` 下没有大写文件名

---

## 已知坑（都踩过）

| 现象 | 原因 |
|---|---|
| 启动卡在 KubeJS 错误界面 | `kubejs/data` 或 `assets` 下文件名带大写 |
| 锻造台变成工作台界面 | Visual Workbench 劫持 `CraftingTableBlock` 子类，靠 `kubejs/data/visualworkbench/tags/block/unaltered_workbenches.json` 排除 |
| 配方解析报 `No key item` / `No key tag` | 输入误用了 `id` 键 |
| `ae2cs` 配方没生效 | 它的 type 带 `_recipe_serializer` 后缀 |

---

## 许可

见 [LICENSE](LICENSE)。
