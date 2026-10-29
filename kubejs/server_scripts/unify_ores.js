// ─────────────────────────────────────────────────────────────
// 矿物辞典统一 —— 由分析脚本自动生成（2026-10-29）
//
// 目标：把 6 种纯矿物的多来源物品统一到一个"权威"物品上
//   silver    → mekmm:ingot_silver
//   lead/tin/uranium → mekanism:ingot_*
//   tungsten/titanium → anvilcraft:*_ingot
//
// 三部分：① 删掉各模组的「原料→自己锭」熔炼，② 重加标签熔炼→权威锭，
//         ③ 其它形态的锭/粒/块/粗矿/粉 用工作台 1:1 转成权威形态
//
// ⚠ 不含 ores 的转换（矿石是世界方块，靠标签熔炼统一就够了）
// ⚠ 跳过 alexscaves 的专属物品
// ─────────────────────────────────────────────────────────────

const CANON = {
    silver:   "mekmm:ingot_silver",
    lead:     "mekanism:ingot_lead",
    tin:      "mekanism:ingot_tin",
    uranium:  "mekanism:ingot_uranium",
    tungsten: "anvilcraft:tungsten_ingot",
    titanium: "anvilcraft:titanium_ingot"
}

// ① 要删除的熔炼/高炉配方
const DELETE_IDS = [
    // silver (20)
    "enderio_evolution:blasting/silver_ingot_from_deepslate_ore",
    "enderio_evolution:blasting/silver_ingot_from_ore",
    "enderio_evolution:blasting/silver_ingot_from_raw",
    "enderio_evolution:smelting/silver_ingot_from_deepslate_ore",
    "enderio_evolution:smelting/silver_ingot_from_ore",
    "enderio_evolution:smelting/silver_ingot_from_raw",
    "mekanismsun:processing/silver/ingot/from_dust_blasting",
    "mekanismsun:processing/silver/ingot/from_dust_smelting",
    "mekanismsun:processing/silver/ingot/from_ore_blasting",
    "mekanismsun:processing/silver/ingot/from_ore_smelting",
    "mekanismsun:processing/silver/ingot/from_raw_blasting",
    "mekanismsun:processing/silver/ingot/from_raw_smelting",
    "mekmm:processing/silver/ingot/from_dust_blasting",
    "mekmm:processing/silver/ingot/from_dust_smelting",
    "mekmm:processing/silver/ingot/from_raw_blasting",
    "mekmm:processing/silver/ingot/from_raw_smelting",
    "anvilcraft:blasting/silver_ingot",
    "anvilcraft:blasting/silver_ingot_from_ore",
    "anvilcraft:smelting/silver_ingot",
    "anvilcraft:smelting/silver_ingot_from_ore",
    // lead (8)
    "mekanism:processing/lead/ingot/from_dust_blasting",
    "mekanism:processing/lead/ingot/from_dust_smelting",
    "mekanism:processing/lead/ingot/from_raw_blasting",
    "mekanism:processing/lead/ingot/from_raw_smelting",
    "anvilcraft:blasting/lead_ingot",
    "anvilcraft:blasting/lead_ingot_from_ore",
    "anvilcraft:smelting/lead_ingot",
    "anvilcraft:smelting/lead_ingot_from_ore",
    // tin (8)
    "mekanism:processing/tin/ingot/from_dust_blasting",
    "mekanism:processing/tin/ingot/from_dust_smelting",
    "mekanism:processing/tin/ingot/from_raw_blasting",
    "mekanism:processing/tin/ingot/from_raw_smelting",
    "anvilcraft:blasting/tin_ingot",
    "anvilcraft:blasting/tin_ingot_from_ore",
    "anvilcraft:smelting/tin_ingot",
    "anvilcraft:smelting/tin_ingot_from_ore",
    // uranium (8)
    "mekanism:processing/uranium/ingot/from_dust_blasting",
    "mekanism:processing/uranium/ingot/from_dust_smelting",
    "mekanism:processing/uranium/ingot/from_raw_blasting",
    "mekanism:processing/uranium/ingot/from_raw_smelting",
    "anvilcraft:blasting/uranium_ingot",
    "anvilcraft:blasting/uranium_ingot_from_ore",
    "anvilcraft:smelting/uranium_ingot",
    "anvilcraft:smelting/uranium_ingot_from_ore",
    // tungsten (8)
    "neoecoae:tungsten_ingot_from_ores_tungsten_blasting",
    "neoecoae:tungsten_ingot_from_ores_tungsten_smelting",
    "neoecoae:tungsten_ingot_from_raw_materials_tungsten_blasting",
    "neoecoae:tungsten_ingot_from_raw_materials_tungsten_smelting",
    "anvilcraft:blasting/tungsten_ingot",
    "anvilcraft:blasting/tungsten_ingot_from_ore",
    "anvilcraft:smelting/tungsten_ingot",
    "anvilcraft:smelting/tungsten_ingot_from_ore",
    // titanium (4)
    "anvilcraft:blasting/titanium_ingot",
    "anvilcraft:blasting/titanium_ingot_from_ore",
    "anvilcraft:smelting/titanium_ingot",
    "anvilcraft:smelting/titanium_ingot_from_ore",
]

