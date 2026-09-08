/**
 * Unified local storage adapter.
 * All persistence (favorites, preferences, history, editor drafts) flows
 * through this module so it can later be swapped for a cloud backend without
 * touching stores. Handles private-mode failures and corrupted payloads.
 */

export interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

import { PREFIX } from "./keys";

function prefixed(key: string): string {
  return `${PREFIX}${key}`;
}

class LocalStorageAdapter implements StorageAdapter {
  private available: boolean | null = null;

  private check(): boolean {
    if (this.available !== null) return this.available;
    try {
      const probe = `${PREFIX}__probe`;
      window.localStorage.setItem(probe, "1");
      window.localStorage.removeItem(probe);
      this.available = true;
    } catch {
      this.available = false;
      console.warn(
        "[VibeUI] LocalStorage is unavailable (private mode or disabled). Settings will not persist.",
      );
    }
    return this.available;
  }

  getItem(key: string): string | null {
    if (!this.check()) return null;
    try {
      return window.localStorage.getItem(prefixed(key));
    } catch {
      return null;
    }
  }

  setItem(key: string, value: string): void {
    if (!this.check()) return;
    try {
      window.localStorage.setItem(prefixed(key), value);
    } catch (error) {
      console.warn("[VibeUI] Failed to write to LocalStorage:", error);
    }
  }

  removeItem(key: string): void {
    if (!this.check()) return;
    try {
      window.localStorage.removeItem(prefixed(key));
    } catch {
      // ignore
    }
  }
}

class MemoryAdapter implements StorageAdapter {
  private map = new Map<string, string>();
  getItem(key: string): string | null {
    return this.map.get(prefixed(key)) ?? null;
  }
  setItem(key: string, value: string): void {
    this.map.set(prefixed(key), value);
  }
  removeItem(key: string): void {
    this.map.delete(prefixed(key));
  }
}

export const storage: StorageAdapter =
  typeof window === "undefined" ? new MemoryAdapter() : new LocalStorageAdapter();

/** Zustand persist compatible StateStorage view of the adapter. */
export const persistedStorage = {
  getItem: (name: string): string | null => storage.getItem(name),
  setItem: (name: string, value: string): void => storage.setItem(name, value),
  removeItem: (name: string): void => storage.removeItem(name),
};

export interface StoredPayload {
  version?: number;
  [key: string]: unknown;
}

/** Read + validate JSON with a version-aware migration hook. */
export function readStoredJSON<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => boolean,
  migrate?: (data: Record<string, unknown>, fromVersion: number) => T,
): T {
  const raw = storage.getItem(key);
  if (!raw) return fallback;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isValid(parsed)) {
      storage.removeItem(key);
      console.warn(`[UI Atlas] Stored data for "${key}" failed validation and was reset.`);
      return fallback;
    }
    const payload = parsed as Record<string, unknown>;
    const version = typeof payload.version === "number" ? payload.version : 1;
    if (migrate && version < CURRENT_DATA_VERSION) {
      return migrate(payload, version);
    }
    return payload as unknown as T;
  } catch {
    storage.removeItem(key);
    console.warn(`[UI Atlas] Stored data for "${key}" was corrupted and has been reset.`);
    return fallback;
  }
}

export function writeStoredJSON(key: string, value: unknown): void {
  storage.setItem(key, JSON.stringify(value));
}

export function removeStoredKey(key: string): void {
  storage.removeItem(key);
}

/** Bump when the shape of persisted data changes; stores migrate on read. */
export const CURRENT_DATA_VERSION = 1;

/** All keys owned by the app, used by Settings → Data and cache cleanup. */
export const STORAGE_KEYS = {
  preferences: "preferences",
  favorites: "favorites",
  history: "history",
  editorDrafts: "editor-drafts",
  playgroundDraft: "playground-draft",
} as const;
