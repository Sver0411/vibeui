"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { IconButton } from "./IconButton";
import { X } from "lucide-react";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

/** Bottom sheet used for mobile filters, quick actions and pickers. */
export function Drawer({ open, onClose, title, children, className }: DrawerProps) {
  const containerRef = useFocusTrap(open, onClose);
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) headerRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-black/45" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: "60%" }}
            animate={{ y: 0 }}
            exit={{ y: "60%" }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto overscroll-contain",
              "rounded-t-2xl border-t border-border bg-surface shadow-lg",
              className,
            )}
          >
            <div
              ref={headerRef}
              tabIndex={-1}
              className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface/95 px-4 py-3 backdrop-blur outline-none"
            >
              <h2 className="text-sm font-semibold">{title}</h2>
              <IconButton label="关闭" size="sm" onClick={onClose}>
                <X size={15} />
              </IconButton>
            </div>
            <div className="px-4 py-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
