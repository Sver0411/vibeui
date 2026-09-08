import { useEffect, useState } from "react";

const STYLES = `
.pl-react { min-height: 100vh; display: grid; font-family: ui-sans-serif, system-ui, sans-serif; background: #fafafa; }
.pl-react__splash { position: fixed; inset: 0; z-index: 10; display: grid; place-items: center; background: #fafafa;
  transition: opacity 0.45s ease, visibility 0.45s ease; }
.pl-react__splash[data-done="true"] { opacity: 0; visibility: hidden; }
.pl-react__inner { display: grid; justify-items: center; gap: 14px; }
.pl-react__logo { width: 44px; height: 44px; color: #26262b; animation: pl-breathe-react 2s ease-in-out infinite; }
@keyframes pl-breathe-react { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.92); opacity: 0.7; } }
.pl-react__brand { margin: 0; font-size: 15px; font-weight: 600; color: #26262b; }
.pl-react__bar { width: 180px; height: 3px; border-radius: 999px; background: #e4e4e7; overflow: hidden; }
.pl-react__fill { height: 100%; width: 0%; border-radius: inherit; background: #26262b; transition: width 0.25s ease; }
.pl-react__status { margin: 0; font-size: 12px; color: #71717a; min-height: 1em; }
.pl-react__page { display: grid; place-content: center; gap: 10px; text-align: center; color: #26262b; padding: 20px; }
`;

const STAGES: Array<[number, string]> = [
  [18, "Loading assets…"],
  [46, "Loading assets…"],
  [74, "Preparing interface…"],
  [100, "Ready"],
];

export default function PageLoader({ brand = "VibeUI" }: { brand?: string }) {
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => {
    if (stage >= STAGES.length) {
      const hideTimer = setTimeout(() => setDone(true), 500);
      return () => clearTimeout(hideTimer);
    }
    const [percent] = STAGES[stage];
    const timer = setTimeout(() => setStage((s) => s + 1), stage === STAGES.length - 1 ? 500 : 620);
    void percent;
    return () => clearTimeout(timer);
  }, [stage]);

  const [percent, message] = stage < STAGES.length ? STAGES[stage] : [100, "Ready"];

  return (
    <div className="pl-react">
      <div className="pl-react__splash" data-done={done} role="status" aria-live="polite">
        <div className="pl-react__inner">
          <svg className="pl-react__logo" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 4 20 8.5 12 13 4 8.5 12 4Z" fill="currentColor" />
            <path
              d="m4.8 13.2 7.2 4 7.2-4M4.8 17 12 21l7.2-4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
          <p className="pl-react__brand">{brand}</p>
          <div className="pl-react__bar" aria-hidden="true">
            <div className="pl-react__fill" style={{ width: `${percent}%` }} />
          </div>
          <p className="pl-react__status">{message}</p>
        </div>
      </div>
      <div className="pl-react__page" aria-hidden={!done}>
        <h1 style={{ margin: 0, fontSize: 20 }}>Application shell</h1>
        <p style={{ margin: 0, fontSize: 13, color: "#71717a" }}>
          The splash fades out and hands off to the real page.
        </p>
      </div>
    </div>
  );
}
