import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CURRENT_DATA_VERSION, persistedStorage } from "@/lib/storage/adapter";

export interface EditedFiles {
  html?: string;
  css?: string;
  javascript?: string;
  react?: string;
  savedAt: number;
}

export interface PlaygroundDraft {
  html: string;
  css: string;
  javascript: string;
  savedAt: number;
}

interface EditorState {
  /** Per-resource code overrides made in the detail page editor. */
  overrides: Record<string, EditedFiles>;
  /** Playground working draft. */
  playground: PlaygroundDraft | null;
  saveOverride: (slug: string, files: Omit<EditedFiles, "savedAt">) => void;
  clearOverride: (slug: string) => void;
  clearAllOverrides: () => void;
  savePlayground: (draft: Omit<PlaygroundDraft, "savedAt">) => void;
  clearPlayground: () => void;
}

const MAX_DRAFT_BYTES = 512 * 1024;

function isValidEditor(value: unknown): boolean {
  return typeof value === "object" && value !== null && "overrides" in value;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      overrides: {},
      playground: null,
      saveOverride: (slug, files) =>
        set((state) => ({
          overrides: { ...state.overrides, [slug]: { ...files, savedAt: Date.now() } },
        })),
      clearOverride: (slug) =>
        set((state) => {
          const next = { ...state.overrides };
          delete next[slug];
          return { overrides: next };
        }),
      clearAllOverrides: () => set({ overrides: {} }),
      savePlayground: (draft) => {
        const bytes = (draft.html.length + draft.css.length + draft.javascript.length) * 2;
        if (bytes > MAX_DRAFT_BYTES) {
          console.warn("[VibeUI] Playground draft exceeds 512 KB and was not autosaved.");
          return;
        }
        set({ playground: { ...draft, savedAt: Date.now() } });
      },
      clearPlayground: () => set({ playground: null }),
    }),
    {
      name: "editor-drafts",
      version: CURRENT_DATA_VERSION,
      storage: createJSONStorage(() => persistedStorage),
      partialize: (state) => ({
        overrides: state.overrides,
        playground: state.playground,
        version: CURRENT_DATA_VERSION,
      }),
      migrate: (persisted) => {
        const data = persisted as Record<string, unknown>;
        return {
          overrides:
            typeof data.overrides === "object" && data.overrides !== null
              ? (data.overrides as EditorState["overrides"])
              : {},
          playground:
            typeof data.playground === "object" && data.playground !== null
              ? (data.playground as PlaygroundDraft)
              : null,
        };
      },
    },
  ),
);
