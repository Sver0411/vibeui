import { useEffect, useRef, useState } from "react";

type Particle = { x: number; y: number; px: number; py: number; vx: number; vy: number; life: number; tint: number };

const STYLES = `
.pffr-stage{min-height:100vh;display:grid;place-items:center;overflow:hidden;background:#fafafa;color:#18181b;font-family:Inter,ui-sans-serif,system-ui,sans-serif}.pffr-demo{width:min(378px,calc(100vw - 28px))}.pffr-frame{position:relative;aspect-ratio:16/10;overflow:hidden;border:1px solid rgba(24,24,27,.08);border-radius:22px;background:#f8fbfa;box-shadow:0 26px 60px rgba(24,24,27,.1),inset 0 1px 0 rgba(255,255,255,.76);cursor:crosshair}.pffr-canvas{display:block;width:100%;height:100%}.pffr-heading{position:absolute;inset:17px 18px auto;display:flex;align-items:flex-start;justify-content:space-between;gap:18px;pointer-events:none}.pffr-heading span,.pffr-legend,.pffr-footer p{color:#71717a;font-size:8px;font-weight:650;letter-spacing:.1em;text-transform:uppercase}.pffr-heading h2{max-width:250px;margin:5px 0 0;font-size:25px;line-height:.98;letter-spacing:-.05em}.pffr-heading i{width:10px;height:10px;margin-top:3px;border-radius:50%;background:#0f766e;box-shadow:0 0 0 7px rgba(15,118,110,.08);transition:background 240ms,box-shadow 240ms}.pffr-frame[data-mode=charged] .pffr-heading i{background:#5b4bc4;box-shadow:0 0 0 7px rgba(91,75,196,.1),0 0 24px rgba(91,75,196,.34)}.pffr-legend{position:absolute;left:18px;bottom:14px;display:flex;align-items:center;gap:7px;letter-spacing:.05em;pointer-events:none}.pffr-legend b{width:24px;height:1px;background:linear-gradient(90deg,#0f766e,#6d5bd0)}.pffr-footer{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:11px 4px 0}.pffr-footer p{margin:0;letter-spacing:.04em;text-transform:none}.pffr-footer button{padding:5px 0;border:0;border-bottom:1px solid #a1a1aa;background:transparent;color:#27272a;font-size:9px;font-weight:650;cursor:pointer}.pffr-footer button:focus-visible{outline:3px solid rgba(15,118,110,.16);outline-offset:4px;border-radius:2px}@media(prefers-reduced-motion:reduce){.pffr-frame{cursor:default}}
`;

