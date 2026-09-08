import { create } from "zustand";

export type ToastVariant = "default" | "success" | "error";

export interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastState {
  toasts: ToastItem[];
  push: (toast: Omit<ToastItem, "id">) => void;
  dismiss: (id: number) => void;
}

let nextId = 1;
const TOAST_DURATION = 2600;

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  push: (toast) => {
    const id = nextId++;
    set((state) => ({ toasts: [...state.toasts.slice(-3), { ...toast, id }] }));
    setTimeout(() => get().dismiss(id), TOAST_DURATION);
  },
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

/** Imperative helper usable outside React (event handlers, utilities). */
export function toast(title: string, options?: { description?: string; variant?: ToastVariant }) {
  useToastStore.getState().push({
    title,
    description: options?.description,
    variant: options?.variant ?? "default",
  });
}

export function toastError(title: string, description?: string) {
  toast(title, { description, variant: "error" });
}
