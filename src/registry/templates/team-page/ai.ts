import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "团队介绍页",
    "en": "Team Page",
    "aliases": [
      "关于我们",
      "成员列表",
      "about us",
      "team grid"
    ],
    "pattern": "About · Team Roster",
    "principle": "首屏使命宣言 + 4 项统计数字；成员网格按职能筛选（全部/工程/设计/运营），卡片 = 渐变头像占位 + 姓名 + 职位 + 社交图标；底部招聘横幅引导投递。"
  },
  "prompts": {
    "short": "做一个团队介绍页：使命宣言、统计数字带（4 项）、成员卡片网格（按职能筛选）与招聘横幅。",
    "standard": "用原生 JS 实现团队页：\n1. Hero：大标题「我们相信小团队改变世界」+ 一段使命文案；\n2. 统计带：成立年份 / 团队规模 / 服务客户 / 远程城市 四项，滚动进入视口时数字滚动动画；\n3. 筛选条：全部 · 工程 · 设计 · 运营 胶囊按钮，点击过滤卡片（display + 淡入动画）；\n4. 成员卡：48px 渐变圆头像（姓名首字）+ 姓名 + 职位 + 3 个社交小图标（hover 变主题色）；\n5. 招聘横幅：浅紫底 + 「加入我们」按钮；\n6. 筛选空状态显示占位文案。",
    "refined": "增强：成员数据由 JSON 数组驱动（姓名/职能/头像色/链接）；筛选支持键盘方向键与 aria-pressed；卡片 hover 头像轻微放大；统计数字用 IntersectionObserver + requestAnimationFrame 计数；提供深色主题变量适配。验收：① 数据增删不改布局；② 筛选切换有 200ms 过渡不跳动；③ 读屏可感知当前筛选状态。"
  },
  "knobs": [
    {
      "name": "每行列数 cols",
      "default": "4",
      "range": "2 – 5",
      "effect": "成员网格密度。"
    },
    {
      "name": "头像样式 avatar",
      "default": "首字渐变",
      "range": "首字 / 占位图",
      "effect": "头像占位方式。"
    },
    {
      "name": "计数动画 countUp",
      "default": "开启",
      "effect": "统计数字滚动进视口触发。"
    }
  ],
  "pitfalls": [
    "头像用外链图片，脱机预览裂图——用首字渐变占位。",
    "筛选后高度突变闪烁——用统一 grid 行高过渡。",
    "成员名字太长换行把卡片撑高低不一。",
    "社交图标没有 aria-label，读屏读不出是什么链接。",
    "统计数字动画在离屏就触发，用户看不到。"
  ],
  "effectTags": [
    "团队页",
    "筛选",
    "计数动画"
  ]
};
