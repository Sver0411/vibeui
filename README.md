# VibeUI

**English** | [简体中文](./README.zh-CN.md)

![Next.js 14](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)
![React 18](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)
![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS 3](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Zustand 4](https://img.shields.io/badge/Zustand-4-795548)
![Framer Motion 11](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)
![CodeMirror 6](https://img.shields.io/badge/CodeMirror-6-D30707)

**Live UI resources. Copyable code. Prompts that help AI build what you mean.**

VibeUI is a local-first frontend resource library for vibe coding. Browse **794 resources**: 101 UI components, 34 animations, 620 icons, 20 page blocks, and 19 website templates. Preview resources, inspect and edit their source, copy code, or export a project ZIP. Each resource includes AI guidance with design terminology, implementation prompts, adjustable parameters, and common pitfalls.

The application interface and much of the resource content are currently in Chinese. This English README documents the project; it does not imply an English UI is available.

## Getting started

```bash
git clone https://github.com/Sver0411/vibeui.git
cd vibeui
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). Access to this private repository is required to clone it.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production, including type checks and static generation |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript checks without emitting files |

## Features

- **Discovery:** search and filter by resource type, category, technology, style, difficulty, and features. Filters are synchronized with the URL.
- **Components and icons:** buttons, forms, navigation, cards, progress indicators, UI primitives, and an SVG icon library.
- **Animations, blocks, and templates:** interactive effects, reusable page sections, and complete page starting points.
- **Live previews:** sandboxed previews with device sizes, scaling, backgrounds, refresh, and fullscreen controls.
- **Source code:** HTML, CSS, JavaScript, and React files where supplied, with usage and dependency information. Edit code, preview changes, copy files, and save local drafts.
- **AI guidance:** Chinese and English terminology, aliases, implementation principles, three prompt levels, native/React/Vue prompt variants, tunable parameters, and pitfalls.
- **Playground:** HTML/CSS/JS editing, automatic or manual execution, console output, responsive previews, compressed share links, and ZIP export.
- **Favorites and collections:** local folders, search, bulk organization, JSON lists, and ZIP downloads of saved resources.
- **Personalization:** theme, accent color, density, corner radius, motion intensity, editor settings, and local data import/export.
- **Navigation and sharing:** command search, keyboard shortcuts, embeddable previews, sitemap, and page metadata.

### Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| `⌘/Ctrl + K` | Open global search |
| `⌘/Ctrl + Enter` | Run code in the playground |
| `⌘/Ctrl + S` | Save a playground draft |
| `⌘/Ctrl + Shift + C` | Copy current code on a resource page |
| `⌘/Ctrl + Shift + E` | Open export on a resource page |
| `Esc` | Close a dialog or leave fullscreen |

## Tech stack

Next.js 14 (App Router), React 18, strict TypeScript, Tailwind CSS, and CSS variables form the application foundation. Zustand handles client state, Framer Motion handles interface motion, and CodeMirror 6 powers code editing. Supporting libraries include JSZip, lz-string, Prettier, and Lucide React.

## Project structure

```text
src/
├── app/
│   ├── (site)/             # Main application routes and layout
│   │   ├── explore/       # Search and URL-synchronized filters
│   │   ├── item/[slug]/   # Resource detail pages
│   │   ├── collections/   # Curated collections
│   │   ├── favorites/     # Local favorites
│   │   ├── playground/    # Live code editor
│   │   └── settings/      # Preferences and data management
│   ├── embed/[slug]/      # Standalone embedded previews
│   └── api/resources/     # On-demand resource source loading
├── components/            # Layout, previews, editors, filters, and dialogs
├── registry/
│   ├── components/        # UI components grouped by category
│   ├── animations/        # Motion and visual effects
│   ├── icons/             # Icon resources
│   ├── blocks/            # Reusable page sections
│   ├── templates/         # Page templates
│   ├── metas.ts           # Shared lightweight resource metadata
│   ├── client.ts          # Client-safe metadata and search terms
│   ├── index.ts           # Full server-side registry with AI guidance
│   ├── ai-data.ts         # Resource AI content aggregation
│   ├── ai-terms.ts        # Client-side search terminology
│   └── server/loader.ts   # Source-file loading on the server
├── lib/                   # Storage, search, sandbox, export, and utilities
└── hooks/ store/ types/ config/
```

## Adding a resource

1. Create a directory under the appropriate registry category. Follow a neighboring resource's `metadata.ts` and the `UIResourceMeta` type in `src/types/resource.ts`. Give the resource a unique ID and slug, and make its `dir` match its path relative to `src/registry/`.
2. Add the resource's preview and export source files:

   ```text
   src/registry/components/forms/my-control/
   ├── metadata.ts
   ├── ai.ts              # Optional custom AI guidance
   └── files/
       ├── index.html     # HTML body fragment
       ├── styles.css     # Styles, animation, and responsive rules
       ├── script.js      # Optional interaction logic
       └── react.tsx      # Optional React implementation
   ```

3. Import the metadata in `src/registry/metas.ts` and add it to `RAW_RESOURCES`.
4. If supplying custom AI guidance, register it in `ai-data.ts` and keep searchable terminology in `ai-terms.ts` in sync. Resources without custom guidance use the `buildResourceAI` fallback.

The registry powers discovery, search, detail pages, and embedded previews. Source files are loaded by convention from `files/`, so previews, code panels, playground prefills, and exports share the same implementation.

## Registry architecture

Client components use `registry/client.ts` for lightweight metadata and searchable terms instead of importing all source code and long-form prompts. The full server registry merges resource metadata with AI content.

`registry/server/loader.ts` reads source files by resource directory on the server, with module-level caching. It serves resource detail pages, the on-demand resource API, playground prefills, and embedded previews.

## Export options

1. **Standalone HTML:** styles and scripts embedded in a single file.
2. **HTML project ZIP:** HTML, CSS, JavaScript, and an optional generated README.
3. **React + Vite project ZIP:** a project scaffold with TypeScript configuration and source files.
4. **CodePen:** prefill a new Pen using a form submission.

Export settings include documentation, demo pages, dependency information, comment retention, and conservative whitespace compression. ZIP progress reflects JSZip compression progress. Favorites use the same export builders for multi-resource downloads.

## Preview isolation and performance

Previews run in sandboxed iframes without `allow-same-origin`, preventing direct access to the parent page's DOM and storage. A lightweight harness uses `postMessage` for console output, runtime errors, and pause/resume controls.

Offscreen preview handling uses IntersectionObserver and an `atlas-paused` class to pause CSS animations. Resource animation loops that honor the pause signal can also stop work while offscreen, reducing unnecessary rendering when browsing many previews.

The sandbox is not a guarantee of execution-thread isolation: an infinite loop can still freeze the page. Do not run untrusted code.

## Local data

Preferences, favorites, folders, browsing/search history, and editor drafts are stored locally through the storage adapter and Zustand persistence. Storage keys use the `ui-atlas:` prefix. The adapter includes unavailable-storage fallbacks, recovery from malformed data, and versioned migration support.

Browser-local data is not included in this Git repository. Use the application's data export/import controls to move it between browsers or devices.

## Known limitations

- External requests remain subject to browser CORS restrictions.
- Sandboxed previews cannot use normal same-origin `localStorage` access.
- Whitespace compression is conservative, not a full code minifier.
- Compressed share URLs have a size guard of approximately 28 KB; use ZIP export for larger projects.
- Source formats vary by resource; some React template implementations are compact single-file versions.
- iframe sandboxing does not safely terminate arbitrary infinite loops.

## Possible extensions

Future directions include stronger execution isolation, account-based synchronization through a remote storage adapter, a dedicated search service, and contribution checks for metadata and source-file completeness.
