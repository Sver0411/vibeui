import { useEffect, useState } from "react";

const STYLES = `
.cs-shell-react { display: flex; min-height: 100vh; background: #fafafa; font-family: ui-sans-serif, system-ui, sans-serif; }
.cs-react { position: relative; display: flex; flex-direction: column; width: 216px; padding: 14px 12px;
  border-right: 1px solid #e4e4e7; background: #ffffff; transition: width 0.28s cubic-bezier(0.22,1,0.36,1); }
.cs-react[data-collapsed="true"] { width: 64px; }
.cs-react__item { position: relative; display: flex; align-items: center; gap: 11px; padding: 9px 10px;
  border-radius: 9px; color: #71717a; text-decoration: none; white-space: nowrap; border: 0; background: none;
  width: 100%; cursor: pointer; transition: background-color 0.15s ease, color 0.15s ease; }
.cs-react__item:hover { background: #f4f4f5; color: #26262b; }
.cs-react__item[data-active="true"] { background: rgba(15,118,110,0.1); color: #0f766e; }
.cs-react__item svg { width: 17px; height: 17px; flex-shrink: 0; }
.cs-react__item::after { content: attr(data-tip); position: absolute; left: calc(100% + 10px); top: 50%;
  transform: translateY(-50%) scale(0.94); padding: 5px 9px; border-radius: 7px; background: #26262b;
  color: #fafafa; font-size: 11.5px; font-weight: 500; opacity: 0; pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease; z-index: 3; white-space: nowrap; }
.cs-react[data-collapsed="true"] .cs-react__item:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }
.cs-react__label { font-size: 13.5px; font-weight: 500; overflow: hidden; transition: opacity 0.18s ease; }
.cs-react[data-collapsed="true"] .cs-react__label { opacity: 0; }
.cs-react__toggle { position: absolute; right: -11px; top: 50%; transform: translateY(-50%); display: grid;
  place-items: center; width: 22px; height: 22px; border: 1px solid #e4e4e7; border-radius: 50%;
  background: #ffffff; color: #71717a; cursor: pointer; z-index: 2; }
.cs-react__toggle svg { width: 12px; height: 12px; transition: transform 0.28s cubic-bezier(0.22,1,0.36,1); }
.cs-react[data-collapsed="true"] .cs-react__toggle svg { transform: rotate(180deg); }
`;

const ITEMS = [
  { label: "Dashboard", icon: <><rect x="3" y="3" width="6" height="6" rx="1.5" /><rect x="11" y="3" width="6" height="6" rx="1.5" /><rect x="3" y="11" width="6" height="6" rx="1.5" /><rect x="11" y="11" width="6" height="6" rx="1.5" /></> },
  { label: "Projects", icon: <path d="M3 6a2 2 0 0 1 2-2h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z" /> },
  { label: "Reports", icon: <path d="M4 16V9M10 16V4M16 16v-5" /> },
  { label: "Team", icon: <><circle cx="7.5" cy="7" r="2.6" /><path d="M2.8 16c.6-2.6 2.5-4 4.7-4s4.1 1.4 4.7 4" /></> },
  { label: "Settings", icon: <><circle cx="10" cy="10" r="2.6" /><path d="M10 3v2M10 15v2M3 10h2M15 10h2" /></> },
];

export default function CollapsibleSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Dashboard");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div className="cs-shell-react">
      <aside className="cs-react" data-collapsed={collapsed}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 6px 16px" }}>
          <span style={{ display: "grid", placeItems: "center", width: 30, height: 30, color: "#26262b", flexShrink: 0 }} aria-hidden="true">
            <svg viewBox="0 0 20 20" style={{ width: 22, height: 22 }}><rect x="2" y="2" width="16" height="16" rx="5" fill="currentColor" opacity="0.9" /><circle cx="10" cy="10" r="3.4" fill="#fff" /></svg>
          </span>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#26262b", whiteSpace: "nowrap", opacity: collapsed ? 0 : 1, transition: "opacity 0.2s ease" }}>
            Nimbus
          </span>
        </div>
        <nav aria-label="Sidebar" style={{ display: "grid", gap: 3 }}>
          {ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              className="cs-react__item"
              data-active={active === item.label}
              data-tip={item.label}
              onClick={() => setActive(item.label)}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
              <span className="cs-react__label">{item.label}</span>
            </button>
          ))}
        </nav>
        <button
          type="button"
          className="cs-react__toggle"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((v) => !v)}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m9.5 4-4 4 4 4" /></svg>
        </button>
      </aside>
      <main style={{ flex: 1, padding: "34px 30px" }}>
        <h1 style={{ margin: "0 0 12px", fontSize: 19, fontWeight: 600, color: "#26262b" }}>Dashboard</h1>
        <p style={{ margin: "0 0 10px", maxWidth: "52ch", fontSize: 13.5, lineHeight: 1.7, color: "#71717a" }}>
          Click the chevron to collapse the sidebar. Collapsed items show tooltips on hover.
        </p>
        <p style={{ margin: "0 0 10px", maxWidth: "52ch", fontSize: 13.5, lineHeight: 1.7, color: "#71717a" }}>
          Active item, icons and labels are all real accessible elements.
        </p>
      </main>
    </div>
  );
}
