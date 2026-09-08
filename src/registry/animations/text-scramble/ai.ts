import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "乱码解码",
    "en": "Text Scramble / Decode Effect",
    "aliases": [
      "文字乱码",
      "黑客解码",
      "Matrix Decode"
    ],
    "pattern": "Text · Scramble Decode",
    "principle": "setInterval 每 55ms 一 tick，已过 tick 数一半的字符从左往右锁定为真实内容，其余位置每 tick 从 67 字符乱码池随机取字；空格永不替换，保证布局不跳。"
  },
  "prompts": {
    "short": "做一个文字解码效果：标题先显示随机乱码，然后从左到右逐位锁定成真实文字，原生 JS。",
    "standard": "用原生 JavaScript 实现乱码解码：\n1. 乱码池 \"A-Za-z0-9#$%&*+=?\" 共 67 字符；\n2. setInterval 55ms 一 tick：locked = floor(tickCount / 2)，即每 2 tick 多锁定 1 位，产生解码节奏；\n3. 逐字符拼字符串：i < locked 或字符是空格时输出真实字符，否则 randomGlyph()；\n4. locked ≥ 总长时 clearInterval 并写最终文本；\n5. IntersectionObserver threshold 0.5 进入视口触发一次，触发后 unobserve；\n6. 空格必须保持原位，防止布局跳动。",
    "refined": "实现可配置的乱码解码：\n- tick 间隔：默认 55ms（35ms 急速 – 90ms 迟缓）；\n- 锁定速率：默认每 2 tick 1 位（1 = 全速 – 3 = 拖沓）；\n- 乱码池：默认 67 字符含符号，可换成片假名强化黑客感；\n- 触发阈值：默认 0.5。\n实现约束：整个文本一次性重设 textContent（不要逐字符包 span，避免几十个 DOM 节点抖动）；等宽字体或 tabular-nums 减少字符宽度差抖动；prefers-reduced-motion 下直接显示最终文本不动画。\n验收标准：① 解码过程无布局跳动；② 动画结束后 textContent 与目标完全一致；③ 重复进入视口不重播。"
  },
  "knobs": [
    {
      "name": "tick 间隔 interval",
      "default": "55ms",
      "range": "35 – 90 (ms)",
      "effect": "乱码刷新频率，越小闪烁越快越有电流感。"
    },
    {
      "name": "锁定速率 lock rate",
      "default": "每 2 tick 锁 1 位",
      "range": "1 – 4 (tick/位)",
      "effect": "解码推进速度，越大解得越慢、悬念越长。"
    },
    {
      "name": "乱码池 glyph set",
      "default": "A-Za-z0-9#$%&*+=?（67 字符）",
      "range": "任意字符集",
      "effect": "乱码的视觉风格，用片假名或韩文可强化科幻感。"
    },
    {
      "name": "触发阈值 threshold",
      "default": "0.5",
      "range": "0 – 1",
      "effect": "元素露出多少才触发解码，太高会滚过头。"
    }
  ],
  "pitfalls": [
    "空格也被替换成乱码，单词边界错乱且动画期间布局不停跳动——空格必须原样保留。",
    "用 rAF 每帧刷新而锁定逻辑没按帧率折算，高刷屏（120Hz）上解码速度快一倍。",
    "逐字符包 <span> 更新，DOM 节点反复重建，长标题明显卡顿——应整体重写 textContent。",
    "IntersectionObserver 触发后忘记 unobserve，来回滚动反复解码。",
    "prefers-reduced-motion 下仍播放乱码闪烁，且没有直接落定到最终文本。",
    "clearInterval 写在 locked >= total 判断之外或漏写，动画结束后 interval 继续空转耗电。"
  ],
  "effectTags": [
    "文字",
    "乱码",
    "解码",
    "标题"
  ]
};
