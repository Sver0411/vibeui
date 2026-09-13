<div align="center">

[简体中文](./README.zh-CN.md) | **English**

# ✨ VibeUI

**A local-first UI resource library for vibe coding.**

[![resources](https://img.shields.io/badge/resources-794-534AB7)](#-feature-overview)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](#-commands--tech-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](#-commands--tech-stack)

Live previews 👀 · Copyable source 📋 · AI prompts included 🤖 · No accounts · No cloud 🏠

*App interface is Chinese; resource metadata is bilingual (中/EN).*

</div>

---

## 🚀 Getting started

```bash
git clone https://github.com/Sver0411/vibeui.git
cd vibeui
npm install
npm run dev          # → http://localhost:3000
```

Suggested first tour: **🔍 filter in explore → 📋 preview / edit / copy on a detail page → 🛠️ try ideas in the playground → ⭐ save what you like**.

<br>

## 📦 What you get

**794 resources** in five kinds — every one ships with live preview 👀, editable source 📝 and AI guidance 🤖:

| Kind | Count | What you can do |
|---|---|---|
| 🧩 UI Components | 101 | Buttons, forms, navigation, cards — copy and tune |
| 🎬 Animations | 34 | Interactive effects with tunable intensity |
| 🖼️ Icons | 620 | SVG library, searchable by style, recolorable online |
| 🧱 Page Blocks | 20 | Two Heros, feature grids, stats bar, pricing, testimonial wall, FAQ, CTA banners |
| 📄 Templates | 19 | Whole-page starting points |

<br>

## 🧭 Feature overview

| Module | Highlights |
| --- | --- |
| 🏠 Home | Hero search, trending keywords, featured / latest / hot animations / prompt library / templates / categories / collections |
| 🔍 Explore | Search + type/category/tech/style/difficulty/feature filters, **URL-synced**, 6 sort modes, grid density, mobile drawer |
| 🧩 Components & primitives | Buttons, forms, navigation, cards; toggles, checkboxes, segmented controls, ratings, avatar groups, badges, tooltips, loaders, toasts |
| 🎬 Animations | Interactive effects with tunable intensity, honoring reduced-motion |
| 🖼️ Icons | 620 SVG icons, searchable by style, recolorable online |
| 🧱 Page Blocks | Ready page sections, in the spirit of Aceternity's section layer |
| 🤖 AI prompt library | A market of terms & prompts organized by effect: search terms / aliases / prompt body, one-click copy |
| 📋 Resource pages | Sandbox live preview (device sizes / zoom / backgrounds / refresh / fullscreen); HTML/CSS/JS/React source editing; AI prompt tab (terminology cards + 3 prompt levels + framework variants + parameters + pitfalls) |
| 🛠️ Playground | Online HTML/CSS/JS editing, auto/manual run, console output, responsive preview, compressed share links, ZIP export |
| ⭐ Favorites & collections | Local folders, search, bulk organize, JSON lists, multi-resource ZIP downloads |
| 🎨 Personalization | Theme, accent color, density, radius, motion intensity, editor settings, local data import/export |
| ⌨️ Navigation & sharing | Command search, keyboard shortcuts, embeddable previews, sitemap, page metadata |

<br>

## 🤖 The AI prompt layer

This is what sets VibeUI apart from a plain component library: every resource is not just raw code but a **complete brief an AI can reproduce**.

| Part | Content |
| --- | --- |
| 📖 Terminology cards | Bilingual terms + aliases + design patterns + implementation principles |
| 🎚️ Three prompt levels | One-liner (quick) / Standard (balanced) / Refined (controlled) |
| 🏗️ Framework variants | Native HTML / React / Vue |
| 🎛️ Tunable parameters | Size, color, radius, motion intensity — the prompt updates as you tweak |
| ⚠️ Pitfalls | Where this effect usually breaks, and what to watch for |

Usage: open the **AI prompt tab** on a resource page, pick a level and framework, copy, and paste into any AI. The effect the prompt describes is the effect the preview shows.

<br>

## 💡 I want to… → do this

| You want to… | Do this |
|---|---|
| Find a component by tech / style / difficulty | 🔍 `explore` filters, synchronized with the URL |
| Grab the code | 📋 One-click copy; or export ZIP / standalone HTML / React+Vite project / CodePen |
| Tweak before you take | 📝 Edit source in-place on the detail page; the preview updates live |
| Let AI rebuild it your way | 🤖 Copy a ready-made prompt — 3 detail levels, native / React / Vue variants |
| Test an idea quickly | 🛠️ Playground: run code, watch the console, share via compressed link |
| Keep a personal library | ⭐ Local favorites & collections with JSON import/export |

<br>

## 🚦 Three design principles

| | Principle | What it means |
|---|---|---|
| 🏠 | **Local-first** | No sign-in, no tracking, no cloud. Favorites and drafts live in your browser; import/export any time |
| 👀 | **Preview is truth** | What you copy is exactly what the preview rendered. Source is inspectable and editable, never obfuscated |
| 🤖 | **AI-friendly by design** | Resources ship with structured prompts and terminology, not just raw code |

> 🔒 **Preview isolation**: previews run in sandboxed iframes (no `allow-same-origin`) and cannot touch the parent page's DOM or storage; console output and runtime errors come back over `postMessage`, with pause/resume controls. Offscreen previews pause CSS animations via IntersectionObserver, so browsing many previews stays fast. The sandbox is not execution-thread isolation — don't run untrusted code.

<br>

## ⌨️ Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| `⌘/Ctrl + K` | Global search |
| `⌘/Ctrl + Enter` | Run code in the playground |
| `⌘/Ctrl + S` | Save a playground draft |
| `⌘/Ctrl + Shift + C` | Copy current code on a resource page |
| `⌘/Ctrl + Shift + E` | Open export on a resource page |
| `Esc` | Close a dialog / leave fullscreen |

<br>

## 📤 Export options

1. **Standalone HTML** — styles and scripts embedded in a single file
2. **HTML project ZIP** — HTML + CSS + JS + a generated README
3. **React + Vite project ZIP** — scaffold with TypeScript configuration
4. **CodePen** — prefill a new Pen via form submission

Export settings cover documentation, demo pages, dependency info, comment retention and conservative compression; favorites reuse the same builders for multi-resource downloads.

<br>

## 🧰 Commands & tech stack

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server (http://localhost:3000) |
| `npm run build` | Production build (type checks + static generation) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript only |

Stack: Next.js 14 (App Router) · React 18 · strict TypeScript · Tailwind CSS · CSS Variables · Zustand (state) · Framer Motion (motion) · CodeMirror 6 (editing) · JSZip / lz-string / Prettier / Lucide.

<br>

## 📁 Project structure & adding a resource

```text
src/
├── app/
│   ├── (site)/             Main routes
│   │   ├── explore/        Search + URL-synced filters
│   │   ├── item/[slug]/    Resource detail pages
│   │   ├── collections/    Curated collections
│   │   ├── favorites/      Local favorites
│   │   ├── playground/     Live code editor
│   │   └── settings/       Preferences & data management
│   ├── embed/[slug]/       Standalone embeddable previews
│   └── api/resources/      On-demand resource source loading
├── components/             Layout, previews, editors, filters, dialogs
├── registry/               794 resources: metadata + files
│   ├── components/ animations/ icons/ blocks/ templates/
│   ├── metas.ts            Shared lightweight resource metadata
│   ├── client.ts           Client-safe metadata + search terms
│   ├── index.ts            Full server-side registry with AI guidance
│   ├── ai-data.ts          Resource AI content aggregation
│   └── server/loader.ts    Server-side source loading
├── lib/                    Storage, search, sandbox, export, utilities
└── hooks/ store/ types/ config/
```

**➕ Adding a resource (4 steps):**

1. Create a directory under the matching registry category, following a neighboring resource's `metadata.ts` and the `UIResourceMeta` type in `src/types/resource.ts` (unique `id` and `slug`; `dir` = path relative to `src/registry/`).
2. Add the source files:

```text
src/registry/components/forms/my-control/
├── metadata.ts
├── ai.ts              # Optional custom AI guidance
└── files/
    ├── index.html     # HTML body fragment
    ├── styles.css     # Styles, animation, responsive rules
    ├── script.js      # Optional interaction logic
    └── react.tsx      # Optional React implementation
```

3. Register the metadata in `src/registry/metas.ts` (`RAW_RESOURCES`).
4. Custom AI guidance goes into `ai-data.ts`, with searchable terms synced in `ai-terms.ts`. Resources without custom guidance use the `buildResourceAI` fallback.

> 🧱 **Registry architecture**: client components read `registry/client.ts` (lightweight metadata + search terms) instead of the full registry; `registry/server/loader.ts` reads source files per resource with module-level caching, serving detail pages, the on-demand API, playground prefills and embedded previews.

---

<div align="center">

[简体中文](./README.zh-CN.md) | **English**

**✨ VibeUI · copy what you see, prompt what you mean ✨**

</div>
