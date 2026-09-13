<div align="center">

# VibeUI

**本地优先的 UI 资源库，为 vibe coding 而生。**

[![resources](https://img.shields.io/badge/资源-794-534AB7)](#能获得什么)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](#命令与技术栈)
[![React 18](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](#命令与技术栈)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](#命令与技术栈)
[![Tailwind CSS 3](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](#命令与技术栈)
[![English](https://img.shields.io/badge/docs-English-888780)](./README.md)

**能实时预览、源码可抄、配好 AI 提示词。**
不需要注册，没有云端——一切都在你的浏览器里完成。

</div>

---

## 30 秒上手

```bash
git clone https://github.com/Sver0411/vibeui.git
cd vibeui
npm install
npm run dev          # → http://localhost:3000
```

```text
explore/             按 794 个资源浏览，筛选状态同步到 URL
item/[slug]/         实时预览 → 查看并修改源码 → 复制 → 导出 ZIP
playground/          HTML/CSS/JS 在线编辑：控制台、分享链接、导出
favorites/           本地收藏夹、批量整理、JSON / ZIP 导入导出
```

<br>

## 能获得什么

**794 个资源**，五种类型——每个都带实时预览、可编辑源码和 AI 提示词：

| 类型 | 数量 | 能做什么 |
|---|---|---|
| UI 组件 | 101 | 按钮、表单、导航、卡片——复制即用，参数可调 |
| 动效 | 34 | 交互动效，强度可调 |
| 图标 | 620 | SVG 图标库，按风格检索 |
| 页面区块 | 20 | Hero、定价表、FAQ、推荐语墙——整段可直接拼进页面 |
| 页面模板 | 19 | 整页级起点，拿走就能改 |

<br>

## 怎么用

| 你想… | 这样做 |
|---|---|
| 按技术栈 / 风格 / 难度找组件 | `explore` 的筛选器，状态同步到 URL，可分享 |
| 拿走代码 | 一键复制；或导出 ZIP / 单文件 HTML / React+Vite 工程 / CodePen |
| 先改再拿 | 直接在页面里编辑源码，预览实时更新 |
| 让 AI 照着做 | 复制现成提示词——三档详细程度，原生 / React / Vue 变体 |
| 快速验证想法 | Playground：跑代码、看控制台、生成压缩分享链接 |
| 沉淀自己的库 | 本地收藏夹 + 合集，JSON 导入导出 |

每个资源还附带 **AI 提示词层**：中英术语、别名、实现原理、可调参数、避坑点——
保证你贴给 AI 的提示词，产出和预览里看到的一致。

<br>

## 三条设计原则

| | 原则 | 含义 |
|---|---|---|
| 🏠 | **本地优先** | 不注册、不追踪、不上云。收藏和草稿都在浏览器本地，随时导入导出 |
| 👀 | **预览即真实** | 复制到的代码就是预览渲染的那份。源码可查看、可编辑，不做混淆 |
| 🤖 | **为 AI 而设计** | 每个资源都带结构化提示词和术语，不只是裸代码 |

> 预览运行在沙箱 iframe 中（不授予 `allow-same-origin`），控制台输出与运行时错误
> 通过 `postMessage` 回传。沙箱不是线程级隔离——不要运行不可信代码。

<br>

<details>
<summary><b>快捷键</b></summary>

| 快捷键 | 功能 |
| --- | --- |
| `⌘/Ctrl + K` | 全局搜索 |
| `⌘/Ctrl + Enter` | Playground 运行代码 |
| `⌘/Ctrl + S` | 保存 Playground 草稿 |
| `⌘/Ctrl + Shift + C` | 资源页复制当前代码 |
| `⌘/Ctrl + Shift + E` | 资源页打开导出 |
| `Esc` | 关闭弹窗 / 退出全屏 |

</details>

<details>
<summary><b>命令与技术栈</b></summary>

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 开发环境 |
| `npm run build` | 生产构建（类型检查 + 静态生成） |
| `npm run start` | 运行生产构建 |
| `npm run lint` | ESLint |
| `npm run typecheck` | 仅 TypeScript 检查 |

Next.js 14 (App Router) · React 18 · TypeScript (strict) · Tailwind CSS ·
Zustand（状态） · Framer Motion（动效） · CodeMirror 6（编辑器） ·
JSZip / lz-string / Prettier / Lucide。

</details>

<details>
<summary><b>项目结构</b></summary>

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
│   └── index.ts            完整服务端注册表（含 AI 指导）
├── lib/                    存储、搜索、沙箱、导出、工具
└── hooks/ store/ types/ config/
```

注册表驱动发现、搜索、详情页与嵌入预览；源码按 `files/` 约定加载——
预览、代码面板、Playground 预填和导出永远共享同一份实现。

</details>

<details>
<summary><b>新增一个资源</b></summary>

1. 在对应分类目录下新建文件夹，参考相邻资源的 `metadata.ts` 与
   `src/types/resource.ts` 中的 `UIResourceMeta` 类型（`id`、`slug` 唯一，
   `dir` 为相对 `src/registry/` 的路径）。
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
4. 自定义 AI 指导写入 `ai-data.ts`，搜索术语同步到 `ai-terms.ts`；
   未自定义的资源走 `buildResourceAI` 兜底。

客户端组件通过 `registry/client.ts` 读取轻量元数据与搜索词（不打包全部源码）；
`registry/server/loader.ts` 在服务端按目录加载源码并做模块级缓存。

</details>

<br>

<div align="center">

**VibeUI · 看到什么抄什么，想要什么说什么**

</div>
