import { useEffect, useState } from "react";

const STYLES = `
.ex-react { width: min(340px, 90vw); border: 1px solid #e4e4e7; border-radius: 14px; background: #ffffff;
  overflow: hidden; transition: border-color 0.25s ease, box-shadow 0.25s ease;
  font-family: ui-sans-serif, system-ui, sans-serif; }
.ex-react[data-open="true"] { border-color: #d4d4d8; box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
.ex-react__header { display: flex; align-items: center; gap: 12px; width: 100%; border: 0;
  background: transparent; padding: 16px; cursor: pointer; text-align: left; }
.ex-react__avatar { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%;
  background: #26262b; color: #fafafa; font-size: 13px; font-weight: 600; flex-shrink: 0; }
.ex-react__chevron { width: 15px; height: 15px; color: #71717a; transition: transform 0.3s cubic-bezier(0.22,1,0.36,1); }
.ex-react[data-open="true"] .ex-react__chevron { transform: rotate(180deg); }
.ex-react__wrapper { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.32s cubic-bezier(0.22,1,0.36,1); }
.ex-react[data-open="true"] .ex-react__wrapper { grid-template-rows: 1fr; }
.ex-react__body { overflow: hidden; min-height: 0; padding: 0 16px 16px; }
.ex-react__tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
.ex-react__tags span { font-size: 11px; padding: 3px 9px; border-radius: 999px; background: #f4f4f5; color: #52525b; }
.ex-react__btn { flex: 1; border: 1px solid #d4d4d8; border-radius: 8px; background: #ffffff;
  color: #26262b; font-size: 13px; font-weight: 500; padding: 8px 0; cursor: pointer; }
.ex-react__btn--primary { background: #26262b; border-color: #26262b; color: #fafafa; }
`;

const TAGS = ["Build tooling", "Performance", "DX"];

export default function ExpandableCard({
  name = "Sarah Chen",
  role = "Staff Engineer · Platform",
  initials = "SC",
  bio = "Sarah leads the platform team. Previously she shipped build tooling at two unicorns and maintains several open-source bundler plugins.",
}: {
  name?: string;
  role?: string;
  initials?: string;
  bio?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#fafafa", padding: 20 }}>
      <article className="ex-react" data-open={open}>
        <button
          type="button"
          className="ex-react__header"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="ex-react__avatar" aria-hidden="true">{initials}</span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#26262b" }}>{name}</span>
            <span style={{ display: "block", fontSize: 12, color: "#71717a" }}>{role}</span>
          </span>
          <svg className="ex-react__chevron" viewBox="0 0 16 16" aria-hidden="true">
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="ex-react__wrapper">
          <div className="ex-react__body">
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#52525b" }}>{bio}</p>
            <div className="ex-react__tags">
              {TAGS.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button type="button" className="ex-react__btn ex-react__btn--primary">Follow</button>
              <button type="button" className="ex-react__btn">Message</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
