"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll reveal wrapper: fades content in as it enters the viewport.
 * The hidden state is added from JS only, so content is always visible
 * without JavaScript or with reduced-motion preferred.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    element.classList.add("atlas-reveal");
    void element.offsetWidth; // apply the hidden state before observing
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.classList.add("is-visible");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ["--reveal-delay" as never]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
