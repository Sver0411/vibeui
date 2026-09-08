import { useEffect, useRef } from "react";

const STYLES = `
.pdrr-stage{min-height:100vh;display:grid;place-items:center;overflow:hidden;background:#fafafa;color:#18181b;font-family:Inter,ui-sans-serif,system-ui,sans-serif}.pdrr-demo{width:min(372px,calc(100vw - 28px))}.pdrr-frame{position:relative;aspect-ratio:16/10;overflow:hidden;border:1px solid rgba(24,24,27,.08);border-radius:22px;background:#eef8f5;box-shadow:0 26px 60px rgba(24,24,27,.1),inset 0 1px 0 rgba(255,255,255,.72);cursor:crosshair}.pdrr-canvas{display:block;width:100%;height:100%}.pdrr-label{position:absolute;inset:18px;display:flex;flex-direction:column;justify-content:space-between;pointer-events:none;mix-blend-mode:multiply}.pdrr-label span{align-self:flex-start;padding:5px 8px;border:1px solid rgba(24,24,27,.08);border-radius:999px;background:rgba(255,255,255,.48);color:#52525b;font:8px/1 ui-monospace,monospace;letter-spacing:.04em;backdrop-filter:blur(8px)}.pdrr-label strong{max-width:260px;font-size:clamp(24px,8vw,36px);line-height:.94;letter-spacing:-.055em}.pdrr-pointer{position:absolute;left:50%;top:50%;width:28px;height:28px;border:1px solid rgba(24,24,27,.28);border-radius:50%;opacity:0;transform:translate(-50%,-50%) scale(.7);pointer-events:none;transition:opacity 160ms,transform 260ms cubic-bezier(.16,1,.3,1)}.pdrr-frame[data-pointer=true] .pdrr-pointer{opacity:1;transform:translate(-50%,-50%) scale(1)}.pdrr-footer{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:11px 4px 0}.pdrr-footer p{margin:0;color:#71717a;font-size:9px}.pdrr-footer button{padding:5px 0;border:0;border-bottom:1px solid #a1a1aa;background:transparent;color:#27272a;font-size:9px;font-weight:650;cursor:pointer}.pdrr-footer button:focus-visible{outline:3px solid rgba(15,118,110,.16);outline-offset:4px;border-radius:2px}@media(prefers-reduced-motion:reduce){.pdrr-pointer{display:none}}
`;

