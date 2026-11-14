// ============================================================
//  supreme 控制电路：把 c:circuits/absolute 换成 emextras:absolute_overclocked_control_circuit
// ------------------------------------------------------------
//  实测结论（本地起服务端验证过）：
//   · event.replaceInput(...) 在这版 KubeJS(2101.7.2) 返回 undefined 且【不生效】，
//     所以不能用它。
//   · 改为「删掉原配方 + 原样重建」，只把输入里的 tag 换成 item —— 确定性做法。
//   · 服务端只有 2 条配方产出 supreme_control_circuit（runtime_generated 那些不产出它），
//     emextras:alloying/circuit/supreme 单独重建，共 3 条全部覆盖。
//
//  Rhino 注意：声明全部放顶层、只用 var，不要在循环/回调里写 const/let。
// ============================================================

ServerEvents.recipes(event => {

    var NEW_ITEM = 'emextras:absolute_overclocked_control_circuit'

    // ── 1) mekanism_extras:control_circuit/supreme（7 键工作台配方，key.C 是标签）──
    event.remove({ id: 'mekanism_extras:control_circuit/supreme' })
    event.custom({
        type: 'minecraft:crafting_shaped',
        key: {
            A: { tag: 'mekanism_extras:alloys/thermonuclear' },
            C: { item: NEW_ITEM }
        },
        pattern: ['ACA'],
        result: { id: 'mekanism_extras:supreme_control_circuit' }
    }).id('mekanism_extras:control_circuit/supreme')

    // ── 2) mekanism_extras:control_circuit/infused_supreme（冶金灌注，item_input 是标签）──
    event.remove({ id: 'mekanism_extras:control_circuit/infused_supreme' })
    event.custom({
        type: 'mekanism:metallurgic_infusing',
        chemical_input: { amount: 720, tag: 'mekanism_extras:thermonuclear' },
        item_input: { count: 1, item: NEW_ITEM },
        output: { count: 1, id: 'mekanism_extras:supreme_control_circuit' },
        per_tick_usage: false
    }).id('mekanism_extras:control_circuit/infused_supreme')

    // ── 3) emextras:alloying/circuit/supreme（evolvedmekanism:alloying，extra_input 是标签）──
    event.remove({ id: 'emextras:alloying/circuit/supreme' })
    event.custom({
        type: 'evolvedmekanism:alloying',
        extra_input: { count: 1, item: NEW_ITEM },
        main_input: { count: 2, tag: 'mekanism_extras:alloys/thermonuclear' },
        output: { count: 2, id: 'mekanism_extras:supreme_control_circuit' },
        second_extra_input: { count: 1, item: 'emextras:base_control_circuit' }
    }).id('emextras:alloying/circuit/supreme')

    console.info('[circuit-patch] 已重建 3 条 supreme 配方，输入改为 ' + NEW_ITEM)

    // ── 自证：把 3 条重建后的配方 JSON 打出来（应含 absolute_overclocked，不含 c:circuits/absolute）──
    var checkIds = [
        'mekanism_extras:control_circuit/supreme',
        'mekanism_extras:control_circuit/infused_supreme',
        'emextras:alloying/circuit/supreme'
    ]
    var idx = 0
    for (idx = 0; idx < checkIds.length; idx++) {
        var wantId = checkIds[idx]
        event.forEachRecipe({ id: wantId }, function (r) {
            var raw = '' + r.json
            var okItem = raw.indexOf('absolute_overclocked_control_circuit') >= 0
            var staleTag = raw.indexOf('"c:circuits/absolute"') >= 0
            console.info('[circuit-patch] 校验 ' + wantId + ' → 含新物品=' + okItem + ' 残留旧标签=' + staleTag + '  JSON=' + raw.slice(0, 220))
        })
    }
})
