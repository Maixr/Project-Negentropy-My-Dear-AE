// ============================================================
//  机械动力 (Create) 配方
// ------------------------------------------------------------
//  注意：
//   1. 不要在 ServerEvents.recipes 里再嵌套一层（内层永不生效）
//   2. 每条配方要有独立的 .id()，否则 KubeJS 取列表里最后一个
//   3. create:filling 必须带流体，否则 JEI 报 "no fluid ingredient"
// ============================================================

ServerEvents.recipes(event => {

    // =========================================================
    //  一、原版配方修改
    // =========================================================

    // 安山合金：陨石粉围一圈（自我增生，8 个）
    event.shaped(Item.of('create:andesite_alloy', 8),
        [
            'ABC',
            'DEF',
            'GHI'
        ],
        {
            A: 'ae2:sky_dust', B: 'ae2:sky_dust', C: 'ae2:sky_dust',
            D: 'ae2:sky_dust', E: 'create:andesite_alloy', F: 'ae2:sky_dust',
            G: 'ae2:sky_dust', H: 'ae2:sky_dust', I: 'ae2:sky_dust'
        }
    ).id('maixr:andesite_alloy_from_meteorite_dust')

    // 手搓锤子
    event.remove({output:'createdieselgenerators:hammer'});
    event.shaped(Item.of('createdieselgenerators:hammer'),
            [
                'ABC',
                'DEF',
                ' H '
            ],
            {
                A: 'minecraft:iron_block',
                B: 'ae2:smooth_sky_stone_block',
                C: 'minecraft:iron_block',
                D: 'ae2:smooth_sky_stone_block',
                E: 'minecraft:stick',
                F: 'ae2:smooth_sky_stone_block',
                H: 'minecraft:stick'
            }
    ).id('maixr:hammer');
    // ---- 移除原版安山合金 & 铜压板 ----
    event.remove({ id: 'create:crafting/materials/andesite_alloy_from_zinc' })
    event.remove({ id: 'create:crafting/materials/andesite_alloy' })
    event.remove({ id: 'anvilcraft:copper_pressure_plate_from_copper_ingot' })
    event.remove({ id: 'anvilcraft:stamping/copper_pressure_plate' })

    // 安山合金：抛光安山岩 + 铜板（1 个）
    event.shaped(Item.of('create:andesite_alloy'),
        [
            ' B ',
            'DEF',
            ' H '
        ],
        {
            B: 'minecraft:polished_andesite',
            D: 'minecraft:polished_andesite',
            E: 'create:copper_sheet',
            F: 'minecraft:polished_andesite',
            H: 'minecraft:polished_andesite'
        }
    ).id('maixr:andesite_alloy_from_polished')
    event.remove({output:'create:water_wheel'});
    event.shaped(Item.of('create:water_wheel'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'create:andesite_casing',
                B: 'dndecor:industrial_plating_block',
                C: 'create:andesite_casing',
                D: 'dndecor:industrial_plating_block',
                E: 'create:crushing_wheel',
                F: 'dndecor:industrial_plating_block',
                G: 'create:andesite_casing',
                H: 'dndecor:industrial_plating_block',
                I: 'create:andesite_casing'
            }
    ).id('maixr:water_wheel');
    event.remove({output:'create:large_water_wheel'});
    event.shaped(Item.of('create:large_water_wheel'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'create:andesite_casing',
                B: 'dndecor:industrial_plating_block',
                C: 'create:andesite_casing',
                D: 'dndecor:industrial_plating_block',
                E: 'create:water_wheel',
                F: 'dndecor:industrial_plating_block',
                G: 'create:andesite_casing',
                H: 'dndecor:industrial_plating_block',
                I: 'create:andesite_casing'
            }
    ).id('maixr:large_water_wheel');
    event.remove({output:'appliedcreate:andesite_stress_cell_housing'});
    event.shaped(Item.of('appliedcreate:andesite_stress_cell_housing'),
            [
                'ABC',
                'D F',
                'GHI'
            ],
            {
                A: 'create:framed_glass',
                B: 'create:cinder_flour',
                C: 'create:framed_glass',
                D: 'create:cinder_flour',
                F: 'create:cinder_flour',
                G: 'create:precision_mechanism',
                H: 'create_sa:fan_component',
                I: 'create:precision_mechanism'
            }
    ).id('maixr:andesite_stress_cell_housing');
    event.remove({output:'ae2:inscriber'});
    event.shaped(Item.of('ae2:inscriber'),
            [
                'ABC',
                'D F',
                'GHI'
            ],
            {
                A: 'create:zinc_ingot',
                B: 'createmoremachines:brass_mechanical_press',
                C: 'minecraft:iron_ingot',
                D: 'createmoremachines:brass_deployer',
                F: 'minecraft:iron_ingot',
                G: 'create:zinc_ingot',
                H: 'createmoremachines:brass_mechanical_press',
                I: 'minecraft:iron_ingot'
            }
    ).id('maixr:inscriber');
    event.remove({output:'entropy_tech:rough_drive'});
    event.recipes.create.mixing(                //粗糙驱动器
        'entropy_tech:rough_drive',
        ['create:precision_mechanism','entropy_tech:primitive_drive','create_connected:control_chip'],
        ).id('maixr:fix_flawed_drive')
        .tier(1)
    event.remove({output:'entropy_tech:flawed_pattern_terminal'});
    // 移除原版（createmoremachines 自带的）下界合金配方
    event.remove({id: 'createmoremachines:mixing/netherite_alloy'})
    event.recipes.create.mixing(    //下界合金
        'createmoremachines:netherite_alloy',
        ['minecraft:netherite_ingot','dreammod:paean_ingot','enderio_evolution:crystalline_alloy_ingot','betternether:cincinnasite_ingot',Fluid.of('createmoremachines:binder',250)]
        ).heated()
        .tier(1)
        .id('maixr:netherite_alloy')

    MoreFormula.setTier('createmoremachines:pressing/netherite_sheet', 1)

    const T = 'entropy_tech:flawed_pattern_terminal';
    event.recipes.create.sequenced_assembly(
        'entropy_tech:flawed_pattern_terminal',
        'entropy_tech:primitive_terminal',
        [
            event.recipes.create.pressing(T, T),
            event.recipes.create.deploying(T, [T, 'create:brass_casing']),
            event.recipes.create.deploying(T, [T, 'ae2:blank_pattern'])
        ]
    )
        .transitionalItem(T)
        .loops(2)
        .tier(1)
        .id('maixr:waht_can_i_say')

        const T1 = 'entropy_tech:flawed_controller';
    event.recipes.create.sequenced_assembly(
        'entropy_tech:simple_controller',
        'entropy_tech:flawed_controller',
        [
            event.recipes.create.pressing(T1, T1),
            event.recipes.create.deploying(T1, [T1, 'minecraft:obsidian']),
            event.recipes.create.deploying(T1, [T1, 'ae2:fluix_pearl']),
            event.recipes.create.deploying(T1, [T1,'draconicevolution:draconium_ingot']),
            event.recipes.create.filling(T1,[T1,Fluid.of('dreammod:dream_source',250)])
        ]
    )
        .transitionalItem(T1)
        .loops(4)
        .tier(2)
        .id('maixr:flawed_ctrl');
    event.recipes.remove({output:'neoecoprototype:simplify_green_crystal_matrix'});
    event.recipes.create.mixing(
        Item.of('neoecoprototype:simplify_green_crystal_matrix',4),
        ['neoecoae:aluminum_dust','ae2:certus_quartz_dust','mekanism:dust_emerald','minecraft:glowstone_dust']
    ).tier(2)
    .id('maixr:lvjin')

    event.remove({output:'create:steam_engine'});
event.shaped(Item.of('create:steam_engine'),
            [
                ' B ',
                ' E ',
                'GHI'
            ],
            {
                B: 'create_sa:heat_engine',
                E: 'enderio:energetic_alloy_block',
                G: 'anvilcraft:ruby',
                H: 'create_sa:steam_engine',
                I: 'anvilcraft:ruby'
            }
    ).id('maixr:steam_engine');
event.recipes.create.mixing(
    Item.of('minecraft:glowstone_dust',16),
    [
        'data_energistics:amethyst_dust',
        'mekanism:dust_gold',
        'betternether:cincinnasite_ingot',
    ]
).tier(2)
.id('maixr:glowstone_dust_from_mixing')
event.recipes.create.mixing(
    'minecraft:echo_shard',
    ['16x betternether:gloomwood_leaves',
    Fluid.of('createdieselgenerators:plant_oil',1000)
    ]
).tier(2)
.id('maixr:echosharp_1')

event.recipes.create.cutting(
    'minecraft:echo_shard',
    'betternether:gloomwood_dark_log',
  
).tier(2)
.id('maixr:echosharp_2')
// ── 【已删除】粉碎轮 → 物质球（辊压 tier 2）──────────────────
//   按需求移除。想恢复就把下面 3 行的 // 去掉。
// event.recipes.create.pressing('ae2:matter_ball', 'create:crushing_wheel')
//     .id('maixr:metter_ball').tier(2)

    // // =========================================================
    // //  二、示例：more_formula 机器等级门槛
    // // =========================================================

    // // ---- 1. 注液：过载合金 + 水 -> 过载合金板（创造级）----
    // event.recipes.create.filling(
    //     'ae2lt:overload_alloy_plate',
    //     ['ae2lt:overload_alloy', Fluid.of('minecraft:water', 250)]
    // ).id('example:creative_pressing1')
    //     .tier(Tier.CREATIVE)

    // // ---- 2. 辊压：已印制的源初处理器 -> 源初处理器（超越级）----
    // event.recipes.create.pressing(
    //     'appgen:origination_processor',
    //     'appgen:printed_origination_processor'
    // ).id('example:creative_pressing2')
    //     .tier(Tier.BEYOND)

    // // ---- 3. 辊压：火把 -> 末地烛（末地合金级）----
    // event.recipes.create.pressing(
    //     'minecraft:end_rod',
    //     'minecraft:torch'
    // ).id('example:pressing_end_rod')
    //     .tier(Tier.END)

    // ---- 4. 装配线：铜锭 -> 铜块（超越级，2 循环）----
    // const T = 'more_formula:incomplete_test_package'

    // event.recipes.create.sequenced_assembly(
    //     'minecraft:copper_block',
    //     'minecraft:copper_ingot',
    //     [
    //         event.recipes.create.pressing(T, T),
    //         event.recipes.create.filling(T, [T, Fluid.of('minecraft:water', 250)]),
    //         event.recipes.create.deploying(T, [T, 'minecraft:quartz'])
    //     ]
    // )
    //     .transitionalItem(T)
    //     .loops(2)
    //     .tier(Tier.BEYOND)
    //     .id('example:copper_block_assembly')

})
