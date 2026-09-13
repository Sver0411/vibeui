<div align="center">

# ✨ VibeUI

**A local-first UI resource library for vibe coding.**

[![resources](https://img.shields.io/badge/resources-794-534AB7)](#-feature-overview)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](#-commands--tech-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](#-commands--tech-stack)
[![简体中文](https://img.shields.io/badge/docs-简体中文-888780)](./README.zh-CN.md)

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

<br>

## 🧭 Feature overview

| Module | Highlights |
| --- | --- |
| 🏠 Home | Hero search, trending keywords, featured / latest / hot animations / prompt library / templates / categories / collections |
| 🔍 Explore | Search + type/category/tech/style/difficulty/feature filters, **URL-synced**, 6 sort modes, grid density, mobile drawer |
| 🧩 Components & primitives | Buttons, forms, navigation, cards; toggles, ratings, badges, toasts — the everyday staples |
| 🎬 Animations | Interactive effects with tunable intensity, honoring reduced-motion |
| 🖼️ Icons | 620 SVG icons, searchable by style, recolorable online |
| 🧱 Page Blocks | Ready page sections: two Heros, feature grids, stats bar, pricing, testimonial wall, FAQ, CTA banners |
| 🤖 AI prompt library | A market of terms & prompts organized by effect: search terms / aliases / prompt body, one-click copy |
| 📋 Resource pages | Sandbox live preview (device sizes / zoom / backgrounds / fullscreen); HTML/CSS/JS/React source editing; AI tab (terminology cards + 3 prompt levels + framework variants + parameters + pitfalls) |
| 🛠️ Playground | Online HTML/CSS/JS editing, auto/manual run, console output, responsive preview, compressed share links, ZIP export |
| ⭐ Favorites & collections | Local folders, search, bulk organize, JSON lists, multi-resource ZIP downloads |
| 🎨 Personalization | Theme, accent color, density, radius, motion intensity, editor settings, local data import/export |
| ⌨️ Navigation & sharing | Command search, keyboard shortcuts, embeddable previews, sitemap, page metadata |

<br>

## 🚦 Three design principles

| | Principle | What it means |
|---|---|---|
| 🏠 | **Local-first** | No sign-in, no tracking, no cloud. Favorites and drafts live in your browser; import/export any time |
| 👀 | **Preview is truth** | What you copy is exactly what the preview rendered. Source is inspectable and editable, never obfuscated |
| 🤖 | **AI-friendly by design** | Resources ship with structured prompts and terminology, not just raw code |

> 🔒 Previews run in sandboxed iframes (no `allow-same-origin`); console output and
> runtime errors come back over `postMessage`; animations pause when previews scroll
> offscreen. The sandbox is not execution-thread isolation — don't run untrusted code.

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

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server (http://localhost:3000) |
| `npm run build` | Production build (type checks + static generation) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript only |

Stack: Next.js 14 (App Router) · React 18 · strict TypeScript · Tailwind CSS ·
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
