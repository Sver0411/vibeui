import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "树形菜单",
    "en": "Tree Menu",
    "aliases": [
      "树导航",
      "多级菜单",
      "tree view"
    ],
    "pattern": "Tree · Disclosure Navigation",
    "principle": "每一级是嵌套的 details 式结构：分组按钮 aria-expanded 控制子列表 grid-rows 0fr→1fr 展开收起；当前叶子项用 aria-current 高亮；缩进层级线用 padding + ::before 竖线。"
  },
  "prompts": {
    "short": "做一个树形菜单：多级分组可展开收起（箭头旋转 + 高度过渡），叶子项可选中高亮，子级有缩进层级线。",
    "standard": "用原生 JS 实现树形菜单：\n1. 结构：ul[role=tree] 嵌套 ul[role=group]；分组是 button[aria-expanded] + 子 ul，叶子是可点项；\n2. 展开/收起：子列表外包 grid 容器，grid-template-rows 0fr↔1fr 过渡 0.25s（免 JS 量高），箭头 rotate(90deg)；\n3. 选中：点叶子项把 aria-current=\"true\" 移到自身，清除兄弟高亮；\n4. 层级线：子 ul 相对缩进 18px/级，左侧 ::before 画 1px 竖线；\n5. 键盘：分组支持 Enter/Space 切换；叶子 Tab 可达，:focus-visible 描边；\n6. 默认展开第一级、当前项所在路径。",
    "refined": "实现 renderTree(nodes, currentId) 递归渲染 + TreeMenu 控制器：支持单实例多分组互斥（手风琴模式可选）；expandAll/collapseAll/expandTo(id) 三个 API；当前项自动滚动到可视区；localStorage 记忆展开状态。验收：① 三层嵌套动画流畅；② 键盘走完整树；③ 刷新后展开状态保持。"
  },
  "knobs": [
    {
      "name": "层级缩进 indent",
      "default": "18px",
      "range": "12px – 24px",
      "effect": "每级缩进量，配合竖线表达层级。"
    },
    {
      "name": "展开时长 expandMs",
      "default": "250ms",
      "range": "150ms – 400ms",
      "effect": "0fr→1fr 过渡时长。"
    },
    {
      "name": "手风琴模式 accordion",
      "default": "关闭",
      "effect": "同一级同时只展开一个分组。"
    }
  ],
  "pitfalls": [
    "用 max-height 过渡展开，值写死导致长列表被裁切——0fr→1fr 免量高。",
    "缩进只靠空格字符，读屏与视觉都乱，用 padding + 竖线。",
    "忘记 aria-expanded / aria-current，树结构对读屏完全不可见。",
    "点击分组文字和箭头行为不一致，应整行可点。",
    "刷新后全部收起，丢失用户浏览位置。"
  ],
  "effectTags": [
    "树形菜单",
    "折叠",
    "导航"
  ]
};
