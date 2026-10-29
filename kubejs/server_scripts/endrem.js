// ============================================================
//  End Remastered（末地：创世）—— 切断指定之眼的获取途径
// ------------------------------------------------------------
//  宝箱 / 生物掉落：
//      不走 KubeJS，走模组自带的每只眼睛配置
//      config/EndRemastered-NeoForge/Eyes/<eye>.json
//      把 loot_to_inject_id 改成 "minecraft:empty"、loot_tables_id 改成 []
//      （evil_eye 本来就是这样，所以它没有获取途径）
//
//  合成：这里删配方
//      endrem 自带 3 个可合成之眼：exotic_eye / undead_eye / witch_eye
//      其余 9 只本来就没配方，多删无害
// ============================================================

ServerEvents.recipes(event => {

    // ⚠ 只按【配方 ID】精确删模组自带的 3 条原始配方。
    //   绝不要用 event.remove({ output: 'endrem:xxx_eye' })：
    //   那样会把 endeys.js 里新加的补救配方一起删掉（文件名 endeys < endrem，
    //   加载顺序在前，所以新配方先加、再被这里按产出扫掉）。
    ;[
        'endrem:exotic_eye',
        'endrem:undead_eye',
        'endrem:witch_eye'
    ].forEach(id => event.remove({ id }))

    // 顺带清掉「之眼」相关素材的配方（巫瞳 / 亡灵之魂 原本只用于合成被删的那两只）
    // —— 如果你想让它们还能做，注释掉两行即可
    // event.remove({ output: 'endrem:witch_pupil' })
    // event.remove({ output: 'endrem:undead_soul' })

})

console.log('[PAL] endrem 之眼获取途径已切断（合成部分）')
