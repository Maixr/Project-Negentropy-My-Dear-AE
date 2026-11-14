// ============================================================
//  avaritia:extreme_crafting_table 配方：
//    把 minecraft:reinforced_deepslate（强化深板岩）全部换成 ae2lt:overloaded_controller
// ------------------------------------------------------------
//  原配方类型 avaritia:shaped_table，共 11 个键(a~k)，其中 i = reinforced_deepslate，
//  在 7x7 pattern 里出现 4 次（第 3、4 行的第 3、5 格）。
//  改法：删掉原配方 + 原样重建，只替换 key.i。tier=3 / energy 等其余字段保持不变。
//  输入上限：shaped_table 是 7x7 pattern，没有"输入条目数"限制，只换物品不增删条目。
// ============================================================

ServerEvents.recipes(event => {

    event.remove({ id: 'avaritia:extreme_crafting_table' })

    event.custom({
            "type": "avaritia:shaped_table",
            "key": {
                "a": {
                    "item": "avaritia:double_compressed_crafting_table"
                },
                "b": {
                    "item": "minecraft:lodestone"
                },
                "c": {
                    "item": "avaritia:diamond_lattice"
                },
                "d": {
                    "item": "avaritia:crystal_matrix_ingot"
                },
                "e": {
                    "item": "avaritia:crystal_matrix"
                },
                "f": {
                    "item": "minecraft:recovery_compass"
                },
                "g": {
                    "item": "minecraft:dragon_egg"
                },
                "h": {
                    "item": "minecraft:beacon"
                },
                "i": {
                    "item": "ae2lt:overloaded_controller"
                },
                "j": {
                    "item": "minecraft:netherite_block"
                },
                "k": {
                    "item": "minecraft:heart_of_the_sea"
                }
            },
            "pattern": [
                "bccfccb",
                "cddgddc",
                "cdihidc",
                "cdiaidc",
                "cdjkjdc",
                "cdddddc",
                "beeeeeb"
            ],
            "result": {
                "count": 1,
                "id": "avaritia:extreme_crafting_table"
            },
            "tier": 3
        })
        .id('avaritia:extreme_crafting_table')

    console.info('[avaritia-ece] extreme_crafting_table: key.i 已由 reinforced_deepslate 换成 ae2lt:overloaded_controller')

})
