import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "翻页时钟",
    "en": "Flip Clock",
    "aliases": [
      "翻牌时钟",
      "翻页数字",
      "flip counter"
    ],
    "pattern": "Flip Clock · Split-card 3D Flip",
    "principle": "每位数字由「静态上半 + 静态下半」和「动态翻页叶（上半起、下半落）」组成；换数时叶子的上半从 0° 翻到 -90°（露出新数字上半），下半随后从 90° 翻到 0°（露出新数字下半），rotateX + transform-origin 上下边。"
  },
  "prompts": {
    "short": "做一个翻页时钟：时:分:秒六位数字，每一位换数时上半叶先翻下、下半叶再翻合，3D 翻转带阴影变化。",
    "standard": "用原生 JS + CSS 实现翻页时钟：\n1. 结构：每位 = .digit（relative，上下两半各 overflow hidden 高 50%）内含静态上下半 + 动态叶 .flip-top / .flip-bottom；\n2. 数字渲染：每半用完整数字字符 + 定位裁切（下半 translateY(-100%)），保证翻页时字符对齐；\n3. 翻转序列：换数时——叶子显示旧数，翻页叶上半 rotateX(0→-90deg) 0.14s（origin bottom），结束后其文字换新数；下半叶 rotateX(90→0deg) 0.14s（origin top）露出新数；\n4. 时序：requestAnimationFrame/setTimeout 链严格 0.14s + 0.14s；\n5. 每秒对时一次（Date.now() 差值），翻页只发生在真正变化的位。",
    "refined": "扩展 FlipClock 类：支持倒计时模式（目标时间戳）、天数位（超过 99 显示三位）、卡片质感参数（圆角/分割线/翻页音效钩子）；翻页用 rAF 插值替代 transition 保证连续触发不丢帧。验收：① 连续进位（09→10→11）无残影；② 三位同时翻转性能正常；③ 标签页切回时间准确。"
  },
  "knobs": [
    {
      "name": "翻页时长 flipMs",
      "default": "140ms",
      "range": "100 – 220ms",
      "effect": "半程翻转时间，上下各一次。"
    },
    {
      "name": "卡片圆角 cardRadius",
      "default": "7px",
      "effect": "数字卡质感。"
    },
    {
      "name": "间隔显示 showColon",
      "default": "闪烁",
      "effect": "冒号每秒闪烁或常亮。"
    }
  ],
  "pitfalls": [
    "上下半各自渲染完整数字但没做定位裁切，翻页时字符错位。",
    "连续换数（秒位每秒都翻）没等上一轮完成，动画叠加残影。",
    "transform-origin 没按上下半分开设置，翻页方向错乱。",
    "翻页用 CSS transition 但快速触发时 transitionend 不回来。",
    "对时用 setInterval 累加秒数，长时间运行漂移。"
  ],
  "effectTags": [
    "翻页",
    "时钟",
    "3D"
  ]
};
