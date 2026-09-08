import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "订阅区块",
    "en": "Newsletter CTA / Email Subscribe Block",
    "aliases": [
      "邮件订阅框",
      "Newsletter 表单",
      "邮箱收集区块"
    ],
    "pattern": "Conversion · Newsletter Signup",
    "principle": "白底圆角卡片内放徽章 + 标题 + 说明 + 邮箱输入框/按钮组合；提交时用正则 /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/ 前端校验，非法则输入框 is-error 描红并 focus，合法则提示语切换 is-ok、表单重放 nl-settle 进场动画并清空输入。"
  },
  "prompts": {
    "short": "做一个邮箱订阅卡片：徽章 + 标题 + 说明 + 邮箱输入框和订阅按钮，前端校验邮箱格式（错误描红提示、正确切换成功文案并有淡入动画）。原生 JS。",
    "standard": "用原生 HTML/CSS/JS 实现订阅区块：\n1. 卡片宽 min(480px, 88vw)、圆角 20px、padding 30px 28px，内容为徽章（#f0fdfa 底 teal 字）、20px 标题、说明文案；\n2. 表单 novalidate 自管校验：input flex: 1 + 按钮 flex: 0 0 auto，input 聚焦时 teal 描边 + 0 0 0 3px rgba(15,118,110,0.14) 光圈；\n3. JS 用 EMAIL_RE = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/ 校验，失败时输入框加 is-error（描红 #f43f5e）、hint（role=\"status\" aria-live=\"polite\"）显示提示并 input.focus()；\n4. 成功时 hint 换 is-ok 绿色确认文案，表单移除再强制 reflow 后加回 is-done 类重放 0.35s nl-settle 动画，清空并 blur 输入框；\n5. input 事件即时清错误态。",
    "refined": "实现订阅区块，暴露参数：卡片宽 min(480px, 88vw) 圆角 20px、输入框圆角 11px、focus 光圈 rgba(15,118,110,0.14)、错误色 #f43f5e、成功动画 0.35s。验收标准：① 空值与格式错误分别有不同提示文案；② 输入中即时清除错误态；③ hint 有 aria-live 屏幕阅读器可感知；④ 连续两次成功仍重放动画（reflow 技巧）；⑤ 输入框在窄屏 flex: 1 收缩不溢出（min-width: 0）。"
  },
  "knobs": [
    {
      "name": "卡片宽度",
      "default": "min(480px, 88vw)",
      "range": "400 – 560px",
      "effect": "订阅卡的整体宽度，窄了按钮和输入框换行。"
    },
    {
      "name": "邮箱校验正则",
      "default": "/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/",
      "range": "宽松 – 严格 RFC 级",
      "effect": "前端拦截力度，当前实现拒绝无 TLD 的地址。"
    },
    {
      "name": "focus 光圈",
      "default": "0 0 0 3px rgba(15,118,110,0.14)",
      "range": "透明度 0.08 – 0.25",
      "effect": "输入框聚焦的品牌色光晕强度。"
    },
    {
      "name": "错误色",
      "default": "#f43f5e（rose-500），提示文字 #be123c",
      "range": "语义红系",
      "effect": "校验失败时描边与提示文字的颜色。"
    },
    {
      "name": "成功进场动画",
      "default": "nl-settle 0.35s ease，translateY(-6px)→0",
      "range": "0.2 – 0.5s",
      "effect": "成功态切换时的淡入下落感。"
    }
  ],
  "pitfalls": [
    "依赖浏览器原生 type=\"email\" 校验，提示文案不可控且样式不统一；应 novalidate + 自管正则。",
    "错误时只描红不把焦点移回输入框（input.focus()），键盘用户不知道哪里错了。",
    "成功提示不带 role=\"status\"/aria-live，屏幕阅读器感知不到结果。",
    "重放动画直接重复加同名类不生效；需先移除类并 void offsetWidth 强制 reflow 再加回。",
    "输入框漏写 min-width: 0，flex 容器内不收缩，窄屏把按钮挤出卡片外。",
    "校验正则过严（如强制 TLD 两位以上逐项白名单）或过松（只查 @），误杀/漏放真实邮箱。",
    "成功后仍保留错误态类名，hint 同时带 is-error 和 is-ok 颜色冲突。"
  ],
  "effectTags": [
    "订阅",
    "表单校验",
    "转化",
    "成功态",
    "营销"
  ]
};
