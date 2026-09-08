import type { ResourceAILayer, ResourceKnob, UIResourceMeta } from "@/types/resource";

/**
 * Canonical English names for search and prompt writing. The Chinese names
 * remain the primary labels in the UI; these are the terms commonly used in
 * design systems, frontend documentation and AI coding prompts.
 */
const ENGLISH_TERMS: Record<string, string> = {
  "liquid-button": "Liquid Fill Button",
  "magnetic-button": "Magnetic Button",
  "border-draw-button": "SVG Border Draw Button",
  "ripple-button": "Material Ripple Button",
  "loading-button": "Async State Button",
  "hold-to-confirm": "Press-and-Hold Confirmation Button",
  "linear-progress": "Linear Progress Bar",
  "circular-progress": "Circular Progress Ring",
  "multi-step-progress": "Multi-step Progress Stepper",
  "upload-progress": "Upload Progress Row",
  "scroll-progress": "Reading Progress Indicator",
  "skeleton-card": "Skeleton Loading Card",
  "dot-loader": "Staggered Dot Loader",
  "page-loader": "Fullscreen Splash Loader",
  "tilt-card": "Pointer-driven 3D Tilt Card",
  "spotlight-card": "Cursor Spotlight Card",
  "glass-card": "Glassmorphism Card",
  "expandable-card": "Inline Expandable Card",
  "product-card": "Commerce Product Card",
  "profile-card": "Profile Summary Card",
  "shared-layout-gallery": "FLIP Shared-layout Gallery",
  "minimal-navbar": "Scroll-aware Responsive Navbar",
  "mobile-menu": "Fullscreen Mobile Navigation Menu",
  "collapsible-sidebar": "Collapsible Navigation Sidebar",
  "floating-dock": "Distance-responsive Floating Dock",
  "animated-tabs": "Sliding Indicator Tabs",
  "command-menu": "Command Palette",
  "gooey-morph-menu": "Gooey Morphing Action Menu",
  breadcrumb: "Breadcrumb Navigation",
  pagination: "Pagination Control with Ellipsis Window",
  "floating-label-input": "Floating Label Input",
  "password-strength": "Password Strength Meter",
  "otp-input": "Segmented OTP Input",
  "search-input": "Autocomplete Search Combobox",
  "file-upload": "Drag-and-Drop File Upload",
  "multi-step-form": "Multi-step Form Wizard",
  "toggle-switch": "Toggle Switch",
  "checkbox-card": "Animated Checkbox Card",
  "badge-chip": "Status Badge and Removable Chip",
  "tooltip-css": "Pure CSS Directional Tooltip",
  "spinner-set": "CSS Loading Indicator Set",
  "link-hover": "Link Hover Micro-interactions",
  "rating-stars": "Half-step Star Rating Input",
  "segmented-control": "Segmented Control with Sliding Thumb",
  "toast-stack": "Toast Notification Stack",
  "text-reveal": "Masked Text Reveal",
  "number-counter": "Animated Number Counter",
  marquee: "Seamless Infinite Marquee",
  "cursor-glow": "Cursor-following Glow",
  "scroll-reveal": "Viewport Scroll Reveal",
  "page-transition": "Sequenced Page Transition",
  "aurora-background": "Aurora Background",
  "grid-background": "Animated Blueprint Grid Background",
  "click-spark": "Click Spark Particles",
  "text-scramble": "Progressive Text Scramble",
  "elastic-press": "Spring Press Interaction",
  "pixel-dissolve-reveal": "Noise-threshold Pixel Dissolve Reveal",
  "kinetic-path-text": "Momentum-driven SVG Path Typography",
  "particle-flow-field": "Interactive Canvas Particle Flow Field",
  "hero-centered": "Centered Conversion Hero",
  "hero-split": "Split-screen Product Hero",
  "features-grid": "Feature Grid",
  "testimonial-wall": "Masonry Testimonial Wall",
  "pricing-table": "Tiered Pricing Table",
  "faq-accordion": "FAQ Accordion",
  "cta-banner": "Call-to-action Banner",
  "stats-bar": "Key Metrics Bar",
  "login-page": "Glassmorphism Login Page",
  "analytics-dashboard": "Analytics Dashboard",
  "saas-landing": "SaaS Landing Page",
  "product-detail": "Configurable Product Detail Page",
  "portfolio-home": "Editorial Portfolio Homepage",
  "pricing-page": "Tiered Subscription Pricing Page",
  "settings-template": "Sectioned Product Settings Page",
  "empty-state": "Actionable Empty State",
};

