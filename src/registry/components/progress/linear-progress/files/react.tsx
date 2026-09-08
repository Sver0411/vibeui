import { useEffect, useRef, useState } from "react";

const STYLES = `
.lp-react { --lp-accent: #0f766e; display: grid; gap: 8px; width: 100%; }
.lp-react__header { display: flex; justify-content: space-between; align-items: baseline; }
.lp-react__title { font-size: 13px; font-weight: 600; color: #26262b; }
.lp-react__value { font-size: 12px; font-variant-numeric: tabular-nums; color: #71717a; }
.lp-react__track { height: 6px; border-radius: 999px; background: #e4e4e7; overflow: hidden; }
.lp-react__fill { height: 100%; border-radius: inherit; background: var(--lp-accent);
  transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.lp-react__fill--indeterminate { width: 40%; background: linear-gradient(90deg, transparent, var(--lp-accent), transparent);
  animation: lp-sweep-react 1.4s ease-in-out infinite; }
@keyframes lp-sweep-react { from { transform: translateX(-120%); } to { transform: translateX(320%); } }
`;

export interface LinearProgressProps {
  /** 0–100. Omit for the indeterminate state. */
  value?: number;
  title?: string;
}

export default function LinearProgress({ value, title = "Uploading assets" }: LinearProgressProps) {
  const indeterminate = typeof value !== "number";
  const [display, setDisplay] = useState(value ?? 0);
  const raf = useRef(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Demo: when uncontrolled, animate 0 → 100 once, respecting preview pause.
  useEffect(() => {
    if (indeterminate) return;
    let start = 0;
    const duration = 2600;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round((1 - Math.pow(1 - t, 2.4)) * 100));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [indeterminate]);

  const shown = indeterminate ? undefined : display;

  return (
    <div
      className="lp-react"
      role="progressbar"
      aria-valuenow={shown}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={title}
    >
      <div className="lp-react__header">
        <span className="lp-react__title">{title}</span>
        {shown !== undefined && <span className="lp-react__value">{shown}%</span>}
      </div>
      <div className="lp-react__track">
        {indeterminate ? (
          <div className="lp-react__fill lp-react__fill--indeterminate" />
        ) : (
          <div className="lp-react__fill" style={{ width: `${shown}%` }} />
        )}
      </div>
    </div>
  );
}
