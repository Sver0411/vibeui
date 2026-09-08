import { useMemo, useState } from "react";

const STYLES = `
.dp-react { width: 300px; padding: 14px; border: 1px solid #e4e4e7; border-radius: 16px; background: #fff;
  box-shadow: 0 6px 20px rgba(0,0,0,.06); font-family: ui-sans-serif, system-ui, sans-serif; }
.dp-react__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.dp-react__label { font-size: 14px; font-weight: 600; color: #18181b; }
.dp-react__nav { width: 28px; height: 28px; border: 0; border-radius: 8px; background: transparent; color: #71717a; cursor: pointer; }
.dp-react__nav:hover { background: #f4f4f5; color: #18181b; }
.dp-react__week, .dp-react__grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
.dp-react__week { margin-bottom: 4px; }
.dp-react__week span { text-align: center; font-size: 11px; color: #a1a1aa; }
.dp-react__day { display: grid; place-items: center; aspect-ratio: 1; border: 0; border-radius: 9px; background: transparent;
  font-size: 13px; font-variant-numeric: tabular-nums; color: #3f3f46; cursor: pointer; }
.dp-react__day:hover:not(:disabled):not(.is-selected) { background: #f0fdfa; color: #0f766e; }
.dp-react__day.is-outside { color: #d4d4d8; cursor: default; }
.dp-react__day.is-today { box-shadow: inset 0 0 0 1px #0f766e; }
.dp-react__day.is-selected { background: #0f766e; color: #fff; font-weight: 600; }
.dp-react__foot { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; padding-top: 10px; border-top: 1px solid #f4f4f5; }
.dp-react__value { font-size: 12px; color: #0f766e; font-weight: 600; font-variant-numeric: tabular-nums; }
`;

const WEEK = ["一", "二", "三", "四", "五", "六", "日"];

function buildMonth(view: Date, today: Date, selected: Date | null) {
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const lead = (first.getDay() + 6) % 7; // 周一起始
  const cells: { date: Date; outside: boolean; isToday: boolean; isSelected: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(first);
    d.setDate(first.getDate() - lead + i);
    const same = (a: Date, b: Date | null) =>
      !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    cells.push({
      date: d,
      outside: d.getMonth() !== view.getMonth(),
      isToday: same(d, today),
      isSelected: same(d, selected),
    });
  }
  return cells;
}

export default function DatePicker() {
  const now = useMemo(() => new Date(), []);
  const [view, setView] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(null);
  const cells = useMemo(() => buildMonth(view, now, selected), [view, now, selected]);

  const shift = (delta: number) =>
    setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1));

  const pad = (n: number) => (n < 10 ? `0${n}` : String(n));

  return (
    <div className="dp-react">
      <header className="dp-react__head">
        <button type="button" className="dp-react__nav" aria-label="上一个月" onClick={() => shift(-1)}>‹</button>
        <strong className="dp-react__label">{view.getFullYear()} 年 {view.getMonth() + 1} 月</strong>
        <button type="button" className="dp-react__nav" aria-label="下一个月" onClick={() => shift(1)}>›</button>
      </header>
      <div className="dp-react__week" aria-hidden="true">
        {WEEK.map((w) => <span key={w}>{w}</span>)}
      </div>
      <div className="dp-react__grid">
        {cells.map((cell, i) => (
          <button
            key={i}
            type="button"
            className={`dp-react__day${cell.outside ? " is-outside" : ""}${cell.isToday ? " is-today" : ""}${cell.isSelected ? " is-selected" : ""}`}
            disabled={cell.outside}
            aria-label={`${cell.date.getFullYear()} 年 ${cell.date.getMonth() + 1} 月 ${cell.date.getDate()} 日`}
            onClick={() => setSelected(cell.date)}
          >
            {cell.date.getDate()}
          </button>
        ))}
      </div>
      <footer className="dp-react__foot">
        <button type="button" className="dp-react__nav" onClick={() => { setView(new Date(now.getFullYear(), now.getMonth(), 1)); setSelected(now); }}>
          回到今天
        </button>
        {selected && (
          <output className="dp-react__value">
            {selected.getFullYear()}-{pad(selected.getMonth() + 1)}-{pad(selected.getDate())}
          </output>
        )}
      </footer>
    </div>
  );
}
