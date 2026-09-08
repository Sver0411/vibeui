import { useEffect, useRef, useState } from "react";

const STYLES = `
.sd-react { position: relative; display: grid; justify-items: end; gap: 12px; font-family: ui-sans-serif, system-ui, sans-serif; }
.sd-react__fab { display: grid; place-items: center; width: 54px; height: 54px; border: 0; border-radius: 50%;
  background: #0f766e; color: #fff; cursor: pointer; box-shadow: 0 6px 18px rgba(15,118,110,.4);
  transition: transform .3s cubic-bezier(.34,1.56,.64,1); font-size: 24px; line-height: 1; }
.sd-react__fab:active { transform: scale(.92); }
.sd-react__actions { display: grid; gap: 10px; justify-items: end; }
.sd-react__mini { position: relative; display: grid; place-items: center; width: 42px; height: 42px; padding: 0;
  border: 1px solid #e4e4e7; border-radius: 50%; background: #fff; color: #3f3f46; cursor: pointer;
  box-shadow: 0 3px 10px rgba(0,0,0,.1); animation: sd-pop .26s cubic-bezier(.34,1.56,.64,1) both;
  animation-delay: calc(var(--i) * 40ms); font-size: 16px; }
.sd-react__mini:hover { color: #0f766e; }
@keyframes sd-pop { from { opacity: 0; transform: translateY(10px) scale(.7); } to { opacity: 1; transform: none; } }
`;

const ACTIONS = [
  { label: "新建文档", icon: "＋" },
  { label: "上传文件", icon: "↑" },
  { label: "分享", icon: "◇" },
];

export default function SpeedDial() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    const onDown = (e: PointerEvent) => {
      if (open && boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      style.remove();
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="sd-react" ref={boxRef}>
      {open && (
        <div className="sd-react__actions" role="menu">
          {ACTIONS.map((action, i) => (
            <button
              key={action.label}
              type="button"
              className="sd-react__mini"
              style={{ "--i": i } as React.CSSProperties}
              aria-label={action.label}
              onClick={() => {
                setMessage(`已触发：${action.label}`);
                setOpen(false);
              }}
            >
              {action.icon}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        className="sd-react__fab"
        aria-expanded={open}
        aria-label="展开操作菜单"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "×" : "＋"}
      </button>
      <span role="status" aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>
        {message}
      </span>
    </div>
  );
}
