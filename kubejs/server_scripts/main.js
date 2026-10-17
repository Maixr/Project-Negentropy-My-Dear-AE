// ============================================================
//  Project Arc Light  -  Server Scripts 入口
//  KubeJS 2101.7.2 / NeoForge 1.21.1
// ------------------------------------------------------------
//  加载顺序：
//    1. main.js      总入口，定义全局工具（必须最先）
//    2. mek.js       通用机械
//    3. ae2.js       应用能源2
//    4. enderIO.js   末影接口
//    5. create.js    机械动力
//    6. maixr.js     本包自研内容
//    7. fix_ban.js   兜底修复（最后加载，优先级最高）
// ------------------------------------------------------------
//  铁律：
//    - 一切 ID 必须带 namespace，如 mekanism:enrichment_chamber
//    - 事件注册是幂等的，/reload 会整体重跑所有脚本
//    - 一个脚本报错不影响其他脚本，但会在日志里打印
// ============================================================

console.info('[PAL] 正在加载 Server Scripts ...')




//以上是ai搭的环境
//第一章有关的配方：
ServerEvents.recipes(event => {
event.shaped(Item.of('ae2lt:pigmee_core'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'minecraft:porkchop',
                B: 'minecraft:iron_trapdoor',
                C: 'minecraft:porkchop',
                D: 'minecraft:string',
                E: 'minecraft:book',
                F: 'minecraft:string',
                G: 'minecraft:porkchop',
                H: 'minecraft:iron_trapdoor',
                I: 'minecraft:porkchop'
            }
    ).id('maixr:pigmee_core');
event.shaped(Item.of('entropy_tech:rough_controller'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'minecraft:gold_ingot',
                B: 'entropy_tech:primitive_controller',
                C: 'minecraft:gold_ingot',
                D: 'ae2lt:pigmee_synthesis_station',
                E: 'entropy_tech:primitive_controller',
                F: 'ae2lt:pigmee_synthesis_station',
                G: 'minecraft:gold_ingot',
                H: 'ae2:certus_quartz_crystal',
                I: 'minecraft:gold_ingot'
            }
    ).id('maixr:rough_controller');
})
