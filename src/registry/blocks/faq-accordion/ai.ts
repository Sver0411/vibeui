import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "FAQ 手风琴",
    "en": "FAQ Accordion",
    "aliases": [
      "常见问题折叠",
      "问答手风琴",
      "折叠面板"
    ],
    "pattern": "FAQ · Accordion",
    "principle": "用原生 details/summary 保证键盘与语义可访问性，展开动画靠 grid-template-rows 0fr→1fr 过渡（无需 JS 测量高度）；summary 点击被 preventDefault 接管，收起时先跑 is-open 高度动画、transitionend 后再移除 open 属性，同时做单开互斥。"
  },
  "prompts": {
    "short": "做一个 FAQ 手风琴：原生 details/summary 实现，展开有平滑高度动画，同一时刻只展开一条，加号图标旋转变叉。原生 JS，不要引入库。",
    "standard": "用原生 HTML/CSS/JS 实现 FAQ 手风琴：\n1. 每条用 details > summary（问题行）+ 答案容器，答案外层 display: grid; grid-template-rows: 0fr，展开态 1fr，过渡 0.3s cubic-bezier(0.22,1,0.36,1)，内层 overflow: hidden; min-height: 0；\n2. JS 对 summary click preventDefault 接管开合：展开时先 open = true、强制读一次 offsetHeight、再加 is-open 类；收起时先移除 is-open，transitionend（propertyName === 'grid-template-rows'）后设 open = false，兜底 setTimeout 300+80ms；\n3. 单开互斥：打开一条前先收起其他已展开项；\n4. 加减号图标用两个伪元素拼十字，is-open 时整体 rotate(135deg)；\n5. prefers-reduced-motion 下时长归零。",
    "refined": "实现 FAQ 手风琴，暴露参数：展开时长 300ms、缓动 cubic-bezier(0.22,1,0.36,1)、列表宽 min(100%, 620px)、条目间距 10px、问题行 padding 15px 18px、强调色 #0f766e。验收标准：① 纯键盘 Tab + Enter 可开合且 focus-visible 有描边；② 收起也有动画（不是瞬间消失）；③ 同一时刻只有一条展开；④ 答案换成超长段落动画依然正确（不依赖 JS 量高度）；⑤ reduced-motion 下瞬时开合。"
  },
  "knobs": [
    {
      "name": "展开时长 DURATION",
      "default": "300（reduced-motion 时为 0）",
      "range": "150 – 450ms",
      "effect": "展开/收起动画速度，需与 CSS transition 的 0.3s 保持一致。"
    },
    {
      "name": "缓动曲线 --fa-ease",
      "default": "cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "ease-out 类曲线",
      "effect": "展开的减速感，曲线越陡末端越柔。"
    },
    {
      "name": "强调色 --fa-accent",
      "default": "#0f766e",
      "range": "任意品牌色",
      "effect": "eyebrow、问题悬停色、图标激活色与链接色。"
    },
    {
      "name": "列表宽度",
      "default": "min(100%, 620px)",
      "range": "520 – 760px",
      "effect": "FAQ 区块阅读宽度上限，过宽长问题难扫读。"
    },
    {
      "name": "图标旋转角",
      "default": "135deg（+ 变 ×）",
      "range": "45 / 135 / 225deg",
      "effect": "展开态图标的旋转角度，决定开合视觉隐喻。"
    }
  ],
  "pitfalls": [
    "不用 details/summary 而用 div + click，丢失键盘操作与语义；summary 是天生可聚焦的按钮替代品。",
    "直接移除 details 的 open 属性，内容瞬间消失没有收起动画；必须先跑 is-open 高度过渡，transitionend 后再收 open。",
    "展开时先加 is-open 再设 open，0fr 没机会成为过渡起点，动画直接跳到终态；要先 open = true 并强制 reflow（void offsetHeight）再加类。",
    "transitionend 没过滤 propertyName，图标旋转的过渡冒泡上来提前触发 open = false，收起动画被截断。",
    "transitionend 因元素不可见等原因不触发导致卡死，必须配 setTimeout(DURATION + 80ms) 兜底。",
    "答案内层忘写 min-height: 0 或 overflow: hidden，0fr 高度约束失效，收起态内容溢出可见。"
  ],
  "effectTags": [
    "手风琴",
    "折叠",
    "FAQ",
    "无障碍",
    "营销"
  ]
};
