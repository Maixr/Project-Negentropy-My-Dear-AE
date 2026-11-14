// ============================================================
//  CobbleGen Galore 配方调整（KubeJS 覆盖）
// ------------------------------------------------------------
//  1) blockgen/ae2/skystone：底下方块 ae2:sky_stone_block → ae2:mysterious_cube
//  2) blockgen/mud          ：产物 minecraft:mud → minecraft:clay_ball
//
//  原配方 JSON 字段（从 cobblegengalore-1.21.1-0.2.9.jar 实测）：
//    type     : "cobblegengalore:blockgen"
//    result   : { id, count }
//    left     : { Name: "<方块>" }   左/右两侧方块（通常是水/岩浆）
//    right    : { Name: "<方块>" }
//    modifier : { Name: "<方块>" }   ★ 发电机**下方**的方块（底块）
//    speed    : 数字（可选，提速倍率）
//
//  做法：先 remove 原配方，再用 event.custom 以同一 id 重新注册。
// ============================================================

ServerEvents.recipes(event => {

    // ── 1. 赛特斯岩粉（skystone）：底块改为「神秘立方」 ──
    event.remove({ id: 'cobblegengalore:blockgen/ae2/skystone' })
    event.custom({
        type: 'cobblegengalore:blockgen',
        result: { id: 'ae2:sky_dust', count: 1 },
        speed: 2,
        left: { Name: 'minecraft:water' },
        right: { Name: 'minecraft:lava' },
        modifier: { Name: 'ae2:mysterious_cube' }
    }).id('cobblegengalore:blockgen/ae2/skystone')

    // ── 2. 泥巴（mud）：产物改为「黏土球」 ──
    event.remove({ id: 'cobblegengalore:blockgen/mud' })
    event.custom({
        type: 'cobblegengalore:blockgen',
        result: { id: 'minecraft:clay_ball', count: 1 },
        left: { Name: 'minecraft:water' },
        right: { Name: 'minecraft:dirt' }
    }).id('cobblegengalore:blockgen/mud')

    // ── 3. 新增：末影粉（ender_dust） ──
    //    产物 ae2:ender_dust
    //    左  myotus:charged_ender_pearl_block（充能末影珍珠块）
    //    右  dreammod:dream_source（梦源）
    //    ★ 你给的是 dreammod:dream_resource，但 paster recall 1.5.4 里不存在这个方块/物品
    //      （全 jar + lang 都查过），最接近的是 dreammod:dream_source，这里用它。
    //      若你其实指别的东西，改下面这一行即可。
    //    下  minecraft:crying_obsidian（哭泣的黑曜石）
    event.custom({
        type: 'cobblegengalore:blockgen',
        result: { id: 'ae2:ender_dust', count: 1 },
        left: { Name: 'myotus:charged_ender_pearl_block' },
        right: { Name: 'dreammod:dream_source' },
        modifier: { Name: 'minecraft:crying_obsidian' }
    }).id('maixr:cobblegengalore/ender_dust')
    event.remove({output:'cobblegengalore:block_gen_stone'});
event.shaped(Item.of('cobblegengalore:block_gen_stone'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'minecraft:smooth_stone',
                B: 'minecraft:smooth_stone',
                C: 'minecraft:smooth_stone',
                D: 'minecraft:glass',
                E: 'minecraft:ender_eye',
                F: 'minecraft:glass',
                G: 'minecraft:smooth_stone',
                H: 'minecraft:smooth_stone',
                I: 'minecraft:smooth_stone'
            }
    ).id('maixr:block_gen_stone');
    event.remove({output:'cobblegengalore:block_gen_iron'});
event.shaped(Item.of('cobblegengalore:block_gen_iron'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'enderio_evolution:construction_alloy_ingot',
                B: 'enderio_evolution:construction_alloy_ingot',
                C: 'enderio_evolution:construction_alloy_ingot',
                D: 'cobblegengalore:block_gen_stone',
                E: 'minecraft:glass',
                F: 'cobblegengalore:block_gen_stone',
                G: 'enderio_evolution:construction_alloy_ingot',
                H: 'enderio_evolution:construction_alloy_ingot',
                I: 'enderio_evolution:construction_alloy_ingot'
            }
    ).id('maixr:block_gen_iron');
    event.remove({output:'cobblegengalore:block_gen_copper'});
event.shaped(Item.of('cobblegengalore:block_gen_copper'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'minecraft:copper_block',
                B: 'minecraft:copper_block',
                C: 'minecraft:copper_block',
                D: 'cobblegengalore:block_gen_stone',
                E: 'minecraft:copper_block',
                F: 'cobblegengalore:block_gen_stone',
                G: 'minecraft:copper_block',
                H: 'minecraft:copper_block',
                I: 'minecraft:copper_block'
            }
    ).id('maixr:block_gen_copper');
    event.remove({output:'cobblegengalore:block_gen_gold'});
event.shaped(Item.of('cobblegengalore:block_gen_gold'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'enderio_evolution:crystalline_alloy_ingot',
                B: 'minecraft:enchanted_golden_apple',
                C: 'enderio_evolution:crystalline_alloy_ingot',
                D: 'cobblegengalore:block_gen_iron',
                E: 'ae2:quartz_glass',
                F: 'cobblegengalore:block_gen_iron',
                G: 'minecraft:gold_block',
                H: 'minecraft:gold_block',
                I: 'minecraft:gold_block'
            }
    ).id('maixr:block_gen_gold');
    event.remove({output:'cobblegengalore:block_gen_emerald'});
event.shaped(Item.of('cobblegengalore:block_gen_emerald'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'extendedae:entro_ingot',
                B: 'minecraft:totem_of_undying',
                C: 'extendedae:entro_ingot',
                D: 'cobblegengalore:block_gen_gold',
                E: 'ae2:quartz_glass',
                F: 'cobblegengalore:block_gen_gold',
                G: 'minecraft:emerald_block',
                H: 'minecraft:emerald_block',
                I: 'minecraft:emerald_block'
            }
    ).id('maixr:block_gen_emerald');
    event.remove({output:'cobblegengalore:block_gen_diamond'});
event.shaped(Item.of('cobblegengalore:block_gen_diamond'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'avaritia:diamond_lattice',
                B: 'avaritia:crystal_matrix_ingot',
                C: 'avaritia:diamond_lattice',
                D: 'cobblegengalore:block_gen_emerald',
                E: 'ae2:quartz_glass',
                F: 'cobblegengalore:block_gen_emerald',
                G: 'minecraft:diamond_block',
                H: 'avaritia:diamond_lattice',
                I: 'minecraft:diamond_block'
            }
    ).id('maixr:block_gen_diamond');
    event.remove({output:'cobblegengalore:block_gen_netherite'});
event.shaped(Item.of('cobblegengalore:block_gen_netherite'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'anvilcraft:ember_metal_block',
                B: 'anvilcraft:deformation_smithing_template',
                C: 'anvilcraft:ember_metal_block',
                D: 'cobblegengalore:block_gen_diamond',
                E: 'ae2:quartz_vibrant_glass',
                F: 'cobblegengalore:block_gen_diamond',
                G: 'createmoremachines:netherite_alloy_sheet',
                H: 'extendedae_plus:basic_core',
                I: 'createmoremachines:netherite_alloy_sheet'
            }
    ).id('maixr:block_gen_netherite');

})