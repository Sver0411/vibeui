import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "表格骨架屏",
    "en": "Table Skeleton Screen",
    "aliases": [
      "骨架屏",
      "加载占位",
      "Shimmer 占位"
    ],
    "pattern": "Skeleton Screen · Shimmer",
    "principle": "用 grid 按真实列权重复制一行行微光条占位，shimmer 靠 background-position 在 400% 宽的渐变上扫动，数据到达后原位替换不跳动。"
  },
  "prompts": {
    "short": "做一个表格加载骨架屏：表头加五行微光扫动的占位条，列宽和真实表格对齐，数据到达后原位替换。原生 HTML/CSS/JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现表格骨架屏：\n1. 骨架行用 display:grid + grid-template-columns 按列权重（如 1.1fr 1.4fr 0.8fr 0.8fr 1fr）摆放占位条，与真实表格列一一对齐；\n2. 占位条背景 linear-gradient(90deg, #eef2f7 25%, #e2e8f0 37%, #eef2f7 63%)，background-size: 400% 100%，动画改 background-position 实现 shimmer；\n3. 数据到达后隐藏骨架、渲染真实行，容器同步维护 aria-busy=\"true/false\"；\n4. 每行条宽加些随机差异避免机械感；\n5. 提供 prefers-reduced-motion 降级：动画停止，占位条改为静态浅灰。",
    "refined": "可配置表格骨架屏：shimmer 周期 1.4s ease-in-out infinite、双色 #eef2f7/#e2e8f0、条高 12px 圆角 6px、骨架停留 1400ms 后填入数据。验收：① 数据替换瞬间无横向跳动（列宽一致）；② 开启「减弱动态效果」后 shimmer 停止且仍有静态占位；③ aria-busy 状态随加载切换。"
  },
  "knobs": [
    {
      "name": "shimmer 周期",
      "default": "1.4s ease-in-out infinite",
      "range": "0.8s – 2.5s",
      "effect": "微光扫一遍的速度，越慢越安静。"
    },
    {
      "name": "shimmer 双色",
      "default": "#eef2f7 / #e2e8f0",
      "range": "任意浅灰组合",
      "effect": "扫过时的明暗对比强度。"
    },
    {
      "name": "列权重 grid-template-columns",
      "default": "1.1fr 1.4fr 0.8fr 0.8fr 1fr",
      "range": "按内容调整",
      "effect": "骨架条与真实表格各列的宽度分配。"
    },
    {
      "name": "骨架停留时长",
      "default": "1400ms（切版式 600ms）",
      "range": "300ms – 3000ms",
      "effect": "demo 中骨架展示多久后填入真实数据。"
    },
    {
      "name": "占位条尺寸",
      "default": "高 12px、圆角 6px（表头 10px、透明度 0.7）",
      "range": "8px – 16px",
      "effect": "占位条的视觉粗细与柔和度。"
    }
  ],
  "pitfalls": [
    "骨架列宽和真实表格列没对齐，数据到达瞬间整行横向跳动——必须用同一套列权重。",
    "用 opacity 明暗闪烁冒充 shimmer，观感廉价；正确做法是 background-position 在 400% 宽的渐变上平移。",
    "漏掉 prefers-reduced-motion 降级，动效敏感用户看到无限扫动。",
    "每行条宽完全一致显得像机器生成，给第二列等位置加 64%–90% 的宽度差异更自然。",
    "切换骨架/数据时忘记同步 aria-busy 与 aria-live，屏幕阅读器感知不到加载状态。"
  ],
  "effectTags": [
    "骨架屏",
    "shimmer",
    "加载占位",
    "表格",
    "无障碍"
  ]
};
