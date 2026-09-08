import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CURRENT_DATA_VERSION, persistedStorage } from "@/lib/storage/adapter";

export interface ViewedEntry {
  slug: string;
  at: number;
}

const MAX_VIEWED = 60;
const MAX_SEARCHES = 8;

interface HistoryState {
  viewed: ViewedEntry[];
  searches: string[];
  recordView: (slug: string) => void;
  addSearch: (query: string) => void;
  removeSearch: (query: string) => void;
  clearViewed: () => void;
  clearSearches: () => void;
  clearAll: () => void;
}

function isValidHistory(value: unknown): boolean {
  return typeof value === "object" && value !== null && "viewed" in value;
}

export const useHistory = create<HistoryState>()(
  persist(
    (set) => ({
      viewed: [],
      searches: [],
      recordView: (slug) =>
        set((state) => ({
          viewed: [
            { slug, at: Date.now() },
            ...state.viewed.filter((entry) => entry.slug !== slug),
          ].slice(0, MAX_VIEWED),
        })),
      addSearch: (query) => {
        const q = query.trim();
        if (!q) return;
        set((state) => ({
          searches: [q, ...state.searches.filter((s) => s !== q)].slice(0, MAX_SEARCHES),
        }));
      },
      removeSearch: (query) =>
        set((state) => ({ searches: state.searches.filter((s) => s !== query) })),
      clearViewed: () => set({ viewed: [] }),
      clearSearches: () => set({ searches: [] }),
      clearAll: () => set({ viewed: [], searches: [] }),
    }),
    {
      name: "history",
      version: CURRENT_DATA_VERSION,
      storage: createJSONStorage(() => persistedStorage),
      partialize: (state) => ({
        viewed: state.viewed,
        searches: state.searches,
        version: CURRENT_DATA_VERSION,
      }),
      migrate: (persisted) => {
        const data = persisted as Record<string, unknown>;
        return {
          viewed: Array.isArray(data.viewed)
            ? (data.viewed as unknown[]).filter(
                (entry): entry is ViewedEntry =>
                  typeof entry === "object" &&
                  entry !== null &&
                  typeof (entry as ViewedEntry).slug === "string",
              )
            : [],
          searches: Array.isArray(data.searches)
            ? (data.searches as unknown[]).filter(
                (s): s is string => typeof s === "string",
              )
            : [],
        };
      },
    },
  ),
);
