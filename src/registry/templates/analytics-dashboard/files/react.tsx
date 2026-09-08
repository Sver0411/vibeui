import { useEffect, useMemo, useRef, useState } from "react";

const STYLES = `
.db-shell-react { display: grid; grid-template-columns: 208px 1fr; min-height: 100vh; background: #f7f7f8;
  color: #26262b; font-family: ui-sans-serif, system-ui, sans-serif; }
@media (max-width: 720px) { .db-shell-react { grid-template-columns: 1fr; }
  .db-sidebar-react { position: static; flex-direction: row; width: auto; border-right: 0;
    border-bottom: 1px solid #e4e4e7; padding: 10px 14px; height: auto; overflow-x: auto; }
  .db-nav-react { display: flex; gap: 4px; } }
.db-sidebar-react { display: flex; flex-direction: column; gap: 18px; padding: 16px 12px;
  border-right: 1px solid #e4e4e7; background: #ffffff; position: sticky; top: 0; height: 100vh; box-sizing: border-box; }
.db-nav-item-react { padding: 8px 10px; border-radius: 8px; font-size: 13.5px; font-weight: 500; color: #71717a;
  text-decoration: none; white-space: nowrap; border: 0; background: none; cursor: pointer; text-align: left; }
.db-nav-item-react:hover { background: #f4f4f5; color: #26262b; }
.db-nav-item-react[data-active="true"] { background: rgba(15,118,110,0.1); color: #0f766e; }
.db-stat-react { display: grid; gap: 3px; padding: 14px 15px; border: 1px solid #e4e4e7;
  border-radius: 13px; background: #ffffff; }
.db-stat-value-react { font-size: 21px; font-weight: 700; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.db-panel-react { border: 1px solid #e4e4e7; border-radius: 14px; background: #ffffff; padding: 16px; }
.db-table-react { width: 100%; border-collapse: collapse; font-size: 13px; }
.db-table-react th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em;
  color: #a1a1aa; padding: 8px 6px; border-bottom: 1px solid #e4e4e7; }
.db-table-react td { padding: 9px 6px; border-bottom: 1px solid #f4f4f5; font-variant-numeric: tabular-nums; }
`;

const NAV = ["Overview", "Traffic", "Revenue", "Reports", "Settings"];
const PAGES: Array<[string, string, string, boolean]> = [
  ["/", "18,204", "+6.2%", false],
  ["/pricing", "9,451", "+11.8%", false],
  ["/docs/getting-started", "7,882", "+2.4%", false],
  ["/blog/launch-week", "5,530", "−1.2%", true],
  ["/changelog", "3,914", "+4.7%", false],
];

function useSeededSeries(count: number, base: number, variance: number): number[] {
  return useMemo(() => {
    let seed = 42;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const points: number[] = [];
    let value = base;
    for (let i = 0; i < count; i++) {
      value = Math.max(base * 0.4, value + (random() - 0.48) * variance);
      points.push(value);
    }
    return points;
  }, [count, base, variance]);
}

function LineChart({ current, previous }: { current: number[]; previous: number[] }) {
  const max = Math.max(...current, ...previous) * 1.15;
  const toPoints = (values: number[]) =>
    values.map((v, i) => `${((i * 600) / (values.length - 1)).toFixed(1)},${(190 - (v / max) * 170).toFixed(1)}`).join(" ");
  const area = `0,190 ${toPoints(current)} 600,190`;
  return (
    <svg viewBox="0 0 600 200" preserveAspectRatio="none" role="img" aria-label="Line chart comparing this period with the previous one" style={{ width: "100%", height: 190, display: "block" }}>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={0} x2={600} y1={190 - f * 170} y2={190 - f * 170} stroke="#eef0f1" strokeWidth={1} />
      ))}
      <polygon fill="rgba(15,118,110,0.08)" points={area} />
      <polyline points={toPoints(previous)} fill="none" stroke="#cbd5d3" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={toPoints(current)} fill="none" stroke="#0f766e" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AnalyticsDashboard() {
  const [active, setActive] = useState("Overview");
  const current = useSeededSeries(30, 620, 90);
  const previous = useSeededSeries(30, 520, 70);
  const [visitors, setVisitors] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => {
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / 1400, 1);
      setVisitors(Math.round(48213 * (1 - Math.pow(1 - t, 3))));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const stats: Array<[string, string, string, boolean]> = [
    ["Visitors", visitors.toLocaleString("en-US"), "▲ 12.4%", true],
    ["Revenue", "$86,420", "▲ 8.1%", true],
    ["Conversion", "4.2%", "▼ 0.6%", false],
    ["Avg. session", "4m 32s", "▲ 3.0%", true],
  ];

  return (
    <div className="db-shell-react">
      <aside className="db-sidebar-react">
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "2px 8px" }}>
          <span aria-hidden="true" style={{ width: 20, height: 20, borderRadius: 6, background: "conic-gradient(from 200deg, #0f766e, #14b8a6, #0f766e)" }} />
          <span style={{ fontSize: 15, fontWeight: 700 }}>Pulse</span>
        </div>
        <nav aria-label="Dashboard" style={{ display: "grid", gap: 2 }}>
          {NAV.map((item) => (
            <button key={item} type="button" className="db-nav-item-react" data-active={active === item} onClick={() => setActive(item)}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main style={{ padding: "22px 24px 40px", display: "grid", gap: 16, alignContent: "start" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>{active}</h1>
            <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "#71717a" }}>Last 30 days</p>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600, color: "#15803d", background: "rgba(21,128,61,0.1)", padding: "4px 10px", borderRadius: 999 }}>
            <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} /> Live
          </span>
        </header>

        <section aria-label="Key metrics" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
          {stats.map(([label, value, delta, up]) => (
            <div key={label} className="db-stat-react">
              <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "#a1a1aa" }}>{label}</span>
              <span className="db-stat-value-react">{value}</span>
              <span style={{ fontSize: 11.5, fontWeight: 600, fontVariantNumeric: "tabular-nums", color: up ? "#15803d" : "#b3261e" }}>{delta}</span>
            </div>
          ))}
        </section>

        <section className="db-panel-react" aria-label="Visitors over time">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Visitors</h2>
            <div aria-hidden="true" style={{ display: "flex", gap: 14 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "#71717a" }}><i style={{ width: 9, height: 9, borderRadius: 3, background: "#0f766e" }} />This period</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "#71717a" }}><i style={{ width: 9, height: 9, borderRadius: 3, background: "#cbd5d3" }} />Previous</span>
            </div>
          </div>
          <LineChart current={current} previous={previous} />
        </section>

        <section className="db-panel-react" aria-label="Top pages">
          <h2 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 600 }}>Top pages</h2>
          <table className="db-table-react">
            <thead>
              <tr><th>Page</th><th>Views</th><th>Change</th></tr>
            </thead>
            <tbody>
              {PAGES.map(([path, views, change, down]) => (
                <tr key={path}>
                  <td style={{ fontWeight: 500 }}>{path}</td>
                  <td>{views}</td>
                  <td>
                    <span style={{ fontWeight: 600, color: down ? "#b3261e" : "#15803d" }}>{change}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
