import { useEffect, useState } from "react";

const STYLES = `
.msp-react { position: relative; display: flex; justify-content: space-between; width: 100%; margin: 0; padding: 0; list-style: none; }
.msp-react__step { position: relative; z-index: 1; display: grid; justify-items: center; gap: 9px; width: 76px; }
.msp-react__dot { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%;
  border: 2px solid #d4d4d8; background: #ffffff; color: transparent; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease; }
.msp-react__dot svg { width: 14px; height: 14px; }
.msp-react__step[data-state="done"] .msp-react__dot, .msp-react__step[data-state="current"] .msp-react__dot {
  border-color: #0f766e; background: #0f766e; color: #ffffff; }
.msp-react__step[data-state="current"] .msp-react__dot { box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.15); }
.msp-react__label { font-size: 12px; font-weight: 500; color: #71717a; white-space: nowrap; }
.msp-react__step[data-state="current"] .msp-react__label { color: #26262b; font-weight: 600; }
.msp-react__line { position: absolute; top: 17px; left: 38px; right: 38px; height: 2px; background: #e4e4e7; }
.msp-react__line-fill { height: 100%; background: #0f766e; transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
`;

const STEPS = ["Cart", "Shipping", "Payment", "Review"];

export default function MultiStepProgress({
  steps = STEPS,
  initialStep = 2,
  onChange,
}: {
  steps?: string[];
  initialStep?: number;
  onChange?: (step: number) => void;
}) {
  const [current, setCurrent] = useState(initialStep);
  const total = steps.length;

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const goTo = (step: number) => {
    const clamped = Math.max(1, Math.min(total, step));
    setCurrent(clamped);
    onChange?.(clamped);
  };

  return (
    <div style={{ width: "100%" }}>
      <ol className="msp-react" aria-label="Checkout progress">
        {steps.map((label, index) => {
          const n = index + 1;
          const state = n < current ? "done" : n === current ? "current" : "todo";
          return (
            <li
              key={label}
              className="msp-react__step"
              data-state={state}
              aria-current={state === "current" ? "step" : undefined}
            >
              <button
                type="button"
                className="msp-react__dot"
                disabled={n >= current}
                aria-label={`Step ${n}: ${label}`}
                onClick={() => n < current && goTo(n)}
              >
                <svg viewBox="0 0 14 14" aria-hidden="true">
                  <path
                    d="M2.5 7.5 5.5 10.5 11.5 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="msp-react__label">{label}</span>
            </li>
          );
        })}
        <li className="msp-react__line" aria-hidden="true">
          <div
            className="msp-react__line-fill"
            style={{ width: `${((current - 1) / (total - 1)) * 100}%` }}
          />
        </li>
      </ol>
    </div>
  );
}
