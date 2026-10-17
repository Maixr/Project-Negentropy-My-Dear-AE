// ============================================================
//  隐藏配方：配方仍然可用，只是不在 JEI / EMI / REI 里显示
// ------------------------------------------------------------
//  ⚠ 必须放在 client_scripts —— RecipeViewerEvents 是客户端事件
//     （字节码实证：KubeJSJEIPlugin 用 ScriptType.CLIENT 注册）
//
//  用的是 KubeJS 2101 的统一 API：
//     RecipeViewerEvents.removeRecipes(event => event.remove('配方ID'))
//  它同时作用于 JEI / EMI / REI，不用分别写。
// ============================================================

RecipeViewerEvents.removeRecipes(event => {

    // ── 陨矿杂质 → 物质球（水晶聚合器）──
    //    配方 ID 在 server_scripts/ae2.js 里用 .id('maixr:ae2cs/matter_bell_1') 定义
    //    删掉这一行就恢复显示
    event.remove('maixr:ae2cs/matter_bell_1')

    // ── 要藏更多就继续加，可以一行一个，也可以传数组 ──
    // event.remove('maixr:ae2cs/matter_bell_2')
    // event.remove(['maixr:ae2cs/a', 'maixr:ae2cs/b'])

})
