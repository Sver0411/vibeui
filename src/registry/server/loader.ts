import fs from "fs";
import path from "path";
import type { ResourceFiles, UIResource, UIResourceMeta } from "@/types/resource";

/**
 * Server-only loader that reads a resource's code files from disk.
 * Each resource directory follows the convention:
 *
 *   src/registry/<group>/<folder>/<slug>/
 *     ├── metadata.ts     (client-safe metadata, bundled)
 *     └── files/
 *         ├── index.html
 *         ├── styles.css
 *         ├── script.js
 *         └── react.tsx
 *
 * Keeping code as real files means the preview, the code viewer, the
 * playground and the export ZIP all read the exact same source of truth.
 */

const REGISTRY_ROOT = path.join(process.cwd(), "src", "registry");

const FILE_CONVENTIONS: Record<keyof ResourceFiles, string> = {
  html: "index.html",
  css: "styles.css",
  javascript: "script.js",
  react: "react.tsx",
};

const cache = new Map<string, ResourceFiles>();

export function loadResourceFiles(dir: string): ResourceFiles {
  const cached = cache.get(dir);
  if (cached) return cached;

  const filesDir = path.join(REGISTRY_ROOT, dir, "files");
  const files: ResourceFiles = {};

  if (fs.existsSync(filesDir)) {
    for (const [key, fileName] of Object.entries(FILE_CONVENTIONS)) {
      const filePath = path.join(filesDir, fileName);
      try {
        if (fs.existsSync(filePath)) {
          files[key as keyof ResourceFiles] = fs.readFileSync(filePath, "utf-8");
        }
      } catch (error) {
        console.warn(`[UI Atlas] Failed to read ${filePath}:`, error);
      }
    }
  } else {
    console.warn(`[UI Atlas] Missing files directory for resource "${dir}"`);
  }

  cache.set(dir, files);
  return files;
}

export function loadResource(meta: UIResourceMeta): UIResource {
  return { ...meta, files: loadResourceFiles(meta.dir) };
}

export function hasFile(files: ResourceFiles, key: keyof ResourceFiles): boolean {
  const content = files[key];
  return typeof content === "string" && content.trim().length > 0;
}
