import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "设置页面",
    "en": "Settings Page",
    "aliases": [
      "偏好设置",
      "账户设置",
      "Settings 表单页"
    ],
    "pattern": "App Shell · 侧栏分区 + 表单行",
    "principle": "168px 粘性分区导航 + 右侧白卡分区表单；脏检查对比输入框初始值驱动底部悬浮保存条；危险区按钮采用两步确认（3 秒内二次点击才执行）而非弹窗。"
  },
  "prompts": {
    "short": "做一个设置页：左侧粘性分区导航、右侧表单行（输入框/开关）、修改后底部浮现未保存提示条、危险区两步确认删除。原生 HTML/CSS/JS 单文件。",
    "standard": "用原生 HTML/CSS/JavaScript 实现单文件设置页：\n1. 布局 168px 导航 + 1fr 内容，max-width 780px，640px 以下导航横排可滚动；\n2. 表单行用 130px 标签列 + 控件列的两列网格；开关用 button[role=switch]+aria-checked，开启色 #0f766e；\n3. 记录输入框初始值，input 事件里对比出脏状态，驱动 fixed 底部保存条（保存/放弃）；\n4. 危险区删除按钮：第一次点击变为确认态，3 秒内再点才执行，超时自动复原。",
    "refined": "实现设置页：侧栏宽 168px、sticky top 24px；开关 40×23、thumb 18px 位移 16px；二次确认窗口 3000ms；保存条 fixed bottom 18px、max-width calc(100vw - 32px)。验收标准：① 保存后再次修改保存条重新出现，放弃后值回滚且保存条隐藏；② 危险按钮 3 秒无操作自动退出确认态；③ 640px 以下侧栏横排、表单行降单列。"
  },
  "knobs": [
    {
      "name": "侧栏宽度",
      "default": "168px，sticky top 24px",
      "range": "140 – 220px",
      "effect": "分区导航的占比，640px 以下转为横排。"
    },
    {
      "name": "开关尺寸与行程",
      "default": "40×23，thumb 18px 位移 16px",
      "range": "36 – 48px",
      "effect": "布尔设置项的触控体量。"
    },
    {
      "name": "二次确认时限",
      "default": "3000ms",
      "range": "2000 – 5000ms",
      "effect": "危险按钮保持「确认态」的窗口，超时自动复位。"
    },
    {
      "name": "行标签列宽",
      "default": "130px",
      "range": "100 – 160px",
      "effect": "表单行标签与控件的对齐，540px 以下降单列。"
    },
    {
      "name": "危险区颜色",
      "default": "#b3261e",
      "range": "任意危险色",
      "effect": "删除入口、危险区描边与确认态背景的统一色。"
    }
  ],
  "pitfalls": [
    "危险操作直接 confirm() 弹窗，与页内两步确认按钮的体验和可测性都差；应像本模板一样用限时确认态。",
    "脏检查只在 input 事件里置脏，不与初始值快照比对，放弃/保存后状态无法回滚或误报。",
    "开关用 div+class 切换而不用 role=switch + aria-checked，读屏用户无法感知开/关。",
    "底部保存条 fixed 定位但没写 max-width: calc(100vw - 32px)，小屏溢出视口。",
    "移动端断点只把侧栏转横排，忘了加 overflow-x: auto，导航项一多直接撑破布局。"
  ],
  "effectTags": [
    "设置",
    "脏检查",
    "保存条",
    "两步确认",
    "开关"
  ]
};
