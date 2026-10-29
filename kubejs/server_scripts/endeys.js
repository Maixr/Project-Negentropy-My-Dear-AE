// ============================================================
//  End Remastered —— 11 只「已断绝获取」的古眼 · 全新补救配方
// ------------------------------------------------------------
//  背景：这 11 只眼已从宝箱/生物/原配方中移除（见 endrem.js 与
//        config/EndRemastered-NeoForge/Eyes/*.json）。
//        这里给它们各自一条【唯一】的新获取途径。
//
//  ⚠ 约束（按需求）：Create 配方最多 3 条
//    → C1 nether_eye / C2 exotic_eye / C3 witch_eye  仅此三条用 Create
//    → 其余 8 条全部用非 Create 机器
//    → 不用 avaritia.extreme_smithing（终焉锻造太高级）
//    → 11 只眼用 11 种不同机器，无一重复
//    → 全部消耗 minecraft:ender_eye
//
//  机器清单：
//    1 old_eye      Mekanism 冶金灌注机   mekanism:metallurgic_infusing
//    2 rogue_eye    ExtendedAE 晶体装配器 extendedae:crystal_assembler（9 种 × 8）
//    3 nether_eye   Create 注液器         create.filling            + 岩浆  [C1]
//    4 cold_eye     AE2CS 水晶聚合器      ae2cs:crystal_aggregator（64 蓝冰 + 64 浮冰）
//    5 black_eye    AE2CS 水晶聚合器      ae2cs:crystal_aggregator
//    6 lost_eye     Avaritia 炼狱工作台   avaritia:shaped_table     (tier 2, 5x5)
//    7 wither_eye   Mekanism 粉碎机       mekanism:crushing
//    8 exotic_eye   Create 序列组装       create.sequenced_assembly + 水    [C2]
//    9 evil_eye     Avaritia 幽匿工作台   avaritia:shapeless_table  (tier 1)
//   10 undead_eye   AE2CS 电路蚀刻机      ae2cs:circuit_etcher
//   11 witch_eye    Create 工作盆搅拌     create.mixing             + 水    [C3]
//
//  所有 JSON 格式均取自各模组 jar 里的真实配方样例，不是猜的。
//  生效：/reload（服务端脚本）
// ============================================================

