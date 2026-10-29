// ============================================================
//  陨矿杂质 (entropy_tech:yunkuang_zazhi) —— 用途
// ------------------------------------------------------------
//  「获得」留在模组里（工作盆搅拌 / 无序合成）。
//  「用途」按需求搬回这里，方便随时改：
//
//    1) 机械动力「粉碎」 t1：7 种矿，每槽独立 10%，tier 1
//    2) 机械动力「粉碎」 t2：7 种矿，每槽独立 10%，tier 2
//
//  ⚠ 用 create:crushing（粉碎轮）而不是 pressing（辊压机）：
//    pressing 只有 2 个输出槽，crushing 有 7 个。
//
//  ⚠ 每个槽要写成 { chance, output } —— KubeCreateOutput.fromMapLike
//    认这两个键；直接写 "3x id" 会变成 100% 产出。
// ============================================================

console.info('[PAL] 加载 yunkuang.js')

ServerEvents.recipes(event => {

    // =========================================================
    //  一、粉碎产矿（7 槽独立 10%）
    // =========================================================

    // ---- t1（tier 1）----
    event.recipes.create.crushing(
        [
            { chance: 0.1, output: '3x minecraft:raw_iron' },
            { chance: 0.1, output: '3x minecraft:raw_copper' },
            { chance: 0.1, output: '3x minecraft:raw_gold' },
            { chance: 0.1, output: '3x minecraft:quartz' },
            { chance: 0.1, output: '3x create:raw_zinc' },
            { chance: 0.1, output: '3x ae2:certus_quartz_crystal' },
            { chance: 0.1, output: '3x minecraft:redstone' }
        ],
        'entropy_tech:yunkuang_zazhi'
    ).tier(1)
        .id('maixr:yunkuang_zazhi_crushing_t1')

    // ---- t2（tier 2）----
    event.recipes.create.crushing(
        [
            { chance: 0.1, output: '2x minecraft:emerald' },
            { chance: 0.1, output: '3x minecraft:diamond' },
            { chance: 0.1, output: '3x mekanism:raw_uranium' },
            { chance: 0.1, output: '3x mekanism:raw_osmium' },
            { chance: 0.1, output: '3x mekanismsun:raw_silver' },
            { chance: 0.1, output: '8x neoecoae:raw_aluminum_ore' },
            { chance: 0.1, output: 'minecraft:netherite_scrap' }
        ],
        'entropy_tech:compressed_yunkuang_1x'
    ).tier(2)
        .id('maixr:yunkuang_zazhi_crushing_t2')

        event.recipes.create.crushing(
        [
            { chance: 0.1, output: '3x alexscaves:raw_azure_neodymium' },
            { chance: 0.1, output: '3x alexscaves:raw_scarlet_neodymium' },
            { chance: 0.1, output: '3x alexscaves:pewen_sap' },
            { chance: 0.1, output: '3x alexscaves:peppermint_powder' },
            { chance: 0.1, output: '3x alexscaves:guano' },
            { chance: 0.1, output: '3x alexscaves:moth_dust' },
            { chance: 0.1, output: '3x pasterdream:dyedreamquartz' }
        ],
        'entropy_tech:dyedream_yunkuang'
    ).tier(2)
        .id('maixr:dyedream_t2')

    //-------------t3----------------------
    event.recipes.create.crushing(
        [
            { chance: 0.1, output: '3x pasterdream:dyedream_dust_piece' },
            { chance: 0.1, output: '3x pasterdream:dyedream_bud_nugget' },
            { chance: 0.03, output: 'pasterdream:meltdream_crystal_0' },
            { chance: 0.1, output: '3x pasterdream:windrunner_crystal' },
            { chance: 0.1, output: '3x pasterdream:congeal_wind' },
            { chance: 0.1, output: ' pasterdream:wind_plant_extract' },
            { chance: 0.1, output: '3x pasterdream:blackmetal_grain' }
        ],
        'entropy_tech:dyedream_yunkuang'
    ).tier(3)
        .id('maixr:dyedream_t3')

    // =========================================================
    //  二、染梦陨（原有内容，保留）
    // =========================================================
    event.remove({ output: 'entropy_tech:dyedream_yunkuang',});
    event.shapeless(Item.of('entropy_tech:dyedream_yunkuang',16),
        ['entropy_tech:compressed_yunkuang_4x',
            'entropy_tech:compressed_yunkuang_4x',
            'entropy_tech:compressed_yunkuang_4x',
            'entropy_tech:compressed_yunkuang_4x',
            'entropy_tech:dyedream_yunkuang',
            'entropy_tech:pure_yunkuang_4x',
            'entropy_tech:pure_yunkuang_4x',
            'entropy_tech:pure_yunkuang_4x',
            'entropy_tech:pure_yunkuang_4x']
    ).id('maixr:dyedream_yunkuang_self');
});