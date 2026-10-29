ServerEvents.recipes(event => {
    // 恢复 Mekanism 原版「基础控制电路」的冶金灌注配方
    // 原配方（Mekanism 自带 data/mekanism/recipe/control_circuit/basic.json）：
    //   type=mekanism:metallurgic_infusing
    //   item_input = 1x #c:ingots/osmium
    //   chemical   = 20 mB #mekanism:redstone
    //   output     = 1x mekanism:basic_control_circuit
    // 先移除同类型的重复条目，避免出现两份
    event.remove({ output: 'mekanism:basic_control_circuit', type: 'mekanism:metallurgic_infusing' })
    event.custom({
        type: 'mekanism:metallurgic_infusing',
        chemical_input: { amount: 20, tag: 'mekanism:redstone' },
        item_input: { count: 1, tag: 'c:ingots/osmium' },
        output: { count: 1, id: 'mekanism:basic_control_circuit' },
        per_tick_usage: false
    }).id('maixr:basic_control_circuit_infusing')
})
