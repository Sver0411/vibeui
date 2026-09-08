import { create } from "zustand";

/**
 * Global dialog/UI state so any card row, header button or hotkey can open
 * shared overlays (command menu, quick preview, export, share).
 */
interface UIState {
  commandOpen: boolean;
  quickPreviewSlug: string | null;
  exportSlug: string | null;
  shareSlug: string | null;
  setCommandOpen: (open: boolean) => void;
  toggleCommand: () => void;
  openQuickPreview: (slug: string) => void;
  closeQuickPreview: () => void;
  openExport: (slug: string) => void;
  closeExport: () => void;
  openShare: (slug: string) => void;
  closeShare: () => void;
  closeAll: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  commandOpen: false,
  quickPreviewSlug: null,
  exportSlug: null,
  shareSlug: null,
  setCommandOpen: (open) => set({ commandOpen: open }),
  toggleCommand: () => set((state) => ({ commandOpen: !state.commandOpen })),
  openQuickPreview: (slug) => set({ quickPreviewSlug: slug }),
  closeQuickPreview: () => set({ quickPreviewSlug: null }),
  openExport: (slug) => set({ exportSlug: slug }),
  closeExport: () => set({ exportSlug: null }),
  openShare: (slug) => set({ shareSlug: slug }),
  closeShare: () => set({ shareSlug: null }),
  closeAll: () => set({ commandOpen: false, quickPreviewSlug: null, exportSlug: null, shareSlug: null }),
}));
