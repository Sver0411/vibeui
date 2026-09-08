export interface Collection {
  slug: string;
  title: string;
  description: string;
  memberSlugs: string[];
}

/**
 * Curated collections. Covers are generated from real member previews —
 * no stock imagery. Members must exist in the resource registry.
 */
export const COLLECTIONS: Collection[] = [
  {
    slug: "interaction-lab",
    title: "复杂交互实验",
    description:
      "粒子、噪声、路径、像素处理与生成式模拟：优先收录一眼能看出技术含量的效果。",
    memberSlugs: [
      "gooey-morph-menu",
      "pixel-dissolve-reveal",
      "kinetic-path-text",
      "particle-flow-field",
      "confetti-burst",
    ],
  },
  {
    slug: "generative-canvas",
    title: "Canvas 生成艺术",
    description: "体素城市由浏览器实时计算生成。",
    memberSlugs: [
      "isometric-voxel-city",
    ],
  },
  {
    slug: "kinetic-type-lab",
    title: "动力文字实验",
    description: "让字形跟随路径与景深运动，而不只是普通淡入淡出。",
    memberSlugs: [
      "kinetic-path-text",
      "ascii-depth-portrait",
    ],
  },
  {
    slug: "advanced-buttons",
    title: "高级按钮设计",
    description:
      "超越 :hover 的按钮：磁性吸附、液态填充、描边绘制与长按确认等交互模式。",
    memberSlugs: [
      "liquid-button",
      "magnetic-button",
      "border-draw-button",
      "ripple-button",
      "loading-button",
      "hold-to-confirm",
      "split-button",
    ],
  },
  {
    slug: "minimal-login-pages",
    title: "极简登录页面",
    description:
      "克制、专注的登录界面，以及支撑它们的输入框与 OTP 验证码组件。",
    memberSlugs: ["login-page", "floating-label-input", "password-strength", "otp-input"],
  },
  {
    slug: "loading-animations",
    title: "加载动画合集",
    description:
      "加载点、骨架屏与进度条，让等待中的界面依然保持生命力和反馈感。",
    memberSlugs: [
      "dot-loader",
      "skeleton-shimmer",
      "gauge-fill",
      "flip-clock",
      "page-loader",
      "skeleton-card",
      "circular-progress",
      "linear-progress",
      "multi-step-progress",
      "skeleton-table",
    ],
  },
  {
    slug: "glassmorphism-kit",
    title: "玻璃拟态组件",
    description:
      "磨砂玻璃表面、半透明层与极光背景，营造层次感而不显杂乱。",
    memberSlugs: ["glass-card", "aurora-background", "login-page", "minimal-navbar"],
  },
  {
    slug: "dashboard-components",
    title: "管理后台组件",
    description:
      "搭建后台与数据面板所需的积木：进度、骨架屏、侧边栏与完整仪表盘。",
    memberSlugs: [
      "analytics-dashboard",
      "collapsible-sidebar",
      "multi-step-progress",
      "skeleton-card",
      "profile-card",
      "donut-chart",
      "sparkline-chart",
      "kanban-board",
      "job-card",
      "notification-card",
    ],
  },
  {
    slug: "creative-cursor",
    title: "创意鼠标效果",
    description:
      "对指针做出反应的页面与按钮：辉光、磁吸与 3D 倾斜全部由鼠标驱动。",
    memberSlugs: ["cursor-glow", "magnetic-button", "tilt-card", "spotlight-card"],
  },
  {
    slug: "scroll-interactions",
    title: "滚动交互合集",
    description:
      "随滚动揭示内容、追踪阅读进度，动效克制且遵循系统减少动态偏好。",
    memberSlugs: ["scroll-reveal", "scroll-progress", "reading-progress", "text-reveal", "number-counter"],
  },
  {
    slug: "3d-cards",
    title: "3D 卡片合集",
    description: "用纯 CSS 透视变换让卡片拥有物理质感，无需引入重型库。",
    memberSlugs: ["tilt-card", "expandable-card", "product-card"],
  },
  {
    slug: "ecommerce-ui",
    title: "电商 UI 套件",
    description: "商品卡、商品详情页与上传流程，覆盖线上店铺的核心界面。",
    memberSlugs: [
      "product-card",
      "product-detail",
      "file-upload",
      "search-input",
      "filters-sidebar",
      "wallet-card",
      "invoice-card",
      "podcast-card",
    ],
  },
  {
    slug: "mobile-navigation",
    title: "移动端导航",
    description: "为小屏幕设计的触摸友好菜单、Dock 与导航组件。",
    memberSlugs: ["mobile-menu", "floating-dock", "animated-tabs", "minimal-navbar"],
  },
  {
    slug: "pure-css-effects",
    title: "纯 CSS 动效",
    description: "零 JavaScript——描边、极光与玻璃效果全部由 CSS 独立完成。",
    memberSlugs: [
      "border-draw-button",
      "glass-card",
      "grid-background",
      "aurora-background",
      "text-reveal",
      "glitch-text",
      "flip-card",
      "bounce-in",
    ],
  },
  {
    slug: "saas-essentials",
    title: "SaaS 必备组件",
    description: "落地页、定价页、设置页，以及 SaaS 产品反复用到的通用组件。",
    memberSlugs: [
      "saas-landing",
      "pricing-page",
      "settings-template",
      "command-menu",
      "cookie-consent",
      "inline-edit",
      "currency-input",
      "nps-scale",
      "countdown-timer",
      "announcement-bar",
      "combobox-autocomplete",
      "changelog-page",
    ],
  },
  {
    slug: "landing-page-blocks",
    title: "落地页区块",
    description:
      "从首屏、功能区、定价、FAQ 到行动号召：拼一拼就是一张完整的营销落地页。",
    memberSlugs: [
      "hero-centered",
      "hero-split",
      "features-grid",
      "stats-bar",
      "pricing-table",
      "testimonial-wall",
      "faq-accordion",
      "cta-banner",
      "how-it-works",
      "comparison-table",
      "integrations-grid",
      "trust-badges",
    ],
  },
  {
    slug: "design-system-primitives",
    title: "设计系统微元素",
    description:
      "开关、徽章、评分、Toast 这些每天都要写一遍的小东西，收齐一整套。",
    memberSlugs: [
      "toggle-switch",
      "checkbox-card",
      "segmented-control",
      "rating-stars",
      "badge-chip",
      "tooltip-css",
      "spinner-set",
      "link-hover",
      "toast-stack",
      "context-menu",
      "multi-select",
      "callout",
      "popover",
      "toggle-group",
      "scroll-shadow",
      "combobox-autocomplete",
    ],
  },
];
