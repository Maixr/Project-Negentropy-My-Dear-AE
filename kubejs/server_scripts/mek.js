// ============================================================
//  通用机械 (Mekanism)
//  已装: mekanism / mekanismgenerators / mekanismtools
//        mekanismadditions / mekmm / mekenergistics
//        AppMek / JustEnoughMekanismMultiblocks
// ------------------------------------------------------------
//  常用 ID 速查 (1.21.1 实际 ID):
//    富集仓        mekanism:enrichment_chamber
//    冶金灌注机    mekanism:metallurgic_infuser
//    粉碎机        mekanism:crusher
//    电力熔炼炉    mekanism:energized_smelter
//    净化仓        mekanism:purification_chamber
//    化学灌注机    mekanism:chemical_infuser
//    化学溶解室    mekanism:chemical_dissolution_chamber
//    化学氧化机    mekanism:chemical_oxidizer
//    化学清洗机    mekanism:chemical_washer
//    化学结晶器    mekanism:chemical_crystallizer
//    电解分离器    mekanism:electrolytic_separator
//    加压反应室    mekanism:pressurized_reaction_chamber
//    锇压缩机      mekanism:osmium_compressor
//    反物质化学机  mekanism:antiprotonic_nucleosynthesizer
// ============================================================

console.info('[PAL] 加载 mek.js')

// ------------------------------------------------------------
//  范例 1: 移除某个配方
// ------------------------------------------------------------
ServerEvents.recipes(event => {
    event.remove({output:'mekanism:metallurgic_infuser'});
event.shaped(Item.of('mekanism:metallurgic_infuser'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'anvilcraft:induction_light',
                B: 'ae2:vibration_chamber',
                C: 'anvilcraft:induction_light',
                D: 'appflux:charged_redstone',
                E: 'mekanism:ingot_osmium',
                F: 'appflux:charged_redstone',
                G: 'enderio:redstone_alloy_ingot',
                H: 'alloyed:forge',
                I: 'enderio:redstone_alloy_ingot'
            }
    ).id('maixr:metallurgic_infuser');
    event.remove({output:'mekanism:steel_casing'});
event.shaped(Item.of('mekanism:steel_casing'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'create:sturdy_sheet',
                B: 'mekanism:ingot_osmium',
                C: 'create:sturdy_sheet',
                D: 'mekanism:ingot_osmium',
                E: 'alloyed:steel_casing',
                F: 'mekanism:ingot_osmium',
                G: 'mekanism:ingot_steel',
                H: 'mekanism:ingot_osmium',
                I: 'mekanism:ingot_steel'
            }
    ).id('maixr:steel_casing');
    event.remove({output:'appmek:chemical_cell_housing'});
event.shaped(Item.of('appmek:chemical_cell_housing'),
            [
                'ABC',
                'D F',
                'GHI'
            ],
            {
                A: 'mekanism:structural_glass',
                B: 'mekanism:advanced_control_circuit',
                C: 'mekanism:structural_glass',
                D: 'mekanism:basic_control_circuit',
                F: 'mekanism:basic_control_circuit',
                G: 'mekanism:ingot_refined_glowstone',
                H: 'mekanism:ingot_refined_glowstone',
                I: 'mekanism:ingot_refined_glowstone'
            }
    ).id('maixr:chemical_cell_housing');
})

// ------------------------------------------------------------
//  范例 2: 新增机器配方 (由 kubejs-mekanism 提供)
// ------------------------------------------------------------
// ServerEvents.recipes(event => {
//   event.recipes.mekanismEnriching("mekanism:enriched_gold", "minecraft:gold_ingot")
//   event.recipes.mekanismCrushing("mekanism:dust_iron", "minecraft:iron_ingot")
//   event.recipes.mekanismSmelting("mekanism:ingot_refined_glowstone", "minecraft:glowstone")
//   event.recipes.mekanismPurifying("mekanism:clump_iron", "minecraft:iron_ore")
//   event.recipes.mekanismInjecting("mekanism:shard_iron", "mekanism:clump_iron")
//   event.recipes.mekanismCompressing("mekanism:ingot_osmium", "mekanism:dust_osmium")
//   event.recipes.mekanismCombining("minecraft:sulfur_dust", ["mekanism:hydrogen", "mekanism:oxygen"])
// })

// ------------------------------------------------------------
//  范例 3: 玩家首次进服给提示
// ------------------------------------------------------------
// PlayerEvents.loggedIn(event => {
//   const p = event.player
//   if (!p.stages.has("mek_tutorial")) {
//     p.stages.add("mek_tutorial")
//     p.tell("§6欢迎来到通用机械！按 G 查看指南。")
//   }
// })

// ------------------------------------------------------------
//  范例 4: 给物品加说明
// ------------------------------------------------------------
// ItemEvents.modifyTooltips(event => {
//   event.add("mekanism:enrichment_chamber", "§7把矿石富集为 2 倍产出")
// })

// TODO: 在此写你的 Mekanism 改动
