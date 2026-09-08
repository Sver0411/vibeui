import type { ResourceAILayer } from "@/types/resource";

/** NPS 评分条的手写 AI 层。 */
export const ai: ResourceAILayer = {
  terms: {
    zh: "NPS 评分条",
    en: "NPS Score Scale",
    aliases: ["净推荐值", "NPS 组件", "推荐值评分", "nps scale"],
    pattern: "Form · Semantic Score Scale",
    principle:
      "0-10 十一档圆形刻度按 NPS 语义分三段着色（贬损/中立/推荐），选中放大反色并展开追问区，提交按钮随文本输入解锁。",
  },
  prompts: {
    short: "做一个 NPS 评分条：0-10 圆形刻度三段配色，选中放大，下方展开原因输入与提交。",
    standard:
      "用原生 JS 实现 NPS 评分条：\n1. 0-10 十一个圆形按钮 flex 均分，≤6 红、7-8 琥珀、9-10 绿，仅描边不着色；\n2. 悬停浮出数值气泡，选中 scale(1.18) 填充对应语义色并反白；\n3. 选中后网格行展开追问区（grid-template-rows 0fr→1fr 过渡），标签按分段切换文案；\n4. 提交按钮在选分且输入非空时解锁，点击后变为已完成态；\n5. 左右方向键切换分数。",
    refined:
      "增强：分数与文案由 JSON 配置驱动；分段阈值可调（如 0-5/6-9/10）；提交后本地存储防重复；键盘 roving tabindex 无障碍。验收：① 窄屏刻度不换行不裁切；② 读屏可感知当前分段；③ 阈值配置变更不破坏布局。",
  },
  knobs: [
    { name: "分段阈值 thresholds", default: "6 / 8", range: "可调", effect: "三段语义分界。" },
    { name: "追问开关 followup", default: "开启", effect: "选中后展开原因输入。" },
  ],
  pitfalls: [
    "十一档刻度在窄屏溢出——用 flex 均分 + 缩小直径，禁止固定宽度。",
    "左右端标签过长挤压刻度，移动端应隐藏或缩短。",
    "三段仅靠颜色区分，色弱用户无法分辨，需气泡/文案补充。",
  ],
  effectTags: ["评分", "表单", "NPS"],
};