// ② 新增的标签熔炼（熔炉 200t / 高炉 100t）
const TAG_SMELT = [
    { tag: "#c:raw_materials/silver", out: "mekmm:ingot_silver", metal: "silver" },
    { tag: "#c:ores/silver", out: "mekmm:ingot_silver", metal: "silver" },
    { tag: "#c:dusts/silver", out: "mekmm:ingot_silver", metal: "silver" },
    { tag: "#c:raw_materials/lead", out: "mekanism:ingot_lead", metal: "lead" },
    { tag: "#c:ores/lead", out: "mekanism:ingot_lead", metal: "lead" },
    { tag: "#c:dusts/lead", out: "mekanism:ingot_lead", metal: "lead" },
    { tag: "#c:raw_materials/tin", out: "mekanism:ingot_tin", metal: "tin" },
    { tag: "#c:ores/tin", out: "mekanism:ingot_tin", metal: "tin" },
    { tag: "#c:dusts/tin", out: "mekanism:ingot_tin", metal: "tin" },
    { tag: "#c:raw_materials/uranium", out: "mekanism:ingot_uranium", metal: "uranium" },
    { tag: "#c:ores/uranium", out: "mekanism:ingot_uranium", metal: "uranium" },
    { tag: "#c:dusts/uranium", out: "mekanism:ingot_uranium", metal: "uranium" },
    { tag: "#c:raw_materials/tungsten", out: "anvilcraft:tungsten_ingot", metal: "tungsten" },
    { tag: "#c:ores/tungsten", out: "anvilcraft:tungsten_ingot", metal: "tungsten" },
    { tag: "#c:raw_materials/titanium", out: "anvilcraft:titanium_ingot", metal: "titanium" },
    { tag: "#c:ores/titanium", out: "anvilcraft:titanium_ingot", metal: "titanium" },
]

// ③ 转换配方：其它形态 → 权威形态
const CONVERT = [
    // silver (12)
    { from: "anvilcraft:silver_ingot", to: "mekmm:ingot_silver" },
    { from: "enderio_evolution:silver_ingot", to: "mekmm:ingot_silver" },
    { from: "mekanismsun:silver_ingot", to: "mekmm:ingot_silver" },
    { from: "anvilcraft:silver_nugget", to: "mekmm:nugget_silver" },
    { from: "enderio_evolution:silver_nugget", to: "mekmm:nugget_silver" },
    { from: "mekanismsun:silver_nugget", to: "mekmm:nugget_silver" },
    { from: "anvilcraft:silver_block", to: "mekmm:block_silver" },
    { from: "enderio_evolution:silver_block", to: "mekmm:block_silver" },
    { from: "anvilcraft:raw_silver", to: "mekmm:raw_silver" },
    { from: "enderio_evolution:raw_silver", to: "mekmm:raw_silver" },
    { from: "mekanismsun:raw_silver", to: "mekmm:raw_silver" },
    { from: "mekanismsun:silver_dust", to: "mekmm:dust_silver" },
    // lead (4)
    { from: "anvilcraft:lead_ingot", to: "mekanism:ingot_lead" },
    { from: "anvilcraft:lead_nugget", to: "mekanism:nugget_lead" },
    { from: "anvilcraft:lead_block", to: "mekanism:block_lead" },
    { from: "anvilcraft:raw_lead", to: "mekanism:raw_lead" },
    // tin (5)
    { from: "anvilcraft:tin_ingot", to: "mekanism:ingot_tin" },
    { from: "anvilcraft:tin_nugget", to: "mekanism:nugget_tin" },
    { from: "anvilcraft:tin_block", to: "mekanism:block_tin" },
    { from: "anvilcraft:raw_tin", to: "mekanism:raw_tin" },
    { from: "enderio:powdered_tin", to: "mekanism:dust_tin" },
    // uranium (4)
    { from: "anvilcraft:uranium_ingot", to: "mekanism:ingot_uranium" },
    { from: "anvilcraft:uranium_nugget", to: "mekanism:nugget_uranium" },
    { from: "anvilcraft:uranium_block", to: "mekanism:block_uranium" },
    { from: "anvilcraft:raw_uranium", to: "mekanism:raw_uranium" },
    // tungsten (3)
    { from: "neoecoae:tungsten_ingot", to: "anvilcraft:tungsten_ingot" },
    { from: "neoecoae:tungsten_block", to: "anvilcraft:tungsten_block" },
    { from: "neoecoae:raw_tungsten_ore", to: "anvilcraft:raw_tungsten" },
    // titanium (4)
    { from: "pasterdream:titanium_ingot", to: "anvilcraft:titanium_ingot" },
    { from: "pasterdream:titanium_nugget", to: "anvilcraft:titanium_nugget" },
    { from: "pasterdream:titanium_block", to: "anvilcraft:titanium_block" },
    { from: "pasterdream:raw_titanium", to: "anvilcraft:raw_titanium" },
]

ServerEvents.recipes(event => {
    // ① 删除旧熔炼，避免同一输入命中多条配方
    DELETE_IDS.forEach(id => event.remove({ id: id }))

    // ② 标签 → 权威锭
    TAG_SMELT.forEach(r => {
        event.smelting(r.out, r.tag).id("maixr:unify/" + r.metal + "_from_" + r.tag.split("/")[1])
        event.blasting(r.out, r.tag).id("maixr:unify/" + r.metal + "_from_" + r.tag.split("/")[1] + "_blast")
    })

    // ③ 形态转换（工作台 1:1）
    CONVERT.forEach((c, i) => {
        const slug = c.from.replace(/[^a-z0-9]+/gi, "_")
        event.shapeless(Item.of(c.to), [c.from]).id("maixr:unify/conv_" + i + "_" + slug)
    })
})
