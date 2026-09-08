"use client";

import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { IconButton } from "./IconButton";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Hide the default header row (for fully custom layouts). */
  hideHeader?: boolean;
}

const MAX_WIDTHS: Record<NonNullable<DialogProps["size"]>, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
};

/** Base modal dialog with focus trap, Escape handling and body scroll lock. */
export function Dialog({
  open,
  onClose,
  children,
  title,
  description,
  size = "md",
  className,
  hideHeader,
}: DialogProps) {
  const containerRef = useFocusTrap(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-black/45"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative w-full rounded-t-xl border border-border bg-surface shadow-lg sm:rounded-xl",
              "max-h-[92vh] overflow-y-auto overscroll-contain",
              MAX_WIDTHS[size],
              className,
            )}
          >
            {!hideHeader && (
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-surface/95 px-5 py-4 backdrop-blur">
                <div>
                  <h2 className="text-sm font-semibold">{title}</h2>
                  {description && (
                    <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
                  )}
                </div>
                <IconButton label="关闭对话框" size="sm" onClick={onClose}>
                  <X size={15} />
                </IconButton>
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
