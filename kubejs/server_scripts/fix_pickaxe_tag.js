// 强制确保常用方块在 mineable/pickaxe 标签里
// 目的：如果某个模组/数据包在运行时把标签搞坏了，这里重新加回去
ServerEvents.tags('block', event => {
    event.add('minecraft:mineable/pickaxe', [
        'minecraft:stone',
        'minecraft:cobblestone',
        'minecraft:deepslate',
        'minecraft:cobbled_deepslate',
        'minecraft:granite',
        'minecraft:diorite',
        'minecraft:andesite',
        'minecraft:tuff',
        'minecraft:calcite',
        'minecraft:dripstone_block',
        'minecraft:coal_ore',
        'minecraft:iron_ore',
        'minecraft:copper_ore',
        'minecraft:gold_ore',
        'minecraft:redstone_ore',
        'minecraft:lapis_ore',
        'minecraft:diamond_ore',
        'minecraft:emerald_ore',
        'minecraft:deepslate_coal_ore',
        'minecraft:deepslate_iron_ore',
        'minecraft:deepslate_copper_ore',
        'minecraft:deepslate_gold_ore',
        'minecraft:deepslate_redstone_ore',
        'minecraft:deepslate_lapis_ore',
        'minecraft:deepslate_diamond_ore',
        'minecraft:deepslate_emerald_ore',
        'minecraft:netherrack',
        'minecraft:basalt',
        'minecraft:blackstone',
        'minecraft:obsidian',
        'minecraft:crying_obsidian',
    ])
    console.log('[PAL] 已强制补齐 mineable/pickaxe 标签')
})
