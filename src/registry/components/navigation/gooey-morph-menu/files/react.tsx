import { useEffect, useRef, useState } from "react";

const ACTIONS = [
  { name: "New canvas", detail: "Start from a blank frame", key: "N", icon: "+", tone: "mint" },
  { name: "Import brief", detail: "Turn notes into a structure", key: "I", icon: "↗", tone: "violet" },
  { name: "Open library", detail: "Reuse a saved pattern", key: "L", icon: "◇", tone: "amber" },
];

const STYLES = `
.gmr-stage{min-height:100vh;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 26% 18%,rgba(20,184,166,.1),transparent 28%),radial-gradient(circle at 82% 76%,rgba(99,102,241,.08),transparent 30%),#fafafa;color:#18181b;font-family:Inter,ui-sans-serif,system-ui,sans-serif}.gmr-defs{position:absolute;width:0;height:0}.gmr-demo{width:min(320px,calc(100vw - 36px))}.gmr-kicker{margin:0 0 12px 4px;color:#71717a;font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.gmr-shell{position:relative;height:62px;transition:height 560ms cubic-bezier(.16,1,.3,1)}.gmr-shell[data-open=true]{height:276px}.gmr-liquid{position:absolute;inset:-10px;z-index:0;pointer-events:none;filter:url(#gmr-goo)}.gmr-liquid span{position:absolute;display:block;background:#ccf3ec;will-change:transform}.gmr-liquid__trigger{top:10px;left:10px;width:calc(100% - 20px);height:58px;border-radius:22px}.gmr-liquid__panel{top:62px;left:10px;width:calc(100% - 20px);height:206px;border-radius:28px;opacity:0;transform:translateY(-36px) scaleY(.18) scaleX(.76);transform-origin:50% 0;transition:transform 560ms cubic-bezier(.16,1,.3,1),opacity 100ms linear 240ms}.gmr-bead{top:54px;width:34px;height:34px;border-radius:50%;opacity:0;transform:translateY(-12px) scale(.3);transition:transform 520ms cubic-bezier(.16,1,.3,1),opacity 120ms linear}.gmr-bead--one{left:58px}.gmr-bead--two{left:142px;transition-delay:34ms}.gmr-bead--three{right:54px;transition-delay:68ms}.gmr-shell[data-open=true] .gmr-liquid__panel{opacity:1;transform:translateY(0) scale(1);transition-delay:0ms}.gmr-shell[data-open=true] .gmr-bead{opacity:1;transform:translateY(21px) scale(1)}.gmr-trigger,.gmr-menu{position:relative;z-index:1;width:100%;border:1px solid rgba(24,24,27,.09);background:rgba(255,255,255,.86);box-shadow:0 18px 50px rgba(24,24,27,.09),inset 0 1px 0 rgba(255,255,255,.9);backdrop-filter:blur(18px)}.gmr-trigger{height:58px;display:grid;grid-template-columns:34px 1fr 28px;align-items:center;gap:10px;padding:0 12px;border-radius:19px;color:inherit;text-align:left;cursor:pointer;transition:border-radius 420ms cubic-bezier(.16,1,.3,1),border-color 180ms,box-shadow 180ms}.gmr-trigger:hover,.gmr-trigger:focus-visible{border-color:rgba(15,118,110,.3);box-shadow:0 18px 50px rgba(24,24,27,.1),0 0 0 3px rgba(20,184,166,.08);outline:none}.gmr-mark{width:34px;height:34px;display:flex;align-items:center;justify-content:center;gap:3px;border-radius:11px;background:#0f766e}.gmr-mark i{width:3px;height:3px;border-radius:50%;background:#fff;transition:transform 360ms cubic-bezier(.34,1.56,.64,1)}.gmr-shell[data-open=true] .gmr-mark i:first-child{transform:translateY(-3px)}.gmr-shell[data-open=true] .gmr-mark i:last-child{transform:translateY(3px)}.gmr-copy,.gmr-option>span:nth-child(2){min-width:0;display:grid;gap:2px}.gmr-copy strong,.gmr-option strong{font-size:12px;font-weight:680}.gmr-copy small,.gmr-option small{color:#71717a;font-size:10px}.gmr-chevron{justify-self:center;width:8px;height:8px;border-right:1.5px solid #52525b;border-bottom:1.5px solid #52525b;transform:translateY(-2px) rotate(45deg);transition:transform 420ms cubic-bezier(.16,1,.3,1)}.gmr-shell[data-open=true] .gmr-chevron{transform:translateY(2px) rotate(225deg)}.gmr-menu{position:absolute;top:64px;left:0;display:grid;gap:4px;padding:8px;border-radius:15px 15px 22px 22px;opacity:0;visibility:hidden;transform:translateY(-18px) scale(.94);transform-origin:50% 0;transition:opacity 160ms,transform 440ms cubic-bezier(.16,1,.3,1),visibility 0s linear 440ms}.gmr-shell[data-open=true] .gmr-menu{opacity:1;visibility:visible;transform:translateY(0) scale(1);transition-delay:120ms,80ms,0s}.gmr-option{width:100%;min-height:56px;display:grid;grid-template-columns:34px 1fr auto;align-items:center;gap:10px;padding:7px 9px;border:0;border-radius:13px;background:transparent;color:#18181b;text-align:left;cursor:pointer;transition:background 160ms}.gmr-option:hover,.gmr-option:focus-visible{background:rgba(15,118,110,.07);outline:none}.gmr-icon{width:34px;height:34px;display:grid;place-items:center;border-radius:11px;font-size:16px}.gmr-icon--mint{color:#0f766e;background:#dff7f1}.gmr-icon--violet{color:#5b4bc4;background:#eeebff}.gmr-icon--amber{color:#a15c08;background:#fff1d6}.gmr-option kbd{min-width:22px;padding:3px 5px;border:1px solid #e4e4e7;border-radius:6px;background:#fafafa;color:#71717a;font:9px/1 ui-monospace,monospace;text-align:center}.gmr-status{min-height:18px;margin:12px 4px 0;color:#71717a;font-size:10px}@media(prefers-reduced-motion:reduce){.gmr-shell,.gmr-liquid span,.gmr-trigger,.gmr-mark i,.gmr-chevron,.gmr-menu{transition-duration:.01ms!important;transition-delay:0ms!important}}
`;

