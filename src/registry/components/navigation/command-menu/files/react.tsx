import { useEffect, useMemo, useRef, useState } from "react";

const STYLES = `
.cmd-stage-react { min-height: 100vh; display: grid; place-content: center; justify-items: center; gap: 14px;
  background: #fafafa; font-family: ui-sans-serif, system-ui, sans-serif; }
.cmd-open-react { display: inline-flex; align-items: center; gap: 26px; border: 1px solid #e4e4e7;
  border-radius: 11px; background: #ffffff; color: #71717a; font-size: 13.5px;
  padding: 10px 12px 10px 14px; cursor: pointer; transition: border-color 0.15s ease, color 0.15s ease; }
.cmd-open-react:hover { border-color: #a1a1aa; color: #18181b; }
.cmd-kbd-react { font-family: inherit; font-size: 11px; color: #52525b; background: #f4f4f5;
  border: 1px solid #e4e4e7; border-radius: 6px; padding: 2.5px 6px; }
.cmd-dialog-react { position: fixed; inset: 0; z-index: 20; display: grid; place-items: start center; padding-top: 14vh; }
.cmd-scrim-react { position: absolute; inset: 0; background: rgba(24,24,27,0.18); backdrop-filter: blur(2px); }
.cmd-panel-react { position: relative; width: min(560px, 92vw); border-radius: 14px;
  border: 1px solid #e4e4e7; background: #ffffff; box-shadow: 0 30px 80px rgba(24,24,27,0.16);
  overflow: hidden; animation: cmd-pop-react 0.2s cubic-bezier(0.22,1,0.36,1); }
@keyframes cmd-pop-react { from { opacity: 0; transform: translateY(-8px) scale(0.98); } }
.cmd-item-react { display: flex; align-items: center; gap: 10px; width: 100%; border: 0; border-radius: 8px;
  background: transparent; color: #3f3f46; font-size: 13.5px; padding: 9px 10px; cursor: pointer; text-align: left; }
.cmd-item-react[data-active="true"] { background: rgba(15,118,110,0.08); color: #0f766e; }
`;

const ACTIONS = [
  { group: "Actions", label: "Create new project", hint: "⌘N", keywords: "new create project" },
  { group: "Actions", label: "Invite team member", hint: "", keywords: "invite member team share" },
  { group: "Navigation", label: "Go to Dashboard", hint: "G D", keywords: "dashboard home" },
  { group: "Navigation", label: "Go to Settings", hint: "G S", keywords: "settings preferences" },
  { group: "Navigation", label: "Open Billing", hint: "", keywords: "billing plan invoice" },
  {
    group: "Theme",
    label: "Toggle dark mode",
    hint: "⌘⇧L",
    keywords: "dark light theme appearance",
  },
  { group: "Theme", label: "Increase font size", hint: "", keywords: "font size text bigger" },
];

function fuzzyScore(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (!q) return 1;
  let score = 0;
  let i = 0;
  for (const ch of q) {
    const idx = t.indexOf(ch, i);
    if (idx === -1) return 0;
    score += idx === i ? 2 : 1;
    i = idx + 1;
  }
  if (t.includes(q)) score += 10;
  return score;
}

export default function CommandMenuDemo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const results = useMemo(() => {
    return ACTIONS.map((action) => ({
      action,
      score: Math.max(fuzzyScore(query, action.label), fuzzyScore(query, action.keywords) * 0.8),
    }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [query]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (event.key === "Escape") setOpen(false);
      else if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((i) => (i + 1) % Math.max(results.length, 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1));
      } else if (event.key === "Enter") {
        event.preventDefault();
        const entry = results[activeIndex];
        setOpen(false);
        if (entry) console.log("Command:", entry.action.label);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, results, activeIndex]);

  let lastGroup = "";

  return (
    <div className="cmd-stage-react">
      <button type="button" className="cmd-open-react" onClick={() => setOpen(true)}>
        Search actions… <kbd className="cmd-kbd-react">⌘K</kbd>
      </button>
      <p style={{ margin: 0, fontSize: 12, color: "#71717a" }}>
        Press ⌘K anywhere, or Esc to close.
      </p>

      {open && (
        <div className="cmd-dialog-react" role="dialog" aria-modal="true" aria-label="Command menu">
          <div className="cmd-scrim-react" onClick={() => setOpen(false)} />
          <div className="cmd-panel-react">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 16px",
                borderBottom: "1px solid #ececef",
                color: "#71717a",
              }}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                style={{ width: 15, height: 15, flexShrink: 0 }}
                aria-hidden="true"
              >
                <circle cx="7" cy="7" r="4.5" />
                <path d="m11 11 3 3" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                style={{
                  flex: 1,
                  border: 0,
                  background: "transparent",
                  color: "#18181b",
                  fontSize: 14.5,
                  outline: "none",
                }}
              />
              <kbd className="cmd-kbd-react">Esc</kbd>
            </div>
            <div
              role="listbox"
              aria-label="Commands"
              style={{ maxHeight: 300, overflowY: "auto", padding: 6 }}
            >
              {results.length === 0 && (
                <p style={{ padding: 26, textAlign: "center", fontSize: 13, color: "#71717a" }}>
                  No commands match “{query}”.
                </p>
              )}
              {results.map((entry, index) => {
                const groupHeader =
                  entry.action.group !== lastGroup
                    ? ((lastGroup = entry.action.group), true)
                    : false;
                return (
                  <div key={entry.action.label}>
                    {groupHeader && (
                      <p
                        style={{
                          padding: "10px 10px 4px",
                          fontSize: 10.5,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "#a1a1aa",
                          margin: 0,
                        }}
                      >
                        {entry.action.group}
                      </p>
                    )}
                    <button
                      type="button"
                      role="option"
                      aria-selected={index === activeIndex}
                      className="cmd-item-react"
                      data-active={index === activeIndex}
                      onMouseMove={() => setActiveIndex(index)}
                      onClick={() => {
                        setOpen(false);
                        console.log("Command:", entry.action.label);
                      }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        style={{
                          width: 15,
                          height: 15,
                          color: index === activeIndex ? "#0f766e" : "#a1a1aa",
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      >
                        <path d="m3 8.5 3 3 7-7" />
                      </svg>
                      {entry.action.label}
                      {entry.action.hint && (
                        <span style={{ marginLeft: "auto", fontSize: 11, color: "#a1a1aa" }}>
                          {entry.action.hint}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                padding: "10px 16px",
                borderTop: "1px solid #ececef",
                fontSize: 11,
                color: "#71717a",
              }}
            >
              <span>↑ ↓ navigate</span>
              <span>↵ select</span>
              <span>Esc close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
