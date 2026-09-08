import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { theme: "mineral", eyebrow: "01 / Form", title: "Mineral Bloom", copy: "Layered mineral forms shaped by pressure, quiet color and a sharp editorial crop." },
  { theme: "signal", eyebrow: "02 / Motion", title: "Soft Signal", copy: "A signal map translated into translucent bands, calibrated rhythm and restrained depth." },
  { theme: "orbit", eyebrow: "03 / System", title: "Open Orbit", copy: "Circular systems and measured negative space become a compact identity for spatial products." },
];

const STYLES = `
.slgr-stage{min-height:100vh;display:grid;place-items:center;overflow:hidden;background:linear-gradient(rgba(24,24,27,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(24,24,27,.035) 1px,transparent 1px),#fafafa;background-size:32px 32px;color:#18181b;font-family:Inter,ui-sans-serif,system-ui,sans-serif}.slgr-demo{width:min(410px,calc(100vw - 24px));padding:18px}.slgr-heading{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:14px}.slgr-heading p,.slgr-card small,.slgr-index{margin:0 0 3px;color:#71717a;font-size:8px;font-weight:650;letter-spacing:.12em;text-transform:uppercase}.slgr-heading h2{margin:0;font-size:19px;letter-spacing:-.04em}.slgr-heading>span{color:#a1a1aa;font:9px/1 ui-monospace,monospace}.slgr-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.slgr-card{min-width:0;padding:0;border:0;background:transparent;color:inherit;text-align:left;cursor:pointer}.slgr-card__visual{width:100%;height:132px;margin-bottom:8px;transition:transform 320ms cubic-bezier(.16,1,.3,1),box-shadow 320ms}.slgr-card:hover .slgr-card__visual{transform:translateY(-3px);box-shadow:0 18px 36px rgba(24,24,27,.13)}.slgr-card:focus-visible{outline:none}.slgr-card:focus-visible .slgr-card__visual{box-shadow:0 0 0 3px rgba(15,118,110,.22),0 18px 36px rgba(24,24,27,.12)}.slgr-card>span:last-child{display:grid;gap:1px;padding:0 2px}.slgr-card small{margin:0;font-size:7px}.slgr-card strong{overflow:hidden;font-size:10px;font-weight:650;text-overflow:ellipsis;white-space:nowrap}.slgr-visual{position:relative;display:block;overflow:hidden;border:1px solid rgba(24,24,27,.08);border-radius:15px;background:#eef8f5;box-shadow:inset 0 1px 0 rgba(255,255,255,.72)}.slgr-visual i{position:absolute;display:block}.slgr-visual--mineral{background:linear-gradient(145deg,#effaf6,#d9eee8)}.slgr-visual--mineral i:first-child{width:78%;height:58%;left:12%;top:16%;border-radius:58% 42% 52% 48%/42% 52% 48% 58%;background:linear-gradient(135deg,#98d7cb,#e7faf5);transform:rotate(-10deg);box-shadow:0 14px 24px rgba(15,118,110,.13)}.slgr-visual--mineral i:nth-child(2){width:52%;height:42%;right:5%;bottom:8%;border-radius:44% 56% 60% 40%;background:linear-gradient(145deg,rgba(255,255,255,.8),#bce0d7);transform:rotate(18deg)}.slgr-visual--mineral i:last-child{width:17px;height:17px;left:17%;bottom:14%;border:1px solid rgba(15,118,110,.34);border-radius:50%}.slgr-visual--signal{background:linear-gradient(150deg,#f3f1ff,#e8e4fa)}.slgr-visual--signal i{left:-12%;width:124%;height:30px;border:1px solid rgba(91,75,196,.2);border-radius:50%;transform:rotate(-9deg)}.slgr-visual--signal i:first-child{top:16%;background:rgba(126,112,220,.16)}.slgr-visual--signal i:nth-child(2){top:40%;background:rgba(255,255,255,.46)}.slgr-visual--signal i:last-child{top:64%;background:rgba(91,75,196,.14)}.slgr-visual--orbit{background:linear-gradient(145deg,#fff5e5,#f6e9d0)}.slgr-visual--orbit i:first-child{width:72px;height:72px;left:50%;top:18%;border:1px solid rgba(161,92,8,.28);border-radius:50%;transform:translateX(-50%)}.slgr-visual--orbit i:nth-child(2){width:36px;height:36px;left:50%;top:31%;border-radius:50%;background:linear-gradient(145deg,#f2c783,#fff8e9);transform:translateX(-50%);box-shadow:0 12px 25px rgba(161,92,8,.18)}.slgr-visual--orbit i:last-child{width:9px;height:9px;right:16%;top:44%;border-radius:50%;background:#d49a44}.slgr-overlay{position:fixed;inset:0;z-index:60;display:grid;place-items:center;padding:18px;background:rgba(250,250,250,.88);backdrop-filter:blur(12px);opacity:0;transition:opacity 260ms}.slgr-overlay[data-visible=true]{opacity:1}.slgr-dialog{position:relative;width:min(356px,100%);padding:10px;border:1px solid rgba(24,24,27,.08);border-radius:24px;background:rgba(255,255,255,.88);box-shadow:0 34px 80px rgba(24,24,27,.16)}.slgr-dialog__visual{width:100%;height:148px;border-radius:17px;visibility:hidden}.slgr-copy{padding:13px 8px 6px;opacity:0;transform:translateY(8px);transition:opacity 240ms,transform 360ms cubic-bezier(.16,1,.3,1)}.slgr-dialog[data-ready=true] .slgr-copy{opacity:1;transform:translateY(0)}.slgr-dialog[data-ready=true] .slgr-dialog__visual{visibility:visible}.slgr-dialog h3{margin:0;font-size:20px;letter-spacing:-.04em}.slgr-description{margin:7px 0 12px;color:#71717a;font-size:10px;line-height:1.55}.slgr-action{padding:0;border:0;background:transparent;color:#0f766e;font-size:10px;font-weight:650;cursor:pointer}.slgr-close{position:absolute;right:18px;top:18px;z-index:3;width:28px;height:28px;border:1px solid rgba(24,24,27,.09);border-radius:50%;background:rgba(255,255,255,.84);color:#27272a;font-size:17px;line-height:1;cursor:pointer;box-shadow:0 8px 24px rgba(24,24,27,.1)}.slgr-close:focus-visible,.slgr-action:focus-visible{outline:3px solid rgba(15,118,110,.2);outline-offset:2px}.slgr-flight{position:fixed!important;z-index:100;margin:0!important;pointer-events:none;transform-origin:0 0;will-change:transform}@media(max-width:360px){.slgr-demo{padding-inline:10px}.slgr-grid{gap:6px}.slgr-card__visual{height:118px}}@media(prefers-reduced-motion:reduce){.slgr-card__visual,.slgr-overlay,.slgr-copy{transition-duration:.01ms!important}}
`;

