import { useEffect, useRef, useState } from "react";

const STYLES = `
:root { --ms-accent:#2563eb; --ms-accent-soft:rgba(37,99,235,.1); --ms-ink:#0f172a;
  --ms-sub:#64748b; --ms-line:#e2e8f0; --ms-bg:#fff; }
.ms2-stage { background:#fafafa; min-height:100vh; display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:14px; padding:32px 20px;
  font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif; color:var(--ms-ink); }
.ms2-field { position:relative; width:min(360px,100%); }
.ms2-label { display:block; font-size:13px; font-weight:600; margin-bottom:8px; color:var(--ms-sub); }
.ms2-box { width:100%; min-height:46px; display:flex; align-items:center; gap:6px; flex-wrap:wrap;
  padding:6px 34px 6px 10px; background:var(--ms-bg); border:1px solid var(--ms-line);
  border-radius:12px; cursor:pointer; text-align:left; font:inherit; position:relative;
  transition:border-color .15s ease, box-shadow .15s ease; }
.ms2-box:focus-visible { outline:none; border-color:var(--ms-accent); box-shadow:0 0 0 3px var(--ms-accent-soft); }
.ms2-placeholder { color:#94a3b8; font-size:14px; }
.ms2-chip { display:inline-flex; align-items:center; gap:4px; padding:3px 6px 3px 9px;
  background:var(--ms-accent-soft); color:var(--ms-accent); border-radius:7px;
  font-size:12.5px; font-weight:500; }
.ms2-chip button { border:none; background:none; color:inherit; cursor:pointer;
  font-size:12px; padding:0 2px; }
.ms2-caret { position:absolute; right:12px; top:50%; transform:translateY(-50%); color:var(--ms-sub); }
.ms2-panel { position:absolute; top:calc(100% + 6px); left:0; right:0; background:var(--ms-bg);
  border:1px solid var(--ms-line); border-radius:12px;
  box-shadow:0 12px 32px rgba(15,23,42,.12); padding:8px; z-index:20; }
.ms2-search { width:100%; height:34px; border:1px solid var(--ms-line); border-radius:8px;
  padding:0 10px; font:inherit; font-size:13.5px; box-sizing:border-box; }
.ms2-search:focus { outline:none; border-color:var(--ms-accent); }
.ms2-actions { display:flex; align-items:center; justify-content:space-between; padding:8px 4px 6px; }
.ms2-action { border:none; background:none; color:var(--ms-accent); font-size:12.5px;
  font-weight:600; cursor:pointer; }
.ms2-count { font-size:12px; color:var(--ms-sub); }
.ms2-list { list-style:none; margin:0; padding:0; max-height:208px; overflow-y:auto; }
.ms2-opt { display:flex; align-items:center; gap:9px; padding:8px; border-radius:8px;
  cursor:pointer; font-size:14px; }
.ms2-opt:hover { background:#f1f5f9; }
.ms2-opt[aria-selected="true"] { color:var(--ms-accent); font-weight:500; }
.ms2-check { width:16px; height:16px; border:1.5px solid #cbd5e1; border-radius:5px;
  display:inline-flex; align-items:center; justify-content:center; flex:none; }
.ms2-opt[aria-selected="true"] .ms2-check { background:var(--ms-accent); border-color:var(--ms-accent); }
.ms2-hint { font-size:12.5px; color:var(--ms-sub); margin:0; }
`;

const MEMBERS = ["安安", "北北", "晨晨", "多多", "二凡", "霏霏", "光光", "含含"];

/** 多选下拉：搜索 + 全选/清空 + chips 回显 */
export default function MultiSelect() {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.head.insertAdjacentHTML("beforeend", `<style>${STYLES}</style>`);
  }, []);

  // 点击组件外部关闭面板
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const shown = MEMBERS.filter((n) => n.toLowerCase().includes(keyword.trim().toLowerCase()));
  const toggle = (name: string) =>
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  return (
    <div className="ms2-stage">
      <div className="ms2-field" ref={wrapRef}>
        <span className="ms2-label">指派成员</span>
        <button
          type="button"
          className="ms2-box"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {selected.map((name) => (
            <span key={name} className="ms2-chip">
              {name}
              <button
                type="button"
                aria-label={`移除 ${name}`}
                onClick={(e) => { e.stopPropagation(); toggle(name); }}
              >
                ×
              </button>
            </span>
          ))}
          {selected.length === 0 && <span className="ms2-placeholder">选择成员…</span>}
          <svg className="ms2-caret" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <div className="ms2-panel">
            <input
              className="ms2-search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索成员…"
              aria-label="搜索成员"
            />
            <div className="ms2-actions">
              <button type="button" className="ms2-action" onClick={() => setSelected([...MEMBERS])}>
                全选
              </button>
              <span className="ms2-count">已选 {selected.length} 人</span>
              <button type="button" className="ms2-action" onClick={() => setSelected([])}>
                清空
              </button>
            </div>
            <ul className="ms2-list" role="listbox" aria-multiselectable="true">
              {shown.map((name) => (
                <li
                  key={name}
                  className="ms2-opt"
                  role="option"
                  aria-selected={selected.includes(name)}
                  onClick={() => toggle(name)}
                >
                  <span className="ms2-check" />
                  <span>{name}</span>
                </li>
              ))}
              {shown.length === 0 && <li style={{ padding: 16, textAlign: "center", color: "#94a3b8", fontSize: 13 }}>没有匹配的成员</li>}
            </ul>
          </div>
        )}
      </div>
      <p className="ms2-hint">选中项以 chips 回显在触发框内，点击 chip 的 × 可直接移除。</p>
    </div>
  );
}