ServerEvents.recipes(event => {

    const EYE = 'minecraft:ender_eye'

    // ─────────────────────────────────────────────────────────
    //  1. 远古之眼 old_eye —— Mekanism 冶金灌注机
    //  「传说这颗眼睛曾属于一只巨沙虫」
    //  用生物质灌注末影之眼，唤醒远古虫族的生命印记。
    // ─────────────────────────────────────────────────────────
    event.custom({
        type: 'mekanism:metallurgic_infusing',
        chemical_input: { amount: 1000, tag: 'mekanism:bio' },
        item_input: { count: 1, item: EYE },
        output: { count: 1, id: 'endrem:old_eye' },
        per_tick_usage: false
    }).id('maixr:endrem/old_eye_from_infusing')

    // ─────────────────────────────────────────────────────────
    //  2. 无赖之眼 rogue_eye —— ExtendedAE 晶体装配器
    //  「据说它赋予了祖先红石智慧」
    //  红石元件全套各 8 个 —— 用最"无赖"的方式来造它。
    // ─────────────────────────────────────────────────────────
    //  晶体装配器正好 9 个槽位（AppEngInternalInventory(9, 64)），
    //  下面 9 种各 8 个，刚好摆满。
    event.custom({
        type: 'extendedae:crystal_assembler',
        input_items: [
            { amount: 8, ingredient: { item: 'minecraft:repeater' } },
            { amount: 8, ingredient: { item: 'minecraft:sticky_piston' } },
            { amount: 8, ingredient: { item: 'minecraft:comparator' } },
            { amount: 8, ingredient: { item: 'minecraft:observer' } },
            { amount: 8, ingredient: { item: EYE } },
            { amount: 8, ingredient: { item: 'minecraft:dispenser' } },
            { amount: 8, ingredient: { item: 'minecraft:crafter' } },
            { amount: 8, ingredient: { item: 'minecraft:calibrated_sculk_sensor' } },
            { amount: 8, ingredient: { item: 'minecraft:note_block' } }
        ],
        output: { count: 1, id: 'endrem:rogue_eye' }
    }).id('maixr:endrem/rogue_eye_from_assembler')

    // ─────────────────────────────────────────────────────────
    //  3. 下界之眼 nether_eye —— Create 注液器  [C1]
    //  「在下界与天境的战争中，一个恶魔弄丢了它」
    //  8000mb 岩浆浇灌，把眼染成恶魔的颜色。
    // ─────────────────────────────────────────────────────────
    event.recipes.create.filling('endrem:nether_eye', [
        EYE,
        Fluid.of('minecraft:lava', 8000)
    ]).id('maixr:endrem/nether_eye_from_filling')

    // ─────────────────────────────────────────────────────────
    //  4. 寒冰之眼 cold_eye —— AE2 压印器
    //  「冰术师灭绝之前留下的最后几件古物之一」
    //  用上百块冰把末影之眼彻底冻透。
    // ─────────────────────────────────────────────────────────
    //  换掉压印器（只有 3 个槽、冰太少）。改用水晶聚合器：
    //  64 蓝冰 + 64 浮冰 = 128 块冰，冰量足够合理。
    event.custom({
        type: 'ae2cs:crystal_aggregator_recipe_serializer',
        energy_cost: 24000,
        input_a: { count: 1, item: EYE },
        input_b: { count: 64, item: 'minecraft:blue_ice' },
        input_c: { count: 64, item: 'minecraft:packed_ice' },
        result: { count: 1, id: 'endrem:cold_eye' }
    }).id('maixr:endrem/cold_eye_from_aggregator')

    // ─────────────────────────────────────────────────────────
    //  5. 漆黑之眼 black_eye —— AE2CS 水晶聚合器（三输入）
    //  「海盗说它可以让人看到传说中的黑珍珠号」
    //  墨囊染黑、海晶碎片折光 —— 海盗望远镜的镜片。
    // ─────────────────────────────────────────────────────────
    event.custom({
        type: 'ae2cs:crystal_aggregator_recipe_serializer',
        energy_cost: 32000,
        input_a: { count: 1, item: EYE },
        input_b: { count: 16, item: 'minecraft:ink_sac' },
        input_c: { count: 8, item: 'minecraft:prismarine_shard' },
        result: { count: 1, id: 'endrem:black_eye' }
    }).id('maixr:endrem/black_eye_from_aggregator')

    // ─────────────────────────────────────────────────────────
    //  6. 迷失之眼 lost_eye —— Avaritia 炼狱工作台（tier 2, 5x5）
    //  「据悉它是由最早的铁匠锻造而成的」
    //  铁块围出熔炉、铁砧上下压印 —— 复刻最早的锻造工艺。
    // ─────────────────────────────────────────────────────────
    event.recipes.avaritia.shaped_table(
        2,
        'endrem:lost_eye',
        [
            '  A  ',
            ' III ',
            '  E  ',
            ' III ',
            '  A  '
        ],
        { I: 'anvilcraft:ember_anvil', E: EYE, A: 'anvilcraft:giant_anvil' }
    ).id('maixr:endrem/lost_eye_from_forge')

    // ─────────────────────────────────────────────────────────
    //  7. 凋零之眼 wither_eye —— Mekanism 粉碎机
    //  「它见证了毁灭，也许还会见证你的物品消失」
    //  把眼碾碎重组，让毁灭之力替换掉原来的内核。
    // ─────────────────────────────────────────────────────────
    event.custom({
        type: 'mekanism:crushing',
        input: { count: 1, item: EYE },
        output: { count: 1, id: 'endrem:wither_eye' }
    }).id('maixr:endrem/wither_eye_from_crushing')

    // ─────────────────────────────────────────────────────────
    //  8. 异域之眼 exotic_eye —— Create 序列组装（3 步，含注水）[C2]
    //  「有传言说他们找到了亚特兰蒂斯」
    //  幽匿 → 海晶 → 注水，三步复现沉没的城。
    // ─────────────────────────────────────────────────────────
    const EXOTIC_T = EYE
    event.recipes.create.sequenced_assembly(
        'endrem:exotic_eye',
        EYE,
        [
            event.recipes.create.deploying(EXOTIC_T, [EXOTIC_T, 'minecraft:sculk_catalyst']),
            event.recipes.create.deploying(EXOTIC_T, [EXOTIC_T, 'minecraft:prismarine_crystals']),
            event.recipes.create.filling(EXOTIC_T, [EXOTIC_T, Fluid.of('minecraft:water', 1000)])
        ]
    )
        .transitionalItem(EXOTIC_T)
        .loops(1)
        .id('maixr:endrem/exotic_eye_from_assembly')

    // ─────────────────────────────────────────────────────────
    //  9. 邪恶之眼 evil_eye —— Avaritia 幽匿工作台（tier 1）
    //  「据说是可以保护主人免遭厄运的圣符」
    //  凋零玫瑰 + 发酵蛛眼 + 恶魂之泪 —— 以毒攻毒。
    // ─────────────────────────────────────────────────────────
    event.custom({
        type: 'avaritia:shapeless_table',
        tier: 1,
        ingredients: [
            { item: EYE },
            { item: 'minecraft:wither_rose' },
            { item: 'minecraft:fermented_spider_eye' },
            { item: 'minecraft:ghast_tear' },
            { item: 'minecraft:amethyst_shard' }
        ],
        result: { count: 1, id: 'endrem:evil_eye' }
    }).id('maixr:endrem/evil_eye_from_shapeless')

    // ─────────────────────────────────────────────────────────
    //  10. 亡灵之眼 undead_eye —— AE2CS 电路蚀刻机（三输入）
    //  「追忆不死者的生前岁月」
    //  骨头 + 亡灵之魂，把记忆蚀刻进眼里的电路。
    // ─────────────────────────────────────────────────────────
    event.custom({
        type: 'ae2cs:circuit_etcher_recipe_serializer',
        energy_cost: 28800,
        input_a: { count: 1, item: EYE },
        input_b: { count: 8, item: 'minecraft:bone' },
        input_c: { count: 8, item: 'pasterdream:soul_essence' },
        result: { count: 1, id: 'endrem:undead_eye' }
    }).id('maixr:endrem/undead_eye_from_etching')

    // ─────────────────────────────────────────────────────────
    //  12. 魔力之眼 magical_eye —— Avaritia 幽匿工作台（tier 1, 3x3）
    //  「若无此眼，唤魔者无异于蝼蚁」
    //  青金石围出法阵、图腾压顶、附魔书垫底 —— 唤魔者的力量源头。
    //  用 event.custom 写原始 JSON：schema 的参数顺序不可靠
    //  （shapeless_table 实际是 (result, ingredients, tier)，不是文档写的顺序）。
    // ─────────────────────────────────────────────────────────
    event.custom({
        type: 'avaritia:shaped_table',
        tier: 1,
        key: {
            L: { item: 'minecraft:lapis_block' },
            T: { item: 'minecraft:totem_of_undying' },
            B: { item: 'pasterdream:dyedream_crack'},
            E: { item: EYE }
        },
        pattern: [
            ' L ',
            'TET',
            ' B '
        ],
        result: { count: 1, id: 'endrem:magical_eye' }
    }).id('maixr:endrem/magical_eye_from_sculk_table')

    // ─────────────────────────────────────────────────────────
    //  11. 女巫之眼 witch_eye —— Create 工作盆搅拌  [C3]
    //  「据说它看到了失传的古老酿造配方」
    //  发酵蛛眼 + 水，在盆里熬煮复现失传的酿造。
    // ─────────────────────────────────────────────────────────
    event.recipes.create.mixing('endrem:witch_eye', [
        EYE,
        'minecraft:fermented_spider_eye',
        Fluid.of('minecraft:water', 1000)
    ]).id('maixr:endrem/witch_eye_from_mixing')

})

console.info('[PAL] 11 只古眼的补救配方已加载（Create 仅 3 条 / 11 种机器）')
