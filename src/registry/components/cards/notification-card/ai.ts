import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "通知卡",
    "en": "Notification Card",
    "aliases": [
      "消息卡",
      "通知列表",
      "notification item"
    ],
    "pattern": "Notification · Feed Item",
    "principle": "左侧类型图标（底色 = 类型色 10% 透明）+ 内容区 + 相对时间；未读状态用标题加粗 + 右上蓝点表达；「全部已读」按钮移除所有未读点并把粗体转常规，未读数徽标同步归零。"
  },
  "prompts": {
    "short": "做一组消息中心通知卡：审批/评论/系统三种类型图标色标、未读蓝点与粗体、相对时间（5 分钟前）、全部已读按钮。",
    "standard": "用原生 HTML/CSS/JS 实现通知卡列表：\n1. 结构：48px 图标位（圆角方块、类型色 10% 底、同色图标）+ 内容（标题 + 描述 13px 灰）+ 右上时间；\n2. 未读：标题 font-weight 650 + 右侧 8px 蓝点，已读转常规灰；\n3. 相对时间：timeAgo(ts) 函数——<60s 刚刚、<60m N 分钟前、<24h N 小时前，否则 M-D；\n4. 悬停：整卡 translateY(-1px) + 背景微变；卡片可点，点后自动转已读；\n5. 顶部栏：未读计数徽标 + 「全部已读」按钮——点击后所有蓝点消失、计数归 0、按钮禁用；\n6. aria：列表 role=\"feed\" 或 ul，未读卡片 aria-label 注明「未读」。",
    "refined": "扩展 NotificationFeed 类：虚拟滚动支持 200+ 条、类型过滤 tab（全部/未读/@我）、已读状态持久化 localStorage、新通知从顶部插入带滑入动画；未读数同步到页面标题 document.title 前缀。验收：① 千条列表滚动不掉帧；② 全部已读有批量动画不过卡顿；③ 刷新后状态保持。"
  },
  "knobs": [
    {
      "name": "图标底色透明度 iconBgAlpha",
      "default": "0.1",
      "range": "0.06 – 0.16",
      "effect": "类型图标底色浓度。"
    },
    {
      "name": "未读点尺寸 dotSize",
      "default": "8px",
      "range": "6 – 10px",
      "effect": "未读蓝点大小。"
    },
    {
      "name": "悬停位移 hoverLift",
      "default": "1px",
      "range": "0 – 3px",
      "effect": "列表卡片悬停位移，宜小不宜大。"
    }
  ],
  "pitfalls": [
    "未读只用颜色区分，色弱用户无感——叠加粗体或圆点双通道。",
    "相对时间渲染一次不再更新，挂机半天全错——定时器周期刷新。",
    "全部已读逐条发请求，应该批量接口 + 乐观更新。",
    "通知卡整卡可点但内嵌按钮没 stopPropagation。",
    "长描述不截断把时间戳挤出布局——两行 line-clamp。"
  ],
  "effectTags": [
    "通知",
    "消息",
    "列表"
  ]
};
