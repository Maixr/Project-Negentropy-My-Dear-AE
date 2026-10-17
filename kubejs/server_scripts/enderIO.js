// ============================================================
//  末影接口 (Ender IO)
//  已装: enderio 8.2.12-beta / enderio_modded_conduits
// ------------------------------------------------------------
//  常用 ID:
//    导管            enderio:conduit
//    物品导管        enderio:item_conduit
//    流体导管        enderio:fluid_conduit
//    能量导管        enderio:energy_conduit
//    红石导管        enderio:redstone_conduit
//    简易合金炉      enderio:simple_alloy_smelter
//    合金炉          enderio:alloy_smelter
//    简易研磨机      enderio:simple_sag_mill
//    研磨机          enderio:sag_mill
//    斯特林发电机    enderio:stirling_generator
//    电容库          enderio:capacitor_bank
// ============================================================

console.info('[PAL] 加载 enderIO.js')

// ------------------------------------------------------------
//  范例 1: 合金炉配方 (输出, 输入数组, 能量)
// ------------------------------------------------------------
// ServerEvents.recipes(event => {
//   event.recipes.enderioAlloySmelting("minecraft:netherite_ingot", ["minecraft:gold_ingot", "minecraft:netherite_scrap"], 5000)
// })

// ------------------------------------------------------------
//  范例 2: 研磨机配方 (输出, 输入, 概率数组)
// ------------------------------------------------------------
// ServerEvents.recipes(event => {
//   event.recipes.enderioSagMilling("minecraft:iron_ingot", "minecraft:iron_ore", [1.0])
// })

// ------------------------------------------------------------
//  范例 3: 斯特林发电机燃料
// ------------------------------------------------------------
// ServerEvents.recipes(event => {
//   event.recipes.enderioStirlingGenerator("minecraft:diamond", 200000)
// })

// ------------------------------------------------------------
//  范例 4: 移除配方 (慎用 mod: 会清空整个模组)
// ------------------------------------------------------------
// ServerEvents.recipes(event => {
//   event.remove({ id: "enderio:alloy_smelting/conductive_alloy" })
// })

// TODO: 在此写你的 Ender IO 改动
