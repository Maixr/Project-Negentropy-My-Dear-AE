console.info(' 加载 ae2.js')

// ============================================================
//  AE2 压印器 (inscriber) 配方
// ------------------------------------------------------------
//  可用 API（来自 applied_kjs 模组的 AE2Recipes 对象）：
//
//    AE2Recipes.inscriberPress(event, 中间, 上槽, 输出)
//        └ press 模式，无下槽
//
//    AE2Recipes.inscriberWithBottom(event, 模式, 中间, 上槽, 下槽, 输出)
//        └ 三个槽全用
//
//    AE2Recipes.inscriber(event, 模式, 中间, 上槽, 下槽, 输出, 配方ID)
//        └ 同上，但配方 ID 直接当参数传（最稳）
//
//    模式 = 'inscribe'（用模板压印）或 'press'（压制成成品）
//
//  ⚠ 三个槽的顺序是：中间(middle) / 上(top) / 下(bottom)
//    ⚠ 输出是【倒数第二个】参数，不是第一个！
// ------------------------------------------------------------

ServerEvents.recipes(event => {

    // 256 字节存储组件：用压印器压制
    //   middle 中间槽 = 赛特斯石英
    //   top    上槽   = 下界石英
    //   bottom 下槽   = 红石
    //   result 输出   = 256 字节存储组件
    AE2Recipes.inscriber(event, 'press',
        'minecraft:redstone',
        'minecraft:quartz',
        'ae2:certus_quartz_crystal',
        'tinyae2cells:256_byte_storage_component',
        'maixr:256_byte_storage_component_inscriber'
    )

    // 猪咪核心
    event.shaped(Item.of('ae2lt:pigmee_core'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'minecraft:porkchop',
                B: 'minecraft:string',
                C: 'minecraft:porkchop',
                D: 'minecraft:string',
                E: 'minecraft:iron_trapdoor',
                F: 'minecraft:string',
                G: 'minecraft:porkchop',
                H: 'minecraft:string',
                I: 'minecraft:porkchop'
            }
    ).id('maixr:pigmee_core_alt')

    // 有瑕控制器
    event.remove({output:'entropy_tech:flawed_controller'});
    event.shaped(Item.of('entropy_tech:flawed_controller'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'appliedcreate:stress_processor',
                B: 'ae2:quartz_glass',
                C: 'ae2:engineering_processor',
                D: 'entropy_tech:rough_controller',
                E: 'minecraft:ender_eye',
                F: 'entropy_tech:rough_controller',
                G: 'ae2:calculation_processor',
                H: 'ae2:quartz_glass',
                I: 'ae2:logic_processor'
            }
    //1k物品存储
    ).id('maixr:flawed_controller');
    event.remove({output:'ae2:cell_component_1k'});
    event.shaped(Item.of('ae2:cell_component_1k'),
            [
                '   ',
                'DEF',
                '   '
            ],
            {
                D: 'tinyae2cells:512_byte_storage_component',
                E: 'ae2:logic_processor',
                F: 'tinyae2cells:512_byte_storage_component'
            }
    ).id('maixr:cell_component_1k');
    event.shaped(Item.of('entropy_tech:rough_crafting_terminal'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'avaritia:compressed_crafting_table',
                B: 'create:crafter_slot_cover',
                C: 'avaritia:compressed_crafting_table',
                D: 'ae2:formation_core',
                E: 'entropy_tech:flawed_pattern_terminal',
                F: 'ae2:annihilation_core',
                G: 'avaritia:compressed_crafting_table',
                H: 'ae2lt:pigmee_synthesis_station',
                I: 'avaritia:compressed_crafting_table'
            }
    ).id('maixr:rough_crafting_terminal');
    event.remove({output:'ae2:pattern_provider'});
event.shaped(Item.of('ae2:pattern_provider'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'ae2:formation_core',
                B: 'neoecoae:aluminum_alloy_ingot',
                C: 'ae2:annihilation_core',
                D: 'avaritia:compressed_crafting_table',
                E: 'ae2cs:simple_pattern_provider',
                F: 'avaritia:compressed_crafting_table',
                G: 'ae2:annihilation_core',
                H: 'neoecoae:aluminum_alloy_ingot',
                I: 'ae2:formation_core'
            }
    ).id('maixr:pattern_provider');
    event.remove({id:'ae2:network/blocks/interfaces_interface'});
event.shaped(Item.of('ae2:interface'),
            [
                'ABC',
                'D F',
                'GHI'
            ],
            {
                A: 'ae2:annihilation_core',
                B: 'minecraft:glass',
                C: 'ae2:formation_core',
                D: 'mekanismsun:silver_ingot',
                F: 'mekanismsun:silver_ingot',
                G: 'ae2:formation_core',
                H: 'minecraft:glass',
                I: 'ae2:annihilation_core'
            }
    ).id('maixr:interface');
    event.remove({output:'ae2cs:simple_pattern_provider'});
event.shaped(Item.of('ae2cs:simple_pattern_provider'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'minecraft:iron_nugget',
                B: 'ae2cs:wooden_gear',
                C: 'minecraft:iron_nugget',
                D: 'ae2cs:simple_processor',
                E: 'ae2lt:pigmee_pattern_provider',
                F: 'ae2cs:simple_processor',
                G: 'minecraft:iron_ingot',
                H: 'ae2cs:wooden_gear',
                I: 'minecraft:iron_ingot'
            }
    ).id('maixr:simple_pattern_provider');
event.shaped(Item.of('ae2cs:wooden_gear',3),
            [
                ' B ',
                'DEF',
                ' H '
            ],
            {
                B: 'minecraft:iron_nugget',
                D: 'minecraft:iron_nugget',
                E: 'ae2cs:wooden_gear',
                F: 'minecraft:iron_nugget',
                H: 'minecraft:iron_nugget'
            }
    ).id('maixr:wooden_gear');
    event.remove({output:'ae2:molecular_assembler'});
event.shaped(Item.of('ae2:molecular_assembler'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'ae2:quartz_glass',
                B: 'minecraft:iron_ingot',
                C: 'ae2:quartz_glass',
                D: 'ae2:formation_core',
                E: 'ae2lt:pigmee_molecular_assembler',
                F: 'ae2:annihilation_core',
                G: 'ae2:quartz_glass',
                H: 'minecraft:iron_ingot',
                I: 'ae2:quartz_glass'
            }
    ).id('maixr:molecular_assembler');
    event.remove({output:'neoecoprototype:simplify_stonecutting_assembler'});
event.shaped(Item.of('neoecoprototype:simplify_stonecutting_assembler'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'neoecoprototype:simplify_green_aluminum_casing',
                B: 'minecraft:emerald_block',
                C: 'neoecoprototype:simplify_green_aluminum_casing',
                D: 'ae2:inscriber',
                E: 'ae2:molecular_assembler',
                F: 'ae2:inscriber',
                G: 'neoecoprototype:simplify_green_aluminum_casing',
                H: 'neoecoprototype:simplify_pattern_provider',
                I: 'neoecoprototype:simplify_green_aluminum_casing'
            }
    ).id('maixr:simplify_stonecutting_assembler');
event.remove({output:'ae2:controller'});
event.shaped(Item.of('ae2:controller'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'anvilcraft:charge_collector',
                B: 'neoecoprototype:simplify_storage_component_1m',
                C: 'anvilcraft:charge_collector',
                D: 'ae2:interface',
                E: 'entropy_tech:simple_controller',
                F: 'ae2:pattern_provider',
                G: 'ae2cs:meteor_crystal_block',
                H: 'ae2:dense_energy_cell',
                I: 'ae2cs:meteor_crystal_block'
            }
    ).id('maixr:controller');
    event.remove({output:'extendedae:infinity_water_cell'});
event.shaped(Item.of('extendedae:infinity_water_cell'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'ae2:quartz_glass',
                B: 'minecraft:water_bucket',
                C: 'ae2:quartz_glass',
                D: 'minecraft:water_bucket',
                E: 'neoecoprototype:simplify_storage_component_1m',
                F: 'minecraft:water_bucket',
                G: 'neoecoprototype:simplify_green_crystal_matrix',
                H: 'avaritia:diamond_lattice',
                I: 'neoecoprototype:simplify_green_crystal_matrix'
            }
    ).id('maixr:infinity_water_cell');
    event.remove({output:'extendedae:infinity_cobblestone_cell'});
event.shaped(Item.of('extendedae:infinity_cobblestone_cell'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'ae2:quartz_glass',
                B: 'enderio_evolution:double_compressed_infinity_dust_block',
                C: 'ae2:quartz_glass',
                D: 'minecraft:lava_bucket',
                E: 'neoecoprototype:simplify_storage_component_1m',
                F: 'minecraft:water_bucket',
                G: 'neoecoprototype:simplify_green_crystal_matrix',
                H: 'avaritia:diamond_lattice',
                I: 'neoecoprototype:simplify_green_crystal_matrix'
            }
    ).id('maixr:infinity_cobblestone_cell');
event.shaped(Item.of('entropy_tech:flawed_drive'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'neoecoprototype:simplify_green_crystal_matrix',
                B: 'laowu:cat_component',
                C: 'neoecoprototype:simplify_green_crystal_matrix',
                D: 'neoecoprototype:simplify_green_crystal_matrix',
                E: 'entropy_tech:rough_drive',
                F: 'neoecoprototype:simplify_green_crystal_matrix',
                G: 'ae2cs:charged_certus_quartz_block',
                H: 'ae2cs:charged_certus_quartz_block',
                I: 'ae2cs:charged_certus_quartz_block'
            }
    ).id('maixr:flawed_drive');
event.shaped(Item.of('entropy_tech:simple_drive'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'anvilcraft:disk',
                B: 'anvilcraft:disk',
                C: 'anvilcraft:disk',
                D: 'ae2:formation_core',
                E: 'entropy_tech:flawed_drive',
                F: 'ae2:annihilation_core',
                G: 'ae2cs:purified_resonating_crystal',
                H: 'ae2:fluix_pearl',
                I: 'ae2cs:purified_resonating_crystal'
            }
    ).id('maixr:simple_drive');
    event.remove({output:'ae2:drive'});
event.shaped(Item.of('ae2:drive'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'ae2:logic_processor',
                B: 'ae2:calculation_processor',
                C: 'ae2:engineering_processor',
                D: 'ae2:fluix_covered_dense_cable',
                E: 'entropy_tech:simple_drive',
                F: 'ae2:fluix_covered_dense_cable',
                G: 'ae2cs:resonating_processor',
                H: 'megacells:accumulation_processor',
                I: 'ae2omnicells:complex_link_processor'
            }
    ).id('maixr:drive');
    event.remove({output:'neoecoprototype:simplify_computation_drive'});
event.shaped(Item.of('neoecoprototype:simplify_computation_drive',6),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'neoecoprototype:simplify_computation_casing',
                B: 'ae2:calculation_processor',
                C: 'neoecoprototype:simplify_computation_casing',
                D: 'ae2:fluix_smart_dense_cable',
                E: 'entropy_tech:flawed_drive',
                F: 'ae2:fluix_smart_dense_cable',
                G: 'neoecoprototype:simplify_computation_casing',
                H: 'minecraft:copper_block',
                I: 'neoecoprototype:simplify_computation_casing'
            }
    ).id('maixr:simplify_computation_drive');
    event.remove({output:'neoecoprototype:simplify_drive'});
event.shaped(Item.of('neoecoprototype:simplify_drive',6),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'neoecoprototype:simplify_storage_casing',
                B: 'ae2:logic_processor',
                C: 'neoecoprototype:simplify_storage_casing',
                D: 'ae2:fluix_smart_dense_cable',
                E: 'entropy_tech:flawed_drive',
                F: 'ae2:fluix_smart_dense_cable',
                G: 'neoecoprototype:simplify_storage_casing',
                H: 'ae2:logic_processor',
                I: 'neoecoprototype:simplify_storage_casing'
            }
    ).id('maixr:simplify_drive');
    event.remove({output:'ae2:condenser'});
