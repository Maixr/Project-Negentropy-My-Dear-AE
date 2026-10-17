// ===========================================================================
//  Re-Avaritia（无尽贪婪：重生）阶梯工作台 —— KubeJS 配方写法示例
//  文件里的示例全部注释掉了，**照抄取消注释**即可；不取消注释不产生任何配方。
//  改完在游戏里 `/reload`（KubeJS 服务端脚本支持热重载）或重启；报错看 logs/kubejs/server.txt
// ---------------------------------------------------------------------------
//  事实（1.21.1 / Re-Avaritia 1.4.2 反编译确认，不是猜的）：
//
//   1) 配方**不绑定具体工作台**，绑定的是 `tier`：
//        tier 1 = avaritia:sculk_crafting_table   幽匿工作台   3x3
//        tier 2 = avaritia:nether_crafting_table  炼狱工作台   5x5
//        tier 3 = avaritia:end_crafting_table     终末工作台   7x7
//        tier 4 = avaritia:extreme_crafting_table 终焉工作台   9x9
//      （模组自带的 54 条 avaritia:shaped_table 配方，tier1 全是 ≤3x3、tier2 ≤5x5、
//        tier3 = 7x7、tier4 = 9x9，照这个就能对上。）
//
//   2) `tier` 的判定是**精确相等**而不是「大于等于」
//      （ShapedTableCraftingRecipe#matches：tier != 0 && tier != input.tier() -> false）：
//        写了 tier: N  -> 只能在那一个档位的工作台里合成
//        不写 tier     -> 0，任何工作台都能合成，只受图案能不能放下限制
//
//   3) 图案每一行要按该档位格子宽度补空格（3/5/7/9 个字符一行），
//      和模组自带 json 的写法一致（例如 endest_pearl.json 就是 9 字符 x 9 行）。
//
//   4) 模组自带 KubeJS 插件（AvaritiaKubeJSPlugin），所以可以直接用 schema 写法，
//      构造顺序就是 tier -> result -> pattern -> key [-> compatible]：
//
//        event.recipes.avaritia.shaped_table(tier, result, pattern, key, compatible?)
//        event.recipes.avaritia.shapeless_table(ingredients, result, tier)
//      （这两个顺序是从 schema 的 constructor 里读出来的，不是猜的：
//        Shaped  = (TIER, RESULT, PATTERN, KEY[, COMPATIBLE])
//        Shapeless = (INGREDIENTS, RESULT, TIER)）
//
//      compatible 是第 5 个可选参数（模组自带配方都没用到，一般不用管）。
//      不想用 schema / 想省事，也可以 event.custom({...}) 直接写 json（见文末）。
// ===========================================================================

ServerEvents.recipes(event => {

  // -------------------------------------------------------------------------
  // tier 1 —— 幽匿工作台（3x3）
  // -------------------------------------------------------------------------
  // event.recipes.avaritia.shaped_table(
  //   1,
  //   'minecraft:diamond',
  //   [
  //     'AAA',
  //     'ABA',
  //     'AAA'
  //   ],
  //   {
  //     A: 'minecraft:stone',
  //     B: 'minecraft:coal'
  //   }
  // ).id('kubejs:sculk_demo')

  // -------------------------------------------------------------------------
  // tier 2 —— 炼狱工作台（5x5）
  // -------------------------------------------------------------------------
  // event.recipes.avaritia.shaped_table(
  //   2,
  //   '2x minecraft:netherite_ingot',
  //   [
  //     '  A  ',
  //     ' ABA ',
  //     'ABABA',
  //     ' ABA ',
  //     '  A  '
  //   ],
  //   {
  //     A: 'avaritia:blaze_cube',
  //     B: 'minecraft:nether_star'
  //   }
  // )

  // -------------------------------------------------------------------------
  // tier 3 —— 终末工作台（7x7）
  // -------------------------------------------------------------------------
  // event.recipes.avaritia.shaped_table(
  //   3,
  //   'avaritia:crystal_matrix_ingot',
  //   [
  //     '   A   ',
  //     '  AAA  ',
  //     ' AABAA ',
  //     'AABCBAA',
  //     ' AABAA ',
  //     '  AAA  ',
  //     '   A   '
  //   ],
  //   {
  //     A: 'avaritia:diamond_lattice',
  //     B: 'avaritia:crystal_matrix',
  //     C: 'avaritia:neutron_ingot'
  //   }
  // )

  // -------------------------------------------------------------------------
  // tier 4 —— 终焉工作台（9x9）
  // -------------------------------------------------------------------------
  // event.recipes.avaritia.shaped_table(
  //   4,
  //   'avaritia:infinity_ingot',
  //   [
  //     '    A    ',
  //     '   AAA   ',
  //     '  AABAA  ',
  //     ' AABCBAA ',
  //     'AABCDCBAA',
  //     ' AABCBAA ',
  //     '  AABAA  ',
  //     '   AAA   ',
  //     '    A    '
  //   ],
  //   {
  //     A: 'avaritia:crystal_matrix_ingot',
  //     B: 'avaritia:neutron_ingot',
  //     C: 'avaritia:infinity_catalyst'
  //   }
  // )

  // -------------------------------------------------------------------------
  // 不写 tier：任何档位的工作台都能合成（只要图案放得下）
  // schema 的第一个参数就是 tier，所以这种情况用 event.custom 最省事：
  // -------------------------------------------------------------------------
  // event.custom({
  //   type: 'avaritia:shaped_table',
  //   key: {
  //     A: { item: 'minecraft:stone' },
  //     B: { item: 'minecraft:diamond' }
  //   },
  //   pattern: ['AAA', 'ABA', 'AAA'],
  //   result: { id: 'minecraft:diamond_block', count: 1 }
  //   // 不写 tier = 0
  // }).id('kubejs:any_tier_demo')

  // -------------------------------------------------------------------------
  // 无序配方：event.recipes.avaritia.shapeless_table(ingredients, result, tier)
  // -------------------------------------------------------------------------
  // event.recipes.avaritia.shapeless_table(
  //   ['minecraft:iron_ingot', 'minecraft:iron_ingot', 'avaritia:blaze_cube'],
  //   '4x minecraft:gold_ingot',
  //   2
  // )

  // -------------------------------------------------------------------------
  // 删除 / 改掉模组自带的阶梯配方
  // -------------------------------------------------------------------------
  // 按输出删：
  // event.remove({ type: 'avaritia:shaped_table', output: 'avaritia:endest_pearl' })
  // 按 id 删：
  // event.remove({ id: 'avaritia:endest_pearl' })
  // 只删某个档位的：
  // event.remove({ type: 'avaritia:shaped_table', mod: 'avaritia' })

  // -------------------------------------------------------------------------
  // 附：终焉**锻造台** avaritia:extreme_smithing_table 不是工作台，是锻造模板配方
  //    event.recipes.avaritia.extreme_smithing(result, template, base, addition)
  //    （schema constructor 顺序就是 RESULT -> TEMPLATE -> BASE -> ADDITION）
  // -------------------------------------------------------------------------
})
