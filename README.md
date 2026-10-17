# Project Negentropy — My Dear AE

NeoForge **1.21.1** 科技整合包。以 **AE2（应用能源）** 为核心，串联 **机械动力 / 通用机械 / 铁砧工艺 / 无尽贪婪**，
配合自研模组（MaixrCore、entropy_tech）与大量配方重写、进度编排、原生汉化。

[![CI](https://github.com/Maixr/Project-Negentropy-My-Dear-AE/actions/workflows/ci.yml/badge.svg)](https://github.com/Maixr/Project-Negentropy-My-Dear-AE/actions/workflows/ci.yml)

---

## 玩家：怎么装

本包使用 **[packwiz](https://packwiz.infra.link/)** 管理模组 —— 仓库里**只存下载链接，不存 jar**，
所以体积小、更新快、没有版权问题。

### 方式一：packwiz-installer（推荐）

1. 装好 **NeoForge 21.1.251** 的空实例（NeoForge 官网 / Prism 均可）
2. 下载 [packwiz-installer-bootstrap.jar](https://github.com/packwiz/packwiz-installer-bootstrap/releases/latest)
3. 丢到实例根目录，运行：

```bash
java -jar packwiz-installer-bootstrap.jar \
  -s client \
  https://raw.githubusercontent.com/Maixr/Project-Negentropy-My-Dear-AE/main/pack.toml
```

4. 按 [docs/manual-mods.md](docs/manual-mods.md) 补上**无法自动下载的 86 个模组**
5. 启动游戏

> 之后再更新只需重跑第 3 步 —— 会增量同步，不会重下整个包。

### 方式二：GitHub Release

去 [Releases](https://github.com/Maixr/Project-Negentropy-My-Dear-AE/releases) 下最新 zip，解压到实例根目录，然后跑 `install.ps1` / `install.sh`。

---

## 贡献者：怎么改

结构说明、脚本生效方式、提交前自查清单 → **[DEVELOPMENT.md](DEVELOPMENT.md)**

快速上手：

```bash
git clone https://github.com/Maixr/Project-Negentropy-My-Dear-AE.git
cd Project-Negentropy-My-Dear-AE

# 改了 kubejs/ 或 config/ 之后，必须重生成索引
node scripts/regen-index.mjs

# 提交前自检（CI 也会跑）
node scripts/verify-pack.mjs
```

**千万别手改 `index.toml`** —— 它由 `regen-index.mjs` 生成。

---

## 仓库结构

```
├── pack.toml              packwiz 包元数据（名称/版本/加载器）
├── index.toml             ★ 文件索引 + sha256，不要手改
├── mods/
│   ├── *.pw.toml          240 个 Modrinth 模组的下载元数据
│   └── MaixrCore-*.jar    自研模组（随仓库分发，共 5 个）
├── kubejs/                ★ 主要开发内容：配方、事件、数据包、汉化
├── config/                模组配置（已脱敏）
├── defaultconfigs/        新建世界的默认配置
├── scripts/
│   ├── verify-pack.mjs    CI 用的完整性校验
│   └── regen-index.mjs    重建 index.toml（等价 packwiz refresh）
├── docs/
│   └── manual-mods.md     需手动安装的模组清单
├── modpack-docs/          设计与改动说明
├── modlist.md             完整模组清单（含版本）
└── .github/workflows/     CI（校验）+ Release（打包）
```

---

## 模组来源统计

| 类别 | 数量 | 分发方式 |
|---|---|---|
| Modrinth | **240** | packwiz 自动下载 |
| 自研（作者 Maixr） | **5** | 仓库内 `mods/` |
| 仅 CurseForge / 自编译 | **86** | [手动安装](docs/manual-mods.md) |

---

## 许可

代码与脚本见 [LICENSE](LICENSE)。模组各自遵循其原许可，本仓库不再分发第三方 jar。
