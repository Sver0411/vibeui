import { useCallback, useEffect, useRef, useState } from "react";

const STYLES = `
.dw-react { position: relative; min-height: 320px; display: grid; place-content: center; gap: 14px;
  overflow: hidden; border-radius: 14px; background: #fafafa; font-family: ui-sans-serif, system-ui, sans-serif; }
.dw-react__bar { display: flex; gap: 12px; justify-content: center; }
.dw-react__open { padding: 9px 18px; border: 1px solid #d4d4d8; border-radius: 10px; background: #fff;
  font-size: 14px; color: #18181b; cursor: pointer; }
.dw-react__open:hover { border-color: #0f766e; }
.dw-react__layer { position: absolute; inset: 0; z-index: 10; }
.dw-react__mask { position: absolute; inset: 0; background: rgba(24,24,27,.4); opacity: 0; transition: opacity .24s ease; }
.dw-react__layer.is-open .dw-react__mask { opacity: 1; }
.dw-react__panel { position: absolute; top: 0; bottom: 0; right: 0; width: min(82vw, 300px); display: flex;
  flex-direction: column; background: #fff; box-shadow: 0 8px 30px rgba(0,0,0,.16); transform: translateX(100%);
  transition: transform .28s cubic-bezier(.22,1,.36,1); }
.dw-react__layer.is-open .dw-react__panel { transform: translateX(0); }
.dw-react__head { display: flex; align-items: center; justify-content: space-between; padding: 16px 18px; border-bottom: 1px solid #f4f4f5; }
.dw-react__title { margin: 0; font-size: 15px; font-weight: 600; color: #18181b; }
.dw-react__close { width: 30px; height: 30px; border: 0; border-radius: 8px; background: transparent; color: #71717a; cursor: pointer; }
.dw-react__close:hover { background: #f4f4f5; }
.dw-react__body { flex: 1; display: grid; gap: 10px; align-content: start; padding: 16px 18px; }
.dw-react__row { display: flex; justify-content: space-between; margin: 0; font-size: 14px; color: #52525b; }
.dw-react__cta { margin: 14px 18px; padding: 10px; border: 0; border-radius: 10px; background: #0f766e;
  font-size: 14px; color: #fff; cursor: pointer; }
`;

const ITEMS = [
  { name: "极简卡片 × 2", price: 198 },
  { name: "动效合集 × 1", price: 99 },
];

export default function Drawer() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => {
    if (open) closeRef.current?.focus({ preventScroll: true });
    else triggerRef.current?.focus({ preventScroll: true });
  }, [open]);

  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Escape") setOpen(false);
  }, []);

  return (
    <div className="dw-react" onKeyDown={onKeyDown}>
      <div className="dw-react__bar">
        <button ref={triggerRef} type="button" className="dw-react__open" onClick={() => setOpen(true)}>
          右侧抽屉
        </button>
      </div>

      {open && (
        <div className="dw-react__layer is-open">
          <div className="dw-react__mask" onClick={() => setOpen(false)} />
          <aside className="dw-react__panel" role="dialog" aria-modal="true" aria-label="购物车">
            <header className="dw-react__head">
              <h2 className="dw-react__title">购物车</h2>
              <button
                ref={closeRef}
                type="button"
                className="dw-react__close"
                aria-label="关闭抽屉"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </header>
            <div className="dw-react__body">
              {ITEMS.map((item) => (
                <p className="dw-react__row" key={item.name}>
                  <span>{item.name}</span>
                  <strong>¥ {item.price}</strong>
                </p>
              ))}
            </div>
            <button type="button" className="dw-react__cta">去结算</button>
          </aside>
        </div>
      )}
    </div>
  );
}
