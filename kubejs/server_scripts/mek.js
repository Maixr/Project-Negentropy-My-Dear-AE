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
    event.remove({output:'mwgr:lava_generator'});
event.shaped(Item.of('mwgr:lava_generator'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'appgen:ember_crystal_charged',
                B: 'minecraft:glass_pane',
                C: 'appgen:ember_crystal_charged',
                D: 'minecraft:lava_bucket',
                E: 'createmoremachines:netherite_alloy',
                F: 'minecraft:lava_bucket',
                G: 'minecraft:magma_block',
                H: 'minecraft:magma_block',
                I: 'minecraft:magma_block'
            }
    ).id('maixr:lava_generator');
    event.remove({output:'mekanismgenerators:wind_generator'});
event.shaped(Item.of('mekanismgenerators:wind_generator'),
            [
                'ABC',
                ' E ',
                'GHI'
            ],
            {
                A: 'anvilcraft:magnet_ingot',
                B: 'create:encased_fan',
                C: 'anvilcraft:magnet_ingot',
                E: 'mekanism:basic_control_circuit',
                G: 'mekanism:block_osmium',
                H: 'kenergyengineering:engine_metal',
                I: 'mekanism:block_osmium'
            }
    ).id('maixr:wind_generator');
event.shaped(Item.of('mekanism:energized_smelter'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'minecraft:redstone',
                B: 'mekanism:basic_control_circuit',
                C: 'minecraft:redstone',
                D: 'minecraft:glass',
                E: 'anvilcraft:heater',
                F: 'minecraft:glass',
                G: 'minecraft:redstone',
                H: 'mekanism:basic_control_circuit',
                I: 'minecraft:redstone'
            }
    ).id('maixr:energized_smelter');
event.shaped(Item.of('mekanism:crusher'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'minecraft:redstone',
                B: 'minecraft:lava_bucket',
                C: 'minecraft:redstone',
                D: 'mekanism:basic_control_circuit',
                E: 'anvilcraft:heater',
                F: 'mekanism:basic_control_circuit',
                G: 'minecraft:redstone',
                H: 'minecraft:lava_bucket',
                I: 'minecraft:redstone'
            }
    ).id('maixr:crusher');
    event.remove({output:'appliedagriculture:crop_assembly_chamber'});
event.shaped(Item.of('appliedagriculture:crop_assembly_chamber'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'mysticalagriculture:prosperity_block',
                B: 'mysticalagriculture:prosperity_block',
                C: 'mysticalagriculture:prosperity_block',
                D: 'mysticalagriculture:prosperity_block',
                E: 'appliedagriculture:biomaterial_synthesis_chamber',
                F: 'mysticalagriculture:prosperity_block',
                G: 'ae2:growth_accelerator',
                H: 'mysticalagriculture:prosperity_seed_base',
                I: 'ae2:growth_accelerator'
            }
    ).id('maixr:crop_assembly_chamber');
    event.remove({output:'mwgr:heavywater_generator'});
event.shaped(Item.of('mwgr:heavywater_generator'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'mekanism_incomparable:augment_control_matrix',
                B: 'mekanism_utilities:comet_control_circuit',
                C: 'mekanism_incomparable:augment_control_matrix',
                D: 'mekanismgenerators:fusion_reactor_port',
                E: 'cookingforblockheads:sink',
                F: 'mekanismgenerators:fusion_reactor_port',
                G: 'mekanism:heavy_water_bucket',
                H: 'mekanism_utilities:compact_fusion_reactor',
                I: 'mekanism:heavy_water_bucket'
            }
    ).id('maixr:heavywater_generator');
    event.remove({output:'mekanismgenerators:fusion_reactor_controller'});
event.shaped(Item.of('mekanismgenerators:fusion_reactor_controller'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'mekanism_incomparable:advanced_control_matrix',
                B: 'mekanism_extras:supreme_control_circuit',
                C: 'mekanism_incomparable:advanced_control_matrix',
                D: 'mekanismgenerators:fusion_reactor_frame',
                E: 'mekanism_incomparable:standard_control_matrix',
                F: 'mekanismgenerators:fusion_reactor_frame',
                G: 'mekanismgenerators:fusion_reactor_frame',
                H: 'mekanismgenerators:fusion_reactor_frame',
                I: 'mekanismgenerators:fusion_reactor_frame'
            }
    ).id('maixr:fusion_reactor_controller');
    event.remove({output:'mekanism:sps_casing'});
event.shaped(Item.of('mekanism:sps_casing',4),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'evolvedmekanism:ingot_plaslitherite',
                B: 'mekanism:pellet_plutonium',
                C: 'evolvedmekanism:ingot_plaslitherite',
                D: 'mekanism:pellet_plutonium',
                E: 'mekanismgenerators:fusion_reactor_frame',
                F: 'mekanism:pellet_plutonium',
                G: 'evolvedmekanism:ingot_plaslitherite',
                H: 'mekanism:pellet_plutonium',
                I: 'evolvedmekanism:ingot_plaslitherite'
            }
    ).id('maixr:sps_casing');
    event.remove({output:'mekanism:sps_port'});
event.shaped(Item.of('mekanism:sps_port'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'mekanism:sps_casing',
                B: 'mekanism_incomparable:elite_control_matrix',
                C: 'mekanism:sps_casing',
                D: 'entropy_tech:negi_singularity',
                E: 'ae2omnicells:spent_nuclear_waste_singularity',
                F: 'entropy_tech:negi_singularity',
                G: 'mekanism:sps_casing',
                H: 'entropy_tech:negi_singularity',
                I: 'mekanism:sps_casing'
            }
    ).id('maixr:sps_port');
    event.remove({output:'mekmm:large_antiprotonic_nucleosynthesizer'});
event.shaped(Item.of('mekmm:large_antiprotonic_nucleosynthesizer',4),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'evolvedmekanism:alloy_subatomic',
                B: 'mekanism:sps_casing',
                C: 'evolvedmekanism:alloy_subatomic',
                D: 'mekanism:pellet_antimatter',
                E: 'mekanism:antiprotonic_nucleosynthesizer',
                F: 'mekanism:pellet_antimatter',
                G: 'evolvedmekanism:alloy_subatomic',
                H: 'evolvedmekanism:apt_casing',
                I: 'evolvedmekanism:alloy_subatomic'
            }
    ).id('maixr:large_antiprotonic_nucleosynthesizer');
    event.remove({output:'mekanism:enrichment_chamber'});
event.shaped(Item.of('mekanism:enrichment_chamber'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'kenergyengineering:redstone_gear',
                B: 'mekanism:basic_control_circuit',
                C: 'kenergyengineering:lapis_gear',
                D: 'create:andesite_alloy',
                E: 'create:andesite_alloy',
                F: 'create:andesite_alloy',
                G: 'create:andesite_alloy',
                H: 'anvilcraft:stamping_platform',
                I: 'create:andesite_alloy'
            }
    ).id('maixr:enrichment_chamber');
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