event.shaped(Item.of('ae2:condenser'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'ae2:matter_ball',
                B: 'anvilcraft:neutronium_ingot',
                C: 'ae2:matter_ball',
                D: 'ae2:quartz_glass',
                E: 'mekanism:steel_casing',
                F: 'ae2:quartz_glass',
                G: 'ae2:matter_ball',
                H: 'ae2omnicells:charged_ender_ingot',
                I: 'ae2:matter_ball'
            }
    ).id('maixr:condenser');

    event.custom({
        type: 'ae2cs:crystal_aggregator_recipe_serializer',
        energy_cost: 16000,
        input_a: { count: 3, item: 'entropy_tech:compressed_yunkuang_2x' },
        input_b: { count: 1, item: 'ae2:cell_component_64k' },
        input_c: { count: 3, item: 'entropy_tech:pure_yunkuang_2x' },
        result:  { count: 1, id: 'ae2:matter_ball' }
    }).id('maixr:ae2cs/matter_bell_1')

event.remove({output:'ae2:terminal'});
event.shapeless(Item.of('ae2:terminal'),
            ['ae2:semi_dark_monitor',
            'ae2:formation_core',
            'entropy_tech:rough_crafting_terminal',
            'ae2:annihilation_core',
            'ae2:logic_processor']
    ).id('maixr:terminal');

