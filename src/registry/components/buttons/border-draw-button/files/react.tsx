import { useEffect } from "react";

const STYLES = `
.draw-button-react { position: relative; border: 0; background: transparent; color: #26262b;
  font-size: 15px; font-weight: 600; padding: 14px 32px; cursor: pointer; }
.draw-button-react svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.draw-button-react rect { fill: none; stroke: #26262b; stroke-width: 1.5; stroke-dasharray: 100; stroke-dashoffset: 100;
  transition: stroke-dashoffset 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
.draw-button-react:hover rect, .draw-button-react:focus-visible rect { stroke-dashoffset: 0; }
`;

export default function BorderDrawButton({ label = "Read the docs" }: { label?: string }) {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <button type="button" className="draw-button-react">
      <svg aria-hidden="true">
        {/* pathLength=100 normalizes the perimeter so dash math is trivial */}
        <rect x="1" y="1" rx="10" ry="10" pathLength={100} style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }} />
      </svg>
      <span>{label}</span>
    </button>
  );
}
