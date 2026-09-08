import { useEffect, useLayoutEffect, useRef, useState } from "react";

const STYLES = `
.at-tabs-react { position: relative; display: inline-flex; gap: 4px; padding: 4px; border-radius: 11px;
  background: #ececef; align-self: start; }
.at-tab-react { position: relative; z-index: 1; border: 0; background: transparent; padding: 8px 16px;
  font-size: 13.5px; font-weight: 500; color: #71717a; cursor: pointer; border-radius: 8px;
  transition: color 0.2s ease; }
.at-tab-react[aria-selected="true"], .at-tab-react:hover { color: #26262b; }
.at-indicator-react { position: absolute; top: 4px; bottom: 4px; left: 0; border-radius: 8px; background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), width 0.3s cubic-bezier(0.22,1,0.36,1); }
.at-panel-react { border: 1px solid #e4e4e7; border-radius: 12px; background: #ffffff; padding: 20px;
  animation: at-panel-in-react 0.28s cubic-bezier(0.22,1,0.36,1); }
@keyframes at-panel-in-react { from { opacity: 0; transform: translateY(5px); } }
`;

const TABS = [
  {
    id: "overview",
    label: "Overview",
    text: "The indicator measures each tab's offsetLeft and width, so it slides correctly at any font size or spacing.",
  },
  {
    id: "analytics",
    label: "Analytics",
    text: "Panels cross-fade with a quick opacity + translate transition. Arrow keys move focus and selection.",
  },
  {
    id: "reports",
    label: "Reports",
    text: "Home / End jump to the first and last tab, matching WAI-ARIA tab pattern behavior.",
  },
];

export default function AnimatedTabs() {
  const [selected, setSelected] = useState(TABS[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Measure on selection and on resize so the indicator is always exact.
  useLayoutEffect(() => {
    const move = () => {
      const tab = tabRefs.current[selected];
      const indicator = indicatorRef.current;
      if (!tab || !indicator) return;
      indicator.style.width = `${tab.offsetWidth}px`;
      indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [selected]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const index = TABS.findIndex((t) => t.id === selected);
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TABS.length - 1;
    if (next !== null) {
      event.preventDefault();
      setSelected(TABS[next].id);
      tabRefs.current[TABS[next].id]?.focus();
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeContent: "center", gap: 20, width: "min(480px, 92vw)", margin: "0 auto", background: "#fafafa", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <div className="at-tabs-react" role="tablist" aria-label="Product sections" onKeyDown={onKeyDown}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[tab.id] = el;
            }}
            type="button"
            role="tab"
            aria-selected={selected === tab.id}
            aria-controls={`at-panel-${tab.id}`}
            tabIndex={selected === tab.id ? 0 : -1}
            className="at-tab-react"
            onClick={() => setSelected(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        <span ref={indicatorRef} className="at-indicator-react" aria-hidden="true" />
      </div>
      {TABS.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`at-panel-${tab.id}`}
          aria-labelledby={`at-tab-${tab.id}`}
          hidden={selected !== tab.id}
          className="at-panel-react"
        >
          <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 600, color: "#26262b" }}>{tab.label}</h3>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: "#71717a" }}>{tab.text}</p>
        </div>
      ))}
    </div>
  );
}
