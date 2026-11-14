// ============================================================
//  Create 序列装配：产物成功率统一 100%
// ------------------------------------------------------------
//  原理：Create 的 sequenced_assembly 用 results[] 做**加权随机抽一个**，
//        所以"废料"和"主产物"互斥 —— 抽到废料就没主产物（= 失败）。
//
//  本脚本把每个产物池裁成**只剩权重最高的那一项**，并去掉它的 chance 字段：
//        池里只有 1 项 → 必然抽中它 → 成功率 100%，且不再掉废料。
//
//  影响范围（实测本整合包只有这 7 条有概率池，其余 38 条本来就是单产物）：
//    create:precision_mechanism                    80.0% → 100%
//    createpackage:advanced_package_distributor    80.0% → 100%
//    create_connected:control_chip                80.0% → 100%
//    laowu:cat_component                          80.0% → 100%
//    create_sa:heat_engine                        90.9% → 100%
//    create_sa:hydraulic_engine                   90.9% → 100%
//    create_sa:steam_engine                       90.9% → 100%
//
//  已核对：所有被删掉的"废料"物品都有 3 个以上其它来源，不会绝版。
//  只改 results，loops / sequence / transitional_item 全部不动。
// ============================================================

ServerEvents.recipes(event => {

    let changed = 0

    event.forEachRecipe({ type: 'create:sequenced_assembly' }, recipe => {
        const json = recipe.json
        const pool = json.getAsJsonArray('results')
        if (!pool || pool.size() <= 1) return      // 单产物 = 已经 100%

        // 找权重最高的一项（Create 里 chance 是权重，不是百分比）
        let bestIndex = 0, bestWeight = -1
        for (let i = 0; i < pool.size(); i++) {
            const entry = pool.get(i)
            const w = entry.has('chance') ? entry.get('chance').getAsDouble() : 1.0
            if (w > bestWeight) { bestWeight = w; bestIndex = i }
        }

        // 从后往前删掉其余项
        for (let i = pool.size() - 1; i >= 0; i--) {
            if (i !== bestIndex) pool.remove(i)
        }

        // 去掉主产物自己的 chance（池里只剩它，权重已无意义；去掉更不容易被误读）
        const main = pool.get(0)
        if (main.has('chance')) main.remove('chance')

        changed++
    })

    if (changed > 0) {
        console.info(`[assemble100] 已把 ${changed} 条序列装配配方的产物池裁成唯一产物（成功率 100%）`)
    }

})
