# AE 直连机用户映射指南

- 配置文件路径：`config/chexsonsaeutils/direct_processing_machines.json`。
- 大量 JEI 导入签名会拆分到 `config/chexsonsaeutils/direct_processing_machines.signatures/`。
- 主文件继续保存机器元数据；大体积签名优先通过 `signature_shards` 引用外部分片。

## 字段说明

- `machine_item`：机器物品 ID，例如 `minecraft:furnace`。
- `machine_block`：机器方块 ID。
- `recipe_types`：该机器允许的 `recipe type` 列表。
- `default_ticks`：默认处理时长，最小值为 `1`。
- `enabled`：是否启用该映射。
- `io_mode`：当前保持 `generic`。
- `key_types`：可填 `item`、`fluid`、`mixed`、`other` 或 `any`。
- `signature_shards`：可选。相对 `config/chexsonsaeutils/` 的签名分片路径数组。
- `signatures`：旧内联格式仍可读取；新写回优先使用 `signature_shards`。
- `signatures[*].inputs[*]` 与 `signatures[*].outputs[*]` 统一使用 `AEKey + amount` 结构。

## 分片规则

- 每个 shard 文件内容都是纯 JSON array。
- 每个 shard 最多保存 256 条 signature。
- 重新导入某台机器时，只会重写该机器自己的 shard 目录与主文件入口。

## 兼容性

- 旧 `key_type/key_id/amount` 栈结构仍可读取。
- 旧内联 `signatures` 仍可读取；重新导入或写回后会升级到 `signature_shards`。
- `configPathForUi()` 仍指向主文件，不需要改 UI 路径。

## 排查

- 导入后仍不支持时，先检查 `recipe_types` 是否填对。
- 若主文件体积明显上涨，确认对应机器是否已经写出 `signature_shards`。
- 若 shard 丢失或被手工删除，重新执行一次 JEI 导入即可重建。
