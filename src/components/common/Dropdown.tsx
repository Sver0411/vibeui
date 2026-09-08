"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/hooks/use-focus-trap";

export interface DropdownProps {
  trigger: (props: { open: boolean; toggle: () => void }) => ReactNode;
  children: (close: () => void) => ReactNode;
  align?: "left" | "right";
  className?: string;
  /** Render inside normal flow (absolute) — default true. */
  label: string;
}

/** Lightweight dropdown menu with outside-click close and focus trap. */
export function Dropdown({ trigger, children, align = "right", className, label }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useFocusTrap(open, () => setOpen(false));

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {trigger({ open, toggle: () => setOpen((v) => !v) })}
      {open && (
        <div
          ref={panelRef}
          role="menu"
          aria-label={label}
          className={cn(
            "absolute z-40 mt-1.5 min-w-48 overflow-hidden rounded-lg border border-border bg-surface p-1 shadow-lg",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

export interface MenuItemProps {
  onSelect?: () => void;
  icon?: ReactNode;
  children: ReactNode;
  danger?: boolean;
  disabled?: boolean;
  /** Render as link instead of button. */
  href?: string;
  external?: boolean;
}

export function MenuItem({ onSelect, icon, children, danger, disabled, href, external }: MenuItemProps) {
  const className = cn(
    "flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] transition-colors duration-fast",
    danger
      ? "text-danger hover:bg-danger/10"
      : "text-foreground hover:bg-surface-hover",
    disabled && "pointer-events-none opacity-50",
  );
  const content = (
    <>
      {icon && <span className="text-muted-foreground [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>}
      {children}
    </>
  );
  if (href) {
    return (
      <a
        role="menuitem"
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onClick={onSelect}
      >
        {content}
      </a>
    );
  }
  return (
    <button role="menuitem" type="button" className={className} onClick={onSelect} disabled={disabled}>
      {content}
    </button>
  );
}

export function MenuDivider() {
  return <div className="my-1 h-px bg-border" role="separator" />;
}

export function MenuLabel({ children }: { children: ReactNode }) {
  return (
    <div className="px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
      {children}
    </div>
  );
}
