import { useEffect } from "react";

const STYLES = `
.gb-stage-react { position: relative; min-height: 100vh; overflow: hidden; display: grid; place-items: center;
  background: #fafafa; font-family: ui-sans-serif, system-ui, sans-serif; }
.gb-grid-react { position: absolute; inset: 0;
  background-image: linear-gradient(rgba(24,24,27,0.065) 1px, transparent 1px),
    linear-gradient(90deg, rgba(24,24,27,0.065) 1px, transparent 1px),
    radial-gradient(circle at 50% 40%, rgba(20,184,166,0.08), transparent 55%);
  background-size: 44px 44px, 44px 44px, 100% 100%;
  mask-image: radial-gradient(circle at 50% 45%, #000 30%, transparent 85%);
  -webkit-mask-image: radial-gradient(circle at 50% 45%, #000 30%, transparent 85%); }
.gb-sweep-react { position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(20,184,166,0.05) 46%, rgba(20,184,166,0.1) 50%, rgba(20,184,166,0.05) 54%, transparent 100%);
  background-size: 100% 240px; background-repeat: no-repeat; animation: gb-sweep-react 7s linear infinite; }
@keyframes gb-sweep-react { from { background-position: 0 -240px; } to { background-position: 0 calc(100% + 240px); } }
`;

export default function GridBackground() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div className="gb-stage-react">
      <div className="gb-grid-react" aria-hidden="true" />
      <div className="gb-sweep-react" aria-hidden="true" />
      <div style={{ position: "relative", textAlign: "center", padding: "0 24px" }}>
        <h1
          style={{
            margin: "0 0 10px",
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#18181b",
          }}
        >
          Build on the grid
        </h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#52525b" }}>
          Two repeating-linear-gradients draw the lines; a masked gradient sweeps across forever.
        </p>
      </div>
    </div>
  );
}
