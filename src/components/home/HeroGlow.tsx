"use client";

import { useEffect, useRef } from "react";

/**
 * 光标跟随的柔和渐变光晕（首页 Hero 背景）。
 * pointermove + rAF 节流；触屏与 reduced-motion 时静止在中心。
 */
export function HeroGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let x = 0.5;
    let y = 0.35;
    let tx = x;
    let ty = y;

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      tx = (event.clientX - rect.left) / Math.max(rect.width, 1);
      ty = (event.clientY - rect.top) / Math.max(rect.height, 1);
    };

    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      element.style.background = `radial-gradient(560px 380px at ${x * 100}% ${y * 100}%, var(--accent-soft), transparent 70%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 transition-none"
    />
  );
}