export default function ParticleFlowField() {
  const [charged, setCharged] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const applyModeRef = useRef<(next: boolean) => void>();

  useEffect(() => {
    const style = document.createElement("style"); style.textContent = STYLES; document.head.appendChild(style);
    const frame = frameRef.current, canvas = canvasRef.current, context = canvas?.getContext("2d", { alpha: false });
    if (!frame || !canvas || !context) return () => style.remove();
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1, height = 1, dpr = 1, mode = false, paused = false, raf = 0, frameCount = 0;
    let particles: Particle[] = [];
    const pointer = { x: 0, y: 0, active: false };
    const budget = () => Math.round((mode ? 210 : 132) * Math.max(.7, Math.min(1.15, (width * height) / (378 * 236))));
    const reset = (particle: Partial<Particle>, randomLife: boolean) => {
      particle.x = Math.random() * width; particle.y = Math.random() * height; particle.px = particle.x; particle.py = particle.y; particle.vx = 0; particle.vy = 0;
      particle.life = randomLife ? Math.random() * 180 : 150 + Math.random() * 90; particle.tint ??= Math.random();
    };
    const rebuild = () => { particles = Array.from({ length: budget() }, () => { const particle: Partial<Particle> = {}; reset(particle, true); return particle as Particle; }); };
    const angleAt = (x: number, y: number, time: number) => Math.sin(x * .012 + time * .00028) * 1.28 + Math.cos(y * .015 - time * .00023) * 1.04 + Math.sin((x + y) * .006) * .58;
    const advance = (particle: Particle, time: number, drawLine: boolean) => {
      particle.px = particle.x; particle.py = particle.y; const angle = angleAt(particle.x, particle.y, time), force = mode ? .54 : .36;
      particle.vx = particle.vx * .91 + Math.cos(angle) * force; particle.vy = particle.vy * .91 + Math.sin(angle) * force;
      if (pointer.active) { const dx = particle.x - pointer.x, dy = particle.y - pointer.y, distance = Math.max(12, Math.hypot(dx, dy)); if (distance < 140) { const influence = (1 - distance / 140) * (mode ? 1.15 : .72); particle.vx += (-dy / distance) * influence; particle.vy += (dx / distance) * influence; } }
      particle.x += particle.vx; particle.y += particle.vy; particle.life -= 1;
      if (particle.x < -12 || particle.x > width + 12 || particle.y < -12 || particle.y > height + 12 || particle.life <= 0) { reset(particle, false); return; }
      if (drawLine) { context.beginPath(); context.moveTo(particle.px, particle.py); context.lineTo(particle.x, particle.y); context.strokeStyle = `hsla(${164 + particle.tint * 104},54%,${mode ? 42 : 36}%,${mode ? .34 : .24})`; context.lineWidth = mode ? .9 : .72; context.stroke(); }
    };
    const clear = (full: boolean) => { context.save(); context.setTransform(dpr, 0, 0, dpr, 0, 0); context.fillStyle = full ? "#f8fbfa" : mode ? "rgba(248,251,250,.055)" : "rgba(248,251,250,.082)"; context.fillRect(0, 0, width, height); context.restore(); };
    const draw = (time: number) => { frameCount += 1; clear(frameCount % 620 === 0); context.save(); context.setTransform(dpr, 0, 0, dpr, 0, 0); particles.forEach((particle) => advance(particle, time, true)); context.restore(); };
    const drawStatic = () => { clear(true); context.save(); context.setTransform(dpr, 0, 0, dpr, 0, 0); for (let step = 0; step < 46; step += 1) particles.forEach((particle) => advance(particle, step * 20, step > 2)); context.restore(); };
    const loop = (time: number) => { if (!paused) draw(time); raf = requestAnimationFrame(loop); };
    const resize = () => { const rect = frame.getBoundingClientRect(); width = Math.max(1, Math.round(rect.width)); height = Math.max(1, Math.round(rect.height)); dpr = Math.min(devicePixelRatio || 1, 1.5); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); rebuild(); reduceMotion.matches ? drawStatic() : clear(true); };
    const onMove = (event: PointerEvent) => { const rect = frame.getBoundingClientRect(); pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top; pointer.active = true; };
    const onLeave = () => { pointer.active = false; };
    const onAtlas = (event: Event) => { paused = Boolean((event as CustomEvent<{ paused?: boolean }>).detail?.paused); };
    const onVisibility = () => { paused = document.hidden; };
    applyModeRef.current = (next) => { mode = next; rebuild(); clear(true); if (reduceMotion.matches) drawStatic(); };
    const observer = new ResizeObserver(resize); observer.observe(frame); frame.addEventListener("pointermove", onMove); frame.addEventListener("pointerleave", onLeave); document.addEventListener("atlas:visibility", onAtlas); document.addEventListener("visibilitychange", onVisibility);
    resize(); if (!reduceMotion.matches) raf = requestAnimationFrame(loop);
    return () => { style.remove(); applyModeRef.current = undefined; cancelAnimationFrame(raf); observer.disconnect(); frame.removeEventListener("pointermove", onMove); frame.removeEventListener("pointerleave", onLeave); document.removeEventListener("atlas:visibility", onAtlas); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  return <div className="pffr-stage"><section className="pffr-demo" aria-labelledby="pffr-title">
    <div ref={frameRef} className="pffr-frame" data-mode={charged ? "charged" : "calm"}><canvas ref={canvasRef} className="pffr-canvas" aria-hidden="true" /><header className="pffr-heading"><div><span>Generative field / Canvas 2D</span><h2 id="pffr-title">Threads find the current.</h2></div><i aria-hidden="true" /></header><div className="pffr-legend" aria-hidden="true"><span>flow</span><b /><span>pointer vortex</span></div></div>
    <footer className="pffr-footer"><p>Move the pointer to bend the local field.</p><button type="button" aria-pressed={charged} onClick={() => setCharged((value) => { const next = !value; applyModeRef.current?.(next); return next; })}>{charged ? "Calm field" : "Charge field"}</button></footer>
  </section></div>;
}
