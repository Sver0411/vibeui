import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "Cookie 同意条",
    "en": "Cookie Consent Banner",
    "aliases": [
      "隐私同意条",
      "Cookie 弹条",
      "GDPR 同意栏"
    ],
    "pattern": "Consent · Cookie Banner",
    "principle": "fixed 底部居中的白底卡片条，choice 三态（全部接受/仅必要/逐项偏好）序列化进 localStorage，再次访问读到已存选择就静默不弹；偏好面板是逐项开关，必要项用 disabled 锁定，出场用 0.32s 上滑动画、离场先加 leaving 类再隐藏。"
  },
  "prompts": {
    "short": "做一个页面底部 Cookie 同意条：全部接受/仅必要/Cookie 设置三个按钮，设置里可展开逐项开关（必要项锁定），选择存 localStorage，下次访问不再弹出。原生 JS。",
    "standard": "用原生 HTML/CSS/JS 实现 Cookie 同意条：\n1. 条体 position: fixed; bottom: 18px; left: 50% + translateX(-50%)，宽 min(680px, calc(100% - 28px))，白底 1px 描边 + 大阴影，z-index: 50，role=\"dialog\"；\n2. 按钮：下划线文字链\"Cookie 设置\"（aria-expanded 控制偏好面板显隐）+ 描边\"仅必要\"+ 实底\"全部接受\"；\n3. 偏好面板逐项 label + 开关（input 覆盖 + 伪元素滑块 38×22px，checked 平移 16px），必要 Cookie 项 input disabled 保持 checked；\n4. 选择写 localStorage（try/catch 兜底隐私模式），初始化时读到已存选择则 bar.hidden = true 静默；\n5. 离场先加 .leaving 播 0.25s 淡出下滑，260ms 后再设 hidden；480px 以下按钮 flex: 1 平分。",
    "refined": "实现 Cookie 同意条，暴露参数：条宽 min(680px, 100%-28px)、底部偏移 18px、出场动画 0.32s cubic-bezier(0.22,1,0.36,1) 上滑 16px、离场 0.25s、开关尺寸 38×22px 滑块位移 16px、选中色 #16a34a、localStorage 键名可配置。验收标准：① 全部接受/仅必要/保存偏好三条路径都正确写入并收起；② 再次刷新静默且 toast 提示恢复的选择；③ 偏好面板展开状态与 aria-expanded 同步；④ 隐私模式 localStorage 抛错不崩；⑤ 480px 以下三按钮不溢出。"
  },
  "knobs": [
    {
      "name": "localStorage 键名 KEY",
      "default": "\"cc-demo-choice\"",
      "range": "任意字符串",
      "effect": "存储选择的键，换键可强制重新弹出。"
    },
    {
      "name": "条体宽度与位置",
      "default": "min(680px, calc(100% - 28px))，bottom 18px 居中",
      "range": "480 – 800px",
      "effect": "同意条的占屏宽度与贴底距离。"
    },
    {
      "name": "出场/离场动画",
      "default": "出场 0.32s 上滑 16px，离场 0.25s",
      "range": "0.15 – 0.45s",
      "effect": "弹入弹出的速度感，离场时长需与 JS 的 260ms 隐藏延时匹配。"
    },
    {
      "name": "开关选中色",
      "default": "#16a34a（必要项 disabled 后 55% 透明）",
      "range": "品牌色或语义绿",
      "effect": "开关开启态颜色，绿=允许的语义暗示。"
    },
    {
      "name": "toast 时长",
      "default": "2400ms 自动清空",
      "range": "1500 – 4000ms",
      "effect": "保存/恢复选择后底部提示的停留时间。"
    }
  ],
  "pitfalls": [
    "没有\"仅必要\"选项或把必要项做成可关，GDPR 合规上翻车；必要 Cookie 应 disabled + checked 且说明原因。",
    "直接 bar.hidden = true 没有离场动画，或动画时长与 setTimeout 隐藏延时不匹配导致闪烁。",
    "忘了 try/catch 包 localStorage，Safari 隐私模式/禁用 Cookie 下抛异常，整条脚本挂掉。",
    "同意条 fixed 贴底但不居中（漏 translateX(-50%)），或入场动画的 transform 把位移覆盖掉。",
    "再次访问仍弹出：初始化时没先读 localStorage 判断，或读到的值没做 JSON.parse 容错。",
    "偏好面板展开没同步 aria-expanded，屏幕阅读器不知道设置已展开。",
    "窄屏三个按钮横排溢出，需 480px 下\"设置\"独占一行、另两个按钮 flex: 1 平分。"
  ],
  "effectTags": [
    "Cookie 同意",
    "合规",
    "localStorage",
    "开关",
    "底部浮层"
  ]
};
