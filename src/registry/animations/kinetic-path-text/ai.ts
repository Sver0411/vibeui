import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "动力路径文字",
    "en": "Kinetic Path Text",
    "aliases": [
      "路径文字",
      "SVG 文字流",
      "Text on Path"
    ],
    "pattern": "SVG · Kinetic Typography",
    "principle": "三条 SVG path 每帧重算 d 属性实时弯曲，textPath 的 startOffset 按 velocity（0.42 基速 + 指针横向动量）推进并在 -420/-40 区间回绕实现无限循环，三层以 factors 1/-0.74/0.88 差速反向。"
  },
  "prompts": {
    "short": "做 SVG 路径文字动画：多行文字沿弯曲路径循环流动，鼠标横扫改变速度与方向，路径跟随鼠标上下弯曲，原生 JS。",
    "standard": "用原生 JavaScript + SVG 实现动力路径文字：\n1. 三条 path 基线 y=68/128/190，d 属性用三次贝塞尔 M-90 y C70 y∓38-…, 260 y±44+…, 510 y∓12-… 每帧重算实现弯曲；\n2. 文字用 <textPath startOffset>，每帧 offset -= velocity × factor（三层 1/-0.74/0.88），offset 在 -420~-40 间回绕（±340）实现无缝循环；\n3. 速度模型：velocity += (direction*0.42 + impulse - velocity) × 0.085 阻尼逼近；指针 pointermove 按横向位移/时间差算动量 impulse（clamp ±2.2），每帧衰减 ×0.9；\n4. 弯曲量 bend 用 0.075 系数缓动跟随鼠标纵向位置；\n5. 速度表 scaleX 按 |velocity|/2.7 映射。\n不引入动画库。",
    "refined": "实现可配置的路径文字流：\n- 基础速度：默认 0.42 px/帧（0.2 缓 – 0.8 急）；\n- 动量衰减：默认 impulse ×0.9/帧、速度插值 0.085；\n- 差速系数：默认 1 / -0.74 / 0.88（中层反向制造交织）；\n- 弯曲跟随：默认 bend ×0.075 缓动。\n实现约束：textPath 回绕区间宽度（340）必须大于文本渲染长度，否则接缝跳字；pointerleave 后 bend/impulse 归零自然回落；prefers-reduced-motion 下停 rAF、保留三条静态完整文字。\n验收标准：① 循环接缝无跳字；② 快速甩动鼠标速度不失控（clamp 生效）；③ 指针离场后数秒内平滑回到基础速度。"
  },
  "knobs": [
    {
      "name": "基础速度 velocity",
      "default": "0.42",
      "range": "0.2 – 0.8 (px/帧)",
      "effect": "无交互时文字流动的恒定速度。"
    },
    {
      "name": "动量衰减 impulse decay",
      "default": "0.9",
      "range": "0.8 – 0.95",
      "effect": "鼠标甩动后额外速度的自然回落快慢。"
    },
    {
      "name": "差速系数 factors",
      "default": "1 / -0.74 / 0.88",
      "range": "-1.5 – 1.5",
      "effect": "三层的速度倍率与方向，负值反向流动形成交织。"
    },
    {
      "name": "弯曲跟随 bend ease",
      "default": "0.075",
      "range": "0.03 – 0.2",
      "effect": "路径弯向鼠标纵位置的黏滞程度。"
    },
    {
      "name": "回绕区间 wrap range",
      "default": "-420 → -40（跨度 340）",
      "range": "跨度 200 – 600 (px)",
      "effect": "startOffset 循环区间，必须覆盖文本长度才能无缝。"
    }
  ],
  "pitfalls": [
    "textPath 回绕跨度小于文本渲染长度，接缝处文字突然消失/闪现，必须实测文本宽度。",
    "每帧重写 path 的 d 属性却没做差速，三条线同步弯曲像一块板——各层弯曲量要乘不同系数。",
    "指针动量不 clamp 也不衰减，一次猛甩后文字永久高速飞转停不下来。",
    "startOffset 用百分比字符串拼接再 parseFloat，性能差且难做回绕数学，应直接用 px 数值。",
    "prefers-reduced-motion 下直接隐藏 SVG，丢掉可读信息——应静止展示完整文字。",
    "rAF 不处理 visibilitychange，切后台后 SVG 属性仍在每帧重算。"
  ],
  "effectTags": [
    "SVG",
    "路径文字",
    "惯性",
    "动态排版"
  ]
};
