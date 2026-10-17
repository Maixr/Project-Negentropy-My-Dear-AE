# 为什么加这个标签（Visual Workbench 把锻造台劫持成了工作台）

## 症状

右键 AnvilCraft（铁砧工艺）的**皇家锻造台**，打开的是 3×3 的**工作台**界面；方块名字还是「皇家锻造台」，
鼠标悬停还能看到 mod 名变成了 `Visual Workbench` —— 看着非常诡异。

## 原因（字节码证据）

1. `net.minecraft.world.level.block.SmithingTableBlock extends CraftingTableBlock`（原版就是这样）。
   AnvilCraft 的 `RoyalSmithingTableBlock`（还有余烬 / 霜冻 / 超凡锻造台）都是 `SmithingTableBlock` 的子类。
2. Visual Workbench 的方块判定谓词（`fuzs.visualworkbench.VisualWorkbench#lambda$static$0`）是：

   ```java
   block instanceof CraftingTableBlock && !(block instanceof CraftingTableWithInventoryBlock)
   ```

   也就是**凡属工作台家族**（含锻造台、制箭台）的方块，一律在注册阶段被它换成自己的
   `CraftingTableWithInventoryBlock`。
3. `CraftingTableWithInventoryBlock#useWithoutItem` 打开的是
   `VisualCraftingMenu extends CraftingMenu` —— 于是界面变成了工作台。
4. 名字之所以没变，是因为 `CraftingTableWithInventoryBlock#getDescriptionId()` 会**委托回被包裹的原方块**。
5. 排除名单就是本文件所在的标签 `visualworkbench:unaltered_workbenches`
   （mod 自带默认值：`minecraft:smithing_table`、`minecraft:fletching_table`，以及可选的 `furniture:*`）。
   原版锻造台 / 制箭台靠它躲过一劫，**模组加的工作台家族方块必须自己加进来**。

## 修法

`kubejs/data/visualworkbench/tags/block/unaltered_workbenches.json`（本目录）里列出不想被改造的方块。
标签按 id 合并（没写 `replace: true`），所以是**追加**到 mod 自带名单上，不影响原版条目。

等价写法（KubeJS 脚本，二选一即可）：

```js
// kubejs/server_scripts/visualworkbench_tag.js
ServerEvents.tags('block', event => {
  event.add('visualworkbench:unaltered_workbenches', [
    'anvilcraft:royal_smithing_table',
    'anvilcraft:ember_smithing_table',
    'anvilcraft:frost_smithing_table',
    'anvilcraft:transcendence_smithing_table'
  ])
})
```

## 生效方式

重启客户端即可（标签在数据包加载时读取）。已经放在世界里的锻造台不用挖掉重放；
要回滚就删掉本目录的 json。

## 顺带一提（同类方块，未处理）

`CraftingTableBlock` 的子类在本包里还有：

| 方块 | 类 | 说明 |
|---|---|---|
| EnderIO 涂装工作台 | `PaintedCraftingTableBlock extends CraftingTableBlock` | 也是工作台，被改造后是「物品留在格子里」，属于 Visual Workbench 的本意；但会失去 EnderIO 的涂装界面，如果在意就一并加进标签 |
| BCLib 系工作台 | `org.betterx.bclib.blocks.BaseCraftingTableBlock extends CraftingTableBlock` | 同上 |

无关的（父类不是 CraftingTableBlock，没被劫持）：AE2 `CellWorkbenchBlock`、ae2lt `OverloadDeviceWorkbenchBlock`、
`pattern_parcel` 的 `ParcelWorkbenchBlock`、Re-Avaritia 的 `ExtremeSmithingTableBlock`、
AnvilCraft 的 `TransparentCraftingTableBlock`。
