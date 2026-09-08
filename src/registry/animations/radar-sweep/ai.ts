import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "雷达扫描",
    "en": "Radar Sweep",
    "aliases": [
      "扫描线",
      "雷达图动画",
      "radar effect"
    ],
    "pattern": "Radar · Conic Sweep",
    "principle": "conic-gradient(from 0deg, 高色→透明 60°) 的圆形层做 rotate 无限旋转形成扫掠扇叶；底座是同心圆环 + 十字线的深色面板；目标点用带延迟的 opacity 闪烁，模拟被扫到时点亮。"
  },
  "prompts": {
    "short": "做一个雷达扫描动画：深色底座带同心圆环与十字线，青色锥形扇叶匀速旋转，三个目标点周期性闪烁。",
    "standard": "用纯 CSS 实现雷达扫描：\n1. 底座：径向深色圆（#0f1a26→#0a1118），border 画 3 圈同心圆环（或多个 box-shadow），::before/::after 画水平垂直十字线；\n2. 扇叶：absolute inset-0 圆层，background: conic-gradient(from 0deg, rgba(34,211,238,.5), transparent 70deg)，animation rotate 3s linear infinite；外层 border-radius 50% + overflow hidden 裁形；\n3. 目标点：3 个 absolute 小圆点（青色 + box-shadow 光晕），各自 opacity 0↔1 闪烁但 delay 不同，模拟扫过点亮；\n4. 边框外圈加 1px 青色描边；\n5. prefers-reduced-motion 停转只留静态底座。",
    "refined": "扩展：目标点带距离/方位标注（小标签跟随）；扇叶尾迹改为多层渐变更细腻；扫描到目标角度时同步点亮（用 JS 计算角度同步 delay）；提供浅色主题变量。验收：① 旋转 60fps 无锯齿；② 圆环在不同尺寸下等比；③ 目标点闪烁节奏与扇叶转速协调。"
  },
  "knobs": [
    {
      "name": "转速 sweepSpeed",
      "default": "3s",
      "range": "2 – 6s",
      "effect": "扇叶旋转一周的时间。"
    },
    {
      "name": "扇叶张角 beamAngle",
      "default": "70°",
      "range": "40 – 120°",
      "effect": "扫掠光锥的张角。"
    },
    {
      "name": "扇叶色 beamColor",
      "default": "青 #22d3ee",
      "effect": "扫描光颜色。"
    }
  ],
  "pitfalls": [
    "conic-gradient 写成从中心发散的饼图——扇叶要叠在深色圆上且边缘透明过渡。",
    "扇叶层没有 overflow hidden + 圆形裁切，方角露出。",
    "目标点闪烁用统一 delay，看起来像同步呼吸灯。",
    "浅色底上青色扇叶不可见——该效果必须配深底。",
    "用 JS requestAnimationFrame 手动旋转，CSS animation 就足够。"
  ],
  "effectTags": [
    "雷达",
    "扫描",
    "监控"
  ]
};
