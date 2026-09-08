import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "作品集主页",
    "en": "Portfolio Home Page",
    "aliases": [
      "个人主页",
      "设计师主页",
      "个人站"
    ],
    "pattern": "Portfolio · 编辑排版 + 作品网格",
    "principle": "单列编辑式排版：超大 clamp 姓名标题压住首屏，作品网格用 auto-fit 布局，四个项目视觉全部由 CSS 渐变 + 单个 <i> 元素（进度条/瓶身/圆环/线条）抽象绘制，零图片；页脚大号邮箱链接收尾。"
  },
  "prompts": {
    "short": "做一个设计师作品集主页：超大姓名标题、四格 CSS 渐变作品网格（无图片）、简介段落、底部大号邮箱链接。原生 HTML/CSS，尽量不用 JS。",
    "standard": "用原生 HTML/CSS 实现单文件作品集主页：\n1. 内容约束在 max-width 880px：顶栏 logo+锚点导航、hero 区 clamp 大标题+职业行+简介、作品网格、About、页脚；\n2. 作品视觉 aspect-ratio 4/3 + 圆角 16px，内部只用一个 <i> 元素配合渐变/描边画出抽象图形，aria-hidden；\n3. 作品卡 hover 上浮 5px 加大阴影，过渡用 cubic-bezier(0.22, 1, 0.36, 1)；\n4. 页脚邮箱链接字号 clamp(22px, 4vw, 32px)，下边框 2px 主题色。",
    "refined": "实现作品集主页：姓名 clamp(48px, 10vw, 96px)、letter-spacing -0.045em、行高 0.98；网格 minmax(240px, 1fr) 间距 16px；hover 位移 -5px、阴影 0 20px 40px；主题色 #0f766e。验收标准：① 四个项目视觉互不相同且无任何图片请求；② 标题在 320px 宽与超宽屏都不破行不失控；③ 锚点导航点击不产生跳转报错（占位链接需 return false 或 href 处理）。"
  },
  "knobs": [
    {
      "name": "姓名标题字号",
      "default": "clamp(48px, 10vw, 96px)，字距 -0.045em",
      "range": "40 – 140px",
      "effect": "首屏的编辑排版冲击力。"
    },
    {
      "name": "作品网格",
      "default": "repeat(auto-fit, minmax(240px, 1fr))，间距 16px",
      "range": "minmax 200 – 320px",
      "effect": "作品卡的换列时机与行密度。"
    },
    {
      "name": "作品视觉比例",
      "default": "aspect-ratio: 4/3，圆角 16px",
      "range": "1/1 – 16/9",
      "effect": "卡片图区的构图与整页节奏。"
    },
    {
      "name": "hover 动效",
      "default": "translateY(-5px) + 阴影，cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
      "range": "位移 3 – 10px",
      "effect": "作品卡悬停的轻盈感。"
    },
    {
      "name": "主题色",
      "default": "#0f766e",
      "range": "任意品牌色",
      "effect": "职业行文字、邮箱下划线的点缀色。"
    }
  ],
  "pitfalls": [
    "大标题只用 vw 不夹 clamp，超宽屏字号失控、320px 屏换行破碎。",
    "作品视觉没写 aspect-ratio，渐变背景高度塌陷成 0。",
    "占位锚点 href=\"#\" 不处理，点击后 URL 挂 # 且滚动位置跳动；应 return false 或补真实锚点。",
    "渐变视觉里的 <i> 装饰忘加 aria-hidden，读屏输出无意义内容。",
    "hover 用默认 ease 又长又软，编辑风页面建议短促 cubic-bezier(0.22, 1, 0.36, 1)，且要留 reduced-motion 兜底。"
  ],
  "effectTags": [
    "作品集",
    "编辑排版",
    "超大标题",
    "CSS 抽象图形",
    "零图片"
  ]
};
