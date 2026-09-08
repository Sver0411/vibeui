# VibeUI

**能跑、能抄、还能让 AI 照着做的界面素材库。**

VibeUI 是一个本地优先的前端设计资源库：内置 **794 个真实可运行** 的 UI 组件、动效、页面区块与页面模板。每个资源带沙箱实时预览、可直接复制的 HTML / CSS / JavaScript / React 源码、在线编辑、一键下载与 ZIP 导出；并且配有一套 **AI 提示词层**——术语、三档提示词、可调参数与避坑点，让你在 vibe coding 时能把想要的效果说清楚。

```bash
npm install     # 安装依赖
npm run dev     # 开发环境（http://localhost:3000）
npm run build   # 生产构建（含类型检查与静态生成）
npm run start   # 运行生产构建
npm run lint    # ESLint
npm run typecheck  # 仅 TypeScript 检查
```

技术栈：**Next.js 14 (App Router) · React 18 · TypeScript（strict）· Tailwind CSS · CSS Variables · Zustand · Framer Motion · CodeMirror 6 · JSZip · lz-string · Lucide Icons**

---

## 功能总览

| 模块 | 说明 |
| --- | --- |
| 首页 | 中文 Hero 搜索、热门关键词、精选 / 最新 / 热门动效 / 提示词库 / 模板 / 分类 / 合集 |
| 探索页 | 搜索 + 类型 / 分类 / 技术栈 / 风格 / 难度 / 特性筛选，**筛选状态同步到 URL**，排序 6 种，网格密度切换，移动端底部抽屉筛选 |
| 微元素 | 开关、复选框、分段控件、评分星、头像组、徽章、气泡提示、加载器、链接悬停、Toast——量大管饱的"口粮"层（对标 UIverse） |
| 页面区块 /blocks | 可直接拼进页面的完整段落：两种 Hero、功能区、数据统计条、定价表、推荐语墙、FAQ、CTA 横幅（对标 Aceternity 的 section 层） |
| AI 提示词库 | 按"效果"组织的术语与提示词市场：搜索术语 / 别名 / 提示词正文，卡片一键复制，按类型筛选 |
| 资源详情 · AI 提示词 tab | 术语卡（中英 + 别名 + 设计模式 + 原理）、三档提示词（一句话 / 标准 / 精调）、框架变体（原生 / React / Vue）、可调参数表、避坑点 |
| 探索页 | 搜索 + 类型 / 分类 / 技术栈 / 风格 / 难度 / 特性筛选，**筛选状态同步到 URL**，排序 6 种，网格密度切换，移动端底部抽屉筛选 |
| 资源详情页 | 大型沙箱预览（桌面 / 平板 / 手机 / 自定义尺寸、缩放、浅色 / 深色 / 棋盘格背景、刷新、全屏）+ 代码面板（HTML / CSS / JavaScript / React / 用法 / 依赖） |
| 代码面板 | 语法高亮、行号、自动换行、**在线编辑并实时预览**、格式化（Prettier）、复制单个文件、复制合并的完整 HTML、下载单文件、修改自动保存到本地 |
| 在线调试 | HTML / CSS / JS 三窗格编辑、自动 / 手动运行、控制台输出（含错误捕获）、响应式预览、分享链接（lz-string 压缩进 URL）、下载 / 导出 ZIP、布局切换与全屏 |
| 收藏 | 本地文件夹（默认：灵感 / 组件 / 动效 / 模板，可自定义）、搜索、多选批量移动 / 移除、导出 JSON 清单、**打包下载全部收藏 ZIP** |
| 合集 | 16 个主题合集，封面由真实成员资源预览拼合生成，不使用任何占位图 |
| 设置 | 主题（浅色 / 深色 / 跟随系统）、5 种强调色、密度、圆角、动效强度、编辑器与预览偏好、数据管理（清除 / 导入 / 导出 / 恢复默认） |
| 全局 | ⌘K 命令面板（模糊搜索 + 最近搜索 + 键盘导航）、Toast 反馈（如“CSS 已复制”）、快捷键、嵌入页、sitemap / robots、SEO 元信息 |