const PATTERNS: Record<string, string> = {
  buttons: "Action Control · Micro-interaction",
  progress: "System Feedback · Progress",
  cards: "Content Surface · Interactive Card",
  navigation: "Navigation · Wayfinding",
  forms: "Form Interaction · Data Entry",
  primitives: "Design System Primitive",
  animations: "Motion Pattern · Visual Feedback",
  blocks: "Marketing Layout · Content Block",
  templates: "Page Architecture · Production Template",
};

const TYPE_LABELS: Record<string, string> = {
  component: "组件",
  animation: "动效",
  template: "页面模板",
  layout: "页面区块",
  effect: "视觉效果",
  page: "页面",
};

function unique(values: Array<string | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value?.trim())))];
}

function buildKnobs(meta: UIResourceMeta): ResourceKnob[] {
  const surface = meta.previewBackground === "dark" ? "深色表面" : "白色 / 浅色表面";
  const knobs: ResourceKnob[] = [
    {
      name: "视觉风格与主色",
      default: `${meta.styles.join("、") || "极简"}；主色 #0f766e`,
      range: "品牌色、表面色、文字色均可替换",
      effect: `决定${meta.name}与产品设计系统的匹配程度，当前按${surface}控制对比度。`,
    },
    {
      name: "尺寸、圆角与间距",
      default: "沿用示例比例与 8px 间距体系",
      range: "紧凑 / 默认 / 宽松",
      effect: "控制信息密度、点击面积和组件在不同容器中的体量。",
    },
  ];

  if (
    meta.type === "animation" ||
    meta.tags.some((tag) => /动画|动效|悬停|光标|滚动|加载/.test(tag))
  ) {
    knobs.push({
      name: "动效时长与缓动",
      default: "200–600ms；cubic-bezier(0.22, 1, 0.36, 1)",
      range: "即时反馈 120–240ms / 入场 320–700ms",
      effect: "决定反馈的利落度与柔和程度；循环背景应使用更慢的节奏。",
    });
  } else {
    knobs.push({
      name: "交互状态",
      default: "default / hover / focus-visible / active / disabled",
      effect: "保证鼠标、键盘和触屏下都有清晰且一致的状态反馈。",
    });
  }

  knobs.push({
    name: "响应式策略",
    default: meta.responsive ? "内容驱动宽度；768px 与 480px 两级检查" : "固定演示比例",
    range: "容器查询或媒体查询",
    effect: "决定窄屏是否换行、折叠、改为单列或降低动效复杂度。",
  });

  return knobs;
}

function buildPitfalls(meta: UIResourceMeta): string[] {
  const pitfalls: string[] = [];

  if (meta.type === "animation") {
    pitfalls.push(
      "不要通过频繁修改布局属性实现动画；优先使用 transform 与 opacity，并避免多个离屏实例持续运行。",
      "必须提供 prefers-reduced-motion 回退：停止循环或直接展示最终状态，不能让内容消失。",
    );
  } else if (meta.type === "template" || meta.type === "layout") {
    pitfalls.push(
      "不要只复刻桌面截图；需要明确移动端重排、长文案、本地化和真实数据为空时的布局。",
      "装饰元素不能破坏标题层级、语义结构和主行动的键盘可达性。",
    );
  } else {
    pitfalls.push(
      "不要只实现默认和 hover；必须补齐 focus-visible、active、disabled 以及键盘操作。",
      "自定义外观不能牺牲原生语义；按钮、输入、进度与对话框应使用正确元素和 ARIA。",
    );
  }

  if (meta.technologies.includes("JavaScript")) {
    pitfalls.push(
      "事件监听、计时器、Observer 与 requestAnimationFrame 必须可清理，重复挂载不能累积副作用。",
    );
  } else {
    pitfalls.push(
      "纯 CSS 已能完成的状态不要额外引入 JavaScript；同时为不支持的新特性提供稳定回退。",
    );
  }

  pitfalls.push(
    meta.responsive
      ? "不要写死只适合演示画布的宽高；在窄屏、长内容和 200% 缩放下都要保持完整可用。"
      : "固定比例的视觉需要明确 overflow 与裁切策略，不能意外制造横向滚动条。",
  );

  return pitfalls;
}

function stackFor(meta: UIResourceMeta, framework?: "React" | "Vue"): string {
  if (framework === "React") return "React + TypeScript + CSS（不依赖组件库）";
  if (framework === "Vue") return "Vue 3 + TypeScript + scoped CSS（Composition API）";
  const stack = meta.technologies.filter((technology) => technology !== "React");
  return stack.length > 0 ? stack.join(" + ") : "语义化 HTML + CSS";
}

