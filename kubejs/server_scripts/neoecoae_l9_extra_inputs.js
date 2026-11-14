// ============================================================
//  neoecoae 三个 L9 系统：各增加「2× crafting_system_l9 + 1× draconicevolution:chaotic_energy_core」
// ------------------------------------------------------------
//  配方类型 neoecoae:integrated_working_station，输入在 inputItems 数组。
//  上限实测：IntegratedWorkingStationRecipe = 9 个输入（大型版 12），原 4 个 + 新 2 个 = 6 ✅
//
//  ⚠ 注意：材料是 ae2lt:lightning_collapse_matrix（AE2 闪电科技的闪电塌缩矩阵），
//    不是 crafting_system_l9 自身 —— 所以不存在自循环。
// ============================================================

ServerEvents.recipes(event => {

    // ── storage_system_l9 ──
    event.remove({ id: 'neoecoae:storage_system_l9' })
    event.custom({
        type: 'neoecoae:integrated_working_station',
        energy: 640000,
        inputItems: [
            { count: 1, item: 'neoecoae:storage_system_l6' },
            { count: 16, item: 'ae2:drive' },
            { count: 64, item: 'neoecoae:energized_superconductive_ingot' },
            { count: 64, item: 'neoecoae:superconducting_processor' },
            { count: 2, item: 'ae2lt:lightning_collapse_matrix' },
            { count: 1, item: 'draconicevolution:chaotic_energy_core' }
        ],
        itemOutput: { count: 1, id: 'neoecoae:storage_system_l9' }
    }).id('neoecoae:storage_system_l9')
    console.info('[neoecoae-l9] storage_system_l9 已加 2x crafting_system_l9 + 1x chaotic_energy_core')

    // ── computation_system_l9 ──
    event.remove({ id: 'neoecoae:computation_system_l9' })
    event.custom({
        type: 'neoecoae:integrated_working_station',
        energy: 640000,
        inputItems: [
            { count: 1, item: 'neoecoae:computation_system_l6' },
            { count: 2, item: 'neoecoae:computation_parallel_core_l9' },
            { count: 64, item: 'neoecoae:energized_superconductive_ingot' },
            { count: 64, item: 'neoecoae:superconducting_processor' },
            { count: 2, item: 'ae2lt:lightning_collapse_matrix' },
            { count: 1, item: 'draconicevolution:chaotic_energy_core' }
        ],
        itemOutput: { count: 1, id: 'neoecoae:computation_system_l9' }
    }).id('neoecoae:computation_system_l9')
    console.info('[neoecoae-l9] computation_system_l9 已加 2x crafting_system_l9 + 1x chaotic_energy_core')

    // ── crafting_system_l9 ──
    event.remove({ id: 'neoecoae:crafting_system_l9' })
    event.custom({
        type: 'neoecoae:integrated_working_station',
        energy: 640000,
        inputItems: [
            { count: 1, item: 'neoecoae:crafting_system_l6' },
            { count: 2, item: 'neoecoae:crafting_parallel_core_l9' },
            { count: 64, item: 'neoecoae:energized_superconductive_ingot' },
            { count: 64, item: 'neoecoae:superconducting_processor' },
            { count: 2, item: 'ae2lt:lightning_collapse_matrix' },
            { count: 1, item: 'draconicevolution:chaotic_energy_core' }
        ],
        itemOutput: { count: 1, id: 'neoecoae:crafting_system_l9' }
    }).id('neoecoae:crafting_system_l9')
    console.info('[neoecoae-l9] crafting_system_l9 已加 2x crafting_system_l9 + 1x chaotic_energy_core')

})