### 快捷键

| 快捷键 | 作用 |
| --- | --- |
| `⌘/Ctrl + K` | 全局搜索 |
| `⌘/Ctrl + Enter` | 运行代码（在线调试） |
| `⌘/Ctrl + S` | 保存草稿（在线调试） |
| `⌘/Ctrl + Shift + C` | 复制当前代码（详情页） |
| `⌘/Ctrl + Shift + E` | 打开导出弹窗（详情页） |
| `Esc` | 关闭弹窗 / 退出全屏 |

---

## 项目结构

```text
src/
├── app/                    # 路由（App Router）
│   ├── (site)/             # 主站布局（页头 / 页脚）
│   │   ├── page.tsx        # 首页
│   │   ├── explore/        # 探索（URL 同步筛选）
│   │   ├── components|animations|templates/   # 分类入口（复用 ExploreView）
│   │   ├── item/[slug]/    # 资源详情（SSG，131 页）
│   │   ├── collections/    # 合集列表 + 详情（SSG）
│   │   ├── favorites/      # 收藏
│   │   ├── playground/     # 在线调试
│   │   └── settings/       # 设置
│   ├── embed/[slug]/       # 只读嵌入页（无站点框架）
│   ├── api/resources/[slug]/   # 按需返回资源代码（服务端读文件）
│   ├── sitemap.ts / robots.ts / icon.svg / not-found.tsx
├── components/             # layout / cards / preview / editor / filters / dialogs / home / detail / playground / settings / common
├── registry/               # ★ 资源注册表（见下）
│   ├── components/{buttons,progress,cards,navigation,forms}/<slug>/
│   ├── animations/<slug>/
│   ├── templates/<slug>/
│   ├── categories.ts       # 分类 / 类型 / 难度定义
│   ├── collections.ts      # 合集定义
│   ├── index.ts            # 聚合导出（客户端安全，不含代码文件）
│   └── server/loader.ts    # 服务端按约定读取代码文件（node:fs）
├── lib/                    # storage / search / sandbox / export / code / utils
├── hooks/  store/  types/  config/
```

---

## 如何新增一个资源

**第 1 步**：在 `src/registry/` 下创建目录并添加文件：

```text
src/registry/components/forms/range-slider/
├── metadata.ts        # 元数据（会打包进客户端，禁止引入 node 模块）
└── files/
    ├── index.html     # body 片段（预览与“HTML”标签页共用）
    ├── styles.css     # 完整样式（含变量、动画、响应式）
    ├── script.js      # 可选：行为逻辑（预览与“JavaScript”标签页共用）
    └── react.tsx      # 可选：React 版本（“React”标签页 + React 导出）
```

`metadata.ts` 示例（`dir` 必须与目录相对路径一致）：

```ts
import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "range-slider",
  slug: "range-slider",
  name: "范围滑块",
  description: "一句话中文描述。",
  category: "forms",              // 见 registry/categories.ts
  type: "component",              // component | animation | template
  tags: ["滑块", "表单"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "beginner",
  responsive: true,
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-01",
  updatedAt: "2026-09-01",
  dir: "components/forms/range-slider",
};
```

**第 2 步**：在 `src/registry/index.ts` 中 import 并加入 `RESOURCES` 数组（两行）。

完成。分类页、探索页、搜索、详情页（自动 SSG）、合集、嵌入页会自动收录。代码文件**不需要**注册——服务端加载器按 `files/` 目录约定自动读取，预览、代码面板、Playground 预填、导出使用同一份源文件。

---

## Registry 数据结构

- **客户端**只见元数据（`UIResourceMeta`，见 `src/types/resource.ts`），列表页不携带任何代码，保证首屏轻量。
- **服务端**通过 `registry/server/loader.ts` 按 `dir` 读取 `files/` 下的代码（带模块级缓存），用于：
  - 详情页 SSG（`/item/[slug]` 构建期注入代码）；
  - `/api/resources/[slug]`（卡片“复制 / 下载 / 快速预览”按需拉取）；
  - Playground 的 `?from=slug` 预填与 `/embed/[slug]`。

