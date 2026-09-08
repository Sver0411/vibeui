// 客户端安全：全部资源瘦元数据（不含 ai prompts/knobs/pitfalls）。
// ai 数据由 scripts/split-registry-ai.mjs 拆分到各资源 ai.ts，经 ai-data.ts（服务端）与 ai-terms.ts（客户端词表）注入。
import type { UIResourceMeta } from "@/types/resource";

import { meta as liquidButton } from "./components/buttons/liquid-button/metadata";
import { meta as magneticButton } from "./components/buttons/magnetic-button/metadata";
import { meta as borderDrawButton } from "./components/buttons/border-draw-button/metadata";
import { meta as splitButton } from "./components/buttons/split-button/metadata";
import { meta as scrollSpy } from "./components/navigation/scroll-spy/metadata";
import { meta as scrollShadow } from "./components/primitives/scroll-shadow/metadata";
import { meta as rippleButton } from "./components/buttons/ripple-button/metadata";
import { meta as loadingButton } from "./components/buttons/loading-button/metadata";
import { meta as holdToConfirm } from "./components/buttons/hold-to-confirm/metadata";
import { meta as linearProgress } from "./components/progress/linear-progress/metadata";
import { meta as circularProgress } from "./components/progress/circular-progress/metadata";
import { meta as multiStepProgress } from "./components/progress/multi-step-progress/metadata";
import { meta as uploadProgress } from "./components/progress/upload-progress/metadata";
import { meta as scrollProgress } from "./components/progress/scroll-progress/metadata";
import { meta as skeletonCard } from "./components/progress/skeleton-card/metadata";
import { meta as dotLoader } from "./components/progress/dot-loader/metadata";
import { meta as pageLoader } from "./components/progress/page-loader/metadata";
import { meta as skeletonTable } from "./components/progress/skeleton-table/metadata";
import { meta as tiltCard } from "./components/cards/tilt-card/metadata";
import { meta as spotlightCard } from "./components/cards/spotlight-card/metadata";
import { meta as glassCard } from "./components/cards/glass-card/metadata";
import { meta as expandableCard } from "./components/cards/expandable-card/metadata";
import { meta as productCard } from "./components/cards/product-card/metadata";
import { meta as jobCard } from "./components/cards/job-card/metadata";
import { meta as courseCard } from "./components/cards/course-card/metadata";
import { meta as notificationCard } from "./components/cards/notification-card/metadata";
import { meta as articleCard } from "./components/cards/article-card/metadata";
import { meta as fileCard } from "./components/cards/file-card/metadata";
import { meta as walletCard } from "./components/cards/wallet-card/metadata";
import { meta as flightCard } from "./components/cards/flight-card/metadata";
import { meta as invoiceCard } from "./components/cards/invoice-card/metadata";
import { meta as podcastCard } from "./components/cards/podcast-card/metadata";
import { meta as profileCard } from "./components/cards/profile-card/metadata";
import { meta as sharedLayoutGallery } from "./components/cards/shared-layout-gallery/metadata";
import { meta as statsCard } from "./components/cards/stats-card/metadata";
import { meta as imageComparison } from "./components/cards/image-comparison/metadata";
import { meta as donutChart } from "./components/cards/donut-chart/metadata";
import { meta as sparklineChart } from "./components/cards/sparkline-chart/metadata";
import { meta as musicPlayerCard } from "./components/cards/music-player-card/metadata";
import { meta as weatherCard } from "./components/cards/weather-card/metadata";
import { meta as orderTrackingCard } from "./components/cards/order-tracking-card/metadata";
import { meta as codeSnippetCard } from "./components/cards/code-snippet-card/metadata";
import { meta as minimalNavbar } from "./components/navigation/minimal-navbar/metadata";
import { meta as mobileMenu } from "./components/navigation/mobile-menu/metadata";
import { meta as collapsibleSidebar } from "./components/navigation/collapsible-sidebar/metadata";
import { meta as floatingDock } from "./components/navigation/floating-dock/metadata";
import { meta as animatedTabs } from "./components/navigation/animated-tabs/metadata";
import { meta as commandMenu } from "./components/navigation/command-menu/metadata";
import { meta as gooeyMorphMenu } from "./components/navigation/gooey-morph-menu/metadata";
import { meta as breadcrumb } from "./components/navigation/breadcrumb/metadata";
import { meta as pagination } from "./components/navigation/pagination/metadata";
import { meta as drawer } from "./components/navigation/drawer/metadata";
import { meta as bottomSheet } from "./components/navigation/bottom-sheet/metadata";
import { meta as stepNav } from "./components/navigation/step-nav/metadata";
import { meta as dropdownMenu } from "./components/navigation/dropdown-menu/metadata";
import { meta as filtersSidebar } from "./components/navigation/filters-sidebar/metadata";
import { meta as megaMenu } from "./components/navigation/mega-menu/metadata";
import { meta as treeMenu } from "./components/navigation/tree-menu/metadata";
import { meta as treeSelect } from "./components/forms/tree-select/metadata";
import { meta as comboboxAutocomplete } from "./components/forms/combobox-autocomplete/metadata";
import { meta as currencyInput } from "./components/forms/currency-input/metadata";
import { meta as npsScale } from "./components/forms/nps-scale/metadata";
import { meta as inlineEdit } from "./components/forms/inline-edit/metadata";
import { meta as colorPicker } from "./components/forms/color-picker/metadata";
import { meta as multiSelect } from "./components/forms/multi-select/metadata";
import { meta as mentionInput } from "./components/forms/mention-input/metadata";
import { meta as emojiPicker } from "./components/forms/emoji-picker/metadata";
import { meta as floatingLabelInput } from "./components/forms/floating-label-input/metadata";
import { meta as passwordStrength } from "./components/forms/password-strength/metadata";
import { meta as otpInput } from "./components/forms/otp-input/metadata";
import { meta as searchInput } from "./components/forms/search-input/metadata";
import { meta as fileUpload } from "./components/forms/file-upload/metadata";
import { meta as multiStepForm } from "./components/forms/multi-step-form/metadata";
import { meta as rangeSlider } from "./components/forms/range-slider/metadata";
import { meta as tagInput } from "./components/forms/tag-input/metadata";
import { meta as stepperInput } from "./components/forms/stepper-input/metadata";
import { meta as datePicker } from "./components/forms/date-picker/metadata";
import { meta as autoTextarea } from "./components/forms/auto-textarea/metadata";
import { meta as toggleSwitch } from "./components/primitives/toggle-switch/metadata";
import { meta as checkboxCard } from "./components/primitives/checkbox-card/metadata";
import { meta as badgeChip } from "./components/primitives/badge-chip/metadata";
import { meta as tooltipCss } from "./components/primitives/tooltip-css/metadata";
import { meta as spinnerSet } from "./components/primitives/spinner-set/metadata";
import { meta as linkHover } from "./components/primitives/link-hover/metadata";
import { meta as ratingStars } from "./components/primitives/rating-stars/metadata";
import { meta as segmentedControl } from "./components/primitives/segmented-control/metadata";
import { meta as callout } from "./components/primitives/callout/metadata";
import { meta as popover } from "./components/primitives/popover/metadata";
import { meta as toggleGroup } from "./components/primitives/toggle-group/metadata";
import { meta as countdownTimer } from "./components/primitives/countdown-timer/metadata";
import { meta as toastStack } from "./components/primitives/toast-stack/metadata";
import { meta as timeline } from "./components/primitives/timeline/metadata";
import { meta as kbdShortcut } from "./components/primitives/kbd-shortcut/metadata";
import { meta as copyButton } from "./components/primitives/copy-button/metadata";
import { meta as themeToggle } from "./components/primitives/theme-toggle/metadata";
import { meta as speedDial } from "./components/primitives/speed-dial/metadata";
import { meta as scrollToTop } from "./components/primitives/scroll-to-top/metadata";
import { meta as contextMenu } from "./components/primitives/context-menu/metadata";
import { meta as accordion } from "./components/primitives/accordion/metadata";
import { meta as counterBadge } from "./components/primitives/counter-badge/metadata";
import { meta as heatMapCalendar } from "./components/primitives/heat-map-calendar/metadata";
import { meta as textReveal } from "./animations/text-reveal/metadata";
import { meta as numberCounter } from "./animations/number-counter/metadata";
import { meta as marquee } from "./animations/marquee/metadata";
import { meta as cursorGlow } from "./animations/cursor-glow/metadata";
import { meta as scrollReveal } from "./animations/scroll-reveal/metadata";
import { meta as pageTransition } from "./animations/page-transition/metadata";
import { meta as auroraBackground } from "./animations/aurora-background/metadata";
import { meta as gridBackground } from "./animations/grid-background/metadata";
import { meta as clickSpark } from "./animations/click-spark/metadata";
import { meta as textScramble } from "./animations/text-scramble/metadata";
import { meta as elasticPress } from "./animations/elastic-press/metadata";
import { meta as pixelDissolveReveal } from "./animations/pixel-dissolve-reveal/metadata";
import { meta as kineticPathText } from "./animations/kinetic-path-text/metadata";
import { meta as particleFlowField } from "./animations/particle-flow-field/metadata";
import { meta as typewriter } from "./animations/typewriter/metadata";
import { meta as gradientText } from "./animations/gradient-text/metadata";
import { meta as blobBackground } from "./animations/blob-background/metadata";
import { meta as shineSweep } from "./animations/shine-sweep/metadata";
import { meta as confettiBurst } from "./animations/confetti-burst/metadata";
import { meta as shakeFeedback } from "./animations/shake-feedback/metadata";
import { meta as pulseRing } from "./animations/pulse-ring/metadata";
import { meta as borderBeam } from "./animations/border-beam/metadata";
import { meta as glowBorder } from "./animations/glow-border/metadata";
import { meta as glitchText } from "./animations/glitch-text/metadata";
import { meta as flipCard } from "./animations/flip-card/metadata";
import { meta as waveText } from "./animations/wave-text/metadata";
import { meta as textRotate } from "./animations/text-rotate/metadata";
import { meta as bounceIn } from "./animations/bounce-in/metadata";
import { meta as skeletonShimmer } from "./animations/skeleton-shimmer/metadata";
import { meta as radarSweep } from "./animations/radar-sweep/metadata";
import { meta as gaugeFill } from "./animations/gauge-fill/metadata";
import { meta as flipClock } from "./animations/flip-clock/metadata";
import { meta as readingProgress } from "./animations/reading-progress/metadata";
import { meta as mouseParallax } from "./animations/mouse-parallax/metadata";
import { meta as heroCentered } from "./blocks/hero-centered/metadata";
import { meta as heroSplit } from "./blocks/hero-split/metadata";
import { meta as featuresGrid } from "./blocks/features-grid/metadata";
import { meta as testimonialWall } from "./blocks/testimonial-wall/metadata";
import { meta as pricingTable } from "./blocks/pricing-table/metadata";
import { meta as faqAccordion } from "./blocks/faq-accordion/metadata";
import { meta as announcementBar } from "./blocks/announcement-bar/metadata";
import { meta as comparisonTable } from "./blocks/comparison-table/metadata";
import { meta as howItWorks } from "./blocks/how-it-works/metadata";
import { meta as integrationsGrid } from "./blocks/integrations-grid/metadata";
import { meta as trustBadges } from "./blocks/trust-badges/metadata";
import { meta as ctaBanner } from "./blocks/cta-banner/metadata";
import { meta as statsBar } from "./blocks/stats-bar/metadata";
import { meta as logoCloud } from "./blocks/logo-cloud/metadata";
import { meta as newsletterCta } from "./blocks/newsletter-cta/metadata";
import { meta as teamSection } from "./blocks/team-section/metadata";
import { meta as footerMinimal } from "./blocks/footer-minimal/metadata";
import { meta as cookieConsent } from "./blocks/cookie-consent/metadata";
import { meta as contactFormSection } from "./blocks/contact-form-section/metadata";
import { meta as appDownloadCta } from "./blocks/app-download-cta/metadata";
import { meta as galleryPage } from "./templates/gallery-page/metadata";
import { meta as loginPage } from "./templates/login-page/metadata";
import { meta as analyticsDashboard } from "./templates/analytics-dashboard/metadata";
import { meta as saasLanding } from "./templates/saas-landing/metadata";
import { meta as productDetail } from "./templates/product-detail/metadata";
import { meta as portfolioHome } from "./templates/portfolio-home/metadata";
import { meta as pricingPage } from "./templates/pricing-page/metadata";
import { meta as settingsTemplate } from "./templates/settings-template/metadata";
import { meta as emptyState } from "./templates/empty-state/metadata";
import { meta as notFoundPage } from "./templates/404-page/metadata";
import { meta as comingSoon } from "./templates/coming-soon/metadata";
import { meta as blogHome } from "./templates/blog-home/metadata";
import { meta as kanbanBoard } from "./templates/kanban-board/metadata";
import { meta as docsPage } from "./templates/docs-page/metadata";
import { meta as helpCenter } from "./templates/help-center/metadata";
import { meta as changelogPage } from "./templates/changelog-page/metadata";
import { meta as statusPage } from "./templates/status-page/metadata";
import { meta as teamPage } from "./templates/team-page/metadata";
import { meta as iconPlus } from "./icons/line-icons/icon-plus/metadata";
import { meta as iconCheckCircle } from "./icons/line-icons/icon-check-circle/metadata";
import { meta as iconHeart } from "./icons/line-icons/icon-heart/metadata";
import { meta as iconStar } from "./icons/line-icons/icon-star/metadata";
import { meta as iconMail } from "./icons/line-icons/icon-mail/metadata";
import { meta as iconLock } from "./icons/line-icons/icon-lock/metadata";
import { meta as logoWaveShield } from "./icons/logo-marks/logo-wave-shield/metadata";
import { meta as logoTriPrism } from "./icons/logo-marks/logo-tri-prism/metadata";
import { meta as logoSunMark } from "./icons/logo-marks/logo-sun-mark/metadata";
import { meta as logoHive } from "./icons/logo-marks/logo-hive/metadata";
import { meta as iconHomeLine } from "./icons/line-icons/icon-home-line/metadata";
import { meta as iconHomeBold } from "./icons/line-icons/icon-home-bold/metadata";
import { meta as iconHomeFill } from "./icons/line-icons/icon-home-fill/metadata";
import { meta as iconHomeDuo } from "./icons/line-icons/icon-home-duo/metadata";
import { meta as iconHomeBroken } from "./icons/line-icons/icon-home-broken/metadata";
import { meta as iconSearchLine } from "./icons/line-icons/icon-search-line/metadata";
import { meta as iconSearchBold } from "./icons/line-icons/icon-search-bold/metadata";
import { meta as iconSearchFill } from "./icons/line-icons/icon-search-fill/metadata";
import { meta as iconSearchDuo } from "./icons/line-icons/icon-search-duo/metadata";
import { meta as iconSearchBroken } from "./icons/line-icons/icon-search-broken/metadata";
import { meta as iconBellLine } from "./icons/line-icons/icon-bell-line/metadata";
import { meta as iconBellBold } from "./icons/line-icons/icon-bell-bold/metadata";
import { meta as iconBellFill } from "./icons/line-icons/icon-bell-fill/metadata";
import { meta as iconBellDuo } from "./icons/line-icons/icon-bell-duo/metadata";
import { meta as iconBellBroken } from "./icons/line-icons/icon-bell-broken/metadata";
import { meta as iconSettingsLine } from "./icons/line-icons/icon-settings-line/metadata";
import { meta as iconSettingsBold } from "./icons/line-icons/icon-settings-bold/metadata";
import { meta as iconSettingsFill } from "./icons/line-icons/icon-settings-fill/metadata";
import { meta as iconSettingsDuo } from "./icons/line-icons/icon-settings-duo/metadata";
import { meta as iconSettingsBroken } from "./icons/line-icons/icon-settings-broken/metadata";
import { meta as iconHeartLine } from "./icons/line-icons/icon-heart-line/metadata";
import { meta as iconHeartBold } from "./icons/line-icons/icon-heart-bold/metadata";
import { meta as iconHeartFill } from "./icons/line-icons/icon-heart-fill/metadata";
import { meta as iconHeartDuo } from "./icons/line-icons/icon-heart-duo/metadata";
import { meta as iconHeartBroken } from "./icons/line-icons/icon-heart-broken/metadata";
import { meta as iconStarLine } from "./icons/line-icons/icon-star-line/metadata";
import { meta as iconStarBold } from "./icons/line-icons/icon-star-bold/metadata";
import { meta as iconStarFill } from "./icons/line-icons/icon-star-fill/metadata";
import { meta as iconStarDuo } from "./icons/line-icons/icon-star-duo/metadata";
import { meta as iconStarBroken } from "./icons/line-icons/icon-star-broken/metadata";
import { meta as iconUserLine } from "./icons/line-icons/icon-user-line/metadata";
import { meta as iconUserBold } from "./icons/line-icons/icon-user-bold/metadata";
import { meta as iconUserFill } from "./icons/line-icons/icon-user-fill/metadata";
import { meta as iconUserDuo } from "./icons/line-icons/icon-user-duo/metadata";
import { meta as iconUserBroken } from "./icons/line-icons/icon-user-broken/metadata";
import { meta as iconCameraLine } from "./icons/line-icons/icon-camera-line/metadata";
import { meta as iconCameraBold } from "./icons/line-icons/icon-camera-bold/metadata";
import { meta as iconCameraFill } from "./icons/line-icons/icon-camera-fill/metadata";
import { meta as iconCameraDuo } from "./icons/line-icons/icon-camera-duo/metadata";
import { meta as iconCameraBroken } from "./icons/line-icons/icon-camera-broken/metadata";
import { meta as iconMailLine } from "./icons/line-icons/icon-mail-line/metadata";
import { meta as iconMailBold } from "./icons/line-icons/icon-mail-bold/metadata";
import { meta as iconMailFill } from "./icons/line-icons/icon-mail-fill/metadata";
import { meta as iconMailDuo } from "./icons/line-icons/icon-mail-duo/metadata";
import { meta as iconMailBroken } from "./icons/line-icons/icon-mail-broken/metadata";
import { meta as iconLockLine } from "./icons/line-icons/icon-lock-line/metadata";
import { meta as iconLockBold } from "./icons/line-icons/icon-lock-bold/metadata";
import { meta as iconLockFill } from "./icons/line-icons/icon-lock-fill/metadata";
import { meta as iconLockDuo } from "./icons/line-icons/icon-lock-duo/metadata";
import { meta as iconLockBroken } from "./icons/line-icons/icon-lock-broken/metadata";
import { meta as iconDownloadLine } from "./icons/line-icons/icon-download-line/metadata";
import { meta as iconDownloadBold } from "./icons/line-icons/icon-download-bold/metadata";
import { meta as iconDownloadFill } from "./icons/line-icons/icon-download-fill/metadata";
import { meta as iconDownloadDuo } from "./icons/line-icons/icon-download-duo/metadata";
import { meta as iconDownloadBroken } from "./icons/line-icons/icon-download-broken/metadata";
import { meta as iconCalendarLine } from "./icons/line-icons/icon-calendar-line/metadata";
import { meta as iconCalendarBold } from "./icons/line-icons/icon-calendar-bold/metadata";
import { meta as iconCalendarFill } from "./icons/line-icons/icon-calendar-fill/metadata";
import { meta as iconCalendarDuo } from "./icons/line-icons/icon-calendar-duo/metadata";
import { meta as iconCalendarBroken } from "./icons/line-icons/icon-calendar-broken/metadata";
import { meta as iconClockLine } from "./icons/line-icons/icon-clock-line/metadata";
import { meta as iconClockBold } from "./icons/line-icons/icon-clock-bold/metadata";
import { meta as iconClockFill } from "./icons/line-icons/icon-clock-fill/metadata";
import { meta as iconClockDuo } from "./icons/line-icons/icon-clock-duo/metadata";
import { meta as iconClockBroken } from "./icons/line-icons/icon-clock-broken/metadata";
import { meta as iconChatLine } from "./icons/line-icons/icon-chat-line/metadata";
import { meta as iconChatBold } from "./icons/line-icons/icon-chat-bold/metadata";
import { meta as iconChatFill } from "./icons/line-icons/icon-chat-fill/metadata";
import { meta as iconChatDuo } from "./icons/line-icons/icon-chat-duo/metadata";
import { meta as iconChatBroken } from "./icons/line-icons/icon-chat-broken/metadata";
import { meta as iconCartLine } from "./icons/line-icons/icon-cart-line/metadata";
import { meta as iconCartBold } from "./icons/line-icons/icon-cart-bold/metadata";
import { meta as iconCartFill } from "./icons/line-icons/icon-cart-fill/metadata";
import { meta as iconCartDuo } from "./icons/line-icons/icon-cart-duo/metadata";
import { meta as iconCartBroken } from "./icons/line-icons/icon-cart-broken/metadata";
import { meta as iconPlayLine } from "./icons/line-icons/icon-play-line/metadata";
import { meta as iconPlayBold } from "./icons/line-icons/icon-play-bold/metadata";
import { meta as iconPlayFill } from "./icons/line-icons/icon-play-fill/metadata";
import { meta as iconPlayDuo } from "./icons/line-icons/icon-play-duo/metadata";
import { meta as iconPlayBroken } from "./icons/line-icons/icon-play-broken/metadata";
import { meta as iconTrashLine } from "./icons/line-icons/icon-trash-line/metadata";
import { meta as iconTrashBold } from "./icons/line-icons/icon-trash-bold/metadata";
import { meta as iconTrashFill } from "./icons/line-icons/icon-trash-fill/metadata";
import { meta as iconTrashDuo } from "./icons/line-icons/icon-trash-duo/metadata";
import { meta as iconTrashBroken } from "./icons/line-icons/icon-trash-broken/metadata";
import { meta as iconEditLine } from "./icons/line-icons/icon-edit-line/metadata";
import { meta as iconEditBold } from "./icons/line-icons/icon-edit-bold/metadata";
import { meta as iconEditFill } from "./icons/line-icons/icon-edit-fill/metadata";
import { meta as iconEditDuo } from "./icons/line-icons/icon-edit-duo/metadata";
import { meta as iconEditBroken } from "./icons/line-icons/icon-edit-broken/metadata";
import { meta as iconShareLine } from "./icons/line-icons/icon-share-line/metadata";
import { meta as iconShareBold } from "./icons/line-icons/icon-share-bold/metadata";
import { meta as iconShareFill } from "./icons/line-icons/icon-share-fill/metadata";
import { meta as iconShareDuo } from "./icons/line-icons/icon-share-duo/metadata";
import { meta as iconShareBroken } from "./icons/line-icons/icon-share-broken/metadata";
import { meta as iconBookmarkLine } from "./icons/line-icons/icon-bookmark-line/metadata";
import { meta as iconBookmarkBold } from "./icons/line-icons/icon-bookmark-bold/metadata";
import { meta as iconBookmarkFill } from "./icons/line-icons/icon-bookmark-fill/metadata";
import { meta as iconBookmarkDuo } from "./icons/line-icons/icon-bookmark-duo/metadata";
import { meta as iconBookmarkBroken } from "./icons/line-icons/icon-bookmark-broken/metadata";
import { meta as iconArrowLeftLine } from "./icons/line-icons/icon-arrow-left-line/metadata";
import { meta as iconArrowLeftBold } from "./icons/line-icons/icon-arrow-left-bold/metadata";
import { meta as iconArrowLeftFill } from "./icons/line-icons/icon-arrow-left-fill/metadata";
import { meta as iconArrowLeftDuo } from "./icons/line-icons/icon-arrow-left-duo/metadata";
import { meta as iconArrowLeftDot } from "./icons/line-icons/icon-arrow-left-dot/metadata";
import { meta as iconArrowRightLine } from "./icons/line-icons/icon-arrow-right-line/metadata";
import { meta as iconArrowRightBold } from "./icons/line-icons/icon-arrow-right-bold/metadata";
import { meta as iconArrowRightFill } from "./icons/line-icons/icon-arrow-right-fill/metadata";
import { meta as iconArrowRightDuo } from "./icons/line-icons/icon-arrow-right-duo/metadata";
import { meta as iconArrowRightDot } from "./icons/line-icons/icon-arrow-right-dot/metadata";
import { meta as iconArrowUpLine } from "./icons/line-icons/icon-arrow-up-line/metadata";
import { meta as iconArrowUpBold } from "./icons/line-icons/icon-arrow-up-bold/metadata";
import { meta as iconArrowUpFill } from "./icons/line-icons/icon-arrow-up-fill/metadata";
import { meta as iconArrowUpDuo } from "./icons/line-icons/icon-arrow-up-duo/metadata";
import { meta as iconArrowUpDot } from "./icons/line-icons/icon-arrow-up-dot/metadata";
import { meta as iconArrowDownLine } from "./icons/line-icons/icon-arrow-down-line/metadata";
import { meta as iconArrowDownBold } from "./icons/line-icons/icon-arrow-down-bold/metadata";
import { meta as iconArrowDownFill } from "./icons/line-icons/icon-arrow-down-fill/metadata";
import { meta as iconArrowDownDuo } from "./icons/line-icons/icon-arrow-down-duo/metadata";
import { meta as iconArrowDownDot } from "./icons/line-icons/icon-arrow-down-dot/metadata";
import { meta as iconChevronLeftLine } from "./icons/line-icons/icon-chevron-left-line/metadata";
import { meta as iconChevronLeftBold } from "./icons/line-icons/icon-chevron-left-bold/metadata";
import { meta as iconChevronLeftFill } from "./icons/line-icons/icon-chevron-left-fill/metadata";
import { meta as iconChevronLeftDuo } from "./icons/line-icons/icon-chevron-left-duo/metadata";
import { meta as iconChevronLeftDot } from "./icons/line-icons/icon-chevron-left-dot/metadata";
import { meta as iconChevronRightLine } from "./icons/line-icons/icon-chevron-right-line/metadata";
import { meta as iconChevronRightBold } from "./icons/line-icons/icon-chevron-right-bold/metadata";
import { meta as iconChevronRightFill } from "./icons/line-icons/icon-chevron-right-fill/metadata";
import { meta as iconChevronRightDuo } from "./icons/line-icons/icon-chevron-right-duo/metadata";
import { meta as iconChevronRightDot } from "./icons/line-icons/icon-chevron-right-dot/metadata";
import { meta as iconChevronUpLine } from "./icons/line-icons/icon-chevron-up-line/metadata";
import { meta as iconChevronUpBold } from "./icons/line-icons/icon-chevron-up-bold/metadata";
import { meta as iconChevronUpFill } from "./icons/line-icons/icon-chevron-up-fill/metadata";
import { meta as iconChevronUpDuo } from "./icons/line-icons/icon-chevron-up-duo/metadata";
import { meta as iconChevronUpDot } from "./icons/line-icons/icon-chevron-up-dot/metadata";
import { meta as iconChevronDownLine } from "./icons/line-icons/icon-chevron-down-line/metadata";
import { meta as iconChevronDownBold } from "./icons/line-icons/icon-chevron-down-bold/metadata";
import { meta as iconChevronDownFill } from "./icons/line-icons/icon-chevron-down-fill/metadata";
import { meta as iconChevronDownDuo } from "./icons/line-icons/icon-chevron-down-duo/metadata";
import { meta as iconChevronDownDot } from "./icons/line-icons/icon-chevron-down-dot/metadata";
import { meta as iconCheckLine } from "./icons/line-icons/icon-check-line/metadata";
import { meta as iconCheckBold } from "./icons/line-icons/icon-check-bold/metadata";
import { meta as iconCheckFill } from "./icons/line-icons/icon-check-fill/metadata";
import { meta as iconCheckDuo } from "./icons/line-icons/icon-check-duo/metadata";
import { meta as iconCheckDot } from "./icons/line-icons/icon-check-dot/metadata";
import { meta as iconXLine } from "./icons/line-icons/icon-x-line/metadata";
import { meta as iconXBold } from "./icons/line-icons/icon-x-bold/metadata";
import { meta as iconXFill } from "./icons/line-icons/icon-x-fill/metadata";
import { meta as iconXDuo } from "./icons/line-icons/icon-x-duo/metadata";
import { meta as iconXDot } from "./icons/line-icons/icon-x-dot/metadata";
import { meta as iconMinusLine } from "./icons/line-icons/icon-minus-line/metadata";
import { meta as iconMinusBold } from "./icons/line-icons/icon-minus-bold/metadata";
import { meta as iconMinusFill } from "./icons/line-icons/icon-minus-fill/metadata";
import { meta as iconMinusDuo } from "./icons/line-icons/icon-minus-duo/metadata";
import { meta as iconMinusDot } from "./icons/line-icons/icon-minus-dot/metadata";
import { meta as iconPlusLine } from "./icons/line-icons/icon-plus-line/metadata";
import { meta as iconPlusBold } from "./icons/line-icons/icon-plus-bold/metadata";
import { meta as iconPlusFill } from "./icons/line-icons/icon-plus-fill/metadata";
import { meta as iconPlusDuo } from "./icons/line-icons/icon-plus-duo/metadata";
import { meta as iconPlusDot } from "./icons/line-icons/icon-plus-dot/metadata";
import { meta as iconCheckCircleLine } from "./icons/line-icons/icon-check-circle-line/metadata";
import { meta as iconCheckCircleBold } from "./icons/line-icons/icon-check-circle-bold/metadata";
import { meta as iconCheckCircleFill } from "./icons/line-icons/icon-check-circle-fill/metadata";
import { meta as iconCheckCircleDuo } from "./icons/line-icons/icon-check-circle-duo/metadata";
import { meta as iconCheckCircleDot } from "./icons/line-icons/icon-check-circle-dot/metadata";
import { meta as iconXCircleLine } from "./icons/line-icons/icon-x-circle-line/metadata";
import { meta as iconXCircleBold } from "./icons/line-icons/icon-x-circle-bold/metadata";
import { meta as iconXCircleFill } from "./icons/line-icons/icon-x-circle-fill/metadata";
import { meta as iconXCircleDuo } from "./icons/line-icons/icon-x-circle-duo/metadata";
import { meta as iconXCircleDot } from "./icons/line-icons/icon-x-circle-dot/metadata";
import { meta as iconPlusCircleLine } from "./icons/line-icons/icon-plus-circle-line/metadata";
import { meta as iconPlusCircleBold } from "./icons/line-icons/icon-plus-circle-bold/metadata";
import { meta as iconPlusCircleFill } from "./icons/line-icons/icon-plus-circle-fill/metadata";
import { meta as iconPlusCircleDuo } from "./icons/line-icons/icon-plus-circle-duo/metadata";
import { meta as iconPlusCircleDot } from "./icons/line-icons/icon-plus-circle-dot/metadata";
import { meta as iconMinusCircleLine } from "./icons/line-icons/icon-minus-circle-line/metadata";
import { meta as iconMinusCircleBold } from "./icons/line-icons/icon-minus-circle-bold/metadata";
import { meta as iconMinusCircleFill } from "./icons/line-icons/icon-minus-circle-fill/metadata";
import { meta as iconMinusCircleDuo } from "./icons/line-icons/icon-minus-circle-duo/metadata";
import { meta as iconMinusCircleDot } from "./icons/line-icons/icon-minus-circle-dot/metadata";
import { meta as iconInfoLine } from "./icons/line-icons/icon-info-line/metadata";
import { meta as iconInfoBold } from "./icons/line-icons/icon-info-bold/metadata";
import { meta as iconInfoFill } from "./icons/line-icons/icon-info-fill/metadata";
import { meta as iconInfoDuo } from "./icons/line-icons/icon-info-duo/metadata";
import { meta as iconInfoDot } from "./icons/line-icons/icon-info-dot/metadata";
import { meta as iconHelpCircleLine } from "./icons/line-icons/icon-help-circle-line/metadata";
import { meta as iconHelpCircleBold } from "./icons/line-icons/icon-help-circle-bold/metadata";
import { meta as iconHelpCircleFill } from "./icons/line-icons/icon-help-circle-fill/metadata";
import { meta as iconHelpCircleDuo } from "./icons/line-icons/icon-help-circle-duo/metadata";
import { meta as iconHelpCircleDot } from "./icons/line-icons/icon-help-circle-dot/metadata";
import { meta as iconAlertTriangleLine } from "./icons/line-icons/icon-alert-triangle-line/metadata";
import { meta as iconAlertTriangleBold } from "./icons/line-icons/icon-alert-triangle-bold/metadata";
import { meta as iconAlertTriangleFill } from "./icons/line-icons/icon-alert-triangle-fill/metadata";
import { meta as iconAlertTriangleDuo } from "./icons/line-icons/icon-alert-triangle-duo/metadata";
import { meta as iconAlertTriangleDot } from "./icons/line-icons/icon-alert-triangle-dot/metadata";
import { meta as iconAlertCircleLine } from "./icons/line-icons/icon-alert-circle-line/metadata";
import { meta as iconAlertCircleBold } from "./icons/line-icons/icon-alert-circle-bold/metadata";
import { meta as iconAlertCircleFill } from "./icons/line-icons/icon-alert-circle-fill/metadata";
import { meta as iconAlertCircleDuo } from "./icons/line-icons/icon-alert-circle-duo/metadata";
import { meta as iconAlertCircleDot } from "./icons/line-icons/icon-alert-circle-dot/metadata";
import { meta as iconRefreshLine } from "./icons/line-icons/icon-refresh-line/metadata";
import { meta as iconRefreshBold } from "./icons/line-icons/icon-refresh-bold/metadata";
import { meta as iconRefreshFill } from "./icons/line-icons/icon-refresh-fill/metadata";
import { meta as iconRefreshDuo } from "./icons/line-icons/icon-refresh-duo/metadata";
import { meta as iconRefreshDot } from "./icons/line-icons/icon-refresh-dot/metadata";
import { meta as iconUndoLine } from "./icons/line-icons/icon-undo-line/metadata";
import { meta as iconUndoBold } from "./icons/line-icons/icon-undo-bold/metadata";
import { meta as iconUndoFill } from "./icons/line-icons/icon-undo-fill/metadata";
import { meta as iconUndoDuo } from "./icons/line-icons/icon-undo-duo/metadata";
import { meta as iconUndoDot } from "./icons/line-icons/icon-undo-dot/metadata";
import { meta as iconRedoLine } from "./icons/line-icons/icon-redo-line/metadata";
import { meta as iconRedoBold } from "./icons/line-icons/icon-redo-bold/metadata";
import { meta as iconRedoFill } from "./icons/line-icons/icon-redo-fill/metadata";
import { meta as iconRedoDuo } from "./icons/line-icons/icon-redo-duo/metadata";
import { meta as iconRedoDot } from "./icons/line-icons/icon-redo-dot/metadata";
import { meta as iconEyeLine } from "./icons/line-icons/icon-eye-line/metadata";
import { meta as iconEyeBold } from "./icons/line-icons/icon-eye-bold/metadata";
import { meta as iconEyeFill } from "./icons/line-icons/icon-eye-fill/metadata";
import { meta as iconEyeDuo } from "./icons/line-icons/icon-eye-duo/metadata";
import { meta as iconEyeDot } from "./icons/line-icons/icon-eye-dot/metadata";
import { meta as iconEyeOffLine } from "./icons/line-icons/icon-eye-off-line/metadata";
import { meta as iconEyeOffBold } from "./icons/line-icons/icon-eye-off-bold/metadata";
import { meta as iconEyeOffFill } from "./icons/line-icons/icon-eye-off-fill/metadata";
import { meta as iconEyeOffDuo } from "./icons/line-icons/icon-eye-off-duo/metadata";
import { meta as iconEyeOffDot } from "./icons/line-icons/icon-eye-off-dot/metadata";
import { meta as iconFilterLine } from "./icons/line-icons/icon-filter-line/metadata";
import { meta as iconFilterBold } from "./icons/line-icons/icon-filter-bold/metadata";
import { meta as iconFilterFill } from "./icons/line-icons/icon-filter-fill/metadata";
import { meta as iconFilterDuo } from "./icons/line-icons/icon-filter-duo/metadata";
import { meta as iconFilterDot } from "./icons/line-icons/icon-filter-dot/metadata";
import { meta as iconGridLine } from "./icons/line-icons/icon-grid-line/metadata";
import { meta as iconGridBold } from "./icons/line-icons/icon-grid-bold/metadata";
import { meta as iconGridFill } from "./icons/line-icons/icon-grid-fill/metadata";
import { meta as iconGridDuo } from "./icons/line-icons/icon-grid-duo/metadata";
import { meta as iconGridDot } from "./icons/line-icons/icon-grid-dot/metadata";
import { meta as iconListLine } from "./icons/line-icons/icon-list-line/metadata";
import { meta as iconListBold } from "./icons/line-icons/icon-list-bold/metadata";
import { meta as iconListFill } from "./icons/line-icons/icon-list-fill/metadata";
import { meta as iconListDuo } from "./icons/line-icons/icon-list-duo/metadata";
import { meta as iconListDot } from "./icons/line-icons/icon-list-dot/metadata";
import { meta as iconLayoutLine } from "./icons/line-icons/icon-layout-line/metadata";
import { meta as iconLayoutBold } from "./icons/line-icons/icon-layout-bold/metadata";
import { meta as iconLayoutFill } from "./icons/line-icons/icon-layout-fill/metadata";
import { meta as iconLayoutDuo } from "./icons/line-icons/icon-layout-duo/metadata";
import { meta as iconLayoutDot } from "./icons/line-icons/icon-layout-dot/metadata";
import { meta as iconColumnsLine } from "./icons/line-icons/icon-columns-line/metadata";
import { meta as iconColumnsBold } from "./icons/line-icons/icon-columns-bold/metadata";
import { meta as iconColumnsFill } from "./icons/line-icons/icon-columns-fill/metadata";
import { meta as iconColumnsDuo } from "./icons/line-icons/icon-columns-duo/metadata";
import { meta as iconColumnsDot } from "./icons/line-icons/icon-columns-dot/metadata";
import { meta as iconMaximizeLine } from "./icons/line-icons/icon-maximize-line/metadata";
import { meta as iconMaximizeBold } from "./icons/line-icons/icon-maximize-bold/metadata";
import { meta as iconMaximizeFill } from "./icons/line-icons/icon-maximize-fill/metadata";
import { meta as iconMaximizeDuo } from "./icons/line-icons/icon-maximize-duo/metadata";
import { meta as iconMaximizeDot } from "./icons/line-icons/icon-maximize-dot/metadata";
import { meta as iconMinimizeLine } from "./icons/line-icons/icon-minimize-line/metadata";
import { meta as iconMinimizeBold } from "./icons/line-icons/icon-minimize-bold/metadata";
import { meta as iconMinimizeFill } from "./icons/line-icons/icon-minimize-fill/metadata";
import { meta as iconMinimizeDuo } from "./icons/line-icons/icon-minimize-duo/metadata";
import { meta as iconMinimizeDot } from "./icons/line-icons/icon-minimize-dot/metadata";
import { meta as iconExternalLinkLine } from "./icons/line-icons/icon-external-link-line/metadata";
import { meta as iconExternalLinkBold } from "./icons/line-icons/icon-external-link-bold/metadata";
import { meta as iconExternalLinkFill } from "./icons/line-icons/icon-external-link-fill/metadata";
import { meta as iconExternalLinkDuo } from "./icons/line-icons/icon-external-link-duo/metadata";
import { meta as iconExternalLinkDot } from "./icons/line-icons/icon-external-link-dot/metadata";
import { meta as iconLinkLine } from "./icons/line-icons/icon-link-line/metadata";
import { meta as iconLinkBold } from "./icons/line-icons/icon-link-bold/metadata";
import { meta as iconLinkFill } from "./icons/line-icons/icon-link-fill/metadata";
import { meta as iconLinkDuo } from "./icons/line-icons/icon-link-duo/metadata";
import { meta as iconLinkDot } from "./icons/line-icons/icon-link-dot/metadata";
import { meta as iconAnchorLine } from "./icons/line-icons/icon-anchor-line/metadata";
import { meta as iconAnchorBold } from "./icons/line-icons/icon-anchor-bold/metadata";
import { meta as iconAnchorFill } from "./icons/line-icons/icon-anchor-fill/metadata";
import { meta as iconAnchorDuo } from "./icons/line-icons/icon-anchor-duo/metadata";
import { meta as iconAnchorDot } from "./icons/line-icons/icon-anchor-dot/metadata";
import { meta as iconPaperclipLine } from "./icons/line-icons/icon-paperclip-line/metadata";
import { meta as iconPaperclipBold } from "./icons/line-icons/icon-paperclip-bold/metadata";
import { meta as iconPaperclipFill } from "./icons/line-icons/icon-paperclip-fill/metadata";
import { meta as iconPaperclipDuo } from "./icons/line-icons/icon-paperclip-duo/metadata";
import { meta as iconPaperclipDot } from "./icons/line-icons/icon-paperclip-dot/metadata";
import { meta as iconCopyLine } from "./icons/line-icons/icon-copy-line/metadata";
import { meta as iconCopyBold } from "./icons/line-icons/icon-copy-bold/metadata";
import { meta as iconCopyFill } from "./icons/line-icons/icon-copy-fill/metadata";
import { meta as iconCopyDuo } from "./icons/line-icons/icon-copy-duo/metadata";
import { meta as iconCopyDot } from "./icons/line-icons/icon-copy-dot/metadata";
import { meta as iconClipboardLine } from "./icons/line-icons/icon-clipboard-line/metadata";
import { meta as iconClipboardBold } from "./icons/line-icons/icon-clipboard-bold/metadata";
import { meta as iconClipboardFill } from "./icons/line-icons/icon-clipboard-fill/metadata";
import { meta as iconClipboardDuo } from "./icons/line-icons/icon-clipboard-duo/metadata";
import { meta as iconClipboardDot } from "./icons/line-icons/icon-clipboard-dot/metadata";
import { meta as iconScissorsLine } from "./icons/line-icons/icon-scissors-line/metadata";
import { meta as iconScissorsBold } from "./icons/line-icons/icon-scissors-bold/metadata";
import { meta as iconScissorsFill } from "./icons/line-icons/icon-scissors-fill/metadata";
import { meta as iconScissorsDuo } from "./icons/line-icons/icon-scissors-duo/metadata";
import { meta as iconScissorsDot } from "./icons/line-icons/icon-scissors-dot/metadata";
import { meta as iconFolderLine } from "./icons/line-icons/icon-folder-line/metadata";
import { meta as iconFolderBold } from "./icons/line-icons/icon-folder-bold/metadata";
import { meta as iconFolderFill } from "./icons/line-icons/icon-folder-fill/metadata";
import { meta as iconFolderDuo } from "./icons/line-icons/icon-folder-duo/metadata";
import { meta as iconFolderDot } from "./icons/line-icons/icon-folder-dot/metadata";
import { meta as iconFolderOpenLine } from "./icons/line-icons/icon-folder-open-line/metadata";
import { meta as iconFolderOpenBold } from "./icons/line-icons/icon-folder-open-bold/metadata";
import { meta as iconFolderOpenFill } from "./icons/line-icons/icon-folder-open-fill/metadata";
import { meta as iconFolderOpenDuo } from "./icons/line-icons/icon-folder-open-duo/metadata";
import { meta as iconFolderOpenDot } from "./icons/line-icons/icon-folder-open-dot/metadata";
import { meta as iconFileLine } from "./icons/line-icons/icon-file-line/metadata";
import { meta as iconFileBold } from "./icons/line-icons/icon-file-bold/metadata";
import { meta as iconFileFill } from "./icons/line-icons/icon-file-fill/metadata";
import { meta as iconFileDuo } from "./icons/line-icons/icon-file-duo/metadata";
import { meta as iconFileDot } from "./icons/line-icons/icon-file-dot/metadata";
import { meta as iconFileTextLine } from "./icons/line-icons/icon-file-text-line/metadata";
import { meta as iconFileTextBold } from "./icons/line-icons/icon-file-text-bold/metadata";
import { meta as iconFileTextFill } from "./icons/line-icons/icon-file-text-fill/metadata";
import { meta as iconFileTextDuo } from "./icons/line-icons/icon-file-text-duo/metadata";
import { meta as iconFileTextDot } from "./icons/line-icons/icon-file-text-dot/metadata";
import { meta as iconBookLine } from "./icons/line-icons/icon-book-line/metadata";
import { meta as iconBookBold } from "./icons/line-icons/icon-book-bold/metadata";
import { meta as iconBookFill } from "./icons/line-icons/icon-book-fill/metadata";
import { meta as iconBookDuo } from "./icons/line-icons/icon-book-duo/metadata";
import { meta as iconBookDot } from "./icons/line-icons/icon-book-dot/metadata";
import { meta as iconBookOpenLine } from "./icons/line-icons/icon-book-open-line/metadata";
import { meta as iconBookOpenBold } from "./icons/line-icons/icon-book-open-bold/metadata";
import { meta as iconBookOpenFill } from "./icons/line-icons/icon-book-open-fill/metadata";
import { meta as iconBookOpenDuo } from "./icons/line-icons/icon-book-open-duo/metadata";
import { meta as iconBookOpenDot } from "./icons/line-icons/icon-book-open-dot/metadata";
import { meta as iconArchiveLine } from "./icons/line-icons/icon-archive-line/metadata";
import { meta as iconArchiveBold } from "./icons/line-icons/icon-archive-bold/metadata";
import { meta as iconArchiveFill } from "./icons/line-icons/icon-archive-fill/metadata";
import { meta as iconArchiveDuo } from "./icons/line-icons/icon-archive-duo/metadata";
import { meta as iconArchiveDot } from "./icons/line-icons/icon-archive-dot/metadata";
import { meta as iconInboxLine } from "./icons/line-icons/icon-inbox-line/metadata";
import { meta as iconInboxBold } from "./icons/line-icons/icon-inbox-bold/metadata";
import { meta as iconInboxFill } from "./icons/line-icons/icon-inbox-fill/metadata";
import { meta as iconInboxDuo } from "./icons/line-icons/icon-inbox-duo/metadata";
import { meta as iconInboxDot } from "./icons/line-icons/icon-inbox-dot/metadata";
import { meta as iconUploadLine } from "./icons/line-icons/icon-upload-line/metadata";
import { meta as iconUploadBold } from "./icons/line-icons/icon-upload-bold/metadata";
import { meta as iconUploadFill } from "./icons/line-icons/icon-upload-fill/metadata";
import { meta as iconUploadDuo } from "./icons/line-icons/icon-upload-duo/metadata";
import { meta as iconUploadDot } from "./icons/line-icons/icon-upload-dot/metadata";
import { meta as iconSendLine } from "./icons/line-icons/icon-send-line/metadata";
import { meta as iconSendBold } from "./icons/line-icons/icon-send-bold/metadata";
import { meta as iconSendFill } from "./icons/line-icons/icon-send-fill/metadata";
import { meta as iconSendDuo } from "./icons/line-icons/icon-send-duo/metadata";
import { meta as iconSendDot } from "./icons/line-icons/icon-send-dot/metadata";
import { meta as iconPhoneLine } from "./icons/line-icons/icon-phone-line/metadata";
import { meta as iconPhoneBold } from "./icons/line-icons/icon-phone-bold/metadata";
import { meta as iconPhoneFill } from "./icons/line-icons/icon-phone-fill/metadata";
import { meta as iconPhoneDuo } from "./icons/line-icons/icon-phone-duo/metadata";
import { meta as iconPhoneDot } from "./icons/line-icons/icon-phone-dot/metadata";
import { meta as iconMessageCircleLine } from "./icons/line-icons/icon-message-circle-line/metadata";
import { meta as iconMessageCircleBold } from "./icons/line-icons/icon-message-circle-bold/metadata";
import { meta as iconMessageCircleFill } from "./icons/line-icons/icon-message-circle-fill/metadata";
import { meta as iconMessageCircleDuo } from "./icons/line-icons/icon-message-circle-duo/metadata";
import { meta as iconMessageCircleDot } from "./icons/line-icons/icon-message-circle-dot/metadata";
import { meta as iconVideoLine } from "./icons/line-icons/icon-video-line/metadata";
import { meta as iconVideoBold } from "./icons/line-icons/icon-video-bold/metadata";
import { meta as iconVideoFill } from "./icons/line-icons/icon-video-fill/metadata";
import { meta as iconVideoDuo } from "./icons/line-icons/icon-video-duo/metadata";
import { meta as iconVideoDot } from "./icons/line-icons/icon-video-dot/metadata";
import { meta as iconMicLine } from "./icons/line-icons/icon-mic-line/metadata";
import { meta as iconMicBold } from "./icons/line-icons/icon-mic-bold/metadata";
import { meta as iconMicFill } from "./icons/line-icons/icon-mic-fill/metadata";
import { meta as iconMicDuo } from "./icons/line-icons/icon-mic-duo/metadata";
import { meta as iconMicDot } from "./icons/line-icons/icon-mic-dot/metadata";
import { meta as iconMicOffLine } from "./icons/line-icons/icon-mic-off-line/metadata";
import { meta as iconMicOffBold } from "./icons/line-icons/icon-mic-off-bold/metadata";
import { meta as iconMicOffFill } from "./icons/line-icons/icon-mic-off-fill/metadata";
import { meta as iconMicOffDuo } from "./icons/line-icons/icon-mic-off-duo/metadata";
import { meta as iconMicOffDot } from "./icons/line-icons/icon-mic-off-dot/metadata";
import { meta as iconVolume2Line } from "./icons/line-icons/icon-volume-2-line/metadata";
import { meta as iconVolume2Bold } from "./icons/line-icons/icon-volume-2-bold/metadata";
import { meta as iconVolume2Fill } from "./icons/line-icons/icon-volume-2-fill/metadata";
import { meta as iconVolume2Duo } from "./icons/line-icons/icon-volume-2-duo/metadata";
import { meta as iconVolume2Dot } from "./icons/line-icons/icon-volume-2-dot/metadata";
import { meta as iconVolumeXLine } from "./icons/line-icons/icon-volume-x-line/metadata";
import { meta as iconVolumeXBold } from "./icons/line-icons/icon-volume-x-bold/metadata";
import { meta as iconVolumeXFill } from "./icons/line-icons/icon-volume-x-fill/metadata";
import { meta as iconVolumeXDuo } from "./icons/line-icons/icon-volume-x-duo/metadata";
import { meta as iconVolumeXDot } from "./icons/line-icons/icon-volume-x-dot/metadata";
import { meta as iconTvLine } from "./icons/line-icons/icon-tv-line/metadata";
import { meta as iconTvBold } from "./icons/line-icons/icon-tv-bold/metadata";
import { meta as iconTvFill } from "./icons/line-icons/icon-tv-fill/metadata";
import { meta as iconTvDuo } from "./icons/line-icons/icon-tv-duo/metadata";
import { meta as iconTvDot } from "./icons/line-icons/icon-tv-dot/metadata";
import { meta as iconTabletLine } from "./icons/line-icons/icon-tablet-line/metadata";
import { meta as iconTabletBold } from "./icons/line-icons/icon-tablet-bold/metadata";
import { meta as iconTabletFill } from "./icons/line-icons/icon-tablet-fill/metadata";
import { meta as iconTabletDuo } from "./icons/line-icons/icon-tablet-duo/metadata";
import { meta as iconTabletDot } from "./icons/line-icons/icon-tablet-dot/metadata";
import { meta as iconLaptopLine } from "./icons/line-icons/icon-laptop-line/metadata";
import { meta as iconLaptopBold } from "./icons/line-icons/icon-laptop-bold/metadata";
import { meta as iconLaptopFill } from "./icons/line-icons/icon-laptop-fill/metadata";
import { meta as iconLaptopDuo } from "./icons/line-icons/icon-laptop-duo/metadata";
import { meta as iconLaptopDot } from "./icons/line-icons/icon-laptop-dot/metadata";
import { meta as iconKeyboardLine } from "./icons/line-icons/icon-keyboard-line/metadata";
import { meta as iconKeyboardBold } from "./icons/line-icons/icon-keyboard-bold/metadata";
import { meta as iconKeyboardFill } from "./icons/line-icons/icon-keyboard-fill/metadata";
import { meta as iconKeyboardDuo } from "./icons/line-icons/icon-keyboard-duo/metadata";
import { meta as iconKeyboardDot } from "./icons/line-icons/icon-keyboard-dot/metadata";
import { meta as iconMouseLine } from "./icons/line-icons/icon-mouse-line/metadata";
import { meta as iconMouseBold } from "./icons/line-icons/icon-mouse-bold/metadata";
import { meta as iconMouseFill } from "./icons/line-icons/icon-mouse-fill/metadata";
import { meta as iconMouseDuo } from "./icons/line-icons/icon-mouse-duo/metadata";
import { meta as iconMouseDot } from "./icons/line-icons/icon-mouse-dot/metadata";
import { meta as iconHardDriveLine } from "./icons/line-icons/icon-hard-drive-line/metadata";
import { meta as iconHardDriveBold } from "./icons/line-icons/icon-hard-drive-bold/metadata";
import { meta as iconHardDriveFill } from "./icons/line-icons/icon-hard-drive-fill/metadata";
import { meta as iconHardDriveDuo } from "./icons/line-icons/icon-hard-drive-duo/metadata";
import { meta as iconHardDriveDot } from "./icons/line-icons/icon-hard-drive-dot/metadata";
import { meta as iconDatabaseLine } from "./icons/line-icons/icon-database-line/metadata";
import { meta as iconDatabaseBold } from "./icons/line-icons/icon-database-bold/metadata";
import { meta as iconDatabaseFill } from "./icons/line-icons/icon-database-fill/metadata";
import { meta as iconDatabaseDuo } from "./icons/line-icons/icon-database-duo/metadata";
import { meta as iconDatabaseDot } from "./icons/line-icons/icon-database-dot/metadata";
import { meta as iconServerLine } from "./icons/line-icons/icon-server-line/metadata";
import { meta as iconServerBold } from "./icons/line-icons/icon-server-bold/metadata";
import { meta as iconServerFill } from "./icons/line-icons/icon-server-fill/metadata";
import { meta as iconServerDuo } from "./icons/line-icons/icon-server-duo/metadata";
import { meta as iconServerDot } from "./icons/line-icons/icon-server-dot/metadata";
import { meta as iconCloudLine } from "./icons/line-icons/icon-cloud-line/metadata";
import { meta as iconCloudBold } from "./icons/line-icons/icon-cloud-bold/metadata";
import { meta as iconCloudFill } from "./icons/line-icons/icon-cloud-fill/metadata";
import { meta as iconCloudDuo } from "./icons/line-icons/icon-cloud-duo/metadata";
import { meta as iconCloudDot } from "./icons/line-icons/icon-cloud-dot/metadata";
import { meta as iconDropletLine } from "./icons/line-icons/icon-droplet-line/metadata";
import { meta as iconDropletBold } from "./icons/line-icons/icon-droplet-bold/metadata";
import { meta as iconDropletFill } from "./icons/line-icons/icon-droplet-fill/metadata";
import { meta as iconDropletDuo } from "./icons/line-icons/icon-droplet-duo/metadata";
import { meta as iconDropletDot } from "./icons/line-icons/icon-droplet-dot/metadata";
import { meta as iconWindLine } from "./icons/line-icons/icon-wind-line/metadata";
import { meta as iconWindBold } from "./icons/line-icons/icon-wind-bold/metadata";
import { meta as iconWindFill } from "./icons/line-icons/icon-wind-fill/metadata";
import { meta as iconWindDuo } from "./icons/line-icons/icon-wind-duo/metadata";
import { meta as iconWindDot } from "./icons/line-icons/icon-wind-dot/metadata";
import { meta as iconThermometerLine } from "./icons/line-icons/icon-thermometer-line/metadata";
import { meta as iconThermometerBold } from "./icons/line-icons/icon-thermometer-bold/metadata";
import { meta as iconThermometerFill } from "./icons/line-icons/icon-thermometer-fill/metadata";
import { meta as iconThermometerDuo } from "./icons/line-icons/icon-thermometer-duo/metadata";
import { meta as iconThermometerDot } from "./icons/line-icons/icon-thermometer-dot/metadata";
import { meta as iconUmbrellaLine } from "./icons/line-icons/icon-umbrella-line/metadata";
import { meta as iconUmbrellaBold } from "./icons/line-icons/icon-umbrella-bold/metadata";
import { meta as iconUmbrellaFill } from "./icons/line-icons/icon-umbrella-fill/metadata";
import { meta as iconUmbrellaDuo } from "./icons/line-icons/icon-umbrella-duo/metadata";
import { meta as iconUmbrellaDot } from "./icons/line-icons/icon-umbrella-dot/metadata";
import { meta as iconMapLine } from "./icons/line-icons/icon-map-line/metadata";
import { meta as iconMapBold } from "./icons/line-icons/icon-map-bold/metadata";
import { meta as iconMapFill } from "./icons/line-icons/icon-map-fill/metadata";
import { meta as iconMapDuo } from "./icons/line-icons/icon-map-duo/metadata";
import { meta as iconMapDot } from "./icons/line-icons/icon-map-dot/metadata";
import { meta as iconMapPinLine } from "./icons/line-icons/icon-map-pin-line/metadata";
import { meta as iconMapPinBold } from "./icons/line-icons/icon-map-pin-bold/metadata";
import { meta as iconMapPinFill } from "./icons/line-icons/icon-map-pin-fill/metadata";
import { meta as iconMapPinDuo } from "./icons/line-icons/icon-map-pin-duo/metadata";
import { meta as iconMapPinDot } from "./icons/line-icons/icon-map-pin-dot/metadata";
import { meta as iconNavigationLine } from "./icons/line-icons/icon-navigation-line/metadata";
import { meta as iconNavigationBold } from "./icons/line-icons/icon-navigation-bold/metadata";
import { meta as iconNavigationFill } from "./icons/line-icons/icon-navigation-fill/metadata";
import { meta as iconNavigationDuo } from "./icons/line-icons/icon-navigation-duo/metadata";
import { meta as iconNavigationDot } from "./icons/line-icons/icon-navigation-dot/metadata";
import { meta as iconCompassLine } from "./icons/line-icons/icon-compass-line/metadata";
import { meta as iconCompassBold } from "./icons/line-icons/icon-compass-bold/metadata";
import { meta as iconCompassFill } from "./icons/line-icons/icon-compass-fill/metadata";
import { meta as iconCompassDuo } from "./icons/line-icons/icon-compass-duo/metadata";
import { meta as iconCompassDot } from "./icons/line-icons/icon-compass-dot/metadata";
import { meta as iconGlobeLine } from "./icons/line-icons/icon-globe-line/metadata";
import { meta as iconGlobeBold } from "./icons/line-icons/icon-globe-bold/metadata";
import { meta as iconGlobeFill } from "./icons/line-icons/icon-globe-fill/metadata";
import { meta as iconGlobeDuo } from "./icons/line-icons/icon-globe-duo/metadata";
import { meta as iconGlobeDot } from "./icons/line-icons/icon-globe-dot/metadata";
import { meta as iconFlagLine } from "./icons/line-icons/icon-flag-line/metadata";
import { meta as iconFlagBold } from "./icons/line-icons/icon-flag-bold/metadata";
import { meta as iconFlagFill } from "./icons/line-icons/icon-flag-fill/metadata";
import { meta as iconFlagDuo } from "./icons/line-icons/icon-flag-duo/metadata";
import { meta as iconFlagDot } from "./icons/line-icons/icon-flag-dot/metadata";
import { meta as iconAwardLine } from "./icons/line-icons/icon-award-line/metadata";
import { meta as iconAwardBold } from "./icons/line-icons/icon-award-bold/metadata";
import { meta as iconAwardFill } from "./icons/line-icons/icon-award-fill/metadata";
import { meta as iconAwardDuo } from "./icons/line-icons/icon-award-duo/metadata";
import { meta as iconAwardDot } from "./icons/line-icons/icon-award-dot/metadata";
import { meta as iconActivityLine } from "./icons/line-icons/icon-activity-line/metadata";
import { meta as iconActivityBold } from "./icons/line-icons/icon-activity-bold/metadata";
import { meta as iconActivityFill } from "./icons/line-icons/icon-activity-fill/metadata";
import { meta as iconActivityDuo } from "./icons/line-icons/icon-activity-duo/metadata";
import { meta as iconActivityDot } from "./icons/line-icons/icon-activity-dot/metadata";
import { meta as iconCastLine } from "./icons/line-icons/icon-cast-line/metadata";
import { meta as iconCastBold } from "./icons/line-icons/icon-cast-bold/metadata";
import { meta as iconCastFill } from "./icons/line-icons/icon-cast-fill/metadata";
import { meta as iconCastDuo } from "./icons/line-icons/icon-cast-duo/metadata";
import { meta as iconCastDot } from "./icons/line-icons/icon-cast-dot/metadata";
import { meta as iconToggleLeftLine } from "./icons/line-icons/icon-toggle-left-line/metadata";
import { meta as iconToggleLeftBold } from "./icons/line-icons/icon-toggle-left-bold/metadata";
import { meta as iconToggleLeftFill } from "./icons/line-icons/icon-toggle-left-fill/metadata";
import { meta as iconToggleLeftDuo } from "./icons/line-icons/icon-toggle-left-duo/metadata";
import { meta as iconToggleLeftDot } from "./icons/line-icons/icon-toggle-left-dot/metadata";
import { meta as iconToggleRightLine } from "./icons/line-icons/icon-toggle-right-line/metadata";
import { meta as iconToggleRightBold } from "./icons/line-icons/icon-toggle-right-bold/metadata";
import { meta as iconToggleRightFill } from "./icons/line-icons/icon-toggle-right-fill/metadata";
import { meta as iconToggleRightDuo } from "./icons/line-icons/icon-toggle-right-duo/metadata";
import { meta as iconToggleRightDot } from "./icons/line-icons/icon-toggle-right-dot/metadata";
import { meta as iconPowerLine } from "./icons/line-icons/icon-power-line/metadata";
import { meta as iconPowerBold } from "./icons/line-icons/icon-power-bold/metadata";
import { meta as iconPowerFill } from "./icons/line-icons/icon-power-fill/metadata";
import { meta as iconPowerDuo } from "./icons/line-icons/icon-power-duo/metadata";
import { meta as iconPowerDot } from "./icons/line-icons/icon-power-dot/metadata";
import { meta as iconLogInLine } from "./icons/line-icons/icon-log-in-line/metadata";
import { meta as iconLogInBold } from "./icons/line-icons/icon-log-in-bold/metadata";
import { meta as iconLogInFill } from "./icons/line-icons/icon-log-in-fill/metadata";
import { meta as iconLogInDuo } from "./icons/line-icons/icon-log-in-duo/metadata";
import { meta as iconLogInDot } from "./icons/line-icons/icon-log-in-dot/metadata";
import { meta as iconLogOutLine } from "./icons/line-icons/icon-log-out-line/metadata";
import { meta as iconLogOutBold } from "./icons/line-icons/icon-log-out-bold/metadata";
import { meta as iconLogOutFill } from "./icons/line-icons/icon-log-out-fill/metadata";
import { meta as iconLogOutDuo } from "./icons/line-icons/icon-log-out-duo/metadata";
import { meta as iconLogOutDot } from "./icons/line-icons/icon-log-out-dot/metadata";
import { meta as iconKeyLine } from "./icons/line-icons/icon-key-line/metadata";
import { meta as iconKeyBold } from "./icons/line-icons/icon-key-bold/metadata";
import { meta as iconKeyFill } from "./icons/line-icons/icon-key-fill/metadata";
import { meta as iconKeyDuo } from "./icons/line-icons/icon-key-duo/metadata";
import { meta as iconKeyDot } from "./icons/line-icons/icon-key-dot/metadata";
import { meta as iconShieldLine } from "./icons/line-icons/icon-shield-line/metadata";
import { meta as iconShieldBold } from "./icons/line-icons/icon-shield-bold/metadata";
import { meta as iconShieldFill } from "./icons/line-icons/icon-shield-fill/metadata";
import { meta as iconShieldDuo } from "./icons/line-icons/icon-shield-duo/metadata";
import { meta as iconShieldDot } from "./icons/line-icons/icon-shield-dot/metadata";
import { meta as iconShieldOffLine } from "./icons/line-icons/icon-shield-off-line/metadata";
import { meta as iconShieldOffBold } from "./icons/line-icons/icon-shield-off-bold/metadata";
import { meta as iconShieldOffFill } from "./icons/line-icons/icon-shield-off-fill/metadata";
import { meta as iconShieldOffDuo } from "./icons/line-icons/icon-shield-off-duo/metadata";
import { meta as iconShieldOffDot } from "./icons/line-icons/icon-shield-off-dot/metadata";
import { meta as iconToolLine } from "./icons/line-icons/icon-tool-line/metadata";
import { meta as iconToolBold } from "./icons/line-icons/icon-tool-bold/metadata";
import { meta as iconToolFill } from "./icons/line-icons/icon-tool-fill/metadata";
import { meta as iconToolDuo } from "./icons/line-icons/icon-tool-duo/metadata";
import { meta as iconToolDot } from "./icons/line-icons/icon-tool-dot/metadata";
import { meta as iconPackageLine } from "./icons/line-icons/icon-package-line/metadata";
import { meta as iconPackageBold } from "./icons/line-icons/icon-package-bold/metadata";
import { meta as iconPackageFill } from "./icons/line-icons/icon-package-fill/metadata";
import { meta as iconPackageDuo } from "./icons/line-icons/icon-package-duo/metadata";
import { meta as iconPackageDot } from "./icons/line-icons/icon-package-dot/metadata";
import { meta as iconTruckLine } from "./icons/line-icons/icon-truck-line/metadata";
import { meta as iconTruckBold } from "./icons/line-icons/icon-truck-bold/metadata";
import { meta as iconTruckFill } from "./icons/line-icons/icon-truck-fill/metadata";
import { meta as iconTruckDuo } from "./icons/line-icons/icon-truck-duo/metadata";
import { meta as iconTruckDot } from "./icons/line-icons/icon-truck-dot/metadata";
import { meta as iconShoppingBagLine } from "./icons/line-icons/icon-shopping-bag-line/metadata";
import { meta as iconShoppingBagBold } from "./icons/line-icons/icon-shopping-bag-bold/metadata";
import { meta as iconShoppingBagFill } from "./icons/line-icons/icon-shopping-bag-fill/metadata";
import { meta as iconShoppingBagDuo } from "./icons/line-icons/icon-shopping-bag-duo/metadata";
import { meta as iconShoppingBagDot } from "./icons/line-icons/icon-shopping-bag-dot/metadata";
import { meta as iconTagLine } from "./icons/line-icons/icon-tag-line/metadata";
import { meta as iconTagBold } from "./icons/line-icons/icon-tag-bold/metadata";
import { meta as iconTagFill } from "./icons/line-icons/icon-tag-fill/metadata";
import { meta as iconTagDuo } from "./icons/line-icons/icon-tag-duo/metadata";
import { meta as iconTagDot } from "./icons/line-icons/icon-tag-dot/metadata";
import { meta as iconGiftLine } from "./icons/line-icons/icon-gift-line/metadata";
import { meta as iconGiftBold } from "./icons/line-icons/icon-gift-bold/metadata";
import { meta as iconGiftFill } from "./icons/line-icons/icon-gift-fill/metadata";
import { meta as iconGiftDuo } from "./icons/line-icons/icon-gift-duo/metadata";
import { meta as iconGiftDot } from "./icons/line-icons/icon-gift-dot/metadata";
import { meta as iconTicketLine } from "./icons/line-icons/icon-ticket-line/metadata";
import { meta as iconTicketBold } from "./icons/line-icons/icon-ticket-bold/metadata";
import { meta as iconTicketFill } from "./icons/line-icons/icon-ticket-fill/metadata";
import { meta as iconTicketDuo } from "./icons/line-icons/icon-ticket-duo/metadata";
import { meta as iconTicketDot } from "./icons/line-icons/icon-ticket-dot/metadata";
import { meta as iconCreditCardLine } from "./icons/line-icons/icon-credit-card-line/metadata";
import { meta as iconCreditCardBold } from "./icons/line-icons/icon-credit-card-bold/metadata";
import { meta as iconCreditCardFill } from "./icons/line-icons/icon-credit-card-fill/metadata";
import { meta as iconCreditCardDuo } from "./icons/line-icons/icon-credit-card-duo/metadata";
import { meta as iconCreditCardDot } from "./icons/line-icons/icon-credit-card-dot/metadata";
import { meta as iconWalletLine } from "./icons/line-icons/icon-wallet-line/metadata";
import { meta as iconWalletBold } from "./icons/line-icons/icon-wallet-bold/metadata";
import { meta as iconWalletFill } from "./icons/line-icons/icon-wallet-fill/metadata";
import { meta as iconWalletDuo } from "./icons/line-icons/icon-wallet-duo/metadata";
import { meta as iconWalletDot } from "./icons/line-icons/icon-wallet-dot/metadata";
import { meta as iconCoinsLine } from "./icons/line-icons/icon-coins-line/metadata";
import { meta as iconCoinsBold } from "./icons/line-icons/icon-coins-bold/metadata";
import { meta as iconCoinsFill } from "./icons/line-icons/icon-coins-fill/metadata";
import { meta as iconCoinsDuo } from "./icons/line-icons/icon-coins-duo/metadata";
import { meta as iconCoinsDot } from "./icons/line-icons/icon-coins-dot/metadata";
import { meta as iconTrendUpLine } from "./icons/line-icons/icon-trend-up-line/metadata";
import { meta as iconTrendUpBold } from "./icons/line-icons/icon-trend-up-bold/metadata";
import { meta as iconTrendUpFill } from "./icons/line-icons/icon-trend-up-fill/metadata";
import { meta as iconTrendUpDuo } from "./icons/line-icons/icon-trend-up-duo/metadata";
import { meta as iconTrendUpDot } from "./icons/line-icons/icon-trend-up-dot/metadata";
import { meta as iconTrendDownLine } from "./icons/line-icons/icon-trend-down-line/metadata";
import { meta as iconTrendDownBold } from "./icons/line-icons/icon-trend-down-bold/metadata";
import { meta as iconTrendDownFill } from "./icons/line-icons/icon-trend-down-fill/metadata";
import { meta as iconTrendDownDuo } from "./icons/line-icons/icon-trend-down-duo/metadata";
import { meta as iconTrendDownDot } from "./icons/line-icons/icon-trend-down-dot/metadata";
import { meta as iconZapLine } from "./icons/line-icons/icon-zap-line/metadata";
import { meta as iconZapBold } from "./icons/line-icons/icon-zap-bold/metadata";
import { meta as iconZapFill } from "./icons/line-icons/icon-zap-fill/metadata";
import { meta as iconZapDuo } from "./icons/line-icons/icon-zap-duo/metadata";
import { meta as iconZapDot } from "./icons/line-icons/icon-zap-dot/metadata";
import { meta as iconThumbsUpLine } from "./icons/line-icons/icon-thumbs-up-line/metadata";
import { meta as iconThumbsUpBold } from "./icons/line-icons/icon-thumbs-up-bold/metadata";
import { meta as iconThumbsUpFill } from "./icons/line-icons/icon-thumbs-up-fill/metadata";
import { meta as iconThumbsUpDuo } from "./icons/line-icons/icon-thumbs-up-duo/metadata";
import { meta as iconThumbsUpDot } from "./icons/line-icons/icon-thumbs-up-dot/metadata";
import { meta as iconHome } from "./icons/line-icons/icon-home/metadata";
import { meta as iconSearch } from "./icons/line-icons/icon-search/metadata";
import { meta as iconBell } from "./icons/line-icons/icon-bell/metadata";
import { meta as iconSliders } from "./icons/line-icons/icon-sliders/metadata";
import { meta as iconDownload } from "./icons/line-icons/icon-download/metadata";
import { meta as iconCamera } from "./icons/line-icons/icon-camera/metadata";
import { meta as logoBoltHex } from "./icons/logo-marks/logo-bolt-hex/metadata";
import { meta as logoLeafRing } from "./icons/logo-marks/logo-leaf-ring/metadata";
import { meta as logoDiamondStack } from "./icons/logo-marks/logo-diamond-stack/metadata";
import { meta as logoOrbit } from "./icons/logo-marks/logo-orbit/metadata";
import { meta as checkoutPage } from "./templates/checkout-page/metadata";

