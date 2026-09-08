import { useEffect, useState } from "react";

const STYLES = `
.cp-react { --cp-accent: #26262b; --cp-size: 128px; position: relative; width: var(--cp-size); height: var(--cp-size); }
.cp-react svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.cp-react circle { fill: none; stroke-width: 7; }
.cp-react .track { stroke: #e4e4e7; }
.cp-react .fill { stroke: var(--cp-accent); stroke-linecap: round; stroke-dasharray: 100;
  transition: stroke-dashoffset 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.cp-react__value { position: absolute; inset: 0; display: grid; place-items: center;
  font-size: 22px; font-weight: 600; font-variant-numeric: tabular-nums; color: #26262b; }
`;

export default function CircularProgress({ value = 72, size = 128 }: { value?: number; size?: number }) {
  const [offset, setOffset] = useState(100);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Animate from 0 to the target on mount.
  useEffect(() => {
    const timer = setTimeout(() => setOffset(100 - value), 60);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div
      className="cp-react"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ ["--cp-size" as never]: `${size}px` }}
    >
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <circle className="track" cx="48" cy="48" r="42" />
        <circle className="fill" cx="48" cy="48" r="42" pathLength={100} strokeDashoffset={offset} />
      </svg>
      <span className="cp-react__value">{value}%</span>
    </div>
  );
}