---

## 导出系统

入口：详情页“导出”按钮（或 `⌘/Ctrl+Shift+E`）。支持：

1. **单文件 HTML** —— CSS 内联 `<style>`、JS 内联 `<script>`，保存即可运行；
2. **HTML 项目 ZIP** —— `index.html + styles.css + script.js + README.md`（自动生成，含运行方式与依赖）；
3. **React + Vite 项目 ZIP** —— 完整可运行的 Vite + TS 工程（package.json / vite.config / tsconfig / src）；
4. **在 CodePen 中打开** —— 通过官方 `__data` 表单预填新 Pen。

弹窗内可选：包含 README / 演示页 / 依赖清单、保留注释、压缩空白。进度条显示 JSZip 真实压缩进度（非动画）。多资源打包下载（收藏页）复用同一套构建器。

---

## 预览隔离机制（安全）

- 所有预览运行在 `<iframe sandbox="allow-scripts allow-popups allow-forms allow-modals">` 中，**不带 `allow-same-origin`**：用户代码无法访问父页面 DOM、Cookie 或主站 LocalStorage，也无法向上跨域。
- 注入的轻量 harness 通过 `postMessage` 桥接 `console.*` / 运行时错误到父页面（Playground 控制台、错误 Toast），并接受 `pause / resume` 消息。
- **离屏暂停**：IntersectionObserver 监测卡片预览，滚出视口即发 pause 消息；harness 给 `<html>` 加 `atlas-paused` 类冻结所有 CSS 动画，资源脚本中的 rAF 循环检查该类自动停止——离开视口的动画不会消耗 CPU。
- 用户代码以 IIFE + try/catch 包裹后内联；`</script>` 序列会被转义防止逃逸。
- 主页面不使用 `eval`；分享链接数据经 lz-string 压缩并在加载时做长度与结构校验。

---

## 数据与持久化

统一走 `lib/storage/adapter.ts`（LocalStorage，带 `ui-atlas:` 前缀、私有模式降级、损坏自动重置）。Zustand persist 保存：偏好设置、收藏与文件夹、浏览 / 搜索历史、编辑器草稿（详情页修改 + Playground）。存储版本号 `CURRENT_DATA_VERSION` + migrate 保证旧数据平滑升级。云端接入时只需替换该适配器（Supabase / Firebase 等）。

---

## 已知限制

- **无限循环**：沙箱与主页面同线程，`while(true)` 会冻结该预览标签页（不牵连主站）。受控执行需要 Worker 隔离，列为后续项。
- 真实网络请求（fetch 外部接口）受浏览器 CORS 限制，与普通页面一致。
- “压缩空白”为安全的保守压缩（空白与注释），不是完整 minify。
- 分享链接上限约 28 KB（URL 长度保护），超限会提示改用 ZIP 导出。
- 资源预览使用无 `allow-same-origin` 的沙箱，因此预览内 `localStorage` 不可用（harness 会提示）。
- 模板类资源的 React 标签页：组件与模板均提供 React 版本，部分页面模板以精炼的单文件组件呈现。

---

## 后续扩展建议

1. 沙箱 JS 迁移到 Web Worker / `allow-same-origin` + 独立源，彻底解决无限循环。
2. 接入 Supabase / Postgres：把 `lib/storage` 换成远程适配器，增加用户账号与云端收藏同步。
3. 搜索升级为 Meilisearch / Algolia（`lib/search` 已隔离为单一入口）。
4. 资源贡献流程：registry 目录已是约定式结构，可直接做 PR 模板 + CI 校验（metadata 字段完整性、files 存在性）。
5. 增加视角：按“设计风格”聚合的浏览页、资源版本对比、嵌入播放器主题化。
