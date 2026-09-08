import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CURRENT_DATA_VERSION, persistedStorage } from "@/lib/storage/adapter";
import { toFilenameSlug } from "@/lib/utils";

export interface FavoriteEntry {
  folder: string;
  addedAt: number;
}

export interface Folder {
  id: string;
  label: string;
}

/** Default folders. "all" is virtual and never stored. */
export const DEFAULT_FOLDERS: Folder[] = [
  { id: "inspiration", label: "灵感" },
  { id: "components", label: "组件" },
  { id: "animations", label: "动效" },
  { id: "templates", label: "模板" },
];

export const FALLBACK_FOLDER = "inspiration";

interface FavoritesState {
  favorites: Record<string, FavoriteEntry>;
  customFolders: Folder[];
  addFavorite: (resourceId: string, folder?: string) => void;
  removeFavorite: (resourceId: string) => void;
  toggleFavorite: (resourceId: string, folder?: string) => boolean;
  moveFavorite: (resourceId: string, folder: string) => void;
  createFolder: (label: string) => string;
  renameFolder: (folderId: string, label: string) => void;
  deleteFolder: (folderId: string) => void;
  clearAll: () => void;
}

function newFolderId(label: string): string {
  const base = toFilenameSlug(label) || "folder";
  const taken = new Set<string>([
    ...DEFAULT_FOLDERS.map((f) => f.id),
    ...useFavorites.getState().customFolders.map((f) => f.id),
  ]);
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}

function isValidFavorites(value: unknown): boolean {
  return typeof value === "object" && value !== null && "favorites" in value;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {},
      customFolders: [],
      addFavorite: (resourceId, folder) =>
        set((state) => ({
          favorites: {
            ...state.favorites,
            [resourceId]: { folder: folder ?? FALLBACK_FOLDER, addedAt: Date.now() },
          },
        })),
      removeFavorite: (resourceId) =>
        set((state) => {
          const next = { ...state.favorites };
          delete next[resourceId];
          return { favorites: next };
        }),
      toggleFavorite: (resourceId, folder) => {
        const isFav = Boolean(get().favorites[resourceId]);
        if (isFav) get().removeFavorite(resourceId);
        else get().addFavorite(resourceId, folder);
        return !isFav;
      },
      moveFavorite: (resourceId, folder) =>
        set((state) => {
          const entry = state.favorites[resourceId];
          if (!entry) return state;
          return {
            favorites: { ...state.favorites, [resourceId]: { ...entry, folder } },
          };
        }),
      createFolder: (label) => {
        const id = newFolderId(label);
        set((state) => ({ customFolders: [...state.customFolders, { id, label }] }));
        return id;
      },
      renameFolder: (folderId, label) =>
        set((state) => ({
          customFolders: state.customFolders.map((f) =>
            f.id === folderId ? { ...f, label } : f,
          ),
        })),
      deleteFolder: (folderId) =>
        set((state) => {
          const favorites: Record<string, FavoriteEntry> = {};
          for (const [resourceId, entry] of Object.entries(state.favorites)) {
            favorites[resourceId] = entry.folder === folderId ? { ...entry, folder: FALLBACK_FOLDER } : entry;
          }
          return {
            favorites,
            customFolders: state.customFolders.filter((f) => f.id !== folderId),
          };
        }),
      clearAll: () => set({ favorites: {} }),
    }),
    {
      name: "favorites",
      version: CURRENT_DATA_VERSION,
      storage: createJSONStorage(() => persistedStorage),
      partialize: (state) => ({
        favorites: state.favorites,
        customFolders: state.customFolders,
        version: CURRENT_DATA_VERSION,
      }),
      migrate: (persisted) => {
        const data = persisted as Record<string, unknown>;
        const favorites = (data.favorites ?? {}) as Record<string, unknown>;
        const clean: Record<string, FavoriteEntry> = {};
        for (const [id, entry] of Object.entries(favorites)) {
          if (typeof entry === "object" && entry !== null && "folder" in entry) {
            const e = entry as Record<string, unknown>;
            clean[id] = {
              folder: typeof e.folder === "string" ? e.folder : FALLBACK_FOLDER,
              addedAt: typeof e.addedAt === "number" ? e.addedAt : Date.now(),
            };
          }
        }
        return { favorites: clean, customFolders: Array.isArray(data.customFolders) ? data.customFolders : [] };
      },
    },
  ),
);

export function isDefaultFolder(id: string): boolean {
  return DEFAULT_FOLDERS.some((f) => f.id === id);
}
