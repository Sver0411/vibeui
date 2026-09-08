import { useEffect, useRef } from "react";

const STYLES = `
.kptr-stage{min-height:100vh;display:grid;place-items:center;overflow:hidden;background:#fafafa;color:#18181b;font-family:Inter,ui-sans-serif,system-ui,sans-serif}.kptr-demo{width:min(420px,100vw);padding:18px 0 14px}.kptr-heading,.kptr-footer{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;padding:0 18px}.kptr-heading p,.kptr-footer p{margin:0 0 4px;color:#71717a;font-size:8px;font-weight:650;letter-spacing:.12em;text-transform:uppercase}.kptr-heading h2{margin:0;font-size:18px;letter-spacing:-.04em}.kptr-readout{display:grid;grid-template-columns:34px auto;align-items:center;gap:7px;color:#a1a1aa;font:8px/1 ui-monospace,monospace}.kptr-readout i{width:34px;height:2px;border-radius:999px;background:#0f766e;transform:scaleX(.26);transform-origin:left;transition:transform 120ms linear}.kptr-canvas{position:relative;height:246px;margin:6px 0 2px;overflow:hidden;cursor:ew-resize;touch-action:pan-y}.kptr-canvas:before{content:"";position:absolute;inset:18px 0;background:radial-gradient(circle at 22% 28%,rgba(20,184,166,.11),transparent 25%),radial-gradient(circle at 78% 72%,rgba(99,102,241,.09),transparent 25%);filter:blur(18px)}.kptr-canvas svg{position:relative;display:block;width:100%;height:100%;overflow:visible}.kptr-guide{fill:none;stroke:rgba(24,24,27,.08);stroke-width:1;stroke-dasharray:3 5}.kptr-text{fill:#18181b;font-size:22px;font-weight:760;letter-spacing:-.035em}.kptr-text--b{fill:#0f766e;font-size:18px;letter-spacing:.02em}.kptr-text--c{fill:#5b4bc4;font-size:20px;font-weight:620}.kptr-footer{align-items:center}.kptr-footer p{margin:0;letter-spacing:.06em}.kptr-footer button{padding:5px 0;border:0;border-bottom:1px solid #a1a1aa;background:transparent;color:#27272a;font-size:9px;font-weight:650;cursor:pointer}.kptr-footer button:focus-visible{outline:3px solid rgba(15,118,110,.16);outline-offset:4px;border-radius:2px}@media(prefers-reduced-motion:reduce){.kptr-canvas{cursor:default}.kptr-readout i{transition:none}}
`;

