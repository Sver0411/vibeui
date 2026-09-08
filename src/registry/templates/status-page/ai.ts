import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "系统状态页",
    "en": "Status Page",
    "aliases": [
      "服务状态",
      "监控页",
      "uptime page"
    ],
    "pattern": "Status · Uptime Board",
    "principle": "顶部全宽横幅用颜色表达整体状态（绿=正常），每个服务一行：状态灯 + 名称 + 90 天可用率条（90 根 2px 竖条按日着色）；事件时间线倒序列出故障记录与持续时长。"
  },
  "prompts": {
    "short": "做一个系统状态页：全宽绿色「所有系统运行正常」横幅、5 个服务行（状态灯+名称+90天可用率迷你条）、最近事件时间线。",
    "standard": "用原生 JS 实现状态页：\n1. 横幅：全宽浅绿底（#16a34a 8%）+ 绿点脉冲 + 「所有系统运行正常」+ 最后更新时间（JS 实时刷新「x 分钟前」）；\n2. 服务行：12px 状态灯（正常绿 / 降级琥珀 / 故障红，故障加 ping 动画）+ 服务名 + 右侧「99.98% · 90 天」；\n3. 可用率条：每日一根 3px 宽竖条 flex 排满 90 根，颜色按当日状态（绿/琥珀/红/无数据灰），hover title 显示日期与百分比（data 数组渲染）；\n4. 事件时间线：日期分组，事件卡 = 严重度色条 + 标题 + 持续时长与解决说明，倒序排列；\n5. 顶栏：产品名 + 「订阅更新」按钮；\n6. 状态灯语义用 role=\"img\" aria-label 表达。",
    "refined": "增强：状态数据由 JSON 驱动（uptime/services/incidents 三段结构）；可用率条 hover 显示 tooltip；横幅在存在进行中事件时自动变琥珀「部分服务降级」；订阅按钮弹出邮件输入（本地校验）；自动刷新 fetch 模拟。验收：① 90 根条在不同屏宽下不折行（flex-shrink 0 + overflow hidden 裁旧数据）；② 无障碍读屏可感知每个服务状态；③ JSON 换数据布局不变。"
  },
  "knobs": [
    {
      "name": "条数 days",
      "default": "90",
      "range": "30 – 120",
      "effect": "可用率历史天数。"
    },
    {
      "name": "条宽 dayW",
      "default": "3px",
      "range": "2 – 5px",
      "effect": "每日竖条宽度。"
    },
    {
      "name": "横幅自动判定 autoBanner",
      "default": "开启",
      "effect": "按服务状态推导横幅文案与颜色。"
    }
  ],
  "pitfalls": [
    "状态灯只用颜色，色盲用户分不清正常与故障——加形状或文字。",
    "90 根条用 90 个 div 不加 flex-shrink，窄屏换行爆版。",
    "事件时间缺时区标注，跨国用户对不上。",
    "横幅写死「运行正常」，有故障时尴尬——由数据推导。",
    "可用率数字四舍五入到整数，99.98% 显示成 100%。"
  ],
  "effectTags": [
    "状态页",
    "监控",
    "可用率"
  ]
};
