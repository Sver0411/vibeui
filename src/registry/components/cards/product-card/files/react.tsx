import { useEffect, useRef, useState } from "react";

const STYLES = `
.pc-react { width: min(270px, 90vw); border: 1px solid #e4e4e7; border-radius: 16px; background: #ffffff;
  overflow: hidden; transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease;
  font-family: ui-sans-serif, system-ui, sans-serif; }
.pc-react:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(0,0,0,0.1); }
.pc-react__media { position: relative; height: 190px; display: grid; place-items: center;
  background: linear-gradient(160deg, #e7e5e4, #d6d3d1); }
.pc-react__shape { width: 74px; height: 96px; border-radius: 12px 12px 26px 26px;
  background: linear-gradient(180deg, #fafaf9, #d6d3d1);
  box-shadow: inset 0 -14px 20px rgba(0,0,0,0.06), 0 18px 24px rgba(0,0,0,0.12); }
.pc-react__flag { position: absolute; top: 12px; left: 12px; font-size: 10px; font-weight: 700;
  letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 9px; border-radius: 999px;
  background: #26262b; color: #fafafa; }
.pc-react__add { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0;
  border-radius: 10px; background: #26262b; color: #fafafa; font-size: 13px; font-weight: 600;
  padding: 11px 0; cursor: pointer; transition: background-color 0.2s ease, transform 0.12s ease; width: 100%; }
.pc-react__add:active { transform: scale(0.98); }
.pc-size-react { width: 34px; height: 30px; border: 1px solid #e4e4e7; border-radius: 8px; background: #ffffff;
  color: #52525b; font-size: 12px; font-weight: 600; cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease; }
.pc-size-react[aria-checked="true"] { background: #26262b; border-color: #26262b; color: #fafafa; }
`;

const SIZES = ["S", "M", "L"];

export default function ProductCard({
  name = "Ceramic Pour-over Set",
  price = "$64",
  rating = "4.8 (132)",
}: {
  name?: string;
  price?: string;
  rating?: string;
}) {
  const [size, setSize] = useState("S");
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => {
      style.remove();
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleAdd = () => {
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="pc-react">
      <div className="pc-react__media">
        <div className="pc-react__shape" aria-hidden="true" />
        <span className="pc-react__flag">New</span>
      </div>
      <div style={{ display: "grid", gap: 10, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
          <h3 style={{ margin: 0, fontSize: 14.5, fontWeight: 600, color: "#26262b" }}>{name}</h3>
          <span style={{ fontSize: 14.5, fontWeight: 700, fontVariantNumeric: "tabular-nums", color: "#26262b" }}>{price}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#b45309" }}>
          <span aria-hidden="true">★★★★★</span>
          <span style={{ color: "#71717a" }}>{rating}</span>
        </div>
        <div style={{ display: "flex", gap: 6 }} role="radiogroup" aria-label="Size">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={size === s}
              className="pc-size-react"
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <button type="button" className="pc-react__add" onClick={handleAdd}
          style={added ? { background: "#0f766e" } : undefined}>
          {added ? (
            "Added ✓"
          ) : (
            <>
              <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" style={{ width: 13, height: 13 }}>
                <path d="M8 3v10M3 8h10" />
              </svg>
              Add to cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}
