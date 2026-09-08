import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "底部弹层",
    "en": "Bottom Sheet",
    "aliases": [
      "底部抽屉",
      "分享面板",
      "下拉关闭弹层"
    ],
    "pattern": "Bottom Sheet · Drag-to-dismiss",
    "principle": "把手 pointerdown 后 setPointerCapture 并加 is-dragging 暂停过渡，translateY 直接跟手；松手时位移 >90px、或（>24px 且瞬时速度 >0.22px/ms）即关闭，否则清空 transform 弹回。"
  },
  "prompts": {
    "short": "做一个移动端底部弹层：把手拖拽跟手，下滑超过阈值或快速甩动关闭、否则弹性回位，遮罩/取消/ESC 均可关。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现底部弹层：\n1. 面板 translateY(100%)→0 过渡 0.3s cubic-bezier(0.22,1,0.36,1)，入场双 rAF 加 is-open；\n2. 把手 pointerdown 时 setPointerCapture + is-dragging 关过渡，pointermove 只允许 delta≥0 下滑并直接写 sheet.style.transform；\n3. 松手判定：delta>90px，或 delta>24px 且速度>0.22px/ms 则关闭（保留当前位移再播收起过渡），否则清空 transform 弹回；\n4. 遮罩/取消/ESC 关闭，等 transitionend（380ms 兜底）再 hidden 并归还焦点；底部 padding 用 env(safe-area-inset-bottom) 适配安全区。不要引入库。",
    "refined": "可配置底部弹层：关闭阈值 90px、甩动判定 delta>24px 且速度>0.22px/ms、面板过渡 0.3s、圆角 20px、把手条 40×5px。验收：① 拖拽全程跟手无橡皮筋延迟；② 半途松手位移 <90px 时平滑弹回不跳变；③ 快速小幅度甩动也能关闭；④ reduced-motion 下面板瞬现瞬隐但拖拽仍跟手。"
  },
  "knobs": [
    {
      "name": "关闭位移阈值 CLOSE_DISTANCE",
      "default": "90",
      "range": "50 – 160px",
      "effect": "拖多远松手才判定关闭。"
    },
    {
      "name": "甩动速度阈值 FLICK_SPEED",
      "default": "0.22 px/ms",
      "range": "0.1 – 0.5",
      "effect": "多快的下滑触发惯性关闭。"
    },
    {
      "name": "最小甩动位移",
      "default": "24px",
      "range": "10 – 40px",
      "effect": "防误触：低于此位移不判定甩动。"
    },
    {
      "name": "面板过渡",
      "default": "0.3s cubic-bezier(0.22,1,0.36,1)",
      "range": "0.2 – 0.45s",
      "effect": "弹出与弹回的速度。"
    },
    {
      "name": "安全区适配",
      "default": "calc(18px + env(safe-area-inset-bottom))",
      "range": "自定义",
      "effect": "全面屏底部留白。"
    }
  ],
  "pitfalls": [
    "拖拽时没关 transition，面板追不上手指产生橡皮筋延迟；需 is-dragging 类临时 transition:none。",
    "只在把手上监听 pointermove 却没 setPointerCapture，手指滑出把手区域后拖拽中断。",
    "pointermove 的 delta 没 clamp 到 ≥0，向上拖会把面板拽出缝隙。",
    "关闭时直接清空 transform，面板从中间位移瞬间跳到收起态产生闪跳；应保留当前位移再播放过渡。",
    "把手区域没设 touch-action: none，移动端拖把手时页面跟着滚动。",
    "没监听 pointercancel，来电或系统手势打断后面板卡在半开状态。"
  ],
  "effectTags": [
    "底部弹层",
    "拖拽手势",
    "甩动关闭",
    "移动端"
  ]
};
