# 更新日志

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [0.1.0] - 2026-10-17

### 新增
- 迁入 **packwiz** 管理体系：`pack.toml` / `index.toml` / `mods/*.pw.toml`
- 240 个 Modrinth 模组改为自动下载，仓库不再分发第三方 jar
- CI：`verify-pack` 完整性校验 + KubeJS 语法 + JSON 校验
- Release 工作流：打 tag 自动打包并附引导脚本
- `docs/manual-mods.md`：86 个需手动安装的模组清单

### 文档
- 重写 `README.md`（玩家 / 贡献者两条路径）
- 新增 `DEVELOPMENT.md`（生效方式、硬规则、已知问题）

## 历史

更早的改动记录在 `modpack-docs/` 与 git 提交历史中。
