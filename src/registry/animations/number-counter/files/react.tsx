import { useEffect, useRef, useState } from "react";

const STYLES = `
.nc-grid-react { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 14px; }
.nc-stat-react { display: grid; gap: 4px; padding: 18px 16px; border: 1px solid #e4e4e7;
  border-radius: 13px; background: #ffffff; }
.nc-value-react { font-size: 24px; font-weight: 700; letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums; color: #26262b; }
.nc-label-react { font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.06em; color: #a1a1aa; }
`;

interface Stat {
  value: number;
  decimals: number;
  label: string;
}

const STATS: Stat[] = [
  { value: 98420, decimals: 0, label: "Deployments" },
  { value: 99.98, decimals: 2, label: "Uptime %" },
  { value: 12400, decimals: 0, label: "Teams" },
  { value: 4.9, decimals: 1, label: "Avg. rating" },
];

const fmt = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

function useCounter(target: Stat, runKey: number): string {
  const [display, setDisplay] = useState("0");
  const rafRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(fmt(target.value, target.decimals));
      return;
    }
    let start = 0;
    const duration = 1500;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      setDisplay(fmt(target.value * (1 - Math.pow(1 - t, 3)), target.decimals));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, runKey]);

  return display;
}

function CounterCell({ stat, runKey }: { stat: Stat; runKey: number }) {
  const display = useCounter(stat, runKey);
  return (
    <div className="nc-stat-react">
      <span className="nc-value-react">{display}</span>
      <span className="nc-label-react">{stat.label}</span>
    </div>
  );
}

export default function NumberCounter() {
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeContent: "center", gap: 26, background: "#fafafa", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <div className="nc-grid-react">
        {STATS.map((stat) => (
          <CounterCell key={stat.label} stat={stat} runKey={runKey} />
        ))}
      </div>
      <button
        type="button"
        onClick={() => setRunKey((k) => k + 1)}
        style={{ justifySelf: "center", border: "1px solid #d4d4d8", borderRadius: 8, background: "#ffffff", color: "#26262b", fontSize: 13, fontWeight: 500, padding: "8px 16px", cursor: "pointer" }}
      >
        Replay
      </button>
    </div>
  );
}
