// 由分析脚本生成 —— 让客户端也知道 more_formula 的配方等级
//
// 背景：more_formula 的等级存在 Config 的 static Map 里（Source.SERVER），
//       它只由 KubeJS 服务端脚本在**服务端 JVM** 里填充，从不通过网络同步。
//       所以玩家连服务器时，客户端 Config 是空的 → JEI 把每条配方都显示成 0 级。
//
// 修法：在客户端脚本里把同样的等级再登记一遍，填满客户端自己的 Config。

const TIERS = {
    "maixr:fix_flawed_drive": 1,
    "maixr:netherite_alloy": 1,
    "maixr:flawed_ctrl": 2,
    "maixr:lvjin": 2,
    "maixr:glowstone_dust_from_mixing": 2,
    "maixr:echosharp_1": 2,
    "maixr:echosharp_2": 2,
    "maixr:metter_ball": 2,
    "maixr:yunkuang_zazhi_crushing_t1": 1,
    "maixr:yunkuang_zazhi_crushing_t2": 2,
    "maixr:dyedream_t2": 2,
    "maixr:dyedream_t3": 3,
    "createmoremachines:pressing/netherite_sheet": 1,
}

Object.entries(TIERS).forEach(([id, tier]) => {
    try {
        MoreFormula.setTier(id, tier)
    } catch (e) {
        console.warn("[more_formula] 客户端登记等级失败: " + id + " -> " + tier + " : " + e)
    }
})
console.info("[more_formula] 客户端已登记 " + Object.keys(TIERS).length + " 条配方等级")
