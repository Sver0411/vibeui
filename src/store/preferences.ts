import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AccentId } from "@/config/site";
import { CURRENT_DATA_VERSION, persistedStorage } from "@/lib/storage/adapter";

export type ThemeMode = "light" | "dark" | "system";
export type Density = "default" | "compact";
export type Radius = "default" | "sharp" | "round";
export type MotionLevel = "full" | "reduced" | "off";
export type DevicePreset = "desktop" | "tablet" | "mobile";
export type PreviewBackground = "light" | "dark" | "checker";

export interface EditorPreferences {
  theme: "auto" | "light" | "dark";
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  autoRun: boolean;
  autoSave: boolean;
  autoFormat: boolean;
}

export interface PreviewPreferences {
  defaultDevice: DevicePreset;
  defaultBackground: PreviewBackground;
  autoplay: boolean;
  showGrid: boolean;
  showSize: boolean;
}

export interface PreferencesState {
  theme: ThemeMode;
  accent: AccentId;
  density: Density;
  radius: Radius;
  motion: MotionLevel;
  editor: EditorPreferences;
  preview: PreviewPreferences;
  setTheme: (theme: ThemeMode) => void;
  setAccent: (accent: AccentId) => void;
  setDensity: (density: Density) => void;
  setRadius: (radius: Radius) => void;
  setMotion: (motion: MotionLevel) => void;
  updateEditor: (patch: Partial<EditorPreferences>) => void;
  updatePreview: (patch: Partial<PreviewPreferences>) => void;
  resetAll: () => void;
}

export const DEFAULT_PREFERENCES = {
  theme: "system" as ThemeMode,
  accent: "graphite" as AccentId,
  density: "default" as Density,
  radius: "default" as Radius,
  motion: "full" as MotionLevel,
  editor: {
    theme: "auto" as const,
    fontSize: 13,
    tabSize: 2,
    wordWrap: false,
    autoRun: true,
    autoSave: true,
    autoFormat: false,
  },
  preview: {
    defaultDevice: "desktop" as DevicePreset,
    defaultBackground: "light" as PreviewBackground,
    autoplay: true,
    showGrid: false,
    showSize: true,
  },
};

const EDITOR_KEYS = ["theme", "fontSize", "tabSize", "wordWrap", "autoRun", "autoSave", "autoFormat"];
const PREVIEW_KEYS = ["defaultDevice", "defaultBackground", "autoplay", "showGrid", "showSize"];

function isValidPreferences(value: unknown): boolean {
  return typeof value === "object" && value !== null && "theme" in value;
}

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      ...DEFAULT_PREFERENCES,
      setTheme: (theme) => set({ theme }),
      setAccent: (accent) => set({ accent }),
      setDensity: (density) => set({ density }),
      setRadius: (radius) => set({ radius }),
      setMotion: (motion) => set({ motion }),
      updateEditor: (patch) => set((state) => ({ editor: { ...state.editor, ...patch } })),
      updatePreview: (patch) => set((state) => ({ preview: { ...state.preview, ...patch } })),
      resetAll: () => set({ ...DEFAULT_PREFERENCES }),
    }),
    {
      name: "preferences",
      version: CURRENT_DATA_VERSION,
      storage: createJSONStorage(() => persistedStorage),
      partialize: (state) => ({
        theme: state.theme,
        accent: state.accent,
        density: state.density,
        radius: state.radius,
        motion: state.motion,
        editor: state.editor,
        preview: state.preview,
        version: CURRENT_DATA_VERSION,
      }),
      migrate: (persisted) => {
        // Forward-compat: drop unknown keys, patch missing ones.
        const data = persisted as Record<string, unknown>;
        const editor = (data.editor ?? {}) as Record<string, unknown>;
        const preview = (data.preview ?? {}) as Record<string, unknown>;
        return {
          ...DEFAULT_PREFERENCES,
          ...Object.fromEntries(
            Object.entries(DEFAULT_PREFERENCES).filter(([key]) => key in data && key in DEFAULT_PREFERENCES),
          ),
          editor: Object.fromEntries(
            EDITOR_KEYS.filter((key) => key in editor).map((key) => [
              key,
              editor[key] ?? DEFAULT_PREFERENCES.editor[key as keyof typeof DEFAULT_PREFERENCES.editor],
            ]),
          ),
          preview: Object.fromEntries(
            PREVIEW_KEYS.filter((key) => key in preview).map((key) => [
              key,
              preview[key] ?? DEFAULT_PREFERENCES.preview[key as keyof typeof DEFAULT_PREFERENCES.preview],
            ]),
          ),
        } as unknown as PreferencesState;
      },
    },
  ),
);
