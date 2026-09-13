<div align="center">

# VibeUI

**A local-first UI resource library for vibe coding.**

[![resources](https://img.shields.io/badge/resources-794-534AB7)](#what-you-get)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](#commands--tech-stack)
[![React 18](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](#commands--tech-stack)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](#commands--tech-stack)
[![Tailwind CSS 3](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](#commands--tech-stack)
[![简体中文](https://img.shields.io/badge/docs-简体中文-888780)](./README.zh-CN.md)

**Live previews. Copyable source. AI prompts that describe what you mean.**
No accounts, no cloud — everything runs and stays in your browser.

*The app interface is Chinese; this README documents the project in English.*

</div>

---

## 30-second start

```bash
git clone https://github.com/Sver0411/vibeui.git
cd vibeui
npm install
npm run dev          # → http://localhost:3000
```

```text
explore/          Browse 794 resources with URL-synced filters
item/[slug]/      Live preview → inspect & edit source → copy → export ZIP
playground/       HTML/CSS/JS editor with console, share links, ZIP export
favorites/        Local folders, bulk organize, JSON / ZIP export
```

<br>

## What you get

**794 resources** in five kinds — every one ships with live preview, editable source, and AI guidance:

| Kind | Count | What you can do |
|---|---|---|
| UI Components | 101 | Buttons, forms, navigation, cards — copy the code, tune the variants |
| Animations | 34 | Interactive effects with tunable intensity |
| Icons | 620 | SVG library, searchable by style |
| Page Blocks | 20 | Hero, pricing, FAQ, testimonials — ready-made page sections |
| Templates | 19 | Complete starting points for whole pages |

<br>

## How it works for you

| You want to… | Do this |
|---|---|
| Find a component by tech / style / difficulty | `explore` filters, synchronized with the URL |
| Grab the code | One-click copy, or export as ZIP / standalone HTML / React+Vite project / CodePen |
| Tweak before you take | Edit source in-place; the preview updates live |
| Let AI rebuild it your way | Copy a ready-made prompt — 3 detail levels, native / React / Vue variants |
| Test an idea quickly | Playground: run code, watch the console, share via compressed link |
| Keep a personal library | Local favorites & collections with JSON import/export |

Every resource also carries **AI guidance**: bilingual terminology, aliases,
implementation principles, adjustable parameters, and common pitfalls — so the
prompt you paste produces what the preview showed.

<br>

## Design principles

| | Principle | What it means |
|---|---|---|
| 🏠 | **Local-first** | No sign-in, no tracking, no cloud. Favorites and drafts live in your browser; import/export whenever you like |
| 👀 | **Preview is truth** | What you copy is exactly what the preview rendered. Source is inspectable and editable, never obfuscated |
| 🤖 | **AI-friendly by design** | Resources ship with structured prompts and terminology, not just raw code |

> Previews run in sandboxed iframes (no `allow-same-origin`); console output and
> runtime errors come back over `postMessage`. The sandbox is not execution-thread
> isolation — don't run untrusted code.

<br>

<details>
<summary><b>Keyboard shortcuts</b></summary>

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
<summary><b>Commands & tech stack</b></summary>

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build: type checks + static generation |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

Next.js 14 (App Router) · React 18 · strict TypeScript · Tailwind CSS ·
Zustand (state) · Framer Motion (motion) · CodeMirror 6 (editing) ·
JSZip / lz-string / Prettier / Lucide.

</details>

<details>
<summary><b>Project structure</b></summary>

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

The registry powers discovery, search, detail pages, and embedded previews.
Source files load by convention from `files/`, so previews, code panels,
playground prefills, and exports always share one implementation.

</details>

<details>
<summary><b>Adding a resource</b></summary>

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

Client components read `registry/client.ts` (lightweight metadata + search
terms) instead of the full registry; `registry/server/loader.ts` reads source
files per resource with module-level caching.

</details>

<br>

<div align="center">

**VibeUI · copy what you see, prompt what you mean**

</div>
