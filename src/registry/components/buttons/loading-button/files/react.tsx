import { useEffect, useRef, useState } from "react";

const STYLES = `
.load-button-react { position: relative; display: inline-flex; align-items: center; justify-content: center;
  gap: 9px; min-width: 220px; border: 0; border-radius: 10px; background: #26262b; color: #fafafa;
  padding: 13px 26px; font-size: 14px; font-weight: 600; cursor: pointer;
  transition: background-color 0.25s ease, transform 0.15s ease; }
.load-button-react:disabled { cursor: default; }
.load-button-react[data-state="success"] { background: #0f766e; }
.load-button-react__spinner { display: none; width: 14px; height: 14px; border: 2px solid rgba(250,250,250,0.35);
  border-top-color: #fafafa; border-radius: 50%; animation: loadbtn-spin-react 0.7s linear infinite; }
.load-button-react[data-state="loading"] .load-button-react__spinner { display: inline-block; }
.load-button-react__check { display: none; width: 15px; height: 15px; }
.load-button-react[data-state="success"] .load-button-react__check { display: block; animation: loadbtn-pop-react 0.3s cubic-bezier(0.22,1,0.36,1); }
@keyframes loadbtn-spin-react { to { transform: rotate(360deg); } }
@keyframes loadbtn-pop-react { from { transform: scale(0.4); opacity: 0; } }
`;

type ButtonState = "idle" | "loading" | "success";

export default function LoadingButton({ label = "Deploy to production" }: { label?: string }) {
  const [state, setState] = useState<ButtonState>("idle");
  const [currentLabel, setCurrentLabel] = useState(label);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const style = document.createElement("style");
    const activeTimers = timers.current;
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => {
      style.remove();
      activeTimers.forEach(clearTimeout);
    };
  }, []);

  const handleClick = () => {
    setState("loading");
    setCurrentLabel("Deploying…");
    timers.current.push(
      setTimeout(() => {
        setState("success");
        setCurrentLabel("Deployed");
        timers.current.push(
          setTimeout(() => {
            setState("idle");
            setCurrentLabel(label);
          }, 1600),
        );
      }, 1800),
    );
  };

  return (
    <button
      type="button"
      className="load-button-react"
      data-state={state}
      disabled={state !== "idle"}
      onClick={handleClick}
    >
      <span className="load-button-react__spinner" aria-hidden="true" />
      <span className="load-button-react__label">{currentLabel}</span>
      <svg className="load-button-react__check" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M3 8.5 6.5 12 13 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
