import { useEffect, useState } from "react";

const STYLES = `
.cl-react { width: min(280px, 84vw); display: grid; gap: 14px; padding: 16px; border: 1px solid #e4e4e7;
  border-radius: 16px; background: #fff; font-family: ui-sans-serif, system-ui, sans-serif; }
.cl-react__swatches { display: grid; grid-template-columns: repeat(8, 1fr); gap: 8px; }
.cl-react__swatch { aspect-ratio: 1; padding: 0; border: 0; border-radius: 50%; background: var(--c); cursor: pointer;
  transition: transform .15s cubic-bezier(.22,1,.36,1), box-shadow .15s ease; }
.cl-react__swatch:hover { transform: scale(1.12); }
.cl-react__swatch[aria-checked="true"] { box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--c); }
.cl-react__preview { display: flex; align-items: center; gap: 12px; }
.cl-react__dot { width: 34px; height: 34px; border-radius: 10px; background: var(--c); }
.cl-react__name { font-size: 14px; color: #18181b; }
.cl-react__hex { font-family: ui-monospace, Menlo, monospace; font-size: 12px; color: #71717a; }
.cl-react__btn { justify-self: start; padding: 10px 20px; border: 0; border-radius: 10px; font-size: 14px; font-weight: 600;
  color: #fff; cursor: pointer; transition: background-color .25s ease; }
`;

const COLORS = [
  { hex: "#0f766e", name: "松石绿" },
  { hex: "#0ea5e9", name: "晴空蓝" },
  { hex: "#8b5cf6", name: "鸢尾紫" },
  { hex: "#ec4899", name: "蔷薇粉" },
  { hex: "#f59e0b", name: "琥珀黄" },
  { hex: "#e11d48", name: "绯红" },
  { hex: "#16a34a", name: "苔绿" },
  { hex: "#18181b", name: "墨黑" },
];

export default function ColorPicker() {
  const [current, setCurrent] = useState(COLORS[0]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div className="cl-react">
      <div className="cl-react__swatches" role="radiogroup" aria-label="选择颜色">
        {COLORS.map((color) => (
          <button
            key={color.hex}
            type="button"
            role="radio"
            aria-checked={current.hex === color.hex}
            aria-label={`${color.name} ${color.hex}`}
            className="cl-react__swatch"
            style={{ "--c": color.hex } as React.CSSProperties}
            onClick={() => setCurrent(color)}
          />
        ))}
      </div>
      <div className="cl-react__preview">
        <span className="cl-react__dot" style={{ "--c": current.hex } as React.CSSProperties} />
        <div>
          <div className="cl-react__name">{current.name}</div>
          <code className="cl-react__hex">{current.hex}</code>
        </div>
      </div>
      <button type="button" className="cl-react__btn" style={{ backgroundColor: current.hex }}>
        使用该色
      </button>
    </div>
  );
}
