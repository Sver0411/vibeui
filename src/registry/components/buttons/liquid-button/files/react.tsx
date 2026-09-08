import { useEffect, useRef, useState } from "react";

const STYLES = `
.liquid-button-react {
  --liquid: #0f766e;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid rgba(15, 118, 110, 0.25);
  border-radius: 999px;
  background: #ffffff;
  padding: 14px 34px;
  font-size: 15px;
  font-weight: 600;
  color: var(--liquid);
  cursor: pointer;
  transition: color 0.45s ease, border-color 0.45s ease, transform 0.18s ease;
}
.liquid-button-react::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 105%;
  left: -25%;
  width: 150%;
  aspect-ratio: 1;
  border-radius: 42%;
  background: var(--liquid);
  animation: liquid-spin-react 7s linear infinite;
  transition: top 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.liquid-button-react:hover { color: #ffffff; border-color: var(--liquid); }
.liquid-button-react:hover::before { top: -25%; }
.liquid-button-react:active { transform: scale(0.97); }
.liquid-button-react > span { position: relative; }
@keyframes liquid-spin-react { to { transform: rotate(360deg); } }
`;

export default function LiquidButton({ label = "Get started" }: { label?: string }) {
  const [hovered, setHovered] = useState(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  // Inject the styles once, wherever this component is used.
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => style.remove();
  }, []);

  return (
    <button
      type="button"
      className="liquid-button-react"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hovered={hovered}
    >
      <span>{label}</span>
    </button>
  );
}
