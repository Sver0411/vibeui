import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "上传进度卡片",
    "en": "Upload Progress Card",
    "aliases": [
      "文件上传行",
      "上传卡片",
      "Transfer Row"
    ],
    "pattern": "File Upload · Determinate Progress + Transfer Controls",
    "principle": "rAF 每帧按速度 × dt 累加已传字节，渲染百分比/大小/速度三读数；data-state 状态机（running/paused/done/cancelled）驱动暂停色与按钮可用性。"
  },
  "prompts": {
    "short": "做一个文件上传进度卡片：进度条、速度与大小读数、暂停/继续/取消按钮。原生 HTML/CSS/JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现上传进度卡片：\n1. 卡片含文件名、进度条（5px 圆角轨道）、大小读数（已传/总量）、速度与百分比；\n2. rAF 循环里 loaded += speed * dt 累加字节（真实场景换成 XHR progress 或 fetch stream chunk，UI 契约一致），渲染函数只做派生计算；\n3. 状态机 running/paused/done/cancelled 存在 data-state 上：暂停时填充变琥珀色、图标切换，完成时禁用按钮并变绿边；\n4. 数字统一 font-variant-numeric: tabular-nums 防抖动；\n5. 原生实现，不引入库。",
    "refined": "可配置上传卡片：模拟总大小 8.4MB、速度 2.1MB/s、填充过渡 width 0.18s linear、进度色 #0f766e、暂停色 #b45309、完成边框 rgba(21,128,61,0.4)。验收：① 暂停再恢复不出现进度跳变（恢复时重置时间戳）；② 完成后按钮禁用、不再可取消；③ 取消后状态定格且读数更新为 Cancelled。"
  },
  "knobs": [
    {
      "name": "模拟速度",
      "default": "2.1 MB/s",
      "range": "任意正数",
      "effect": "进度推进快慢与预计剩余时间。"
    },
    {
      "name": "文件总大小",
      "default": "8.4 MB",
      "range": "任意正数",
      "effect": "读数上限与总时长。"
    },
    {
      "name": "填充过渡",
      "default": "width 0.18s linear",
      "range": "0.1s – 0.3s",
      "effect": "进度条对字节更新的平滑程度，linear 保证与读数同步感。"
    },
    {
      "name": "进度色 / 暂停色",
      "default": "#0f766e / #b45309",
      "range": "任意 CSS 颜色",
      "effect": "正常与暂停状态的填充颜色。"
    },
    {
      "name": "轨道规格",
      "default": "高 5px、圆角 999px、底色 #e4e4e7",
      "range": "3px – 8px",
      "effect": "进度条的粗细与底色对比。"
    }
  ],
  "pitfalls": [
    "用 setInterval 固定步进假装上传，没接 XHR progress / fetch stream 的真实字节事件——demo 可以，生产必须换事件源，UI 契约不变。",
    "暂停后恢复时不重置上一帧时间戳，dt 累积导致进度一次性跳一大段。",
    "速度读数直接用瞬时值每帧抖动，应做滑动窗口平均。",
    "完成后不禁用暂停/取消按钮，用户可以「取消一个已完成的上传」。",
    "大小与百分比不用 tabular-nums，每帧数字宽度跳动整个卡片在晃。",
    "进度条过渡用 ease 而不是 linear，条的位置和数字读数看起来不同步。"
  ],
  "effectTags": [
    "进度",
    "上传",
    "文件",
    "暂停",
    "状态机"
  ]
};