export default function PixelDissolveReveal() {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<HTMLSpanElement>(null);
  const replayRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const pointer = pointerRef.current;
    const replay = replayRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!frame || !canvas || !pointer || !replay || !context) return () => style.remove();

    const CELL = 6;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1, height = 1, dpr = 1, raf = 0, paused = false;
    let startTime = performance.now(), pointerActive = false, pointerX = 0, pointerY = 0;
    let noise: Float32Array = new Float32Array();
    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
    const smoothstep = (a: number, b: number, value: number) => { const x = clamp((value - a) / (b - a), 0, 1); return x * x * (3 - 2 * x); };
    const hash = (x: number, y: number) => { const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return value - Math.floor(value); };

    const rebuildNoise = () => {
      const columns = Math.ceil(width / CELL), rows = Math.ceil(height / CELL);
      noise = new Float32Array(columns * rows);
      for (let y = 0; y < rows; y += 1) for (let x = 0; x < columns; x += 1) noise[y * columns + x] = hash(x, y);
    };
    const colorA = (x: number, y: number) => `hsl(${166 + Math.sin(y * .02) * 12} 34% ${92 + (Math.sin(x * .024) * 9 + Math.cos(y * .031) * 6) * .22}%)`;
    const colorB = (x: number, y: number) => `hsl(${252 + ((x + y) / Math.max(1, width + height)) * 72 + Math.sin(y * .035) * 18} 62% ${79 + Math.sin(x * .018 + y * .026) * 7}%)`;

    const draw = (time: number) => {
      const columns = Math.ceil(width / CELL), rows = Math.ceil(height / CELL);
      const cycle = ((Math.max(0, time - startTime) % 5200) / 5200);
      const pingPong = cycle < .5 ? cycle * 2 : 2 - cycle * 2;
      const autoFront = -90 + pingPong * (width + height + 180);
      const radius = Math.max(width, height) * .42;
      context.save(); context.setTransform(dpr, 0, 0, dpr, 0, 0); context.fillStyle = "#eef8f5"; context.fillRect(0, 0, width, height);
      for (let row = 0; row < rows; row += 1) for (let column = 0; column < columns; column += 1) {
        const x = column * CELL, y = row * CELL, grain = noise[row * columns + column];
        context.fillStyle = colorA(x, y); context.fillRect(x, y, CELL + .45, CELL + .45);
        const reveal = pointerActive
          ? smoothstep(30, -24, Math.hypot(x + CELL / 2 - pointerX, y + CELL / 2 - pointerY) - radius + (grain - .5) * 76)
          : smoothstep(-34, 34, autoFront - (x + y) + (grain - .5) * 94);
        if (reveal > .02) {
          const edge = 1 - Math.abs(reveal * 2 - 1), inset = edge * (1 - grain) * 2.2;
          context.globalAlpha = clamp(reveal * 1.25, 0, 1); context.fillStyle = colorB(x, y);
          context.fillRect(x + inset, y + inset, CELL + .45 - inset * 2, CELL + .45 - inset * 2); context.globalAlpha = 1;
        }
      }
      context.restore();
    };
    const loop = (time: number) => { if (!paused) draw(time); raf = requestAnimationFrame(loop); };
    const resize = () => {
      const rect = frame.getBoundingClientRect(); width = Math.max(1, Math.round(rect.width)); height = Math.max(1, Math.round(rect.height)); dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); rebuildNoise(); draw(performance.now());
    };
    const onMove = (event: PointerEvent) => {
      const rect = frame.getBoundingClientRect(); pointerActive = true; pointerX = event.clientX - rect.left; pointerY = event.clientY - rect.top;
      frame.dataset.pointer = "true"; pointer.style.left = `${pointerX}px`; pointer.style.top = `${pointerY}px`; if (reduceMotion.matches) draw(performance.now());
    };
    const onLeave = () => { pointerActive = false; frame.dataset.pointer = "false"; if (reduceMotion.matches) draw(performance.now()); };
    const onReplay = () => { startTime = performance.now(); pointerActive = false; frame.dataset.pointer = "false"; draw(startTime); };
    const onAtlas = (event: Event) => { paused = Boolean((event as CustomEvent<{ paused?: boolean }>).detail?.paused); };
    const onVisibility = () => { paused = document.hidden; };
    const observer = new ResizeObserver(resize); observer.observe(frame);
    frame.addEventListener("pointermove", onMove); frame.addEventListener("pointerleave", onLeave); replay.addEventListener("click", onReplay);
    document.addEventListener("atlas:visibility", onAtlas); document.addEventListener("visibilitychange", onVisibility);
    resize(); if (!reduceMotion.matches) raf = requestAnimationFrame(loop);
    return () => { style.remove(); cancelAnimationFrame(raf); observer.disconnect(); frame.removeEventListener("pointermove", onMove); frame.removeEventListener("pointerleave", onLeave); replay.removeEventListener("click", onReplay); document.removeEventListener("atlas:visibility", onAtlas); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  return <div className="pdrr-stage"><section className="pdrr-demo" aria-labelledby="pdrr-title">
    <div className="pdrr-frame" ref={frameRef}><canvas ref={canvasRef} className="pdrr-canvas" aria-hidden="true" /><div className="pdrr-label"><span>Noise threshold / 06px</span><strong id="pdrr-title">Two states,<br />one moving edge.</strong></div><span ref={pointerRef} className="pdrr-pointer" aria-hidden="true" /></div>
    <footer className="pdrr-footer"><p>Move across the surface to steer the dissolve.</p><button ref={replayRef} type="button">Replay</button></footer>
  </section></div>;
}
