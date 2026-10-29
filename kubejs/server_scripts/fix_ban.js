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
event.shaped(Item.of('alexscaves:candy_cane',4),
            [
                'AB ',
                ' E ',
                ' H '
            ],
            {
                A: '#alexscaves:rock_candies',
                B: '#alexscaves:rock_candies',
                E: 'alexscaves:peppermint_powder',
                H: '#alexscaves:rock_candies'
            }
    ).id('maixr:candy_cane');
event.smelting('alexscaves:caramel','alexscaves:peppermint_powder').id('maixr:caremel')
event.remove({output:'alexscaves:sweet_tooth'});
event.shaped(Item.of('alexscaves:sweet_tooth'),
            [
                ' B ',
                'DEF',
                ' H '
            ],
            {
                B: 'minecraft:bone',
                D: 'alexscaves:candy_cane',
                E: 'alexscaves:caramel',
                F: 'alexscaves:candy_cane',
                H: 'minecraft:bone'
            }
    ).id('maixr:sweet_tooth');
    event.remove({output:'alexscaves:gumball_pile'});
event.shaped(Item.of('alexscaves:gumball_pile',5),
            [
                'AAA',
                'AEA',
                'GHI'
            ],
            {
                A: '#alexscaves:rock_candy',
                E: 'alexscaves:purple_soda_bottle',
                G: 'minecraft:sugar',
                H: 'minecraft:sugar',
                I: 'minecraft:sugar'
            }
    ).id('maixr:gumball_pile');
    event.remove({output:'alexscaves:gingerbread_crumbs'});
event.shaped(Item.of('alexscaves:gingerbread_crumbs',3),
            [
                '   ',
                ' E ',
                '   '
            ],
            {
                E: 'alexscaves:gingerbread_bricks'
            }
    ).id('maixr:gingerbread_crumbs');
    event.remove({output:'alexscaves:radiant_essence'});
event.shaped(Item.of('alexscaves:radiant_essence'),
            [
                ' B ',
                'DEF',
                'GHI'
            ],
            {
                B: 'alexscaves:sweet_tooth',
                D: 'alexscaves:gumball_pile',
                E: 'dreammod:bottled_dream',
                F: 'alexscaves:gumball_pile',
                G: 'minecraft:honey_bottle',
                H: 'meplacementtool:key_of_spectrum',
                I: 'minecraft:honey_bottle'
            }
    ).id('maixr:radiant_essence');
    event.remove({output:'alexscaves:occult_gem'});
event.shaped(Item.of('alexscaves:occult_gem'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'alexscaves:moth_dust',
                B: 'mysticalagriculture:supremium_gemstone',
                C: 'alexscaves:guano',
                D: 'anvilcraft:ruby',
                E: 'anvilcraft:exp_gem',
                F: 'anvilcraft:ruby',
                G: 'alexscaves:guano',
                H: 'betternether:nether_ruby',
                I: 'alexscaves:moth_dust'
            }
    ).id('maixr:occult_gem');
    event.remove({output:'alexscaves:pure_darkness'});
event.shaped(Item.of('alexscaves:pure_darkness',4),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'anvilcraft:void_matter',
                B: 'anvilcraft:transcendium_ingot',
                C: 'anvilcraft:void_matter',
                D: 'advanced_ae:shattered_singularity',
                E: 'alexscaves:occult_gem',
                F: 'advanced_ae:shattered_singularity',
                G: 'pasterdream:charged_amethyst',
                H: 'pasterdream:charged_amethyst',
                I: 'pasterdream:charged_amethyst'
            }
    ).id('maixr:pure_darkness');
    event.remove({output:'pasterdream:dyedream_crack'});
event.shaped(Item.of('pasterdream:dyedream_crack'),
            [
                'ABC',
                ' E ',
                'GHI'
            ],
            {
                A: 'pasterdream:dyedream_block',
                B: 'alexscaves:radiant_essence',
                C: 'pasterdream:wind_iron_block',
                E: 'entropy_tech:dyedream_yunkuang',
                G: 'alexscaves:volcanic_core',
                H: 'alexscaves:tesla_bulb',
                I: 'alexscaves:pure_darkness'
            }
    ).id('maixr:dyedream_crack');
    event.remove({output:'alexscaves:volcanic_core'});
event.shaped(Item.of('alexscaves:volcanic_core'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'alexscaves:tectonic_shard',
                B: 'alexscaves:tectonic_shard',
                C: 'alexscaves:tectonic_shard',
                D: 'alexscaves:tectonic_shard',
                E: 'create:blaze_burner',
                F: 'alexscaves:tectonic_shard',
                G: 'alexscaves:tectonic_shard',
                H: 'create:blaze_cake',
                I: 'alexscaves:tectonic_shard'
            }
    ).id('maixr:volcanic_core');
    event.remove({output:'pasterdream:wind_iron_ingot'});
event.shaped(Item.of('pasterdream:wind_iron_ingot'),
            [
                ' BC',
                'DEF',
                'G  '
            ],
            {
                B: 'minecraft:iron_ingot',
                C: 'pasterdream:wind_plant_extract',
                D: 'pasterdream:congeal_wind',
                E: 'pasterdream:congeal_wind',
                F: 'pasterdream:pulse_windrunner_crystal',
                G: 'pasterdream:pulse_windrunner_crystal'
            }
    ).id('maixr:wind_iron_ingot');
    event.remove({output:'pasterdream:windrunner_crystal_block'});
event.shapeless(Item.of('pasterdream:windrunner_crystal_block'),
            ['pasterdream:windrunner_crystal',
            'pasterdream:windrunner_crystal',
            'pasterdream:windrunner_crystal',
            'pasterdream:windrunner_crystal',
            'pasterdream:windrunner_crystal',
            'pasterdream:windrunner_crystal',
            'pasterdream:windrunner_crystal',
            'pasterdream:windrunner_crystal',
            'pasterdream:windrunner_crystal']
    ).id('maixr:windrunner_crystal_block');
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