event.remove({output:'ae2:semi_dark_monitor'});
event.shaped(Item.of('ae2:semi_dark_monitor'),
            [
                ' BC',
                'AEF',
                ' HI'
            ],
            {
                A: 'megacells:sky_steel_ingot',
                B: 'minecraft:glowstone_dust',
                C: 'ae2:quartz_glass',
                E: 'minecraft:redstone',
                F: 'ae2:quartz_glass',
                H: 'minecraft:glowstone_dust',
                I: 'ae2:quartz_glass'
            }
    ).id('maixr:semi_dark_monitor');

event.remove({output:'ae2cs:crystal_aggregator'});
event.shaped(Item.of('ae2cs:crystal_aggregator'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'ae2:fluix_pearl',
                B: 'neoecoprototype:simplify_stonecutting_assembler',
                C: 'ae2:fluix_pearl',
                D: 'ae2cs:quartz_grindstone',
                E: 'extendedae:machine_frame',
                F: 'ae2cs:quartz_grindstone',
                G: 'ae2:logic_processor',
                H: 'ae2cs:resonating_processor',
                I: 'ae2:logic_processor'
            }
    ).id('maixr:crystal_aggregator');
    event.remove({output:'mespawner:me_spawner'});
event.shaped(Item.of('mespawner:me_spawner'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'anvilcraft:frost_metal_ingot',
                B: 'mysticalagriculture:soulium_spawner',
                C: 'anvilcraft:ember_metal_ingot',
                D: 'ae2:fluix_block',
                E: 'ae2:singularity',
                F: 'ae2:fluix_block',
                G: 'anvilcraft:cursed_gold_block',
                H: 'enderio:ensouled_chassis',
                I: 'anvilcraft:cursed_gold_block'
            }
    ).id('maixr:me_spawner');
})

// ------------------------------------------------------------
//  范例：按阶段解锁 AE2（配合 FTB Quests）
// ------------------------------------------------------------
// PlayerEvents.loggedIn(event => {
//   const p = event.player
//   if (!p.stages.has("ae2_unlocked")) {
//     p.stages.add("ae2_unlocked")
//   }
// })

// ------------------------------------------------------------
//  范例：禁用过强的物品
// ------------------------------------------------------------
// ItemEvents.rightClicked("ae2:item_storage_cell_256k", event => {
//   event.player.tell("§c该元件在本包中已被禁用。")
//   event.cancel()
// })