export default function KineticPathText() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);
  const guideRefs = useRef<Array<SVGPathElement | null>>([]);
  const textRefs = useRef<Array<SVGTextPathElement | null>>([]);
  const meterRef = useRef<HTMLElement>(null);
  const reverseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    const canvas = canvasRef.current, meter = meterRef.current, reverse = reverseRef.current;
    if (!canvas || !meter || !reverse) return () => style.remove();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const bases = [68, 128, 190], offsets = [-120, -250, -60], factors = [1, -.74, .88];
    let direction = 1, velocity = .42, impulse = 0, bend = 0, targetBend = 0, lastX: number | null = null, lastTime = 0, raf = 0, paused = false;
    const makePath = (index: number, amount: number) => { const y = bases[index], sign = index === 1 ? -1 : 1; return `M-90 ${y} C70 ${y - 38 * sign - amount * 30},260 ${y + 44 * sign + amount * 42},510 ${y - 12 * sign - amount * 18}`; };
    const draw = () => {
      pathRefs.current.forEach((path, index) => { if (!path) return; const d = makePath(index, bend * (index === 1 ? -.72 : 1)); path.setAttribute("d", d); guideRefs.current[index]?.setAttribute("d", d); });
      textRefs.current.forEach((text, index) => text?.setAttribute("startOffset", `${offsets[index]}px`));
      meter.style.transform = `scaleX(${Math.min(1, .2 + Math.abs(velocity) / 2.7)})`;
    };
    const loop = () => {
      if (!paused) {
        impulse *= .9; velocity += (direction * .42 + impulse - velocity) * .085; bend += (targetBend - bend) * .075;
        offsets.forEach((value, index) => { let next = value - velocity * factors[index]; if (next < -420) next += 340; if (next > -40) next -= 340; offsets[index] = next; }); draw();
      }
      raf = requestAnimationFrame(loop);
    };
    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (lastX !== null) impulse = Math.max(-2.2, Math.min(2.2, ((event.clientX - lastX) / Math.max(8, now - lastTime)) * 5.4));
      const rect = canvas.getBoundingClientRect(); targetBend = ((event.clientY - rect.top) / rect.height - .5) * 2; lastX = event.clientX; lastTime = now;
    };
    const onLeave = () => { lastX = null; targetBend = 0; };
    const onReverse = () => { direction *= -1; impulse += direction * .8; };
    const onAtlas = (event: Event) => { paused = Boolean((event as CustomEvent<{ paused?: boolean }>).detail?.paused); };
    const onVisibility = () => { paused = document.hidden; };
    canvas.addEventListener("pointermove", onMove); canvas.addEventListener("pointerleave", onLeave); reverse.addEventListener("click", onReverse);
    document.addEventListener("atlas:visibility", onAtlas); document.addEventListener("visibilitychange", onVisibility);
    draw(); if (!reduceMotion.matches) raf = requestAnimationFrame(loop);
    return () => { style.remove(); cancelAnimationFrame(raf); canvas.removeEventListener("pointermove", onMove); canvas.removeEventListener("pointerleave", onLeave); reverse.removeEventListener("click", onReverse); document.removeEventListener("atlas:visibility", onAtlas); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  const ribbon = "FORM FOLLOWS MOTION · FORM FOLLOWS MOTION · FORM FOLLOWS MOTION · FORM FOLLOWS MOTION · ";
  const current = "CONTROL THE CURRENT · CONTROL THE CURRENT · CONTROL THE CURRENT · CONTROL THE CURRENT · ";
  const momentum = "TYPE WITH MOMENTUM · TYPE WITH MOMENTUM · TYPE WITH MOMENTUM · TYPE WITH MOMENTUM · ";

  return <div className="kptr-stage"><section className="kptr-demo" aria-labelledby="kptr-title">
    <header className="kptr-heading"><div><p>Kinetic typography</p><h2 id="kptr-title">Momentum follows intent.</h2></div><span className="kptr-readout"><i ref={meterRef} /> velocity</span></header>
    <div className="kptr-canvas" ref={canvasRef}><svg viewBox="0 0 420 246" role="img" aria-labelledby="kptr-svg-title kptr-svg-desc"><title id="kptr-svg-title">Three moving text ribbons</title><desc id="kptr-svg-desc">Repeated words follow curved paths and respond to pointer speed.</desc><defs>
      {["a", "b", "c"].map((id, index) => <path key={id} ref={(node) => { pathRefs.current[index] = node; }} id={`kptr-path-${id}`} d={["M-90 72 C70 30 260 112 510 56", "M-90 132 C80 184 270 72 510 142", "M-90 194 C100 146 280 236 510 184"][index]} />)}
    </defs>
    {["M-90 72 C70 30 260 112 510 56", "M-90 132 C80 184 270 72 510 142", "M-90 194 C100 146 280 236 510 184"].map((d, index) => <path key={d} ref={(node) => { guideRefs.current[index] = node; }} className="kptr-guide" d={d} />)}
    {[ribbon, current, momentum].map((text, index) => <text key={text} className={`kptr-text kptr-text--${["a", "b", "c"][index]}`}><textPath ref={(node) => { textRefs.current[index] = node; }} href={`#kptr-path-${["a", "b", "c"][index]}`} startOffset={`${[-120, -250, -60][index]}px`}>{text}</textPath></text>)}
    </svg></div>
    <footer className="kptr-footer"><p>Move quickly to accelerate · move vertically to bend</p><button ref={reverseRef} type="button">Reverse</button></footer>
  </section></div>;
}
