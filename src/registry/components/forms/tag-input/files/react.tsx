import { useEffect, useRef, useState } from "react";

const STYLES = `
.ti-react { width: min(360px, 84vw); display: grid; gap: 10px; font-family: ui-sans-serif, system-ui, sans-serif; }
.ti-react__field { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; min-height: 46px; padding: 7px 10px;
  background: #fff; border: 1px solid #d4d4d8; border-radius: 12px; cursor: text; transition: border-color .15s ease, box-shadow .15s ease; }
.ti-react__field:focus-within { border-color: #0f766e; box-shadow: 0 0 0 3px rgba(15,118,110,.14); }
.ti-react__field.is-error { border-color: #f43f5e; animation: ti-shake .28s ease; }
@keyframes ti-shake { 0%,100% { transform: translateX(0); } 30% { transform: translateX(-4px); } 60% { transform: translateX(4px); } }
.ti-react__chip { display: inline-flex; align-items: center; gap: 5px; padding: 4px 8px; border-radius: 8px;
  font-size: 13px; color: #134e4a; background: #ccfbf1; animation: ti-pop .18s cubic-bezier(.22,1,.36,1); }
@keyframes ti-pop { from { transform: scale(.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.ti-react__x { display: inline-grid; place-items: center; width: 14px; height: 14px; padding: 0; border: 0; border-radius: 4px;
  background: transparent; color: inherit; opacity: .65; cursor: pointer; }
.ti-react__x:hover { opacity: 1; background: rgba(0,0,0,.08); }
.ti-react__input { flex: 1 1 90px; min-width: 90px; padding: 4px 2px; border: 0; outline: none; background: transparent;
  font: inherit; font-size: 14px; color: #18181b; }
.ti-react__hint { margin: 0; font-size: 12px; color: #71717a; }
.ti-react__hint.is-error { color: #be123c; }
`;

const MAX = 5;

export default function TagInput() {
  const [tags, setTags] = useState<string[]>(["前端", "设计"]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const add = (raw: string) => {
    const tag = raw.trim().replace(/\s+/g, " ");
    if (!tag) return;
    if (tags.length >= MAX) {
      setError(`最多添加 ${MAX} 个标签`);
      return;
    }
    if (tags.includes(tag)) {
      setError(`标签「${tag}」已存在`);
      return;
    }
    setError("");
    setTags((prev) => [...prev, tag]);
  };

  const remove = (tag: string) => {
    setError("");
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <div className="ti-react">
      <div
        className={`ti-react__field${error ? " is-error" : ""}`}
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) {
            e.preventDefault();
            inputRef.current?.focus();
          }
        }}
      >
        {tags.map((tag) => (
          <span className="ti-react__chip" key={tag}>
            {tag}
            <button
              type="button"
              className="ti-react__x"
              aria-label={`移除标签 ${tag}`}
              onClick={() => remove(tag)}
            >
              <svg viewBox="0 0 12 12" width="9" height="9" aria-hidden="true">
                <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          className="ti-react__input"
          type="text"
          placeholder="输入后回车添加"
          aria-label="添加标签"
          autoComplete="off"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add(draft);
              setDraft("");
            } else if (e.key === "Backspace" && draft === "" && tags.length) {
              remove(tags[tags.length - 1]);
            }
          }}
        />
      </div>
      <p className={`ti-react__hint${error ? " is-error" : ""}`}>
        {error || `已添加 ${tags.length} / ${MAX} 个标签`}
      </p>
    </div>
  );
}
