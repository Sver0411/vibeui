import { useEffect, useRef, useState } from "react";

const STYLES = `
.hold-button-react { position: relative; display: inline-flex; align-items: center; gap: 12px;
  border: 1px solid #d4d4d8; border-radius: 999px; background: #ffffff; color: #b3261e;
  padding: 12px 26px 12px 14px; font-size: 14px; font-weight: 600; cursor: pointer;
  user-select: none; -webkit-user-select: none; touch-action: none;
  transition: border-color 0.2s ease, background-color 0.2s ease; }
.hold-button-react:active { background: #fef2f2; }
.hold-button-react:disabled { opacity: 0.8; cursor: default; }
.hold-button-react svg { width: 34px; height: 34px; transform: rotate(-90deg); }
.hold-button-react circle { fill: none; stroke-width: 3; }
.hold-button-react .track { stroke: #f4f4f5; }
.hold-button-react .progress { stroke: #b3261e; stroke-linecap: round; stroke-dasharray: 100; stroke-dashoffset: 100; }
`;

const HOLD_DURATION = 1000;

export default function HoldToConfirmButton({ label = "Hold to delete" }: { label?: string }) {
  const ringRef = useRef<SVGCircleElement>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState("Press and hold for one second.");
  const [armed, setArmed] = useState(false);
  const state = useRef({ holding: false, startTime: 0, raf: 0 });

  useEffect(() => {
    const style = document.createElement("style");
    const animationState = state.current;
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => {
      style.remove();
      cancelAnimationFrame(animationState.raf);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const release = (completed: boolean) => {
    const s = state.current;
    s.holding = false;
    cancelAnimationFrame(s.raf);
    if (!completed) {
      if (ringRef.current) ringRef.current.style.strokeDashoffset = "100";
      setStatus("Cancelled — released too early.");
      setArmed(false);
    }
  };

  const tick = (now: number) => {
    const s = state.current;
    if (!s.holding) return;
    const progress = Math.min((now - s.startTime) / HOLD_DURATION, 1);
    if (ringRef.current) ringRef.current.style.strokeDashoffset = String(100 - progress * 100);
    if (progress >= 1) {
      release(true);
      setStatus("Confirmed — action fired (no real data was deleted).");
      setArmed(true);
      resetTimerRef.current = setTimeout(() => {
        if (ringRef.current) ringRef.current.style.strokeDashoffset = "100";
        setStatus("Press and hold for one second.");
        setArmed(false);
      }, 1800);
      return;
    }
    s.raf = requestAnimationFrame(tick);
  };

  const start = (event: React.PointerEvent | React.KeyboardEvent) => {
    event.preventDefault();
    const s = state.current;
    if (s.holding) return;
    s.holding = true;
    s.startTime = performance.now();
    setStatus("Keep holding…");
    s.raf = requestAnimationFrame(tick);
  };

  return (
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        gap: 18,
        minHeight: "100vh",
        placeContent: "center",
      }}
    >
      <button
        type="button"
        className="hold-button-react"
        onPointerDown={start}
        onPointerUp={() => state.current.holding && release(false)}
        onPointerLeave={() => state.current.holding && release(false)}
        onKeyDown={(event) => (event.key === " " || event.key === "Enter") && start(event)}
        onKeyUp={() => state.current.holding && release(false)}
      >
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle className="track" cx="24" cy="24" r="22" />
          <circle ref={ringRef} className="progress" cx="24" cy="24" r="22" pathLength={100} />
        </svg>
        <span>{label}</span>
      </button>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          color: armed ? "#b3261e" : "#71717a",
          fontWeight: armed ? 600 : 400,
        }}
        aria-live="polite"
      >
        {status}
      </p>
    </div>
  );
}
