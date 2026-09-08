import { useEffect } from "react";

const STYLES = `
.ab-stage-react { position: relative; min-height: 100vh; overflow: hidden; display: grid; place-items: center;
  background: #fafafa; font-family: ui-sans-serif, system-ui, sans-serif; }
.ab-aurora-react { position: absolute; inset: -30%; filter: blur(70px) saturate(1.25); opacity: 0.55; }
.ab-blob-react { position: absolute; border-radius: 50%; will-change: transform; }
.ab-blob-react.a { width: 46vmax; height: 46vmax; left: 6%; top: 8%;
  background: radial-gradient(circle at 30% 30%, rgba(20,184,166,0.32), rgba(20,184,166,0.08) 70%);
  animation: ab-drift-a-react 24s ease-in-out infinite alternate; }
.ab-blob-react.b { width: 40vmax; height: 40vmax; right: 2%; top: 26%;
  background: radial-gradient(circle at 60% 40%, rgba(129,140,248,0.28), rgba(129,140,248,0.07) 70%);
  animation: ab-drift-b-react 30s ease-in-out infinite alternate; }
.ab-blob-react.c { width: 34vmax; height: 34vmax; left: 30%; bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(244,114,182,0.22), rgba(244,114,182,0.05) 70%);
  animation: ab-drift-c-react 36s ease-in-out infinite alternate; }
@keyframes ab-drift-a-react { to { transform: translate(10vmax, 7vmax) scale(1.15); } }
@keyframes ab-drift-b-react { to { transform: translate(-9vmax, -6vmax) scale(0.9); } }
@keyframes ab-drift-c-react { to { transform: translate(7vmax, -8vmax) scale(1.1); } }
`;

export default function AuroraBackground() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div className="ab-stage-react">
      <div className="ab-aurora-react" aria-hidden="true">
        <div className="ab-blob-react a" />
        <div className="ab-blob-react b" />
        <div className="ab-blob-react c" />
      </div>
      <div style={{ position: "relative", textAlign: "center", padding: "0 24px" }}>
        <h1
          style={{
            margin: "0 0 10px",
            fontSize: "clamp(30px, 6vw, 46px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#18181b",
          }}
        >
          Quiet software
        </h1>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: "#52525b" }}>
          Interfaces that feel calm, focused and alive — without shouting.
        </p>
      </div>
    </div>
  );
}
