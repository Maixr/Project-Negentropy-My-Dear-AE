ServerEvents.recipes(event=>{
    event.remove({output:'jdte:greenhouse'});
    event.shaped(Item.of('jdte:greenhouse'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'justdirethings:eclipsealloy_ingot',
                B: 'mekmm:ultimate_planting_factory',
                C: 'justdirethings:eclipsealloy_ingot',
                D: 'justdirethings:celestigem',
                E: 'jdte:crystal_incubator',
                F: 'justdirethings:celestigem',
                G: 'justdirethings:eclipsealloy_ingot',
                H: 'justdirethings:time_crystal_block',
                I: 'justdirethings:eclipsealloy_ingot'
            }
    ).id('maixr:greenhouse');
    event.remove({output:'jdte:large_greenhouse'});
    event.shaped(Item.of('jdte:large_greenhouse'),
            [
                'ABC',
                'DEF',
                'GHI'
            ],
            {
                A: 'minecraft:tinted_glass',
                B: 'justdirethings:blockswappert2',
                C: 'minecraft:tinted_glass',
                D: 'mekmm:dense_planting_factory',
                E: 'jdte:greenhouse',
                F: 'mekanism_extras:cosmic_planting_factory',
                G: 'justdirethings:time_crystal_block',
                H: 'justdirethings:time_crystal_block',
                I: 'justdirethings:time_crystal_block'
            }
    ).id('maixr:large_greenhouse');
})