import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "粒子丝线流场",
    "en": "Particle Flow Field",
    "aliases": [
      "流场粒子",
      "向量场丝线",
      "Perlin Flow"
    ],
    "pattern": "Canvas · Flow Field",
    "principle": "每个粒子按 sin/cos 叠加的角度场取方向，速度做 0.91 摩擦衰减后画 px→x 短线段；画布不清屏而是盖一层 5.5%–8.2% 半透明底色，让轨迹拖出丝线残影。"
  },
  "prompts": {
    "short": "用 Canvas 做粒子流场：粒子沿连续角度场运动留下丝线轨迹，鼠标附近产生涡旋搅动，原生 JS。",
    "standard": "用原生 Canvas 2D 实现粒子流场：\n1. 粒子 132 个（充能态 210），按画布面积缩放预算（378×236 为基准）；\n2. 角度场 fieldAngle = sin(x*0.012 + t*0.00028)*1.28 + cos(y*0.015 - t*0.00023)*1.04 + sin((x+y)*0.006)*0.58；\n3. 每帧 vx = vx*0.91 + cos(angle)*0.36（充能 0.54），画 moveTo(px,py)→lineTo(x,y) 的 hsla 短线；\n4. 不清屏：每帧盖 rgba(248,251,250,0.082) 半透明矩形形成拖尾，每 620 帧全清一次防积色；\n5. 指针 140px 内施加切向涡旋力；\n6. DPR 上限 1.5，life 150–240 帧后重生。",
    "refined": "实现可配置的粒子流场：\n- 粒子数：默认 calm 132 / charged 210（按面积 0.7–1.15 缩放）；\n- 摩擦系数：默认 0.91（0.85 黏滞 – 0.96 顺滑）；\n- 驱动力：默认 0.36 / 充能 0.54；\n- 拖尾透明度：默认 0.082（充能 0.055）；\n- 指针涡旋半径：默认 140px。\n实现约束：不清屏靠半透明覆盖出拖尾，须定期全清防色彩饱和；DPR ≤ 1.5；visibilitychange 暂停 rAF；prefers-reduced-motion 下用 46 步预积分画一张静态丝线图，不启动 rAF。\n验收标准：① 丝线拖尾连贯无断裂；② 长时间运行画布不发灰不积色；③ 后台标签页零 CPU 占用。"
  },
  "knobs": [
    {
      "name": "粒子数量 budget",
      "default": "132（calm）/ 210（charged）",
      "range": "60 – 300",
      "effect": "丝线密度与计算量，按画布面积自动缩放 0.7–1.15 倍。"
    },
    {
      "name": "摩擦系数 friction",
      "default": "0.91",
      "range": "0.85 – 0.96",
      "effect": "速度衰减快慢，越低轨迹越卷曲黏滞。"
    },
    {
      "name": "场驱动力 force",
      "default": "0.36（calm）/ 0.54（charged）",
      "range": "0.2 – 0.8",
      "effect": "粒子沿场方向推进的力度，决定流速。"
    },
    {
      "name": "拖尾透明度 fade alpha",
      "default": "0.082（calm）/ 0.055（charged）",
      "range": "0.03 – 0.2",
      "effect": "每帧半透明覆盖的浓度，越小残影越长。"
    },
    {
      "name": "涡旋半径 pointer radius",
      "default": "140px",
      "range": "80 – 240 (px)",
      "effect": "指针切向力的作用范围，强度随距离线性衰减。"
    }
  ],
  "pitfalls": [
    "每帧 fillRect 全清画布，丝线轨迹荡然无存——必须用低透明度覆盖保留残影。",
    "只加力不做速度衰减（漏掉 ×0.91），粒子越跑越快直接飞出画面。",
    "粒子出界或寿命耗尽后不重置位置，粒子公司逐渐流失、画面越来越空。",
    "半透明覆盖长期累积导致画布底色发灰，需要每 620 帧做一次全清。",
    "DPR 直接取 devicePixelRatio（3x 屏），粒子数没变但绘制面积翻九倍，明显掉帧。",
    "rAF 不监听 visibilitychange，切后台标签页仍在跑流场模拟空耗电。"
  ],
  "effectTags": [
    "粒子",
    "流场",
    "生成艺术",
    "Canvas"
  ]
};
