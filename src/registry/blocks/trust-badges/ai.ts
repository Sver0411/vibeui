import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "信任徽标行",
    "en": "Trust Badges",
    "aliases": [
      "信任背书",
      "认证徽章行",
      "trust seals"
    ],
    "pattern": "Trust · Assurance Row",
    "principle": "横排 3-4 枚徽标卡（图标圆片 + 标题 + 一句话），图标统一线性风格弱化差异、强调语义；区块常置于定价或注册区附近降低决策焦虑。"
  },
  "prompts": {
    "short": "做一个信任背书区块：四枚徽标卡（合规认证/银行级加密/隐私承诺/随时退款），图标圆片+标题+一句话，悬停微亮。",
    "standard": "用纯 HTML/CSS 实现信任徽标行：\n1. 结构：横排 grid（4 列，窄屏 2 列）徽标卡；每枚 = 46px 图标圆片（主色 8% 底 + 线性图标）+ 标题 13.5px/650 + 说明 12px 两行；\n2. 四枚内容：ISO 27001 认证 / TLS 1.3 传输加密 / 数据不出境承诺 / 30 天无理由退款；\n3. 卡片透明底、无描边，仅 hover 时淡出浅灰底——比描边卡更克制；\n4. 图标统一 1.6 描边 22px；\n5. 区块与 hero 或 pricing 组合时上下留白 48px。",
    "refined": "扩展：徽标卡 hover 显示「查看详情」箭头的二级说明弹层；支持真实认证 logo 图（SVG 官方标）与字标回退；深色主题变量化；滚动入场 stagger。验收：① 四枚在 320px 宽两行排列不破版；② 图标视觉重量一致；③ 无障碍完整可读。"
  },
  "knobs": [
    {
      "name": "图标圆片 iconBg",
      "default": "主色 8%",
      "effect": "圆片底色浓度。"
    },
    {
      "name": "列数 columns",
      "default": "4",
      "range": "2 – 5",
      "effect": "徽标横排数量。"
    },
    {
      "name": "悬停底色 hoverBg",
      "default": "灰 4%",
      "effect": "hover 时卡的底色。"
    }
  ],
  "pitfalls": [
    "每枚图标风格不一（有的实底有的线性），视觉噪音大。",
    "说明文案超过两行把卡片撑高，行高不齐。",
    "假认证（无编号的 ISO 徽章）有合规风险，用泛化表述。",
    "深色主题下图标底色发灰——用主题变量。",
    "移动端 4 列挤成文字堆，降为 2 列。"
  ],
  "effectTags": [
    "信任",
    "背书",
    "合规"
  ]
};
