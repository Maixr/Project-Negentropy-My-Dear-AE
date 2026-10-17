// ============================================================
//  本包自研内容 MaixrCore (modId: maixr)
//  内容: 伊甸枢纽 / 破碎主世界维度 / 自定义区块生成器
// ------------------------------------------------------------
//  模组已注册:
//    maixr:overworld_broken   破碎主世界 (自定义 ChunkGenerator)
//    maixr:eden_hub           伊甸枢纽结构 (data/maixr/structure/)
// ------------------------------------------------------------
//  ★ 已知坑 (本包已修，勿再踩):
//    - 1.21 结构目录是单数 structure/ 而非 structures/
//    - ChunkGenerator 必须用 MapCodec 而非 Codec
//    - 自定义 Tick 事件必须用 .Post 后缀 (基类是 abstract)
// ============================================================

console.info('[PAL] 加载 maixr.js')

// ------------------------------------------------------------
//  范例 1: 进入破碎主世界时定时提示
// ------------------------------------------------------------
// PlayerEvents.tick(event => {
//   const p = event.player
//   if (p.level.dimension.toString() === "maixr:overworld_broken") {
//     if (p.age % 600 === 0) {
//       p.tell("§7[伊甸枢纽] 这片世界已经破碎……")
//     }
//   }
// })

// ------------------------------------------------------------
//  范例 2: 记录玩家的维度切换
// ------------------------------------------------------------
// PlayerEvents.tick(event => {
//   const p = event.player
//   const cur = p.level.dimension.toString()
//   const last = p.persistentData.getString("pal_last_dim")
//   if (cur !== last) {
//     p.persistentData.putString("pal_last_dim", cur)
//     console.info("[PAL] " + p.username + " 进入 " + cur)
//   }
// })

// ------------------------------------------------------------
//  范例 3: 给自研物品加描述
// ------------------------------------------------------------
// ItemEvents.modifyTooltips(event => {
//   event.add("maixr:eden_core", "§6伊甸枢纽的核心")
//   event.add("maixr:eden_core", "§7右键放置以开启传送门")
// })

// ------------------------------------------------------------
//  范例 4: 自研方块被破坏时触发
// ------------------------------------------------------------
// BlockEvents.broken("maixr:eden_block", event => {
//   event.level.createExplosion(event.block.x, event.block.y, event.block.z)
//     .explosionRadius(2).damageBlocks(true).explode()
// })

// ------------------------------------------------------------
//  范例 5: 自定义毕业物品的合成 (任务线终章用)
// ------------------------------------------------------------
// ServerEvents.recipes(event => {
//   event.shaped("maixr:transcendent_core", [
//     "ABA",
//     "BCB",
//     "ABA"
//   ], {
//     A: "maixr:eden_core",
//     B: "mekanism:teleportation_core",
//     C: "ae2:quantum_ring"
//   })
// })

// TODO: 在此写你的 maixr 内容
