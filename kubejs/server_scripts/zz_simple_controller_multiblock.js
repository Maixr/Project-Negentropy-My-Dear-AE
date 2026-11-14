// ============================================================
//  simple_controller 多方块转换配方
// ------------------------------------------------------------
//  类型：anvilcraft:multiblock_conversion（方块→方块，无物品产物）
//  输入结构：saves/新的世界/generated/minecraft/structures/simple_controller_1.nbt
//    3×3×3，8 种方块（下为 y 层 / z 行 / x 列）
//      y=0: 010 / 111 / 010
//      y=1: 262 / 676 / 262
//      y=2: 343 / 454 / 343
//      0=黑曜石 1=下界合金外壳 2=石英振动玻璃 3=诅咒金块
//      4=充能赛特斯石英块 5=余烬金属块 6=四核合成加速器 7=有瑕控制器
//  输出图案：内侧 2×2×2 共 8 格变成 entropy_tech:simple_controller，其余 19 格变空气
//
//  触发方式（反编译 anvilcraft 1.6.0 实测）：
//    ① 结构正上方铺一层 3×3 的 #c:player_workstations/crafting_tables
//       （推荐 anvilcraft:transparent_crafting_table）—— 转换配方的中心必须是工作台，
//        不是 multiblock 配方要的空间过压机
//    ② 让巨砧 Giant Anvil 落在这一层上
//    ③ 尺寸范围 3~15，3 合法
//
//  注意：multiblock_conversion 的 getResultItem() 返回 ItemStack.EMPTY，
//        所以 JEI 里不会显示"产物物品"，只能在世界上看到 8 个控制器方块
//        （挖掉即得 8 个物品）。
// ============================================================

ServerEvents.recipes(event => {

    // ── 1. 删除 simple_controller 的其他所有来源 ──
    event.remove({ output: 'entropy_tech:simple_controller' })

    // ── 2. 3×3×3 多方块转换 ──
    event.custom({
        type: 'anvilcraft:multiblock_conversion',

        inputPattern: {
            grid: [
                ['010', '111', '010'],
                ['262', '676', '262'],
                ['343', '454', '343']
            ],
            mapping: {
                '0': { blocks: 'minecraft:obsidian' },
                '1': { blocks: 'createmoremachines:netherite_casing' },
                '2': { blocks: 'ae2:quartz_vibrant_glass' },
                '3': { blocks: 'anvilcraft:cursed_gold_block' },
                '4': { blocks: 'ae2cs:charged_certus_quartz_block' },
                '5': { blocks: 'anvilcraft:ember_metal_block' },
                '6': { blocks: 'bigger_ae2:4_core_crafting_accelerator' },
                '7': { blocks: 'entropy_tech:flawed_controller' }
            }
        },

        outputPattern: {
            grid: [
                ['XXX', 'XXX', 'XXX'],
                ['ZZZ', 'ZZZ', 'ZZZ'],
                ['ZZZ', 'ZZZ', 'ZZZ']
            ],
            mapping: {
                'X': { blocks: 'entropy_tech:simple_controller' },
                'Z': { blocks: 'minecraft:air' }
            }
        }

    }).id('maixr:simple_controller_conversion')


    // ═══════════════════════════════════════════════════════════
    //  maixr_skin_doll 两级转换（同样是 anvilcraft:multiblock_conversion）
    //  触发方式同上：结构正上方铺 3×3 transparent_crafting_table + 巨砧落下
    // ═══════════════════════════════════════════════════════════

    // ── 3. 27 个 maixr_skin_doll → 第一层正中间 1 个 maixr_skin_doll_maga ──
    event.custom({
        type: 'anvilcraft:multiblock_conversion',
        inputPattern: {
            grid: [
                ['AAA', 'AAA', 'AAA'],
                ['AAA', 'AAA', 'AAA'],
                ['AAA', 'AAA', 'AAA']
            ],
            mapping: {
                'A': { blocks: 'maixr:maixr_skin_doll' }
            }
        },
        outputPattern: {
            grid: [
                ['ZZZ', 'ZXZ', 'ZZZ'],
                ['ZZZ', 'ZZZ', 'ZZZ'],
                ['ZZZ', 'ZZZ', 'ZZZ']
            ],
            mapping: {
                'X': { blocks: 'maixr:maixr_skin_doll_maga' },
                'Z': { blocks: 'minecraft:air' }
            }
        }
    }).id('maixr:skin_doll_to_maga')

    // ── 4. 第一层四角 4 个 maixr_skin_doll_maga → 第一层正中间 1 个 maixr_skin_doll_max ──
    //      注意：multiblock 定义必须是完整 3×3×3（DefinitionSerialization 按坐标 min/max 生成 grid，
    //      只写 4 格会缩成 3×3×1，sizeMismatch 直接判不匹配），所以其余 23 格显式要求空气。
    event.custom({
        type: 'anvilcraft:multiblock_conversion',
        inputPattern: {
            grid: [
                ['ARA', 'RRR', 'ARA'],
                ['RRR', 'RRR', 'RRR'],
                ['RRR', 'RRR', 'RRR']
            ],
            mapping: {
                'A': { blocks: 'maixr:maixr_skin_doll_maga' },
                'R': { blocks: 'minecraft:air' }
            }
        },
        outputPattern: {
            grid: [
                ['ZZZ', 'ZXZ', 'ZZZ'],
                ['ZZZ', 'ZZZ', 'ZZZ'],
                ['ZZZ', 'ZZZ', 'ZZZ']
            ],
            mapping: {
                'X': { blocks: 'maixr:maixr_skin_doll_max' },
                'Z': { blocks: 'minecraft:air' }
            }
        }
    }).id('maixr:skin_doll_maga_to_max')
})
