import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "指针视差",
    "en": "Mouse Parallax",
    "aliases": [
      "鼠标视差",
      "多层视差",
      "深度视差"
    ],
    "pattern": "Pointer · Layered Parallax",
    "principle": "指针位置归一化为 -1~1 作为目标值，rAF 里用 current += (target - current) × 0.08 缓动逼近，各层按 data-depth 乘系数后输出 translate3d 走 GPU 合成，离场目标归零自动回中。"
  },
  "prompts": {
    "short": "做一个鼠标视差场景：装饰元素分层跟随鼠标移动，深度不同速度不同，松开自动缓动回中，原生 JS。",
    "standard": "用原生 JavaScript 实现多层指针视差：\n1. 各层标 data-depth，容器监听 pointermove，把指针位置归一化为 -1 ~ 1 的 target；\n2. rAF 循环里 current.x += (target.x - current.x) × 0.08 做缓动插值，而不是直接跟随；\n3. 每层位移 = (current / 2) × MAX_SHIFT(18px) × depth × 0.5，输出 translate3d(x, y, 0) 强制 GPU 合成；\n4. pointerleave 时 target 归零、inside 标记解除，层缓动回到原位；\n5. 插值收敛（误差 < 0.001）且指针离场后停掉 rAF，避免空转；\n6. 层加 will-change: transform。\n不引入动画库。",
    "refined": "实现可配置的指针视差：\n- 最大位移 MAX_SHIFT：默认 18px（8px 微妙 – 40px 夸张）；\n- 缓动系数 EASE：默认 0.08（0.03 很绵 – 0.2 很跟手）；\n- depth 范围：默认 1 起步，前景 2–3、背景 0.5；\n- 收敛阈值：默认 0.001，低于即停 rAF。\n实现约束：位移只走 translate3d 不碰 top/left；settled 且离场才 cancel rAF；prefers-reduced-motion 下 CSS 强制 transform: none !important。\n验收标准：① 各层速度呈明显深度差且方向一致；② 鼠标快速甩动层不超调不抖动；③ 离场后场景平滑归中并停止 rAF。"
  },
  "knobs": [
    {
      "name": "最大位移 MAX_SHIFT",
      "default": "18",
      "range": "8 – 40 (px)",
      "effect": "最深层的位移幅度上限，决定视差整体强弱。"
    },
    {
      "name": "缓动系数 EASE",
      "default": "0.08",
      "range": "0.03 – 0.2",
      "effect": "层跟随指针的黏滞感，越小越绵软、越大越跟手。"
    },
    {
      "name": "层深度 depth",
      "default": "1（按层各设）",
      "range": "0.3 – 3",
      "effect": "单层的相对位移倍率，前景大、背景小制造纵深。"
    },
    {
      "name": "收敛阈值 settled",
      "default": "0.001",
      "range": "0.0005 – 0.01",
      "effect": "插值误差低于该值停止 rAF，影响停机时机与功耗。"
    }
  ],
  "pitfalls": [
    "直接把指针坐标赋给 transform 而不做插值，层移动生硬像被拖拽，没有视差的悬浮感。",
    "用 top/left 或 margin 做位移，每帧触发重排，多层场景明显掉帧——必须 translate3d 走合成器。",
    "rAF 循环不设收敛退出条件，鼠标静止后仍在每帧重算，CPU 空转。",
    "忘记监听 pointerleave，指针离场后层停在半路不回中。",
    "各层 depth 系数方向不一致（有正有负），看起来像 bug 而不是纵深。",
    "prefers-reduced-motion 下没禁用位移，敏感用户被持续晃动干扰。"
  ],
  "effectTags": [
    "视差",
    "指针跟随",
    "层次",
    "缓动"
  ]
};
