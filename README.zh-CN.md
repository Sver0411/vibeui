<div align="center">

**简体中文** | [English](./README.md)

# ✨ VibeUI

**本地优先的 UI 资源库，为 vibe coding 而生。**

[![资源总数](https://img.shields.io/badge/资源-794-534AB7)](#-功能总览)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](#-命令与技术栈)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](#-命令与技术栈)

能实时预览 👀 · 源码可抄 📋 · 配好 AI 提示词 🤖 · 不注册 · 不上云 🏠

</div>

---

## 🚀 快速开始

```bash
git clone https://github.com/Sver0411/vibeui.git
cd vibeui
npm install
npm run dev          # → http://localhost:3000
```

打开后建议按这条线逛一遍：**🔍 explore 筛选找灵感 → 📋 详情页预览 / 改码 / 复制 → 🛠️ playground 试想法 → ⭐ 收藏沉淀**。

<br>

## 📦 能获得什么

**794 个资源**，五种类型——每个都带实时预览 👀、可编辑源码 📝 和 AI 提示词 🤖：

| 类型 | 数量 | 能做什么 |
|---|---|---|
| 🧩 UI 组件 | 101 | 按钮、表单、导航、卡片——复制即用，参数可调 |
| 🎬 动效 | 34 | 交互动效，强度可调 |
| 🖼️ 图标 | 620 | SVG 图标库，按风格检索，支持在线调色 |
| 🧱 页面区块 | 20 | 两种 Hero、功能区、数据统计条、定价表、推荐语墙、FAQ、CTA 横幅——整段直接拼进页面 |
| 📄 页面模板 | 19 | 整页级起点，拿走就能改 |

<br>

## 🧭 功能总览

| 模块 | 说明 |
| --- | --- |
| 🏠 首页 | 中文 Hero 搜索、热门关键词、精选 / 最新 / 热门动效 / 提示词库 / 模板 / 分类 / 合集 |
| 🔍 探索页 | 搜索 + 类型 / 分类 / 技术栈 / 风格 / 难度 / 特性筛选，**筛选状态同步到 URL**，6 种排序，网格密度切换，移动端底部抽屉筛选 |
| 🧩 组件与微元素 | 按钮、表单、导航、卡片等组件；开关、复选框、分段控件、评分星、头像组、徽章、气泡提示、加载器、Toast 等微元素——量大管饱的"口粮"层 |
| 🎬 动效 | 交互动效与视觉特效，强度可调，尊重系统 reduced-motion 设置 |
| 🖼️ 图标 | 620 个 SVG 图标，按风格检索，支持在线调色 |
| 🧱 页面区块 | 可直接拼进页面的完整段落，对标 Aceternity 的 section 层 |
| 🤖 AI 提示词库 | 按"效果"组织的术语与提示词市场：搜索术语 / 别名 / 提示词正文，卡片一键复制，按类型筛选 |
| 📋 资源详情页 | 沙箱实时预览（设备尺寸 / 缩放 / 背景 / 刷新 / 全屏）；HTML / CSS / JS / React 源码在线编辑；AI 提示词 tab（术语卡 + 三档提示词 + 框架变体 + 可调参数 + 避坑点） |
| 🛠️ Playground | HTML/CSS/JS 在线编辑，自动 / 手动运行，控制台输出，响应式预览，压缩分享链接，ZIP 导出 |
| ⭐ 收藏与合集 | 本地文件夹、搜索、批量整理、JSON 清单、多资源 ZIP 打包下载 |
| 🎨 个性化 | 主题、强调色、密度、圆角、动效强度、编辑器设置，本地数据导入导出 |
| ⌨️ 导航与分享 | 全局命令搜索、快捷键、可嵌入预览、站点地图、页面元信息 |

<br>

## 🤖 AI 提示词层

这是 VibeUI 和普通组件库最大的区别：每个资源都不只是裸代码，而是一份**可以交给 AI 复现的完整说明**。

| 组成 | 内容 |
| --- | --- |
| 📖 术语卡 | 中英对照术语 + 别名 + 设计模式 + 实现原理 |
| 🎚️ 三档提示词 | 一句话（快速） / 标准（平衡） / 精调（可控） |
| 🏗️ 框架变体 | 原生 HTML / React / Vue 三种口径 |
| 🎛️ 可调参数 | 尺寸、颜色、圆角、动效强度等，改完提示词跟着变 |
| ⚠️ 避坑点 | 该效果最常见的踩坑位置与注意事项 |

用法：在资源详情页打开 **AI 提示词 tab**，选好档位与框架，一键复制，贴给任意 AI。提示词里描述的效果，就是预览里渲染的效果。

<br>

## 💡 你想… → 这样做

| 你想… | 这样做 |
|---|---|
| 按技术栈 / 风格 / 难度找组件 | 🔍 `explore` 的筛选器，状态同步到 URL，可直接分享 |
| 拿走代码 | 📋 一键复制；或导出 ZIP / 单文件 HTML / React+Vite 工程 / CodePen |
| 先改再拿 | 📝 详情页直接编辑源码，预览实时更新 |
| 让 AI 照着做 | 🤖 复制现成提示词——三档详细程度，原生 / React / Vue 变体 |
| 快速验证想法 | 🛠️ Playground：跑代码、看控制台、生成压缩分享链接 |
| 沉淀自己的库 | ⭐ 本地收藏夹 + 合集，JSON 导入导出 |

<br>

## 🚦 三条设计原则

| | 原则 | 含义 |
|---|---|---|
| 🏠 | **本地优先** | 不注册、不追踪、不上云。收藏和草稿都在浏览器本地，随时导入导出 |
| 👀 | **预览即真实** | 复制到的代码就是预览渲染的那份。源码可查看、可编辑，不做混淆 |
| 🤖 | **为 AI 而设计** | 每个资源都带结构化提示词和术语，不只是裸代码 |

> 🔒 **预览隔离**：预览运行在沙箱 iframe 中（不授予 `allow-same-origin`），无法直接访问父页面 DOM 与存储；控制台输出与运行时错误通过 `postMessage` 回传，支持暂停 / 恢复。预览滚出屏幕时自动暂停 CSS 动画，浏览大量预览也不拖慢页面。沙箱不是线程级隔离——请勿运行不可信代码。

<br>

## ⌨️ 快捷键

| 快捷键 | 功能 |
| --- | --- |
| `⌘/Ctrl + K` | 全局搜索 |
| `⌘/Ctrl + Enter` | Playground 运行代码 |
| `⌘/Ctrl + S` | 保存 Playground 草稿 |
| `⌘/Ctrl + Shift + C` | 资源页复制当前代码 |
| `⌘/Ctrl + Shift + E` | 资源页打开导出 |
| `Esc` | 关闭弹窗 / 退出全屏 |

<br>

## 📤 导出选项

1. **单文件 HTML** —— 样式与脚本内嵌的单文件，双击即开
2. **HTML 工程 ZIP** —— HTML + CSS + JS + 自动生成的说明页
3. **React + Vite 工程 ZIP** —— 带 TypeScript 配置的项目脚手架
4. **CodePen** —— 表单提交预填新 Pen

导出设置支持文档、演示页、依赖说明、注释保留与保守压缩；收藏夹批量下载走同一套导出构建器。

<br>

## 🧰 命令与技术栈

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 开发环境（http://localhost:3000） |
| `npm run build` | 生产构建（含类型检查与静态生成） |
| `npm run start` | 运行生产构建 |
| `npm run lint` | ESLint |
| `npm run typecheck` | 仅 TypeScript 检查 |

技术栈：Next.js 14 (App Router) · React 18 · TypeScript (strict) · Tailwind CSS · CSS Variables · Zustand（状态） · Framer Motion（动效） · CodeMirror 6（编辑器） · JSZip / lz-string / Prettier / Lucide。

<br>

## 📁 项目结构与新增资源

```text
src/
├── app/
│   ├── (site)/             主应用路由
│   │   ├── explore/        搜索 + URL 同步筛选
│   │   ├── item/[slug]/    资源详情页
│   │   ├── collections/    精选合集
│   │   ├── favorites/      本地收藏
│   │   ├── playground/     在线代码编辑器
│   │   └── settings/       偏好设置与数据管理
│   ├── embed/[slug]/       独立嵌入预览
│   └── api/resources/      按需加载资源源码
├── components/             布局、预览、编辑器、筛选、弹窗
├── registry/               794 个资源：元数据 + 文件
│   ├── components/ animations/ icons/ blocks/ templates/
│   ├── metas.ts            共享轻量元数据
│   ├── client.ts           客户端安全的元数据与搜索词
│   ├── index.ts            完整服务端注册表（含 AI 指导）
│   ├── ai-data.ts          资源 AI 内容聚合
│   └── server/loader.ts    服务端按目录加载源码
├── lib/                    存储、搜索、沙箱、导出、工具
└── hooks/ store/ types/ config/
```

**➕ 新增一个资源（4 步）：**

1. 在对应分类目录下新建文件夹，参考相邻资源的 `metadata.ts` 与 `src/types/resource.ts` 中的 `UIResourceMeta` 类型（`id`、`slug` 唯一，`dir` 为相对 `src/registry/` 的路径）。
2. 添加源码文件：

```text
src/registry/components/forms/my-control/
├── metadata.ts
├── ai.ts              # 可选：自定义 AI 指导
└── files/
    ├── index.html     # HTML 片段
    ├── styles.css     # 样式、动效、响应式
    ├── script.js      # 可选：交互逻辑
    └── react.tsx      # 可选：React 实现
```

3. 在 `src/registry/metas.ts` 的 `RAW_RESOURCES` 中注册元数据。
4. 自定义 AI 指导写入 `ai-data.ts`，搜索术语同步到 `ai-terms.ts`；未自定义的资源走 `buildResourceAI` 兜底。

> 🧱 **注册表架构**：客户端组件通过 `registry/client.ts` 读取轻量元数据与搜索词（不打包全部源码与长提示词）；`registry/server/loader.ts` 在服务端按目录加载源码并做模块级缓存，同时服务详情页、按需 API、Playground 预填与嵌入预览。

---

<div align="center">

**简体中文** | [English](./README.md)

**✨ VibeUI · 看到什么抄什么，想要什么说什么 ✨**

</div>
