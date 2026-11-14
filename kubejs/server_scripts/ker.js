ServerEvents.recipes(event =>{
    event.remove({output:'kenergyengineering:redstone_storer'});
    event.shaped(Item.of('kenergyengineering:redstone_storer'),
            [
                ' B ',
                'DEF',
                ' H '
            ],
            {
                B: 'minecraft:gold_ingot',
                D: 'kenergyengineering:redstone_gear',
                E: 'ae2:sky_dust',
                F: 'kenergyengineering:lapis_gear',
                H: 'minecraft:gold_ingot'
            }
    ).id('maixr:redstone_storer');
    event.remove({output:'kenergyengineering:redstone_converter'});
    event.shaped(Item.of('kenergyengineering:redstone_converter'),
            [
                ' B ',
                'DEF',
                ' H '
            ],
            {
                B: 'mekanism:ingot_tin',
                D: 'create:andesite_alloy',
                E: 'kenergyengineering:redstone_gear',
                F: 'create:andesite_alloy',
                H: 'mekanism:ingot_tin'
            }
    ).id('maixr:redstone_converter');
    event.remove({output:'kenergyengineering:redstone_conductor'});
    event.shaped(Item.of('kenergyengineering:redstone_conductor'),
            [
                ' B ',
                'DEF',
                ' H '
            ],
            {
                B: 'minecraft:copper_ingot',
                D: 'kenergyengineering:amethyst_gear',
                E: 'kenergyengineering:redstone_gear',
                F: 'kenergyengineering:amethyst_gear',
                H: 'minecraft:copper_ingot'
            }
    ).id('maixr:redstone_conductor');
})