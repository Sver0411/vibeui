import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "纸屑庆祝",
    "en": "Confetti Burst",
    "aliases": [
      "彩带喷射",
      "庆祝纸屑",
      "撒花"
    ],
    "pattern": "Canvas · Particle Celebration",
    "principle": "点击点一次性生成 110 片粒子，随机角度速度（4–11）向上抛出，每帧加重力 0.16 与 0.992 空气阻力，rotate 自转 + scale(1, 0.55+0.45·sin(wobble)) 压扁摆动模拟纸片翻面飘落，出界后过滤回收、粒子清空即停 rAF。"
  },
  "prompts": {
    "short": "点击按钮时从按钮位置喷射一蓬彩色纸屑：带重力下落、翻面飘动，落出屏幕自动清理，原生 Canvas。",
    "standard": "用原生 Canvas 2D 实现纸屑庆祝：\n1. 每次点击生成 110 片：随机角度全向、速度 4 + random×7，vy 额外 -6 整体上抛；\n2. 每帧：vy += 0.16（重力），vx/vy ×= 0.992（空气阻力），x/y 累加，rot += vr(±0.15) 自转；\n3. 纸片感：ctx.scale(1, 0.55 + 0.45 × sin(wobble)) 让纸片绕轴翻面，wobble 每帧 +0.12；\n4. 形状 70% 矩形（size 5–11，高 ×0.7）+ 30% 圆形，7 色随机；\n5. y 超出画布底 40px 即从数组过滤移除；粒子耗尽 cancel 逻辑停 rAF 并清屏；\n6. 画布按 devicePixelRatio 缩放、pointer-events: none 覆盖全舞台。",
    "refined": "实现可配置的纸屑喷射：\n- 数量：默认 110 片（60 轻量 – 200 隆重）；\n- 重力：默认 0.16（0.1 飘逸 – 0.3 急坠）；\n- 阻力：默认 0.992；初速：4–11；\n- 翻面幅度：默认 scale Y 0.55±0.45、wobble 步进 0.12。\n实现约束：粒子用数组 filter 回收而非 splice 遍历；全部结束时置空 rafId 防重复循环；resize 时重设 canvas 尺寸乘 DPR；prefers-reduced-motion 下不喷射、改为文字/toast 庆祝。\n验收标准：① 连续快速点击多次喷射不叠加卡顿；② 纸屑有翻面飘落感而非刚体直坠；③ 全部落完后画布清空、CPU 归零。"
  },
  "knobs": [
    {
      "name": "喷射数量 count",
      "default": "110",
      "range": "60 – 200",
      "effect": "一次庆祝的纸屑片数，直接影响视觉隆重程度与开销。"
    },
    {
      "name": "重力 GRAVITY",
      "default": "0.16",
      "range": "0.08 – 0.3",
      "effect": "每帧竖直加速度，越大坠落越急、庆祝越短促。"
    },
    {
      "name": "空气阻力 DRAG",
      "default": "0.992",
      "range": "0.98 – 0.998",
      "effect": "速度衰减率，越接近 1 纸屑飞得越远越飘。"
    },
    {
      "name": "初速范围 speed",
      "default": "4 + random × 7，vy 额外 -6",
      "range": "3 – 15",
      "effect": "喷射爆发力，向上偏置让纸屑先抛后落。"
    },
    {
      "name": "翻面摆动 wobble",
      "default": "步进 0.12，scale Y = 0.55 + 0.45·sin",
      "range": "步进 0.06 – 0.2",
      "effect": "纸片绕水平轴翻面的频率，产生飘落质感。"
    }
  ],
  "pitfalls": [
    "只有重力没有空气阻力，纸屑像石子直坠到底，完全没有飘落感。",
    "忘了给 vy 初始向上偏置，纸屑从点击点向四周塌落而不是向上喷发。",
    "粒子出界后不从数组移除，数组无限增长，多点几次 celebrations 明显掉帧。",
    "canvas 尺寸不乘 devicePixelRatio，高分屏上纸屑边缘糊成马赛克。",
    "rAF 在粒子清空后没停（或置空 rafId 判断缺失），空画布仍在每帧 clearRect 空转。",
    "prefers-reduced-motion 下仍喷射，庆祝动效恰恰是最该降级的场景。"
  ],
  "effectTags": [
    "纸屑",
    "庆祝",
    "粒子",
    "Canvas"
  ]
};