export default function GooeyMorphMenu() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Click the pill or press Arrow Down.");
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    const outside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => {
      style.remove();
      document.removeEventListener("pointerdown", outside);
    };
  }, []);

  const focusItem = (index: number) => itemRefs.current[index]?.focus();

  return (
    <div className="gmr-stage">
      <svg className="gmr-defs" aria-hidden="true">
        <defs>
          <filter id="gmr-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div className="gmr-demo" ref={rootRef}>
        <p className="gmr-kicker">Workspace shortcuts</p>
        <div className="gmr-shell" data-open={open}>
          <div className="gmr-liquid" aria-hidden="true">
            <span className="gmr-liquid__trigger" /><span className="gmr-liquid__panel" />
            <span className="gmr-bead gmr-bead--one" /><span className="gmr-bead gmr-bead--two" /><span className="gmr-bead gmr-bead--three" />
          </div>
          <button ref={triggerRef} type="button" className="gmr-trigger" aria-expanded={open} aria-controls="gmr-actions" onClick={() => setOpen((value) => !value)} onKeyDown={(event) => {
            if (event.key === "ArrowDown") { event.preventDefault(); setOpen(true); window.setTimeout(() => focusItem(0), 160); }
            if (event.key === "Escape") setOpen(false);
          }}>
            <span className="gmr-mark" aria-hidden="true"><i /><i /><i /></span>
            <span className="gmr-copy"><strong>Quick create</strong><small>Choose an action</small></span>
            <span className="gmr-chevron" aria-hidden="true" />
          </button>
          <div id="gmr-actions" className="gmr-menu" role="menu" aria-hidden={!open} onKeyDown={(event) => {
            const current = itemRefs.current.indexOf(document.activeElement as HTMLButtonElement);
            if (event.key === "Escape") { event.preventDefault(); setOpen(false); triggerRef.current?.focus(); }
            if (event.key === "ArrowDown") { event.preventDefault(); focusItem((Math.max(0, current) + 1) % ACTIONS.length); }
            if (event.key === "ArrowUp") { event.preventDefault(); focusItem((current <= 0 ? ACTIONS.length : current) - 1); }
          }}>
            {ACTIONS.map((action, index) => (
              <button key={action.name} ref={(node) => { itemRefs.current[index] = node; }} className="gmr-option" type="button" role="menuitem" tabIndex={open ? 0 : -1} onClick={() => { setStatus(`${action.name} selected.`); setOpen(false); triggerRef.current?.focus(); }}>
                <span className={`gmr-icon gmr-icon--${action.tone}`} aria-hidden="true">{action.icon}</span>
                <span><strong>{action.name}</strong><small>{action.detail}</small></span><kbd>{action.key}</kbd>
              </button>
            ))}
          </div>
        </div>
        <p className="gmr-status" aria-live="polite">{status}</p>
      </div>
    </div>
  );
}
