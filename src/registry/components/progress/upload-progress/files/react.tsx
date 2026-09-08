import { useEffect, useRef, useState } from "react";

const STYLES = `
.up-react { display: flex; align-items: center; gap: 14px; padding: 16px; width: 100%;
  border: 1px solid #e4e4e7; border-radius: 14px; background: #ffffff; box-sizing: border-box;
  font-family: ui-sans-serif, system-ui, sans-serif; }
.up-react__icon { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 10px;
  background: rgba(15, 118, 110, 0.1); color: #0f766e; flex-shrink: 0; }
.up-react__icon svg { width: 20px; height: 20px; }
.up-react__body { flex: 1; min-width: 0; display: grid; gap: 6px; }
.up-react__row { display: flex; justify-content: space-between; gap: 10px; font-size: 12px; color: #71717a; }
.up-react__name { font-size: 13px; font-weight: 600; color: #26262b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.up-react__track { height: 5px; border-radius: 999px; background: #e4e4e7; overflow: hidden; }
.up-react__fill { height: 100%; border-radius: inherit; background: #0f766e; transition: width 0.18s linear; }
.up-react__percent { font-weight: 600; color: #26262b; }
.up-react__btn { display: grid; place-items: center; width: 30px; height: 30px; border: 0; border-radius: 8px;
  background: #f4f4f5; color: #52525b; cursor: pointer; }
.up-react__btn:hover { background: #e4e4e7; }
.up-react__btn--danger:hover { background: rgba(179, 38, 30, 0.12); color: #b3261e; }
.up-react__btn svg { width: 14px; height: 14px; }
`;

const TOTAL = 8.4 * 1024 * 1024;
const SPEED = 2.1 * 1024 * 1024;
const fmtMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(1);

type UploadState = "running" | "paused" | "done" | "cancelled";

export default function UploadProgress({ fileName = "quarterly-report.pdf" }: { fileName?: string }) {
  const [loaded, setLoaded] = useState(0);
  const [state, setState] = useState<UploadState>("running");
  const stateRef = useRef(state);
  stateRef.current = state;
  const loadedRef = useRef(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => {
    let lastTime: number | null = null;
    let raf = 0;
    const tick = (now: number) => {
      if (stateRef.current === "running" && !document.documentElement.classList.contains("atlas-paused")) {
        if (lastTime !== null) {
          loadedRef.current = Math.min(loadedRef.current + (SPEED * (now - lastTime)) / 1000, TOTAL);
          setLoaded(loadedRef.current);
        }
        lastTime = now;
        if (loadedRef.current >= TOTAL) {
          setState("done");
          return;
        }
      } else {
        lastTime = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const percent = Math.min((loaded / TOTAL) * 100, 100);

  return (
    <div className="up-react" data-state={state}>
      <div className="up-react__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 3v5h5" />
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
          <path d="M12 12v6" />
          <path d="m9.5 14.5 2.5-2.5 2.5 2.5" />
        </svg>
      </div>
      <div className="up-react__body">
        <div className="up-react__row">
          <span className="up-react__name">{fileName}</span>
          <span style={{ fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
            {fmtMB(loaded)} MB / {fmtMB(TOTAL)} MB
          </span>
        </div>
        <div className="up-react__track">
          <div className="up-react__fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="up-react__row" style={{ fontVariantNumeric: "tabular-nums" }}>
          <span>
            {state === "running" && `Uploading at ${(SPEED / (1024 * 1024)).toFixed(1)} MB/s`}
            {state === "paused" && "Paused"}
            {state === "done" && "Upload complete"}
            {state === "cancelled" && "Cancelled"}
          </span>
          <span className="up-react__percent">{Math.round(percent)}%</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
        <button
          type="button"
          className="up-react__btn"
          aria-label={state === "paused" ? "Resume upload" : "Pause upload"}
          disabled={state !== "running" && state !== "paused"}
          onClick={() => setState(state === "paused" ? "running" : "paused")}
        >
          {state === "paused" ? (
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m5 3 8 5-8 5V3Z" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          )}
        </button>
        <button
          type="button"
          className="up-react__btn up-react__btn--danger"
          aria-label="Cancel upload"
          disabled={state === "done" || state === "cancelled"}
          onClick={() => setState("cancelled")}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      </div>
    </div>
  );
}
