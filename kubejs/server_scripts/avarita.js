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

})
