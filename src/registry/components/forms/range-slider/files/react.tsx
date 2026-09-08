import { useCallback, useEffect, useRef, useState } from "react";

const STYLES = `
.rs-react { width: min(340px, 84vw); display: grid; gap: 12px; font-family: ui-sans-serif, system-ui, sans-serif; }
.rs-react__track { position: relative; height: 28px; touch-action: none; }
.rs-react__rail { position: absolute; top: 50%; left: 0; right: 0; height: 6px; transform: translateY(-50%); border-radius: 999px; background: #e4e4e7; }
.rs-react__fill { position: absolute; top: 0; bottom: 0; border-radius: inherit; background: #0f766e; }
.rs-react__thumb { position: absolute; top: 50%; width: 22px; height: 22px; transform: translate(-50%, -50%); padding: 0;
  border: 2px solid #0f766e; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,.18); cursor: grab; }
.rs-react__thumb:active { cursor: grabbing; box-shadow: 0 2px 8px rgba(15,118,110,.28); }
.rs-react__thumb:focus-visible { outline: 2px solid #0f766e; outline-offset: 3px; }
.rs-react__value { margin: 0; font-size: 13px; color: #52525b; }
.rs-react__value strong { font-variant-numeric: tabular-nums; color: #18181b; }
`;

const MIN = 0;
const MAX = 1000;
const STEP = 10;

export default function RangeSlider() {
  const [lo, setLo] = useState(120);
  const [hi, setHi] = useState(680);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<"lo" | "hi" | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const valueFromClientX = useCallback((clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return MIN;
    const ratio = (clientX - rect.left) / rect.width;
    return Math.round((MIN + ratio * (MAX - MIN)) / STEP) * STEP;
  }, []);

  const clampEdge = useCallback(
    (edge: "lo" | "hi", value: number) => {
      if (edge === "lo") return Math.min(MAX, Math.max(MIN, Math.min(value, hi - STEP)));
      return Math.max(MIN, Math.min(MAX, Math.max(value, lo + STEP)));
    },
    [lo, hi],
  );

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragRef.current) return;
      const next = valueFromClientX(event.clientX);
      if (dragRef.current === "lo") setLo(clampEdge("lo", next));
      else setHi(clampEdge("hi", next));
    };
    const onUp = () => {
      dragRef.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [clampEdge, valueFromClientX]);

  const pct = (value: number) => ((value - MIN) / (MAX - MIN)) * 100;

  const onKeyDown = (edge: "lo" | "hi") => (event: React.KeyboardEvent) => {
    const delta =
      event.key === "ArrowRight" || event.key === "ArrowUp"
        ? STEP
        : event.key === "ArrowLeft" || event.key === "ArrowDown"
          ? -STEP
          : 0;
    if (!delta) return;
    event.preventDefault();
    if (edge === "lo") setLo((v) => clampEdge("lo", v + delta));
    else setHi((v) => clampEdge("hi", v + delta));
  };

  return (
    <div className="rs-react">
      <div className="rs-react__track" ref={trackRef}>
        <div className="rs-react__rail" />
        <div
          className="rs-react__fill"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        <button
          type="button"
          className="rs-react__thumb"
          role="slider"
          aria-label="最低价格"
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={lo}
          style={{ left: `${pct(lo)}%` }}
          onPointerDown={(e) => {
            e.preventDefault();
            dragRef.current = "lo";
          }}
          onKeyDown={onKeyDown("lo")}
        />
        <button
          type="button"
          className="rs-react__thumb"
          role="slider"
          aria-label="最高价格"
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={hi}
          style={{ left: `${pct(hi)}%` }}
          onPointerDown={(e) => {
            e.preventDefault();
            dragRef.current = "hi";
          }}
          onKeyDown={onKeyDown("hi")}
        />
      </div>
      <p className="rs-react__value">
        价格区间 <strong>¥{lo} – ¥{hi}</strong>
      </p>
    </div>
  );
}
