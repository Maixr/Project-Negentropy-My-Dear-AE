// ============================================================================
//  more_formula 完整演示脚本 —— 用于录屏展示
// ============================================================================
//  位置：kubejs/server_scripts/demo_tiers.js
//  /reload 即可生效（0.0.2 已修掉必须大退的 bug）
//
//  本脚本一次性演示：
//    · 六个等级的 pressing（Tier 0 / 1 / 2 / 3 / 4 / -1 创造级）
//    · mixing（带 heated / superheated）
//    · filling（注液）、compacting（压实）、deploying（机械手）、item_application
//    · 三条装配线（黄铜级 / 末影级 / 超越级），每条线共用一个门槛
//
//  ── 录制前请先看这两条 ──────────────────────────────────────────────
//  1) 机器等级顺序：原版 < 黄铜(1) < 下界合金(2) < 末影(3) < 超越(4)
//     创造级(-1) 是特殊档：只有创造机器能做，但它能做任何门槛的配方。
//  2) 一条装配线的所有工序共享同一个门槛，所以三条线分别是三个等级。
// ============================================================================

ServerEvents.recipes(event => {

  // ==========================================================================
  //  一、pressing —— 六个等级各一条（这是本脚本的主演示）
  // ==========================================================================
  //  Tier.ZERO (0)：不设门槛，原版机器就能压 —— 对照组，用来对比效果
  event.recipes.create.pressing('minecraft:stone', 'minecraft:cobblestone')
    .id('demo:pressing_tier0_vanilla')

  //  Tier.BRASS (1) —— 需要黄铜级压机
  event.recipes.create.pressing('minecraft:smooth_stone', 'minecraft:stone')
    .id('demo:pressing_tier1_brass')
    .tier(Tier.BRASS)

  //  Tier.NETHERITE (2) —— 需要下界合金级压机
  event.recipes.create.pressing('minecraft:glass', 'minecraft:sand')
    .id('demo:pressing_tier2_netherite')
    .tier(Tier.NETHERITE)

  //  Tier.END (3) —— 需要末影级压机
  event.recipes.create.pressing('minecraft:glass_pane', 'minecraft:glass')
    .id('demo:pressing_tier3_end')
    .tier(Tier.END)

  //  Tier.BEYOND (4) —— 需要超越级压机
  event.recipes.create.pressing('minecraft:brick', 'minecraft:clay_ball')
    .id('demo:pressing_tier4_beyond')
    .tier(Tier.BEYOND)

  //  Tier.CREATIVE (-1) —— 只有创造级机器能做；超越级也不行
  event.recipes.create.pressing('minecraft:beacon', 'minecraft:nether_star')
    .id('demo:pressing_tierM1_creative')
    .tier(Tier.CREATIVE)

  // ==========================================================================
  //  二、mixing —— 带加热条件（演示 .heated() / .superheated() 与门槛共存）
  // ==========================================================================

  //  黄铜级 + 加热
  event.recipes.create.mixing('minecraft:gold_block', '9x minecraft:gold_ingot')
    .heated()
    .id('demo:mixing_tier1_heated')
    .tier(Tier.BRASS)

  //  末影级 + 加热
  event.recipes.create.mixing('minecraft:diamond_block', '9x minecraft:diamond')
    .heated()
    .id('demo:mixing_tier3_heated')
    .tier(Tier.END)

  //  超越级 + 超级加热
  event.recipes.create.mixing('minecraft:netherite_block', ['9x minecraft:netherite_ingot'])
    .superheated()
    .id('demo:mixing_tier4_superheated')
    .tier(Tier.BEYOND)

  //  创造级 + 加热（展示创造级也能配加热）
  event.recipes.create.mixing('minecraft:enchanted_golden_apple', ['minecraft:golden_apple', 'minecraft:nether_star'])
    .heated()
    .id('demo:mixing_tierM1_creative')
    .tier(Tier.CREATIVE)

  // ==========================================================================
  //  三、filling —— 注液
  // ==========================================================================

  //  下界合金级：水
  event.recipes.create.filling('minecraft:clay', [
    'minecraft:sand', Fluid.of('minecraft:water', 250)
  ])
    .id('demo:filling_tier2_water')
    .tier(Tier.NETHERITE)

  //  超越级：岩浆
  //  输入特意用 gravel 而不是 cobblestone —— 本整合包里已有另一条
  //  cobblestone + 药水 的注液配方，同物品会互相影响，换掉以免演示时串味。
  event.recipes.create.filling('minecraft:obsidian', [
    'minecraft:gravel', Fluid.of('minecraft:lava', 250)
  ])
    .id('demo:filling_tier4_lava')
    .tier(Tier.BEYOND)

  // ==========================================================================
  //  四、compacting —— 压实
  // ==========================================================================
  event.recipes.create.compacting('minecraft:diamond', '9x minecraft:coal')
    .id('demo:compacting_tier3')
    .tier(Tier.END)

  // ==========================================================================
  //  五、deploying —— 机械手（带 keepHeldItem）
  // ==========================================================================
  event.recipes.create.deploying('minecraft:emerald_block', [
    'minecraft:emerald', 'minecraft:quartz'
  ])
    .keepHeldItem()
    .id('demo:deploying_tier2')
    .tier(Tier.NETHERITE)

  // ==========================================================================
  //  六、item_application —— 机械手往方块上贴物品
  // ==========================================================================
  event.recipes.create.item_application('minecraft:diamond_block', [
    'minecraft:stone', 'minecraft:diamond'
  ])
    .id('demo:item_application_tier4')
    .tier(Tier.BEYOND)

  // ==========================================================================
  //  七、三条装配线（每条线一个等级，整条线共用）
  // ==========================================================================
  const T = 'more_formula:incomplete_test_package'

  //  ── 线 1：黄铜级 · 单工序（辊压）──
  //  需要：黄铜压机
  event.recipes.create.sequenced_assembly(
    'minecraft:iron_block',
    'minecraft:redstone',
    [
      event.recipes.create.pressing(T, T)
    ]
  )
    .transitionalItem(T)
    .loops(1)
    .id('demo:assembly_tier1_brass')
    .tier(Tier.BRASS)

  //  ── 线 2：末影级 · 双工序（辊压 → 注液）──
  //  需要：末影压机 + 末影喷口
  event.recipes.create.sequenced_assembly(
    'minecraft:gold_block',
    'create:zinc_ingot',
    [
      event.recipes.create.pressing(T, T),
      event.recipes.create.filling(T, [T, Fluid.of('minecraft:water', 250)])
    ]
  )
    .transitionalItem(T)
    .loops(1)
    .id('demo:assembly_tier3_end')
    .tier(Tier.END)

  //  ── 线 3：超越级 · 三工序（辊压 → 注液 → 机械手）──
  //  需要：超越压机 + 超越喷口 + 超越部署器（三种机器都要超越级）
  event.recipes.create.sequenced_assembly(
    'minecraft:netherite_block',
    'minecraft:amethyst_shard',
    [
      event.recipes.create.pressing(T, T),
      event.recipes.create.filling(T, [T, Fluid.of('minecraft:lava', 250)]),
      event.recipes.create.deploying(T, [T, 'create:cogwheel'])
    ]
  )
    .transitionalItem(T)
    .loops(1)
    .id('demo:assembly_tier4_beyond')
    .tier(Tier.BEYOND)

  // ==========================================================================
  //  八、自检输出 —— 录屏时可以切到日志窗口展示门槛确实写进去了
  //  日志位置：logs/kubejs/server.log
  // ==========================================================================
  ;[
    'demo:pressing_tier0_vanilla',
    'demo:pressing_tier1_brass',
    'demo:pressing_tier2_netherite',
    'demo:pressing_tier3_end',
    'demo:pressing_tier4_beyond',
    'demo:pressing_tierM1_creative',
    'demo:mixing_tier1_heated',
    'demo:filling_tier2_water',
    'demo:assembly_tier1_brass',
    'demo:assembly_tier3_end',
    'demo:assembly_tier4_beyond'
  ].forEach(id => {
    console.info('[demo] ' + id + '  →  门槛 ' + MoreFormula.getTier(id))
  })
  console.info('[demo] 本包已用到的等级 = ' + MoreFormula.getKnownTiers())

})
