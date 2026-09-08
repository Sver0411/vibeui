import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "树形选择器",
    "en": "Tree Select",
    "aliases": [
      "层级勾选树",
      "级联复选树",
      "Checkbox Tree"
    ],
    "pattern": "Tree Select · Cascading Checkbox",
    "principle": "用 :scope > .tr-children 限定直接子列表确定父子链：勾选向下同步所有后代 checkbox，子级变化后向上逐级重算父级的 checked / indeterminate 三态。"
  },
  "prompts": {
    "short": "做一个树形选择器：勾选父级联动所有子级，子级部分选中时父级显示半选态，节点可展开收起并统计已选数。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现层级勾选树：\n1. 嵌套 ul/li 渲染父子结构，叶子节点右侧带数量徽标，子列表缩进并画 1px 参考线；\n2. checkbox change 后：向下把所有后代 checkbox 同步且清掉 indeterminate，向上 while 循环逐级重算祖先（全选=checked、部分=indeterminate）；\n3. 展开收起按钮切换子列表 hidden，并同步 aria-expanded 与 aria-label；\n4. 底部汇总行只统计 .is-leaf 叶子的勾选数。不要引入任何库。",
    "refined": "可配置树形选择器：子级缩进 padding-left 22px、参考线 1px #e4e4e7、复选框 16px、主题色 accent-color #0f766e、展开箭头旋转 0.2s cubic-bezier(0.22,1,0.36,1)、行 hover 背景 #f4f4f5。验收：① 勾选父级所有后代同步选中；② 部分勾选时父级呈 indeterminate 半选；③ 收起再展开状态不丢；④ 汇总行数字始终等于叶子勾选数。"
  },
  "knobs": [
    {
      "name": "子级缩进",
      "default": "22px",
      "range": "16 – 36px",
      "effect": "决定层级深度观感与参考线位置。"
    },
    {
      "name": "复选框尺寸",
      "default": "16px",
      "range": "14 – 20px",
      "effect": "点击热区与视觉重量。"
    },
    {
      "name": "主题色 accent-color",
      "default": "#0f766e",
      "range": "任意色值",
      "effect": "复选框与汇总数字的强调色。"
    },
    {
      "name": "展开箭头过渡",
      "default": "0.2s cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "0.1 – 0.3s",
      "effect": "箭头旋转 90° 的顺滑程度。"
    },
    {
      "name": "行内边距",
      "default": "7px 8px",
      "range": "5 – 10px",
      "effect": "行高与整树密度。"
    }
  ],
  "pitfalls": [
    "父级只用 checked 判断而漏掉 indeterminate，部分选中时父级显示成全选或全不选。",
    "向上重算只处理一层父级，多级树中祖父级状态丢失——必须 while 循环逐级向上。",
    "收集后代时用 closest(.tr-node) 后直接 querySelectorAll，把兄弟子树也选进来；要用 :scope > .tr-children 限定直接子列表。",
    "展开/收起只切 hidden 不同步 aria-expanded 与 aria-label，读屏用户感知不到节点状态。",
    "向下同步时忘了 child.indeterminate = false，子级残留的半选态导致重算错误。",
    "汇总行把父级 checkbox 也计入统计，应只统计 .is-leaf 下的叶子。"
  ],
  "effectTags": [
    "树形",
    "级联选择",
    "半选",
    "表单",
    "勾选"
  ]
};
