// ============================================================
//  Project Arc Light  -  Startup Scripts
//  KubeJS 2101.7.2 / NeoForge 1.21.1
// ------------------------------------------------------------
//  这里用来注册【自定义物品】。startup_scripts 只在【游戏启动】时跑一次，
//  改完必须重启游戏（/reload 无效）。
//
//  2026-10-17：原本在这里注册的「陨矿杂质」(maixr:yunkuang_zazhi) 已经
//  整体搬进 entropy_tech 模组（物品 / 贴图 / 语言 / 配方全部搬走），
//  物品 id 也随之变成 entropy_tech:yunkuang_zazhi。
//  原文件备份：kubejs/_deleted-20261017-entropy-port/startup_scripts/main.js
//  新实现：
//    registry/EntropyItems.java             —— METEOR_FAMILY 表驱动注册
//    data/entropy_tech/recipe/              —— 搅拌 / 无序合成 / 两级粉碎
// ============================================================

console.info('[PAL] 正在加载 Startup Scripts ...')

StartupEvents.registry('item', event => {
    // （陨矿杂质已迁出到 entropy_tech 模组，此处暂无可注册内容）
})

console.info('[PAL] Startup Scripts 加载完毕')
