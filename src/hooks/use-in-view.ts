"use client";

import { useEffect, useState, type RefObject } from "react";

export interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number;
  /** If true, stays true after first intersection. */
  once?: boolean;
}

/**
 * Tracks whether an element is (near) the viewport. Used to lazy-mount
 * preview iframes and to pause animations when they scroll out of view.
 */
export function useInView<T extends Element>(
  ref: RefObject<T>,
  options: UseInViewOptions = {},
): boolean {
  const { rootMargin = "300px", threshold = 0.01, once = false } = options;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold, once]);

  return inView;
}
