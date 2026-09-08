"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

/** Subtle magnetic pull toward the cursor; disabled on touch/reduced-motion. */
export function Magnetic({
  children,
  strength = 0.25,
  max = 8,
  className,
}: {
  children: ReactNode;
  strength?: number;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const rect = element.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const x = Math.max(-max, Math.min(max, dx * strength));
    const y = Math.max(-max, Math.min(max, dy * strength));
    element.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    const element = ref.current;
    if (element) element.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={className}
      style={{ transition: "transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </div>
  );
}
