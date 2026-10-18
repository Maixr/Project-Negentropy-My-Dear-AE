// ============================================================
//  兜底修复 / 禁用清单
//  最后加载: 优先级最高，可覆盖前面所有脚本
// ------------------------------------------------------------
//  本包曾移除的模组 (其遗留配方需屏蔽):
//    dimensionalripper / frame-generation(dlssmc)
//    expandedae / embeddium / cabletiers
//    sodiumoptionsapi / bbe / InfiniteCapacityCell
//    AE2ExtraChannelModes / aef / FTBQuestsOptimizer(保留)
// ============================================================

console.info('[PAL] 加载 fix_ban.js (兜底)')

// ------------------------------------------------------------
//  1. 屏蔽「已移除模组」遗留的配方
//     取消注释并填入实际 ID 即可
// ------------------------------------------------------------
ServerEvents.recipes(event => {
  const bannedRecipeIds = [
    'createmoremachines:netherite_alloy',
    'minecraft:netherite_ingot',
    'neoecoprototype:simplify_green_crystal_matrix',
    'ae2:network/crafting/patterns_blank',
    'alloyed:mixing/steel_ingot'
  ]
  bannedRecipeIds.forEach(id => event.remove({ id: id }));


  event.shaped(Item.of('minecraft:netherite_ingot'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'ae2cs:purified_nether_quartz_crystal',
                B: 'minecraft:gold_ingot',
                C: 'ae2cs:purified_nether_quartz_crystal',
                D: 'minecraft:netherite_scrap',
                E: 'minecraft:netherite_scrap',
                F: 'minecraft:netherite_scrap',
                G: 'minecraft:gold_ingot',
                H: 'ae2cs:purified_nether_quartz_crystal',
                I: 'minecraft:gold_ingot'
            }
    ).id('maixr:netherite_ingot');
  event.remove({output:'mysticalagriculture:prosperity_seed_base'});
  event.shaped(Item.of('mysticalagriculture:prosperity_seed_base'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'extendedae:entro_seed',
                B: 'mysticalagriculture:imperium_gemstone',
                C: 'ae2cs:data_crystal_seed',
                D: 'mysticalagriculture:imperium_gemstone',
                E: 'minecraft:ghast_tear',
                F: 'mysticalagriculture:imperium_gemstone',
                G: 'ae2cs:resonating_seed',
                H: 'mysticalagriculture:imperium_gemstone',
                I: 'ae2cs:quantum_crystal_seed'
            }
    ).id('maixr:prosperity_seed_base');
  event.shaped(Item.of('dreammod:bottled_dream'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'pasterdream:dyedream_dust_piece',
                B: 'dreammod:dream_gem',
                C: 'pasterdream:dyedream_dust_piece',
                D: 'dreammod:dream_gem',
                E: 'minecraft:glass_bottle',
                F: 'dreammod:dream_gem',
                G: 'pasterdream:dyedream_fruit',
                H: 'pasterdream:dyedream_fruit',
                I: 'pasterdream:dyedream_fruit'
            }
    ).id('maixr:bottled_dream');
event.shaped(Item.of('dreammod:bottled_dream'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'pasterdream:dyedream_dust_piece',
                B: 'dreammod:dream_gem',
                C: 'pasterdream:dyedream_dust_piece',
                D: 'dreammod:dream_gem',
                E: 'minecraft:glass_bottle',
                F: 'dreammod:dream_gem',
                G: 'ae2lt:pigmee_fumo',
                H: 'ae2lt:pigmee_fumo',
                I: 'ae2lt:pigmee_fumo'
            }
    ).id('maixr:bottled_dream_2');
event.shapeless(Item.of('minecraft:paper',3),
            ['minecraft:book',
            'minecraft:flint']
    ).id('maixr:paper');
})

// ------------------------------------------------------------
//  2. 禁用特定物品的右键使用
// ------------------------------------------------------------
// ItemEvents.rightClicked(event => {
//   const bannedItems = ["some:broken_item"]
//   if (bannedItems.includes(event.item.id)) {
//     event.player.tell("§c该物品已被整合包禁用。")
//     event.cancel()
//   }
// })

// ------------------------------------------------------------
//  3. 阻止玩家把禁用物品带在身上
// ------------------------------------------------------------
// PlayerEvents.inventoryChanged(event => {
//   const p = event.player
//   const banned = ["some:broken_item"]
//   p.inventory.allItems.forEach(item => {
//     if (banned.includes(item.id)) {
//       item.count = 0
//       p.tell("§c检测到禁用物品，已移除: " + item.id)
//     }
//   })
// })

// ------------------------------------------------------------
//  4. 服务端加载完毕确认
// ------------------------------------------------------------
ServerEvents.loaded(event => {
  console.info("[PAL] 服务端资源已全部加载完毕")
})

// ------------------------------------------------------------
//  5. 兜底: 数据库/标签自检 (可选)
// ------------------------------------------------------------
// ServerEvents.tags("item", event => {
//   event.add("pal:banned", "some:broken_item")
// })

// TODO: 在此写你的兜底规则
