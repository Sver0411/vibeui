import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "职位卡",
    "en": "Job Card",
    "aliases": [
      "招聘卡片",
      "职位列表项",
      "job listing card"
    ],
    "pattern": "Job Card · Listing Item",
    "principle": "左徽标右内容的两栏网格；薪资用强调色加粗形成视觉锚点；悬停抬升由 translateY(-2px) + 阴影加深完成；收藏按钮切换填充态并同步 aria-pressed。"
  },
  "prompts": {
    "short": "做一张招聘职位卡：公司徽标、职位名、薪资高亮、地点经验标签、技能标签组、急聘角标、收藏按钮可切换。",
    "standard": "用原生 HTML/CSS/JS 实现职位卡：\n1. 布局：grid 两栏——48px 徽标列 + 内容列；职位名 15px 加粗，公司名 13px 灰色；\n2. 薪资「15-25K·14薪」用强调色（如 #c2410c）700 字重，放在职位名右侧或独立行；\n3. 元信息行（城市/经验/学历）用 · 分隔的 12px 灰字；技能标签 2×3 以内，11px 圆角灰底；\n4. 急聘角标：absolute 右上角 10px 圆角红底白字；卡片 relative + overflow hidden；\n5. 交互：悬停 translateY(-2px) + 阴影加深 transition 0.2s；收藏星形按钮点击填充切换 aria-pressed；\n6. 徽标：无图时用公司名首字 + 品牌色底。",
    "refined": "实现可复用的职位卡渲染函数 renderJobCard(job)，字段：logo/字标、company、title、salary、tags[]、skills[]、urgent、postedAt；\n- 长技能列表截断 +N，title 溢出一行省略；\n- 卡片整体可点击进详情，收藏按钮 stopPropagation；\n- 键盘：卡片 tabindex=0，Enter 等价点击；\n验收：① 极端长文本不破版；② 收藏状态读屏可感知；③ 悬停动效不引起 reflow。"
  },
  "knobs": [
    {
      "name": "徽标尺寸 logoSize",
      "default": "48px",
      "range": "40px – 56px",
      "effect": "公司徽标视觉权重。"
    },
    {
      "name": "悬停抬升 lift",
      "default": "2px",
      "range": "0 – 4px",
      "effect": "悬停位移量，配合阴影才有浮起感。"
    },
    {
      "name": "薪资色 salaryColor",
      "default": "#c2410c",
      "effect": "薪资高亮色，建议与主色区分。"
    }
  ],
  "pitfalls": [
    "薪资不高亮是职位卡最大的信息层级错误——它是用户第一扫视线。",
    "卡片可点但收藏按钮没 stopPropagation，点收藏直接跳详情。",
    "徽标图片挂了没有首字兜底，布局瞬间塌陷。",
    "急聘角标挤占标题行导致换行错位——用 absolute 脱离文档流。",
    "悬停只变阴影不位移，浮起感很弱。"
  ],
  "effectTags": [
    "职位卡",
    "列表",
    "悬停"
  ]
};