export const RAW_RESOURCES: UIResourceMeta[] = [
  liquidButton,
  magneticButton,
  borderDrawButton,
  splitButton,
  scrollSpy,
  scrollShadow,
  rippleButton,
  loadingButton,
  holdToConfirm,
  linearProgress,
  circularProgress,
  multiStepProgress,
  uploadProgress,
  scrollProgress,
  skeletonCard,
  dotLoader,
  pageLoader,
  skeletonTable,
  tiltCard,
  spotlightCard,
  glassCard,
  expandableCard,
  productCard,
  jobCard,
  courseCard,
  notificationCard,
  articleCard,
  fileCard,
  walletCard,
  flightCard,
  invoiceCard,
  podcastCard,
  profileCard,
  sharedLayoutGallery,
  statsCard,
  imageComparison,
  donutChart,
  sparklineChart,
  musicPlayerCard,
  weatherCard,
  orderTrackingCard,
  codeSnippetCard,
  minimalNavbar,
  mobileMenu,
  collapsibleSidebar,
  floatingDock,
  animatedTabs,
  commandMenu,
  gooeyMorphMenu,
  breadcrumb,
  pagination,
  drawer,
  bottomSheet,
  stepNav,
  dropdownMenu,
  filtersSidebar,
  megaMenu,
  treeMenu,
  treeSelect,
  comboboxAutocomplete,
  currencyInput,
  npsScale,
  colorPicker,
  multiSelect,
  mentionInput,
  emojiPicker,
  floatingLabelInput,
  passwordStrength,
  otpInput,
  searchInput,
  fileUpload,
  multiStepForm,
  rangeSlider,
  tagInput,
  stepperInput,
  datePicker,
  autoTextarea,
  toggleSwitch,
  checkboxCard,
  badgeChip,
  tooltipCss,
  spinnerSet,
  linkHover,
  ratingStars,
  segmentedControl,
  callout,
  popover,
  toggleGroup,
  countdownTimer,
  toastStack,
  timeline,
  kbdShortcut,
  copyButton,
  themeToggle,
  speedDial,
  scrollToTop,
  contextMenu,
  accordion,
  counterBadge,
  heatMapCalendar,
  inlineEdit,
  textReveal,
  numberCounter,
  marquee,
  cursorGlow,
  scrollReveal,
  pageTransition,
  auroraBackground,
  gridBackground,
  clickSpark,
  textScramble,
  elasticPress,
  pixelDissolveReveal,
  kineticPathText,
  particleFlowField,
  typewriter,
  gradientText,
  blobBackground,
  shineSweep,
  confettiBurst,
  shakeFeedback,
  pulseRing,
  borderBeam,
  glowBorder,
  glitchText,
  flipCard,
  waveText,
  textRotate,
  bounceIn,
  skeletonShimmer,
  radarSweep,
  gaugeFill,
  flipClock,
  readingProgress,
  mouseParallax,
  heroCentered,
  heroSplit,
  featuresGrid,
  testimonialWall,
  pricingTable,
  faqAccordion,
  announcementBar,
  comparisonTable,
  howItWorks,
  integrationsGrid,
  trustBadges,
  ctaBanner,
  statsBar,
  logoCloud,
  newsletterCta,
  teamSection,
  footerMinimal,
  cookieConsent,
  contactFormSection,
  appDownloadCta,
  galleryPage,
  loginPage,
  analyticsDashboard,
  saasLanding,
  productDetail,
  portfolioHome,
  pricingPage,
  settingsTemplate,
  emptyState,
  notFoundPage,
  comingSoon,
  blogHome,
  kanbanBoard,
  docsPage,
  helpCenter,
  changelogPage,
  statusPage,
  teamPage,
  iconPlus,
  iconCheckCircle,
  iconHeart,
  iconStar,
  iconMail,
  iconLock,
  logoWaveShield,
  logoTriPrism,
  logoSunMark,
  logoHive,
  iconHomeLine,
  iconHomeBold,
  iconHomeFill,
  iconHomeDuo,
  iconHomeBroken,
  iconSearchLine,
  iconSearchBold,
  iconSearchFill,
  iconSearchDuo,
  iconSearchBroken,
  iconBellLine,
  iconBellBold,
  iconBellFill,
  iconBellDuo,
  iconBellBroken,
  iconSettingsLine,
  iconSettingsBold,
  iconSettingsFill,
  iconSettingsDuo,
  iconSettingsBroken,
  iconHeartLine,
  iconHeartBold,
  iconHeartFill,
  iconHeartDuo,
  iconHeartBroken,
  iconStarLine,
  iconStarBold,
  iconStarFill,
  iconStarDuo,
  iconStarBroken,
  iconUserLine,
  iconUserBold,
  iconUserFill,
  iconUserDuo,
  iconUserBroken,
  iconCameraLine,
  iconCameraBold,
  iconCameraFill,
  iconCameraDuo,
  iconCameraBroken,
  iconMailLine,
  iconMailBold,
  iconMailFill,
  iconMailDuo,
  iconMailBroken,
  iconLockLine,
  iconLockBold,
  iconLockFill,
  iconLockDuo,
  iconLockBroken,
  iconDownloadLine,
  iconDownloadBold,
  iconDownloadFill,
  iconDownloadDuo,
  iconDownloadBroken,
  iconCalendarLine,
  iconCalendarBold,
  iconCalendarFill,
  iconCalendarDuo,
  iconCalendarBroken,
  iconClockLine,
  iconClockBold,
  iconClockFill,
  iconClockDuo,
  iconClockBroken,
  iconChatLine,
  iconChatBold,
  iconChatFill,
  iconChatDuo,
  iconChatBroken,
  iconCartLine,
  iconCartBold,
  iconCartFill,
  iconCartDuo,
  iconCartBroken,
  iconPlayLine,
  iconPlayBold,
  iconPlayFill,
  iconPlayDuo,
  iconPlayBroken,
  iconTrashLine,
  iconTrashBold,
  iconTrashFill,
  iconTrashDuo,
  iconTrashBroken,
  iconEditLine,
  iconEditBold,
  iconEditFill,
  iconEditDuo,
  iconEditBroken,
  iconShareLine,
  iconShareBold,
  iconShareFill,
  iconShareDuo,
  iconShareBroken,
  iconBookmarkLine,
  iconBookmarkBold,
  iconBookmarkFill,
  iconBookmarkDuo,
  iconBookmarkBroken,
  iconArrowLeftLine,
  iconArrowLeftBold,
  iconArrowLeftFill,
  iconArrowLeftDuo,
  iconArrowLeftDot,
  iconArrowRightLine,
  iconArrowRightBold,
  iconArrowRightFill,
  iconArrowRightDuo,
  iconArrowRightDot,
  iconArrowUpLine,
  iconArrowUpBold,
  iconArrowUpFill,
  iconArrowUpDuo,
  iconArrowUpDot,
  iconArrowDownLine,
  iconArrowDownBold,
  iconArrowDownFill,
  iconArrowDownDuo,
  iconArrowDownDot,
  iconChevronLeftLine,
  iconChevronLeftBold,
  iconChevronLeftFill,
  iconChevronLeftDuo,
  iconChevronLeftDot,
  iconChevronRightLine,
  iconChevronRightBold,
  iconChevronRightFill,
  iconChevronRightDuo,
  iconChevronRightDot,
  iconChevronUpLine,
  iconChevronUpBold,
  iconChevronUpFill,
  iconChevronUpDuo,
  iconChevronUpDot,
  iconChevronDownLine,
  iconChevronDownBold,
  iconChevronDownFill,
  iconChevronDownDuo,
  iconChevronDownDot,
  iconCheckLine,
  iconCheckBold,
  iconCheckFill,
  iconCheckDuo,
  iconCheckDot,
  iconXLine,
  iconXBold,
  iconXFill,
  iconXDuo,
  iconXDot,
  iconMinusLine,
  iconMinusBold,
  iconMinusFill,
  iconMinusDuo,
  iconMinusDot,
  iconPlusLine,
  iconPlusBold,
  iconPlusFill,
  iconPlusDuo,
  iconPlusDot,
  iconCheckCircleLine,
  iconCheckCircleBold,
  iconCheckCircleFill,
  iconCheckCircleDuo,
  iconCheckCircleDot,
  iconXCircleLine,
  iconXCircleBold,
  iconXCircleFill,
  iconXCircleDuo,
  iconXCircleDot,
  iconPlusCircleLine,
  iconPlusCircleBold,
  iconPlusCircleFill,
  iconPlusCircleDuo,
  iconPlusCircleDot,
  iconMinusCircleLine,
  iconMinusCircleBold,
  iconMinusCircleFill,
  iconMinusCircleDuo,
  iconMinusCircleDot,
  iconInfoLine,
  iconInfoBold,
  iconInfoFill,
  iconInfoDuo,
  iconInfoDot,
  iconHelpCircleLine,
  iconHelpCircleBold,
  iconHelpCircleFill,
  iconHelpCircleDuo,
  iconHelpCircleDot,
  iconAlertTriangleLine,
  iconAlertTriangleBold,
  iconAlertTriangleFill,
  iconAlertTriangleDuo,
  iconAlertTriangleDot,
  iconAlertCircleLine,
  iconAlertCircleBold,
  iconAlertCircleFill,
  iconAlertCircleDuo,
  iconAlertCircleDot,
  iconRefreshLine,
  iconRefreshBold,
  iconRefreshFill,
  iconRefreshDuo,
  iconRefreshDot,
  iconUndoLine,
  iconUndoBold,
  iconUndoFill,
  iconUndoDuo,
  iconUndoDot,
  iconRedoLine,
  iconRedoBold,
  iconRedoFill,
  iconRedoDuo,
  iconRedoDot,
  iconEyeLine,
  iconEyeBold,
  iconEyeFill,
  iconEyeDuo,
  iconEyeDot,
  iconEyeOffLine,
  iconEyeOffBold,
  iconEyeOffFill,
  iconEyeOffDuo,
  iconEyeOffDot,
  iconFilterLine,
  iconFilterBold,
  iconFilterFill,
  iconFilterDuo,
  iconFilterDot,
  iconGridLine,
  iconGridBold,
  iconGridFill,
  iconGridDuo,
  iconGridDot,
  iconListLine,
  iconListBold,
  iconListFill,
  iconListDuo,
  iconListDot,
  iconLayoutLine,
  iconLayoutBold,
  iconLayoutFill,
  iconLayoutDuo,
  iconLayoutDot,
  iconColumnsLine,
  iconColumnsBold,
  iconColumnsFill,
  iconColumnsDuo,
  iconColumnsDot,
  iconMaximizeLine,
  iconMaximizeBold,
  iconMaximizeFill,
  iconMaximizeDuo,
  iconMaximizeDot,
  iconMinimizeLine,
  iconMinimizeBold,
  iconMinimizeFill,
  iconMinimizeDuo,
  iconMinimizeDot,
  iconExternalLinkLine,
  iconExternalLinkBold,
  iconExternalLinkFill,
  iconExternalLinkDuo,
  iconExternalLinkDot,
  iconLinkLine,
  iconLinkBold,
  iconLinkFill,
  iconLinkDuo,
  iconLinkDot,
  iconAnchorLine,
  iconAnchorBold,
  iconAnchorFill,
  iconAnchorDuo,
  iconAnchorDot,
  iconPaperclipLine,
  iconPaperclipBold,
  iconPaperclipFill,
  iconPaperclipDuo,
  iconPaperclipDot,
  iconCopyLine,
  iconCopyBold,
  iconCopyFill,
  iconCopyDuo,
  iconCopyDot,
  iconClipboardLine,
  iconClipboardBold,
  iconClipboardFill,
  iconClipboardDuo,
  iconClipboardDot,
  iconScissorsLine,
  iconScissorsBold,
  iconScissorsFill,
  iconScissorsDuo,
  iconScissorsDot,
  iconFolderLine,
  iconFolderBold,
  iconFolderFill,
  iconFolderDuo,
  iconFolderDot,
  iconFolderOpenLine,
  iconFolderOpenBold,
  iconFolderOpenFill,
  iconFolderOpenDuo,
  iconFolderOpenDot,
  iconFileLine,
  iconFileBold,
  iconFileFill,
  iconFileDuo,
  iconFileDot,
  iconFileTextLine,
  iconFileTextBold,
  iconFileTextFill,
  iconFileTextDuo,
  iconFileTextDot,
  iconBookLine,
  iconBookBold,
  iconBookFill,
  iconBookDuo,
  iconBookDot,
  iconBookOpenLine,
  iconBookOpenBold,
  iconBookOpenFill,
  iconBookOpenDuo,
  iconBookOpenDot,
  iconArchiveLine,
  iconArchiveBold,
  iconArchiveFill,
  iconArchiveDuo,
  iconArchiveDot,
  iconInboxLine,
  iconInboxBold,
  iconInboxFill,
  iconInboxDuo,
  iconInboxDot,
  iconUploadLine,
  iconUploadBold,
  iconUploadFill,
  iconUploadDuo,
  iconUploadDot,
  iconSendLine,
  iconSendBold,
  iconSendFill,
  iconSendDuo,
  iconSendDot,
  iconPhoneLine,
  iconPhoneBold,
  iconPhoneFill,
  iconPhoneDuo,
  iconPhoneDot,
  iconMessageCircleLine,
  iconMessageCircleBold,
  iconMessageCircleFill,
  iconMessageCircleDuo,
  iconMessageCircleDot,
  iconVideoLine,
  iconVideoBold,
  iconVideoFill,
  iconVideoDuo,
  iconVideoDot,
  iconMicLine,
  iconMicBold,
  iconMicFill,
  iconMicDuo,
  iconMicDot,
  iconMicOffLine,
  iconMicOffBold,
  iconMicOffFill,
  iconMicOffDuo,
  iconMicOffDot,
  iconVolume2Line,
  iconVolume2Bold,
  iconVolume2Fill,
  iconVolume2Duo,
  iconVolume2Dot,
  iconVolumeXLine,
  iconVolumeXBold,
  iconVolumeXFill,
  iconVolumeXDuo,
  iconVolumeXDot,
  iconTvLine,
  iconTvBold,
  iconTvFill,
  iconTvDuo,
  iconTvDot,
  iconTabletLine,
  iconTabletBold,
  iconTabletFill,
  iconTabletDuo,
  iconTabletDot,
  iconLaptopLine,
  iconLaptopBold,
  iconLaptopFill,
  iconLaptopDuo,
  iconLaptopDot,
  iconKeyboardLine,
  iconKeyboardBold,
  iconKeyboardFill,
  iconKeyboardDuo,
  iconKeyboardDot,
  iconMouseLine,
  iconMouseBold,
  iconMouseFill,
  iconMouseDuo,
  iconMouseDot,
  iconHardDriveLine,
  iconHardDriveBold,
  iconHardDriveFill,
  iconHardDriveDuo,
  iconHardDriveDot,
  iconDatabaseLine,
  iconDatabaseBold,
  iconDatabaseFill,
  iconDatabaseDuo,
  iconDatabaseDot,
  iconServerLine,
  iconServerBold,
  iconServerFill,
  iconServerDuo,
  iconServerDot,
  iconCloudLine,
  iconCloudBold,
  iconCloudFill,
  iconCloudDuo,
  iconCloudDot,
  iconDropletLine,
  iconDropletBold,
  iconDropletFill,
  iconDropletDuo,
  iconDropletDot,
  iconWindLine,
  iconWindBold,
  iconWindFill,
  iconWindDuo,
  iconWindDot,
  iconThermometerLine,
  iconThermometerBold,
  iconThermometerFill,
  iconThermometerDuo,
  iconThermometerDot,
  iconUmbrellaLine,
  iconUmbrellaBold,
  iconUmbrellaFill,
  iconUmbrellaDuo,
  iconUmbrellaDot,
  iconMapLine,
  iconMapBold,
  iconMapFill,
  iconMapDuo,
  iconMapDot,
  iconMapPinLine,
  iconMapPinBold,
  iconMapPinFill,
  iconMapPinDuo,
  iconMapPinDot,
  iconNavigationLine,
  iconNavigationBold,
  iconNavigationFill,
  iconNavigationDuo,
  iconNavigationDot,
  iconCompassLine,
  iconCompassBold,
  iconCompassFill,
  iconCompassDuo,
  iconCompassDot,
  iconGlobeLine,
  iconGlobeBold,
  iconGlobeFill,
  iconGlobeDuo,
  iconGlobeDot,
  iconFlagLine,
  iconFlagBold,
  iconFlagFill,
  iconFlagDuo,
  iconFlagDot,
  iconAwardLine,
  iconAwardBold,
  iconAwardFill,
  iconAwardDuo,
  iconAwardDot,
  iconActivityLine,
  iconActivityBold,
  iconActivityFill,
  iconActivityDuo,
  iconActivityDot,
  iconCastLine,
  iconCastBold,
  iconCastFill,
  iconCastDuo,
  iconCastDot,
  iconToggleLeftLine,
  iconToggleLeftBold,
  iconToggleLeftFill,
  iconToggleLeftDuo,
  iconToggleLeftDot,
  iconToggleRightLine,
  iconToggleRightBold,
  iconToggleRightFill,
  iconToggleRightDuo,
  iconToggleRightDot,
  iconPowerLine,
  iconPowerBold,
  iconPowerFill,
  iconPowerDuo,
  iconPowerDot,
  iconLogInLine,
  iconLogInBold,
  iconLogInFill,
  iconLogInDuo,
  iconLogInDot,
  iconLogOutLine,
  iconLogOutBold,
  iconLogOutFill,
  iconLogOutDuo,
  iconLogOutDot,
  iconKeyLine,
  iconKeyBold,
  iconKeyFill,
  iconKeyDuo,
  iconKeyDot,
  iconShieldLine,
  iconShieldBold,
  iconShieldFill,
  iconShieldDuo,
  iconShieldDot,
  iconShieldOffLine,
  iconShieldOffBold,
  iconShieldOffFill,
  iconShieldOffDuo,
  iconShieldOffDot,
  iconToolLine,
  iconToolBold,
  iconToolFill,
  iconToolDuo,
  iconToolDot,
  iconPackageLine,
  iconPackageBold,
  iconPackageFill,
  iconPackageDuo,
  iconPackageDot,
  iconTruckLine,
  iconTruckBold,
  iconTruckFill,
  iconTruckDuo,
  iconTruckDot,
  iconShoppingBagLine,
  iconShoppingBagBold,
  iconShoppingBagFill,
  iconShoppingBagDuo,
  iconShoppingBagDot,
  iconTagLine,
  iconTagBold,
  iconTagFill,
  iconTagDuo,
  iconTagDot,
  iconGiftLine,
  iconGiftBold,
  iconGiftFill,
  iconGiftDuo,
  iconGiftDot,
  iconTicketLine,
  iconTicketBold,
  iconTicketFill,
  iconTicketDuo,
  iconTicketDot,
  iconCreditCardLine,
  iconCreditCardBold,
  iconCreditCardFill,
  iconCreditCardDuo,
  iconCreditCardDot,
  iconWalletLine,
  iconWalletBold,
  iconWalletFill,
  iconWalletDuo,
  iconWalletDot,
  iconCoinsLine,
  iconCoinsBold,
  iconCoinsFill,
  iconCoinsDuo,
  iconCoinsDot,
  iconTrendUpLine,
  iconTrendUpBold,
  iconTrendUpFill,
  iconTrendUpDuo,
  iconTrendUpDot,
  iconTrendDownLine,
  iconTrendDownBold,
  iconTrendDownFill,
  iconTrendDownDuo,
  iconTrendDownDot,
  iconZapLine,
  iconZapBold,
  iconZapFill,
  iconZapDuo,
  iconZapDot,
  iconThumbsUpLine,
  iconThumbsUpBold,
  iconThumbsUpFill,
  iconThumbsUpDuo,
  iconThumbsUpDot,
  iconHome,
  iconSearch,
  iconBell,
  iconSliders,
  iconDownload,
  iconCamera,
  logoBoltHex,
  logoLeafRing,
  logoDiamondStack,
  logoOrbit,
  checkoutPage,
];
