// ============================================================
//  Re-Avaritia（无尽贪婪：重生）分级工作台配方
// ------------------------------------------------------------
//  工作台 tier 对应（从模组自身配方反推）：
//      tier 1 = 幽匿工作台  avaritia:sculk_crafting_table   （5×5 网格）
//      tier 2 = 下界工作台  avaritia:nether_crafting_table  （7×7）
//      tier 3 = 末地工作台  avaritia:end_crafting_table     （9×9）
//      tier 4 = 无尽工作台  avaritia:extreme_crafting_table （9×9）
//
//  ⚠ matches() 里 tier 是【精确相等】比较：
//      tier 0 = 任意工作台都能做
//      tier N = 必须用第 N 档的工作台
//    所以写 tier 1 就只有幽匿工作台能做，别的档位不行。
// ============================================================

ServerEvents.recipes(event => {

    // ─────────────────────────────────────────────────────────
    //  1. 移除原版工作台配方
    //     原配方：data/anvilcraft/recipe/impact_pile.json
    //             3×3 工作台（黑曜石 + 下界合金锭）
    // ─────────────────────────────────────────────────────────
    event.remove({ id: 'anvilcraft:impact_pile' })

    // ─────────────────────────────────────────────────────────
    //  2. 改为幽匿工作台合成（tier 1）
    //     图案沿用原配方，5×5 网格放得下 3×3
    // ─────────────────────────────────────────────────────────
    event.custom({
        type: 'avaritia:shaped_table',
        tier: 1,
        key: {
            A: { item: 'minecraft:obsidian' },
            B: { item: 'minecraft:netherite_ingot' }
        },
        pattern: [
            ' A ',
            ' B ',
            ' B '
        ],
        result: { count: 1, id: 'anvilcraft:impact_pile' }
    }).id('maixr:impact_pile_from_sculk_table')

    // ─────────────────────────────────────────────────────────
    //  3. 终末工作台（avaritia:end_crafting_table）改料
    //     原配方（data/avaritia/recipe/end_crafting_table.json, tier 2）：
    //       核心 a = avaritia:double_compressed_crafting_table
    //       中心 i = minecraft:ender_eye
    //     按需求替换：
    //       a → advanced_ae:quantum_core
    //       i → draconicevolution:dragon_heart
    //     其余图案/材料照抄原配方，不动。
    // ─────────────────────────────────────────────────────────
    event.remove({ id: 'avaritia:end_crafting_table' })

    event.custom({
        type: 'avaritia:shaped_table',
        tier: 2,
        key: {
            a: { item: 'advanced_ae:quantum_core' },
            b: { item: 'minecraft:end_crystal' },
            c: { item: 'minecraft:end_portal_frame' },
            d: { item: 'minecraft:obsidian' },
            e: { item: 'minecraft:dragon_breath' },
            f: { item: 'minecraft:purpur_pillar' },
            g: { item: 'minecraft:end_stone_bricks' },
            h: { item: 'minecraft:end_stone' },
            i: { item: 'draconicevolution:dragon_heart' },
            j: { item: 'minecraft:ender_chest' },
        },
        pattern: [
            'bcccb',
            'dfifd',
            'dgagd',
            'dhjhd',
            'beeeb'
        ],
        result: { count: 1, id: 'avaritia:end_crafting_table' }
    }).id('maixr:end_crafting_table_quantum_gate')

    // ─────────────────────────────────────────────────────────
    //  4. 删掉无尽工作台（tier 4）里 mekanism / 龙研 / 末影接口 的配方
    //     这 7 条都是「创造模式物品」级别的配方，输出分别是：
    //       mekanism:creative_bin / creative_chemical_tank /
    //       creative_energy_cube / creative_fluid_tank
    //       draconicevolution:creative_capacitor / creative_op_capacitor
    //       enderio:creative_power
    //     配方 id 全部来自模组 jar 实测（data/avaritia/recipe/*.json），
    //     不按命名空间扫，避免误删将来别处同命名空间的低级配方。
    // ─────────────────────────────────────────────────────────
    ;[
        'avaritia:mek_creative_bin',
        'avaritia:mek_creative_chemical_tank',
        'avaritia:mek_creative_energy_cube',
        'avaritia:mek_creative_fluid_tank',
        'avaritia:de_creative_capacitor',
        'avaritia:de_creative_op_capacitor',
        'avaritia:eio_creative_power'
    ].forEach(id => event.remove({ id }));
    event.remove({id:'ae2lt:overload_alloy_blank'});


        event.custom({
        type: 'avaritia:shaped_table',
        tier: 3,
        key: {
            a:{item:'dreammod:wail_ingot'},
            b:{item:'enderio_evolution:melodic_alloy_ingot'},
            c:{item:'ae2cs:charged_overload_crystal_block'},
            d:{item:'anvilcraft:transcendium_ingot'},
            e:{item:'justdirethings:time_crystal'},
            f:{item:'minecraft:amethyst_shard'},
            g:{item:'mekanism_extras:alloy_thermonuclear'},
            h:{item:'pasterdream:dyedream_crack'},
            i:{item:'evolvedmekanism:alloy_hypercharged'},
            j:{item:'advanced_ae:quantum_alloy'},
            k:{item:'avaritia:crystal_matrix_ingot'},
            l:{item:'pasterdream:dyedream_ingot'},
            m:{item:'mekltgt:super_core'}

        },
        pattern: [
            '    lmm',
            '  jckkm',
            ' jefeki',
            ' cfhfc ',
            'gbefed ',
            'mbbcd  ',
            'mma    '
        ],
        result: { count: 30, id: 'ae2lt:overload_alloy_blank' }
    }).id('maixr:ae2lt_overload_alloy_blank')

})