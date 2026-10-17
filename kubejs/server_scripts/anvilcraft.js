ServerEvents.recipes(event=>{
    event.remove({output:'anvilcraft:geode'});     //jindong
    event.shaped(Item.of('anvilcraft:geode'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'minecraft:amethyst_shard',
                B: 'dreammod:dream_gem',
                C: 'minecraft:amethyst_shard',
                D: 'dreammod:dream_gem',
                E: 'neoecoprototype:simplify_green_crystal_matrix',
                F: 'dreammod:dream_gem',
                G: 'mysticalagriculture:prudentium_ingot',
                H: 'dreammod:dream_gem',
                I: 'mysticalagriculture:prudentium_ingot'
            }
    ).id('maixr:geode');
    event.remove({output:'anvilcraft:anvil_hammer'});  //铁砧锤
event.shaped(Item.of('anvilcraft:anvil_hammer'),
            [
                'ABC',
                'DEF',
                ' H '
            ],
            {
                A: 'minecraft:anvil',
                B: 'anvilcraft:topaz',
                C: 'minecraft:anvil',
                D: 'anvilcraft:sapphire',
                E: 'minecraft:lightning_rod',
                F: 'anvilcraft:ruby',
                H: 'anvilcraft:magnet_block'
            }
    ).id('maixr:anvil_hammer');
    event.remove({output:'anvilcraft:charge_collector'});
event.shaped(Item.of('anvilcraft:charge_collector'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'anvilcraft:induction_light',
                B: 'anvilcraft:induction_light',
                C: 'anvilcraft:induction_light',
                D: 'enderio:conductive_alloy_ingot',
                E: 'anvilcraft:processor',
                F: 'enderio:conductive_alloy_ingot',
                G: 'anvilcraft:magnet_ingot',
                H: 'anvilcraft:magnet_ingot',
                I: 'anvilcraft:magnet_ingot'
            }
    ).id('maixr:charge_collector');
    event.remove({output:'anvilcraft:induction_light'});
event.shaped(Item.of('anvilcraft:induction_light',4),
            [
                ' B ',
                ' E ',
                ' H '
            ],
            {
                B: 'enderio:double_layer_capacitor',
                E: 'anvilcraft:magnetoelectric_core',
                H: 'anvilcraft:circuit_board'
            }
    ).id('maixr:induction_light1');
event.shaped(Item.of('anvilcraft:induction_light',8),
            [
                ' B ',
                ' E ',
                ' H '
            ],
            {
                B: 'enderio_evolution:capacitor_energetic_silver',
                E: 'anvilcraft:magnetoelectric_core',
                H: 'anvilcraft:circuit_board'
            }
    ).id('maixr:induction_light2');

event.shaped(Item.of('anvilcraft:induction_light',16),
            [
                ' B ',
                ' E ',
                ' H '
            ],
            {
                B: 'enderio_evolution:capacitor_crystalline',
                E: 'anvilcraft:magnetoelectric_core',
                H: 'anvilcraft:circuit_board'
            }
    ).id('maixr:induction_light3');

event.shaped(Item.of('avaritia:sculk_crafting_table'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'minecraft:echo_shard',
                B: 'minecraft:enchanted_golden_apple',
                C: 'minecraft:echo_shard',
                D: 'minecraft:echo_shard',
                E: 'avaritia:double_compressed_crafting_table',
                F: 'minecraft:echo_shard',
                G: 'anvilcraft:royal_smithing_table',
                H: 'minecraft:sculk_catalyst',
                I: 'anvilcraft:royal_smithing_table'
            }
    ).id('maixr:sculk_crafting_table');
event.shaped(Item.of('anvilcraft:space_overcompressor'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'ae2:matter_ball',
                B: 'ae2:spatial_anchor',
                C: 'ae2:matter_ball',
                D: 'minecraft:ender_eye',
                E: 'anvilcraft:void_matter_block',
                F: 'minecraft:ender_eye',
                G: 'ae2:matter_ball',
                H: 'betternether:nether_ruby',
                I: 'ae2:matter_ball'
            }
    ).id('maixr:space_overcompressor');

})