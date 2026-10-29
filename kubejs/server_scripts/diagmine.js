ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event
    event.register(Commands.literal('diagmine').executes(ctx => {
        const p = ctx.source.player
        if (!p) return 0
        const hit = p.pick(20, 0, false)
        if (!hit) { p.tell('§c准星没对准方块'); return 0 }
        const pos = hit.blockPos
        const lvl = p.level
        const bs = lvl.getBlockState(pos)
        const item = p.mainHandItem

        p.tell('§6== 方块 ==')
        p.tell('§f ' + bs.block)
        p.tell('§f xyz ' + pos.getX() + ' ' + pos.getY() + ' ' + pos.getZ())
        p.tell('§f 维度 ' + lvl.dimension().location())
        p.tell('§f 硬度 ' + bs.getDestroySpeed(lvl, pos) + ' 需工具 ' + bs.requiresCorrectToolForDrops())
        p.tell('§f mineable/pickaxe ' + bs.is('minecraft:mineable/pickaxe'))
        p.tell('§f needs_stone ' + bs.is('minecraft:needs_stone_tool') + '  needs_iron ' + bs.is('minecraft:needs_iron_tool') + '  needs_diamond ' + bs.is('minecraft:needs_diamond_tool'))

        p.tell('§6== 工具 ==')
        p.tell('§f ' + item.id)
        p.tell('§f isCorrectToolForDrops ' + item.isCorrectToolForDrops(bs))
        p.tell('§f 物品速度 ' + item.getDestroySpeed(bs))

        p.tell('§6== 玩家 ==')
        p.tell('§f 玩家速度 ' + p.getDestroySpeed(bs))
        p.tell('§f onGround ' + p.onGround() + ' 飞行 ' + p.abilities.flying + ' 可飞 ' + p.abilities.mayfly)
        p.tell('§f 创造instabuild ' + p.abilities.instabuild)
        p.tell('§f 水中 ' + p.isInWater() + ' 眼在液体 ' + p.isEyeInFluid())
        p.tell('§f 模式 ' + p.gameMode.name)
        p.tell('§f 疲劳 ' + p.hasEffect('minecraft:mining_fatigue') + ' 急迫 ' + p.hasEffect('minecraft:haste'))
        return 1
    }))
})
