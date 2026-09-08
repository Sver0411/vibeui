import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "长按确认按钮",
    "en": "Hold-to-Confirm Button",
    "aliases": [
      "长按删除",
      "按住确认",
      "Press-and-Hold"
    ],
    "pattern": "Danger Confirmation · Hold-to-Arm",
    "principle": "pointerdown 起用 rAF 按真实时间把 SVG 环形进度从 0 推到 1000ms 满，提前松开立即取消归零，充满才触发危险操作，键盘按住 Space/Enter 等价。"
  },
  "prompts": {
    "short": "做一个危险操作确认按钮：长按一秒环形进度充满后触发删除，提前松开自动取消。原生 JS + SVG。",
    "standard": "用原生 HTML/CSS/JavaScript 实现长按确认：\n1. 按钮内叠 SVG 圆环（pathLength=\"100\"、rotate(-90deg) 从顶部开始），rAF 循环里 progress = (now - startTime) / 1000，实时写 stroke-dashoffset = 100 - progress×100；\n2. pointerdown 开始、pointerup 和 pointerleave 提前取消（环归零、状态提示「释放过早」）；\n3. 防止长按副作用：event.preventDefault() + user-select: none + touch-action: none，避免弹出文本选择和系统手势；\n4. 键盘等价：按住 Space/Enter 走同一逻辑，keyup 取消；\n5. 触发后按钮 disabled 1.8s 防连按，原生实现不引入库。",
    "refined": "可配置长按确认：HOLD_DURATION 1000ms、环色 #b3261e 描边 3、环 34px（r=22，viewBox 48）、确认后锁定 1800ms、提示文案 aria-live=\"polite\"。验收：① 按住中途松手环平滑取消不触发操作；② 长按不弹出系统文本选择/右键；③ 移出按钮区域再松手也能正确取消；④ 键盘长按 Space 行为与鼠标一致。"
  },
  "knobs": [
    {
      "name": "长按时长 HOLD_DURATION",
      "default": "1000ms",
      "range": "600ms – 3000ms",
      "effect": "确认所需时间，越长越防误触也越拖沓。"
    },
    {
      "name": "进度环颜色/粗细",
      "default": "#b3261e / stroke-width 3",
      "range": "任意颜色 / 2 – 5",
      "effect": "危险语义的视觉强调。"
    },
    {
      "name": "环尺寸",
      "default": "34px（viewBox 48, r=22）",
      "range": "24px – 48px",
      "effect": "环形进度的大小。"
    },
    {
      "name": "确认后锁定",
      "default": "1800ms",
      "range": "0 – 5000ms",
      "effect": "触发后按钮禁用多久，防重复触发。"
    },
    {
      "name": "取消提示方式",
      "default": "aria-live=\"polite\" 文案切换",
      "range": "文案 / 颜色 / 震动",
      "effect": "提前松开时的反馈通道。"
    }
  ],
  "pitfalls": [
    "用 setTimeout + CSS transition 猜时长，中途松手进度无法按已过时间精确回退——必须用 rAF 按时间差计算。",
    "只监听按钮上的 pointerup，用户移出按钮再松手收不到事件，进度卡在半途；要同时监听 pointerleave/pointercancel。",
    "长按不 preventDefault 也不设 user-select: none / touch-action: none，手机上长按弹出文本选择或上下文菜单。",
    "没有键盘等价交互，触屏与鼠标之外的用户无法确认——keydown/keyup 监听 Space/Enter 走同一套逻辑。",
    "确认触发后不锁定按钮，环还停在满格状态可立刻再次长按连发危险操作。",
    "用 setInterval 递增假进度而不是按真实时间计算，掉帧时实际按住时间与环指示不符。"
  ],
  "effectTags": [
    "长按",
    "确认",
    "危险操作",
    "防误触",
    "SVG 进度环"
  ]
};
