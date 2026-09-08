import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "日期选择器",
    "en": "Date Picker",
    "aliases": [
      "月历",
      "日历选择",
      "Calendar Picker"
    ],
    "pattern": "Date Picker · Month Grid",
    "principle": "周一起始换算首列偏移 ((getDay()+6)%7)，从本月 1 号往前补位渲染 42 格；非本月日期 disabled 置灰，今天 inset 描边、选中实心；视图月份存 Date 对象，setMonth ±1 切换后整格重建。"
  },
  "prompts": {
    "short": "做一个中文月历日期选择器：周一起始、上下月切换、非本月置灰不可选、今天描边、选中实心高亮，底部显示所选日期。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现日期选择器：\n1. 视图存 view = new Date(y, m, 1)，上/下月按钮 view.setMonth(±1) 后重建 42 格网格；\n2. 周一起始：lead = (first.getDay() + 6) % 7，从 1 号减 lead 天开始铺格；非本月日期加置灰类并 disabled，本月日期设 aria-label（'2026 年 9 月 18 日' 格式）；\n3. 今天用 inset 描边、选中实心高亮，点击后记录选中并重渲染；\n4. 所选值写入 output 并用 aria-live=polite 播报；回到今天按钮同时跳转视图与选中；\n5. 日期格用 button，天然可 Tab 聚焦。不要引入任何库。",
    "refined": "可配置日期选择器：周一起始、7 列 42 格、日历宽 300px（紧凑变体 250px / 字号 12px）、日期格 aspect-ratio 1 / 圆角 9px、周末列橙色 #f97316、主题色 #0f766e、按压缩放 0.9。验收：① 12 月→次年 1 月跨年切换正确（setMonth 自动进位）；② 非本月格 disabled 不可点；③ 选 8 月 31 日后切到 9 月渲染不错位；④ 选中值由 aria-live 播报。"
  },
  "knobs": [
    {
      "name": "周起始日",
      "default": "周一（偏移 (getDay()+6)%7）",
      "range": "周日 / 周一",
      "effect": "第一列是周日还是周一，补位数量随之变化。"
    },
    {
      "name": "网格规模",
      "default": "42 格（6 行）",
      "range": "35 – 42",
      "effect": "是否固定 6 行，行数不足时布局是否跳动。"
    },
    {
      "name": "日历宽度",
      "default": "300px（紧凑 250px）",
      "range": "240 – 360px",
      "effect": "整体尺寸与日期格大小。"
    },
    {
      "name": "主题色",
      "default": "#0f766e",
      "range": "任意色值",
      "effect": "选中实心、今天描边与焦点环颜色。"
    },
    {
      "name": "按压缩放",
      "default": "0.9",
      "range": "0.85 – 0.95",
      "effect": "日期格按下时的反馈强度。"
    }
  ],
  "pitfalls": [
    "用 getDay() 直接当首列偏移，默认周日开始，与周一起始的表头错开一列。",
    "只渲染当月天数、不做前置补位，1 号不在第一列时整表错位。",
    "切换月份手动加减数字不做进位，12 月→1 月出错；应用 setMonth 让 Date 自动进位。",
    "非本月日期只置灰没 disabled，仍可选中导致选中月份与视图不一致。",
    "日期格用 div 而非 button，键盘用户无法 Tab 到任何日期。",
    "选中后只更新文本没动 aria-live 区域，读屏不播报所选日期。"
  ],
  "effectTags": [
    "日期选择",
    "月历",
    "本地化",
    "表单"
  ]
};
