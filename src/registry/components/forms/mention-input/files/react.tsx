import { useEffect, useMemo, useRef, useState } from "react";

const STYLES = `
:root { --mn-accent:#2563eb; --mn-accent-soft:rgba(37,99,235,.1); --mn-ink:#0f172a;
  --mn-sub:#64748b; --mn-line:#e2e8f0; --mn-bg:#fff; }
.mn2-stage { background:#fafafa; min-height:100vh; display:flex; align-items:center;
  justify-content:center; padding:32px 20px; box-sizing:border-box;
  font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif; color:var(--mn-ink); }
.mn2-card { position:relative; width:min(420px,100%); background:var(--mn-bg);
  border:1px solid var(--mn-line); border-radius:16px; padding:18px;
  box-shadow:0 12px 32px rgba(15,23,42,.06); }
.mn2-label { display:block; font-size:13px; font-weight:600; color:var(--mn-sub); margin-bottom:10px; }
.mn2-editor { min-height:96px; border:1px solid var(--mn-line); border-radius:12px; padding:12px;
  font-size:14px; line-height:1.7; display:flex; flex-wrap:wrap; align-items:center; gap:6px;
  cursor:text; transition:border-color .15s ease, box-shadow .15s ease; }
.mn2-editor:focus-within { border-color:var(--mn-accent); box-shadow:0 0 0 3px var(--mn-accent-soft); }
.mn2-input { flex:1; min-width:120px; border:none; outline:none; font:inherit; color:inherit;
  background:transparent; }
.mn2-tag { display:inline-flex; align-items:center; gap:4px; padding:3px 6px 3px 9px;
  background:var(--mn-accent-soft); color:var(--mn-accent); border-radius:7px;
  font-size:12.5px; font-weight:500; }
.mn2-tag button { border:none; background:none; color:inherit; cursor:pointer; font-size:12px; padding:0 2px; }
.mn2-foot { display:flex; align-items:center; justify-content:space-between; margin-top:10px;
  font-size:12px; color:var(--mn-sub); }
.mn2-count.over { color:#dc2626; font-weight:600; }
.mn2-menu { position:absolute; left:18px; right:18px; margin:0; padding:6px; list-style:none;
  background:var(--mn-bg); border:1px solid var(--mn-line); border-radius:12px;
  box-shadow:0 12px 32px rgba(15,23,42,.14); z-index:20; max-height:220px; overflow-y:auto; }
.mn2-item { display:flex; align-items:center; gap:9px; padding:8px; border-radius:8px;
  cursor:pointer; font-size:14px; }
.mn2-item.active { background:#f1f5f9; }
.mn2-avatar { width:24px; height:24px; border-radius:50%; color:#fff; font-size:12px;
  display:flex; align-items:center; justify-content:center; flex:none; }
.mn2-id { margin-left:auto; font-size:12px; color:#94a3b8; }
.mn2-empty { padding:16px; text-align:center; color:#94a3b8; font-size:13px; }
`;

const USERS = [
  { name: "安安", id: "@anan", color: "#2563eb" },
  { name: "北北", id: "@beibei", color: "#7c3aed" },
  { name: "晨晨", id: "@chen", color: "#0d9488" },
  { name: "多多", id: "@duoduo", color: "#ea580c" },
  { name: "二凡", id: "@erfan", color: "#db2777" },
  { name: "霏霏", id: "@feifei", color: "#4f46e5" },
];

const MAX = 140;

/** @ 提及输入：输入 @ 唤起候选菜单，选中后固化为不可编辑的提及标签 */
export default function MentionInput() {
  const [text, setText] = useState("");
  const [mentions, setMentions] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.head.insertAdjacentHTML("beforeend", `<style>${STYLES}</style>`);
  }, []);

  // 光标后是否处于 @词 中：是则给出 query，否则返回 null
  const query = useMemo(() => {
    const m = text.match(/@([^\s@]{0,12})$/);
    return m ? m[1] : null;
  }, [text]);

  const candidates = useMemo(() => {
    if (query === null) return [];
    const q = query.toLowerCase();
    return USERS.filter((u) => !q || u.name.toLowerCase().includes(q) || u.id.toLowerCase().includes(q));
  }, [query]);

  const open = query !== null;

  // 关闭菜单：点击卡片外部或按 ESC
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setText((t) => t.replace(/@[^\s@]*$/, ""));
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const pick = (name: string) => {
    setText((prev) => prev.replace(/@[^\s@]{0,12}$/, `@${name} `));
    setMentions((prev) => (prev.includes(name) ? prev : [...prev, name]));
    setActive(0);
  };

  return (
    <div className="mn2-stage">
      <div className="mn2-card" ref={wrapRef}>
        <label className="mn2-label" htmlFor="mn2-input">回复帖子</label>
        <div className="mn2-editor">
          {mentions.map((name) => (
            <span key={name} className="mn2-tag">
              @{name}
              <button
                type="button"
                aria-label={`移除 ${name}`}
                onClick={() => {
                  setMentions((prev) => prev.filter((n) => n !== name));
                  setText((prev) => prev.split(`@${name} `).join(""));
                }}
              >
                ×
              </button>
            </span>
          ))}
          <input
            id="mn2-input"
            className="mn2-input"
            value={text}
            placeholder={mentions.length ? "" : "输入 @ 提及成员…"}
            aria-label="回复内容，输入 @ 提及成员"
            onChange={(e) => { setText(e.target.value); setActive(0); }}
            onKeyDown={(e) => {
              if (!open || candidates.length === 0) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => (i + 1) % candidates.length);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => (i - 1 + candidates.length) % candidates.length);
              } else if (e.key === "Enter" || e.key === "Tab") {
                e.preventDefault();
                pick(candidates[active].name);
              } else if (e.key === "Escape") {
                setText((t) => t.replace(/@[^\s@]*$/, ""));
              }
            }}
          />
        </div>
        <div className="mn2-foot">
          <span>@ 唤起提及菜单；↑↓ 选择，Enter 确认</span>
          <span className={`mn2-count${text.length > MAX ? " over" : ""}`}>
            {text.length}/{MAX}
          </span>
        </div>
        {open && (
          <ul className="mn2-menu" role="listbox" aria-label="提及候选成员">
            {candidates.map((u, i) => (
              <li
                key={u.id}
                className={`mn2-item${i === active ? " active" : ""}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => { e.preventDefault(); pick(u.name); }}
              >
                <span className="mn2-avatar" style={{ background: u.color }}>{u.name.charAt(0)}</span>
                <span>{u.name}</span>
                <span className="mn2-id">{u.id}</span>
              </li>
            ))}
            {candidates.length === 0 && <li className="mn2-empty">没有匹配的成员</li>}
          </ul>
        )}
      </div>
    </div>
  );
}
