import { useEffect, useRef } from "react";

const STYLES = `
.tilt-react-stage { min-height: 100vh; display: grid; place-items: center;
  background: radial-gradient(circle at 50% 25%, #ffffff, #f4f4f5 72%); perspective: 900px;
  font-family: ui-sans-serif, system-ui, sans-serif; }
.tilt-react { position: relative; width: min(320px, 86vw); border-radius: 18px;
  background: linear-gradient(150deg, #ffffff, #f7f7f8); border: 1px solid #e4e4e7;
  padding: 26px; color: #18181b; transform-style: preserve-3d; will-change: transform;
  transition: transform 0.16s ease-out, box-shadow 0.25s ease; box-shadow: 0 24px 50px rgba(24,24,27,0.14); }
.tilt-react__glare { position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0; transition: opacity 0.25s ease;
  background: radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(20,184,166,0.16), transparent 55%); }
.tilt-react:hover .tilt-react__glare { opacity: 1; }
.tilt-react__content { display: grid; gap: 10px; transform: translateZ(28px); }
.tilt-react__badge { justify-self: start; font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
  padding: 4px 9px; border-radius: 999px; background: rgba(15,118,110,0.1); color: #0f766e; }
.tilt-react__title { margin: 0; font-size: 19px; font-weight: 600; }
.tilt-react__text { margin: 0; font-size: 13px; line-height: 1.65; color: #52525b; }
`;

const MAX_TILT = 10;

export default function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const handleMove = (event: React.PointerEvent) => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(hover: none)").matches) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    card.style.transform = `rotateX(${((0.5 - py) * 2 * MAX_TILT).toFixed(2)}deg) rotateY(${((px - 0.5) * 2 * MAX_TILT).toFixed(2)}deg)`;
    card.style.setProperty("--glare-x", `${(px * 100).toFixed(1)}%`);
    card.style.setProperty("--glare-y", `${(py * 100).toFixed(1)}%`);
  };

  return (
    <div className="tilt-react-stage">
      <div
        ref={cardRef}
        className="tilt-react"
        onPointerMove={handleMove}
        onPointerLeave={() => {
          if (cardRef.current) cardRef.current.style.transform = "";
        }}
      >
        <div className="tilt-react__glare" aria-hidden="true" />
        <div className="tilt-react__content">
          <span className="tilt-react__badge">3D</span>
          <h3 className="tilt-react__title">Perspective Tilt</h3>
          <p className="tilt-react__text">
            Move your cursor across the card. RotateX / RotateY are driven by pointer position with
            a soft transition.
          </p>
        </div>
      </div>
    </div>
  );
}