function Visual({ theme, className = "" }: { theme: string; className?: string }) {
  return <span className={`${className} slgr-visual slgr-visual--${theme}`} aria-hidden="true"><i /><i /><i /></span>;
}

export default function SharedLayoutGallery() {
  const [active, setActive] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const sourceRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const targetRef = useRef<HTMLSpanElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const actionRef = useRef<HTMLButtonElement>(null);
  const animating = useRef(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const createFlight = async (source: HTMLElement, first: DOMRect, last: DOMRect, reverse: boolean) => {
    const flight = source.cloneNode(true) as HTMLElement;
    flight.classList.add("slgr-flight");
    Object.assign(flight.style, { left: `${last.left}px`, top: `${last.top}px`, width: `${last.width}px`, height: `${last.height}px` });
    document.body.appendChild(flight);
    const inverted = `translate(${first.left - last.left}px,${first.top - last.top}px) scale(${first.width / last.width},${first.height / last.height})`;
    const frames = reverse ? [{ transform: "none" }, { transform: inverted }] : [{ transform: inverted }, { transform: "none" }];
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 560;
    await flight.animate(frames, { duration, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" }).finished.catch(() => undefined);
    flight.remove();
  };

  const open = async (index: number) => {
    if (animating.current || !sourceRefs.current[index]) return;
    animating.current = true;
    const source = sourceRefs.current[index]!;
    const first = source.getBoundingClientRect();
    setActive(index); setVisible(false); setReady(false);
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    if (!targetRef.current) { animating.current = false; return; }
    const last = targetRef.current.getBoundingClientRect();
    source.style.visibility = "hidden";
    setVisible(true);
    await createFlight(source, first, last, false);
    setReady(true);
    closeRef.current?.focus();
    animating.current = false;
  };

  const close = async () => {
    if (active === null || animating.current || !targetRef.current || !sourceRefs.current[active]) return;
    animating.current = true;
    const source = sourceRefs.current[active]!;
    const first = source.getBoundingClientRect();
    const last = targetRef.current.getBoundingClientRect();
    setReady(false);
    await createFlight(targetRef.current, first, last, true);
    setVisible(false);
    source.style.visibility = "visible";
    await new Promise((resolve) => window.setTimeout(resolve, 220));
    const previous = active;
    setActive(null);
    cardRefs.current[previous]?.focus();
    animating.current = false;
  };

  const item = active === null ? null : ITEMS[active];

  return <div className="slgr-stage">
    <section className="slgr-demo" aria-labelledby="slgr-title">
      <header className="slgr-heading"><div><p>Shared geometry</p><h2 id="slgr-title">Material studies</h2></div><span>FLIP · 03</span></header>
      <div className="slgr-grid">{ITEMS.map((entry, index) => <button key={entry.title} ref={(node) => { cardRefs.current[index] = node; }} className="slgr-card" type="button" onClick={() => void open(index)}>
        <span ref={(node) => { sourceRefs.current[index] = node; }} className={`slgr-card__visual slgr-visual slgr-visual--${entry.theme}`} aria-hidden="true"><i /><i /><i /></span>
        <span><small>{entry.eyebrow}</small><strong>{entry.title}</strong></span>
      </button>)}</div>
    </section>
    {item && <div className="slgr-overlay" data-visible={visible} role="dialog" aria-modal="true" aria-labelledby="slgr-dialog-title" onPointerDown={(event) => { if (event.target === event.currentTarget) void close(); }} onKeyDown={(event) => {
      if (event.key === "Escape") { event.preventDefault(); void close(); }
      if (event.key === "Tab" && !event.shiftKey && document.activeElement === actionRef.current) { event.preventDefault(); closeRef.current?.focus(); }
      if (event.key === "Tab" && event.shiftKey && document.activeElement === closeRef.current) { event.preventDefault(); actionRef.current?.focus(); }
    }}>
      <div className="slgr-dialog" data-ready={ready}>
        <button ref={closeRef} className="slgr-close" type="button" aria-label="Close detail" onClick={() => void close()}>×</button>
        <span ref={targetRef} className={`slgr-dialog__visual slgr-visual slgr-visual--${item.theme}`} aria-hidden="true"><i /><i /><i /></span>
        <div className="slgr-copy"><p className="slgr-index">Study {String((active ?? 0) + 1).padStart(2, "0")}</p><h3 id="slgr-dialog-title">{item.title}</h3><p className="slgr-description">{item.copy}</p><button ref={actionRef} className="slgr-action" type="button">View system <span aria-hidden="true">↗</span></button></div>
      </div>
    </div>}
  </div>;
}
