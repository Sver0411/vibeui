import { useEffect, useState, type PointerEvent } from "react";

const STYLES = `
.ripple-button-react { position: relative; overflow: hidden; border: 0; border-radius: 10px;
  padding: 13px 30px; font-size: 14px; font-weight: 600; cursor: pointer; transition: box-shadow 0.2s ease; }
.ripple-button-react--primary { background: #26262b; color: #fafafa; }
.ripple-button-react--primary:hover { box-shadow: 0 8px 22px rgba(38, 38, 43, 0.28); }
.ripple-button-react--ghost { background: transparent; color: #26262b; box-shadow: inset 0 0 0 1px #d4d4d8; }
.ripple-button-react--ghost:hover { background: #f4f4f5; }
.ripple-react { position: absolute; border-radius: 50%; background: currentColor; opacity: 0.22;
  transform: scale(0); animation: ripple-expand-react 0.55s ease-out forwards; pointer-events: none; }
@keyframes ripple-expand-react { to { transform: scale(1); opacity: 0; } }
`;

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

let rippleId = 1;

export default function RippleButton({
  label = "Primary action",
  variant = "primary",
}: {
  label?: string;
  variant?: "primary" | "ghost";
}) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const id = rippleId++;
    setRipples((prev) => [
      ...prev,
      { id, x: event.clientX - rect.left - size / 2, y: event.clientY - rect.top - size / 2, size },
    ]);
  };

  return (
    <button
      type="button"
      className={`ripple-button-react ripple-button-react--${variant}`}
      onPointerDown={handlePointerDown}
      onAnimationEnd={() => setRipples((prev) => prev.slice(1))}
    >
      {label}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-react"
          style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
        />
      ))}
    </button>
  );
}
