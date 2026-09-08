import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "更新日志页",
    "en": "Changelog Page",
    "aliases": [
      "版本日志",
      "发布记录",
      "release notes"
    ],
    "pattern": "Changelog · Version Timeline",
    "principle": "两栏布局：左栏粘性版本锚点列表（IntersectionObserver 监听右侧版本块进入视口后高亮对应锚点），右栏每版一块——版本号 + 日期 + 三类变更条目（新增绿 / 修复红 / 优化蓝）用色点标签区分。"
  },
  "prompts": {
    "short": "做一个产品更新日志页：左侧粘性版本导航随滚动高亮，右侧版本卡片含新增/修复/优化三色标签的变更列表。",
    "standard": "用原生 JS 实现更新日志模板：\n1. 布局：max-width 960 两栏——左栏 160px 粘性（position: sticky; top: 32px）锚点导航，右栏版本卡片流；窄屏导航隐藏或横向滚动；\n2. 版本块：版本号 15px 加粗 + 日期灰字 + 条目列表；每条 = 类型标签（新增 #16a34a / 修复 #dc2626 / 优化 #2563eb，10.5px 白字圆角）+ 描述 14px；\n3. 滚动高亮：IntersectionObserver rootMargin -40% 观察各版本块，进入即给左栏对应锚点加 .is-active（主色 + 左侧实线）；\n4. 时间轴：右栏左缘 2px 竖线贯穿，每版一个圆节点与版本号平齐；\n5. 点击锚点 smooth scrollTo 对应版本；\n6. 「订阅更新」按钮置顶右角。",
    "refined": "增强：版本块入场淡入（一次性）、「展开完整日志」折叠早期版本（默认显示最近 3 版）、订阅弹窗（邮箱本地校验）、深色主题变量化；条目支持外链。验收：① 快速滚动高亮不抖动；② 折叠展开平滑；③ 锚点 URL hash 可直达版本。"
  },
  "knobs": [
    {
      "name": "导航宽度 navW",
      "default": "160px",
      "range": "120 – 200px",
      "effect": "左栏版本导航宽度。"
    },
    {
      "name": "粘性偏移 stickyTop",
      "default": "32px",
      "range": "16 – 64px",
      "effect": "导航吸顶距离。"
    },
    {
      "name": "显示版本数 visibleVersions",
      "default": "3",
      "range": "2 – 6",
      "effect": "默认展开的最近版本数。"
    }
  ],
  "pitfalls": [
    "滚动高亮用 scroll 事件逐帧计算，多个版本块切换时抖动——IntersectionObserver 更稳。",
    "粘性导航高度超过视口，后面的锚点点不到——限制高度内部滚动。",
    "变更类型只用颜色区分，色弱不可读——标签内写文字。",
    "日期格式不做本地化，国际用户困惑。",
    "版本块间距过大导致锚点跳转后定位偏移，scroll-margin-top 要配 sticky 高度。"
  ],
  "effectTags": [
    "更新日志",
    "时间轴",
    "版本"
  ]
};
