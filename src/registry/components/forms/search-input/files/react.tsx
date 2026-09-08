import { useEffect, useMemo, useRef, useState } from "react";

const STYLES = `
.si-react { position: relative; width: min(380px, 90vw); font-family: ui-sans-serif, system-ui, sans-serif; }
.si-input-react { width: 100%; box-sizing: border-box; height: 44px; padding: 0 38px 0 38px; font-size: 14px;
  color: #26262b; background: #ffffff; border: 1px solid #d4d4d8; border-radius: 11px; outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease; }
.si-input-react:focus { border-color: #26262b; box-shadow: 0 0 0 3px rgba(38,38,43,0.08); }
.si-results-react { position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 4;
  border: 1px solid #e4e4e7; border-radius: 12px; background: #ffffff;
  box-shadow: 0 14px 34px rgba(0,0,0,0.12); padding: 5px; max-height: 264px; overflow-y: auto; }
.si-option-react { display: flex; align-items: center; gap: 9px; width: 100%; border: 0;
  background: transparent; border-radius: 8px; padding: 9px 10px; font-size: 13.5px; color: #3f3f46;
  text-align: left; cursor: pointer; }
.si-option-react[data-active="true"] { background: #f4f4f5; color: #26262b; }
.si-option-react mark { background: rgba(15,118,110,0.14); color: #0f766e; border-radius: 3px; padding: 0 1px; }
.si-chip-react { border: 1px solid #e4e4e7; border-radius: 999px; background: #ffffff; color: #52525b;
  font-size: 12px; padding: 5px 11px; cursor: pointer; }
`;

const DATA = [
  { label: "Data tables", type: "Component", keywords: "table grid rows" },
  { label: "Onboarding checklist", type: "Template", keywords: "welcome steps" },
  { label: "Dark theme tokens", type: "Guide", keywords: "dark theme colors" },
  { label: "Team directory", type: "Template", keywords: "people profiles" },
  { label: "Command palette", type: "Component", keywords: "cmdk search palette" },
  { label: "Billing settings", type: "Page", keywords: "plans invoices payment" },
  { label: "Notification center", type: "Component", keywords: "inbox alerts toasts" },
];

function highlight(text: string, query: string) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (!query || index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

export default function SearchInput() {
  const [value, setValue] = useState("");
  const [debounced, setDebounced] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value.trim()), 180);
    return () => clearTimeout(timer);
  }, [value]);

  const matches = useMemo(() => {
    if (!debounced) return [];
    const q = debounced.toLowerCase();
    return DATA.filter(
      (item) => item.label.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q),
    );
  }, [debounced]);

  const open = Boolean(debounced);
  const select = (index: number) => {
    if (matches[index]) setValue(matches[index].label);
    setDebounced("");
    setActiveIndex(-1);
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeContent: "center", justifyItems: "center", gap: 12, background: "#fafafa" }}>
      <div ref={rootRef} className="si-react">
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" style={{ position: "absolute", left: 13, width: 15, height: 15, color: "#71717a", pointerEvents: "none" }} aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" /><path d="m11 11 3 3" />
          </svg>
          <input
            className="si-input-react"
            type="text"
            placeholder="Search components, docs, people…"
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-controls="si-react-results"
            aria-label="Search"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (!open) return;
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActiveIndex((i) => Math.min(i + 1, matches.length - 1));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActiveIndex((i) => Math.max(i - 1, 0));
              } else if (event.key === "Enter") {
                event.preventDefault();
                select(activeIndex >= 0 ? activeIndex : 0);
              } else if (event.key === "Escape") {
                setDebounced("");
                setActiveIndex(-1);
              }
            }}
          />
          {value && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => { setValue(""); setDebounced(""); }}
              style={{ position: "absolute", right: 8, width: 24, height: 24, border: 0, borderRadius: "50%", background: "#e4e4e7", color: "#52525b", fontSize: 14, lineHeight: 1, cursor: "pointer" }}
            >
              ×
            </button>
          )}
        </div>

        {open && (
          <div id="si-react-results" className="si-results-react" role="listbox">
            {matches.length === 0 ? (
              <p style={{ padding: 18, textAlign: "center", fontSize: 13, color: "#71717a" }}>
                No results for “{debounced}”.
              </p>
            ) : (
              matches.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className="si-option-react"
                  data-active={index === activeIndex}
                  onMouseMove={() => setActiveIndex(index)}
                  onClick={() => select(index)}
                >
                  {highlight(item.label, debounced)}
                  <span style={{ marginLeft: "auto", fontSize: 11, color: "#a1a1aa" }}>{item.type}</span>
                </button>
              ))
            )}
          </div>
        )}

        {!open && (
          <div style={{ marginTop: 12 }}>
            <p style={{ margin: "0 0 7px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "#a1a1aa" }}>
              Recent
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["tables", "onboarding", "dark theme"].map((chip) => (
                <button key={chip} type="button" className="si-chip-react" onClick={() => setValue(chip)}>
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <p style={{ margin: 0, fontSize: 12.5, color: "#71717a" }}>Type to search — arrow keys navigate, Enter selects, Esc closes.</p>
    </div>
  );
}
