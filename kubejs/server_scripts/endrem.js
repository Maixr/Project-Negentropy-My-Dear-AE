// ============================================================
//  End Remastered（末地：创世）—— 切断指定之眼的获取途径
// ------------------------------------------------------------
//  宝箱 / 生物掉落：
//      不走 KubeJS，走模组自带的每只眼睛配置
//      config/EndRemastered-NeoForge/Eyes/<eye>.json
//      把 loot_to_inject_id 改成 "minecraft:empty"、loot_tables_id 改成 []
//      （evil_eye 本来就是这样，所以它没有获取途径）
//
//  合成：这里把 endrem 自己的配方【全部】删掉（按 mod 过滤），
//        补救配方在 endeys.js 里（id 是 maixr:endrem/*，不受影响）。
// ============================================================

ServerEvents.recipes(event => {

    // ⚠ 删【全部】endrem 自己的配方（按 mod 过滤，不是按产出扫）。
    //   绝不要用 event.remove({ output: 'endrem:xxx_eye' })：
    //   那样会把 endeys.js 里新加的补救配方一起删掉 —— 那些配方的 id 是
    //   maixr:endrem/*，命名空间不同，所以 { mod: 'endrem' } 碰不到它们。
    event.remove({ mod: 'endrem' })

    // 顺带清掉「之眼」相关素材的配方（巫瞳 / 亡灵之魂 原本只用于合成被删的那两只）
    // —— 如果你想让它们还能做，注释掉两行即可
    // event.remove({ output: 'endrem:witch_pupil' })
    // event.remove({ output: 'endrem:undead_soul' })

})

console.log('[PAL] endrem 之眼获取途径已切断（合成部分）')