function standardPrompt(meta: UIResourceMeta, framework?: "React" | "Vue"): string {
  const term = ENGLISH_TERMS[meta.slug] ?? meta.name;
  const typeLabel = TYPE_LABELS[meta.type] ?? "界面资源";
  const styles = meta.styles.join("、") || "简洁现代";
  const technologies = stackFor(meta, framework);

  return [
    `请用 ${technologies} 实现一个“${meta.name}”（${term}）${typeLabel}。`,
    "",
    `目标：${meta.description}`,
    `视觉：${styles}，使用白色或浅色中性表面、清晰层级和克制的 #0f766e 强调色。`,
    "",
    "实现要求：",
    `1. 结构语义化，核心功能可真实交互，不要只画静态截图；`,
    `2. 覆盖默认、hover、focus-visible、active、disabled，以及该资源需要的加载、成功、错误或空状态；`,
    `3. ${meta.responsive ? "内容宽度自适应，在 768px 与 480px 下合理换行或重排，不允许横向溢出" : "保持指定视觉比例，并明确容器的裁切与溢出策略"}；`,
    "4. 键盘可操作，使用正确的 HTML 元素与 ARIA；不能只靠颜色传达状态；",
    "5. 动效只使用必要的 transform / opacity，支持 prefers-reduced-motion，并在离屏或卸载时停止副作用；",
    "6. 将颜色、圆角、间距、尺寸和动效时长提取为易修改的 CSS 变量或组件参数；",
    "7. 输出可直接运行的完整代码，不省略样式、事件处理、清理逻辑和示例内容。",
  ].join("\n");
}

function refinedPrompt(meta: UIResourceMeta): string {
  const tags = unique(meta.tags).slice(0, 6).join("、");
  const compatibility = meta.compatibility?.join(" / ") || "现代浏览器";

  return [
    standardPrompt(meta),
    "",
    "精调参数：",
    "- 用 CSS 变量暴露 --accent、--surface、--radius、--gap、--duration、--ease；",
    `- 视觉关键词：${meta.styles.join("、") || "极简"}；效果关键词：${tags}；`,
    "- 默认使用浅色画布与白色表面，正文对比度达到 WCAG AA；",
    "- 触控目标不小于 44×44px，焦点环清晰且不被 overflow 裁掉；",
    "- 循环动效在页面不可见时暂停，快速连续操作不会产生重复计时器或状态竞争。",
    "",
    "验收标准：",
    "1. 首次打开即可理解用途，主要操作在鼠标、键盘和触屏上结果一致；",
    "2. 320px 宽、长文案、200% 缩放和减少动态模式下仍完整显示；",
    "3. 浏览器控制台无错误，事件与动画在卸载后不再运行；",
    `4. 兼容范围：${compatibility}；`,
    "5. 代码可独立复制，命名有作用域，不污染宿主页面全局样式。",
  ].join("\n");
}

/** Supply a complete, useful AI layer for metadata that has no hand-written one. */
export function buildResourceAI(meta: UIResourceMeta): ResourceAILayer {
  const english =
    ENGLISH_TERMS[meta.slug] ??
    meta.slug
      .split("-")
      .map((part) => part[0]?.toUpperCase() + part.slice(1))
      .join(" ");
  const aliases = unique([meta.subcategory, ...meta.tags])
    .filter((alias) => alias !== meta.name)
    .slice(0, 5);

  return {
    terms: {
      zh: meta.name,
      en: english,
      aliases,
      pattern: PATTERNS[meta.category] ?? "UI Pattern",
      principle: `核心做法是：${meta.description.replace(/[。.]$/, "")}，并把视觉、状态与交互约束封装成可复用实现。`,
    },
    prompts: {
      short: `做一个“${meta.name}”（${english}）：${meta.description} 使用浅色高级视觉，响应式、可访问、可直接运行和复制。`,
      standard: standardPrompt(meta),
      refined: refinedPrompt(meta),
      byFramework: {
        react: `${standardPrompt(meta, "React")}\n8. 写成可复用函数组件，定义清晰的 Props；状态只保留最小来源，useEffect 必须返回清理函数。`,
        vue: `${standardPrompt(meta, "Vue")}\n8. 写成单文件组件，使用 <script setup lang="ts">；通过 props / emits 暴露外部控制，副作用在 onUnmounted 中清理。`,
      },
    },
    knobs: buildKnobs(meta),
    pitfalls: buildPitfalls(meta),
    effectTags: unique(meta.tags).slice(0, 6),
  };
}
