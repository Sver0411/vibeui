<div align="center">

# ✨ VibeUI

**A local-first UI resource library for vibe coding.**

*Live previews 👀 · Copyable source 📋 · AI prompts included 🤖*

[![resources](https://img.shields.io/badge/resources-794-534AB7)](#-what-you-get)
[![components](https://img.shields.io/badge/components-101-378ADD)](#-what-you-get)
[![animations](https://img.shields.io/badge/animations-34-0055FF)](#-what-you-get)
[![icons](https://img.shields.io/badge/icons-620-639922)](#-what-you-get)
[![blocks](https://img.shields.io/badge/blocks-20-BA7517)](#-what-you-get)
[![templates](https://img.shields.io/badge/templates-19-D4537E)](#-what-you-get)

[![Next.js 14](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](#-commands--tech-stack)
[![React 18](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](#-commands--tech-stack)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](#-commands--tech-stack)
[![Tailwind CSS 3](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](#-commands--tech-stack)
[![简体中文](https://img.shields.io/badge/docs-简体中文-888780)](./README.zh-CN.md)

🏠 No accounts · No cloud · Everything runs and stays in your browser

*App interface is Chinese; resource metadata is bilingual (中/EN).*

</div>

---

## 🚀 30-second start

```bash
git clone https://github.com/Sver0411/vibeui.git
cd vibeui
npm install
npm run dev          # → http://localhost:3000
```

A quick tour once it's running 👇

| Step | Where | What you can do |
|---|---|---|
| 1️⃣ Browse | `explore/` | Search 794 resources; filter by tech / style / difficulty — filters sync to the URL |
| 2️⃣ Inspect | `item/[slug]/` | Sandbox live preview → view & edit source → copy → export ZIP |
| 3️⃣ Tinker | `playground/` | Edit HTML/CSS/JS online, watch the console, share via compressed link |
| 4️⃣ Keep | `favorites/` | Local folders, bulk organize, JSON / ZIP import & export |

<details>
<summary><b>🧰 Commands</b></summary>

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server (http://localhost:3000) |
| `npm run build` | Production build (type checks + static generation) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript only |

</details>

<br>

## 📦 What you get

**794 resources** in five kinds — every one ships with live preview 👀, editable source 📝 and AI guidance 🤖:

| Kind | Count | What you can do |
|---|---|---|
| 🧩 UI Components | 101 | Buttons, forms, navigation, cards — copy and tune |
| 🎬 Animations | 34 | Interactive effects with tunable intensity |
| 🖼️ Icons | 620 | SVG library, searchable by style |
| 🧱 Page Blocks | 20 | Hero, pricing, FAQ, testimonials — ready page sections |
| 📄 Templates | 19 | Whole-page starting points |

## 🧭 Feature highlights

| Module | Highlights |
| --- | --- |
| 🔍 Explore | Search + type/category/tech/style/difficulty/feature filters, **URL-synced**, 6 sort modes, mobile drawer |
| 🤖 AI prompt library | A market of terms & prompts organized by effect: bilingual terms, aliases, 3 detail levels, native/React/Vue variants, tunable parameters, pitfalls |
| 🛠️ Playground | Online HTML/CSS/JS editing, auto/manual run, console output, compressed share links, ZIP export |
| ⭐ Favorites & collections | Local folders, search, bulk organize, JSON lists, multi-resource ZIP downloads |
| 🎨 Personalization | Theme, accent color, density, radius, motion intensity, editor settings, local data import/export |
| ⌨️ Navigation & sharing | Command search, keyboard shortcuts, embeddable previews, sitemap, page metadata |

## 🚦 Three design principles

| | Principle | What it means |
|---|---|---|
| 🏠 | **Local-first** | No sign-in, no tracking, no cloud. Favorites and drafts live in your browser; import/export any time |
| 👀 | **Preview is truth** | What you copy is exactly what the preview rendered. Source is inspectable and editable, never obfuscated |
| 🤖 | **AI-friendly by design** | Resources ship with structured prompts and terminology, not just raw code |

> 🔒 Previews run in sandboxed iframes (no `allow-same-origin`); console output and
> runtime errors come back over `postMessage`. The sandbox is not execution-thread
> isolation — don't run untrusted code.

<br>

<details>
<summary><b>⌨️ Keyboard shortcuts</b></summary>

| Shortcut | Action |
| --- | --- |
| `⌘/Ctrl + K` | Global search |
| `⌘/Ctrl + Enter` | Run code in the playground |
| `⌘/Ctrl + S` | Save a playground draft |
| `⌘/Ctrl + Shift + C` | Copy current code on a resource page |
| `⌘/Ctrl + Shift + E` | Open export on a resource page |
| `Esc` | Close a dialog / leave fullscreen |

</details>

<details>
<summary><b>🧰 Commands & tech stack</b></summary>

Next.js 14 (App Router) · React 18 · strict TypeScript · Tailwind CSS ·
Zustand (state) · Framer Motion (motion) · CodeMirror 6 (editing) ·
JSZip / lz-string / Prettier / Lucide.

</details>

<details>
<summary><b>📤 Export options</b></summary>

1. **Standalone HTML** — styles and scripts embedded in a single file
2. **HTML project ZIP** — HTML + CSS + JS + a generated README
3. **React + Vite project ZIP** — scaffold with TypeScript configuration
4. **CodePen** — prefill a new Pen via form submission

Export settings cover documentation, demo pages, dependency info, comment
retention and conservative compression; favorites reuse the same builders for
multi-resource downloads.

</details>

<details>
<summary><b>📁 Project structure & adding a resource</b></summary>

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
│   └── index.ts            Full server-side registry with AI guidance
├── lib/                    Storage, search, sandbox, export, utilities
└── hooks/ store/ types/ config/
```

**➕ Adding a resource (4 steps):**

1. Create a directory under the matching registry category, following a
   neighboring resource's `metadata.ts` and the `UIResourceMeta` type in
   `src/types/resource.ts` (unique `id` and `slug`; `dir` = path relative to
   `src/registry/`).
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
4. Custom AI guidance goes into `ai-data.ts`, with searchable terms synced in
   `ai-terms.ts`. Resources without custom guidance use the `buildResourceAI`
   fallback.

> Architecture note: client components read `registry/client.ts` (lightweight
> metadata + search terms) instead of the full registry; `registry/server/loader.ts`
> reads source files per resource with module-level caching. Previews, code panels,
> playground prefills and exports always share one implementation.

</details>

<br>

<div align="center">

**✨ VibeUI · copy what you see, prompt what you mean ✨**

</div>
