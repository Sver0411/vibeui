"use client";

import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useToastStore } from "@/store/toast";
import { cn } from "@/lib/utils";

/** Global toast outlet. Messages are specific (e.g. "CSS copied"). */
export function Toaster() {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex flex-col items-center gap-2 px-4 pb-5 sm:items-end sm:px-6"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className={cn(
              "pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-lg border px-3.5 py-2.5 shadow-lg",
              "bg-surface border-border",
              t.variant === "error" && "border-danger/40",
            )}
          >
            <span className="mt-0.5 shrink-0">
              {t.variant === "success" ? (
                <CheckCircle2 size={15} className="text-success" />
              ) : t.variant === "error" ? (
                <AlertCircle size={15} className="text-danger" />
              ) : (
                <Info size={15} className="text-muted-foreground" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium leading-5">{t.title}</p>
              {t.description && (
                <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{t.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="shrink-0 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="关闭通知"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
