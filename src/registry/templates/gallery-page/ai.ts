import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "图库灯箱页",
    "en": "Gallery Lightbox Page",
    "aliases": [
      "灯箱图库",
      "作品集画廊",
      "Lightbox Gallery"
    ],
    "pattern": "Gallery · 错落网格 + 灯箱",
    "principle": "12 幅程序化双色渐变作品（无图片资源）组成 4 列网格，第 3n+1 张跨两行形成错落节奏；点击打开全屏灯箱，键盘方向键/按钮循环切换、ESC 与遮罩点击关闭，关闭后焦点归还给触发按钮。"
  },
  "prompts": {
    "short": "做一个作品集图库：12 张 CSS 渐变作品错落网格，点击打开灯箱，支持左右箭头/键盘切换、ESC 和遮罩关闭、焦点管理。原生 HTML/CSS/JS 单文件。",
    "standard": "用原生 HTML/CSS/JavaScript 实现单文件图库：\n1. 作品数据数组（名称+双色+角度）驱动生成 4 列网格，缩略图是 button（cursor zoom-in）内嵌渐变色块，每 3n+1 张 grid-row: span 2；\n2. 灯箱为 fixed 全屏半透明遮罩层，内含大图（min(520px, 74vw)）、标题计数、左右按钮与关闭按钮；\n3. 键盘：灯箱开启时 ESC 关闭、←/→ 循环切换（取模防越界）；点遮罩自身关闭；\n4. 焦点管理：打开时记录 lastFocus 并把焦点移到关闭按钮，关闭时归还；缩略图带 aria-label。",
    "refined": "实现图库：4 列网格间距 12px、max-width 860px、缩略图 hover scale 1.05；灯箱遮罩 rgba(2,6,23,0.86)、淡入 0.2s；640px 以下 2 列且隐藏左右按钮（保留键盘切换）。验收标准：① ESC/遮罩/关闭按钮三种方式都能关闭；② 从第 1 张向左切换落到第 12 张（循环取模）；③ 关闭后焦点回到触发的那张缩略图；④ 作品全部为 CSS 渐变，零图片请求。"
  },
  "knobs": [
    {
      "name": "网格列数",
      "default": "repeat(4, 1fr)，间距 12px（640px 以下 2 列）",
      "range": "3 – 5 列",
      "effect": "图库密度与错落感。"
    },
    {
      "name": "错落规则",
      "default": "nth-child(3n+1) 跨 2 行",
      "range": "3n+1 / 4n+1 / 不跨行",
      "effect": "瀑布式节奏；改规则注意末行留洞。"
    },
    {
      "name": "灯箱遮罩",
      "default": "rgba(2, 6, 23, 0.86)，淡入 0.2s",
      "range": "透明度 0.7 – 0.95",
      "effect": "大图与背景的对比强度。"
    },
    {
      "name": "大图尺寸",
      "default": "min(520px, 74vw) × min(380px, 56vh)",
      "range": "按视口百分比调",
      "effect": "灯箱作品的展示体量。"
    },
    {
      "name": "作品渐变参数",
      "default": "12 组双色 + 100°–165° 角度",
      "range": "任意色对/角度",
      "effect": "程序化作品的外观，改数组即改全库。"
    }
  ],
  "pitfalls": [
    "灯箱不监听 ESC 和遮罩点击，用户只能找右上角小叉，移动端体验崩坏。",
    "打开灯箱不把焦点移入、关闭不归还 lastFocus，键盘用户被丢回页面顶部。",
    "左右切换不取模（(current + dir + len) % len），首尾越界显示 undefined。",
    "缩略图用 div 而非 button 且无 aria-label，读屏与键盘无法触达放大操作。",
    "灯箱打开时不锁 body 滚动，背景随方向键一起滚动（本模板已在开关时切换 body overflow hidden）。",
    "跨行 span 规则与作品数量不匹配时网格末行出现空洞，改列数要同步调 nth-child 公式。"
  ],
  "effectTags": [
    "灯箱",
    "图库",
    "焦点管理",
    "键盘导航",
    "CSS 渐变作品"
  ]
};
