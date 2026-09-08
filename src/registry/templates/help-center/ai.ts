import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "帮助中心页",
    "en": "Help Center",
    "aliases": [
      "帮助页",
      "支持中心",
      "FAQ page"
    ],
    "pattern": "Help Center · Search-first Support",
    "principle": "搜索优先的单列布局：大号搜索框置顶并在输入时联动过滤下方分类文章列表；分类卡片用图标 + 标题 + 篇数聚合入口；空结果态给出反馈引导换词。"
  },
  "prompts": {
    "short": "做一个帮助中心页面：居中大搜索框（热门搜索标签）、四张分类卡入口、下方常见问题列表可按关键词过滤，空结果有引导态。",
    "standard": "用原生 HTML/CSS/JS 实现帮助中心模板：\n1. 顶部：居中 hero——标题 + 大搜索框（48px 高、圆角 999、放大镜图标、focus 外扩阴影）+ 热门搜索标签（点击填入并触发过滤）；\n2. 分类卡：grid 4 列（窄屏 2 列 / 1 列），每张 = 36px 图标 + 分类名 + 篇数灰字，hover 边框变主色 + 轻微上浮；\n3. 文章列表：分组标题 + 链接行（hover 变主色、前置 »），data-keywords 存搜索关键词；\n4. 搜索逻辑：input 事件里把关键词与 data-keywords 包含匹配，命中分组显示、未命中隐藏；全部为空时显示空态（「没找到，换个词试试」+ 清空按钮）；\n5. 页脚极简：联系方式 + 邮箱按钮。",
    "refined": "增强为可交互的支持中心：搜索支持拼音首字母与简单同义词映射；分类卡点击锚点滚动到对应分组并高亮 1.5s；文章链接 hover 时右侧箭头位移；埋点 hook onSearch(term) 与 onArticleOpen(slug) 以回调形式暴露。验收：① 输入防抖 150ms；② 空态、命中态、初始态切换无跳动；③ 移动端单列不破版。"
  },
  "knobs": [
    {
      "name": "搜索防抖 debounceMs",
      "default": "150ms",
      "range": "0 – 300ms",
      "effect": "过滤触发延迟，大列表建议 200ms。"
    },
    {
      "name": "分类列数 columns",
      "default": "4",
      "range": "2 – 5",
      "effect": "卡片横排数量，窄屏自动降级。"
    },
    {
      "name": "命中策略 matchMode",
      "default": "包含",
      "effect": "关键词与 data-keywords 的匹配方式，可扩展拼音。"
    }
  ],
  "pitfalls": [
    "搜索无防抖，每敲一个字全量过滤长列表造成卡顿。",
    "空结果态缺失，用户搜不到时面对一片空白不知所措。",
    "热门标签点击只填充输入框不触发过滤，交互断了。",
    "分类图标用 emoji 尺寸不齐，换 SVG 线性图标统一 1.5px 描边。",
    "帮助页忘做移动端断点，四列卡片在手机上挤成一条。"
  ],
  "effectTags": [
    "帮助中心",
    "搜索",
    "模板"
  ]
};
