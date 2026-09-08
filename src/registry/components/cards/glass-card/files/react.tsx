import { useEffect } from "react";

const STYLES = `
.glass-stage-react { position: relative; min-height: 100vh; display: grid; place-items: center; overflow: hidden;
  background: #f7faf9; font-family: ui-sans-serif, system-ui, sans-serif; padding: 20px; }
.glass-aurora-react { position: absolute; inset: -20%; filter: blur(60px) saturate(1.2); opacity: 0.52; }
.glass-aurora-react > div { position: absolute; border-radius: 50%; }
.glass-aurora-react .a { width: 45vmax; height: 45vmax; left: 8%; top: 12%; background: rgba(20,184,166,0.24);
  animation: glass-drift-a-react 26s ease-in-out infinite alternate; }
.glass-aurora-react .b { width: 38vmax; height: 38vmax; right: 5%; top: 30%; background: rgba(99,102,241,0.18);
  animation: glass-drift-b-react 32s ease-in-out infinite alternate; }
.glass-aurora-react .c { width: 30vmax; height: 30vmax; left: 35%; bottom: 5%; background: rgba(244,114,182,0.14);
  animation: glass-drift-c-react 38s ease-in-out infinite alternate; }
@keyframes glass-drift-a-react { to { transform: translate(9vmax, 6vmax) scale(1.12); } }
@keyframes glass-drift-b-react { to { transform: translate(-8vmax, -5vmax) scale(0.92); } }
@keyframes glass-drift-c-react { to { transform: translate(6vmax, -7vmax) scale(1.08); } }
.glass-card-react { position: relative; width: min(320px, 88vw); padding: 28px; border-radius: 20px;
  background: rgba(255,255,255,0.62); border: 1px solid rgba(255,255,255,0.85); color: #18181b;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.92), 0 24px 60px rgba(24,24,27,0.14);
  backdrop-filter: blur(18px) saturate(1.4); -webkit-backdrop-filter: blur(18px) saturate(1.4);
  display: grid; gap: 10px; }
.glass-card-react__icon { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px;
  background: rgba(255,255,255,0.72); border: 1px solid rgba(24,24,27,0.08); color: #0f766e; }
`;

export default function GlassCard() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div className="glass-stage-react">
      <div className="glass-aurora-react" aria-hidden="true">
        <div className="a" />
        <div className="b" />
        <div className="c" />
      </div>
      <article className="glass-card-react">
        <div className="glass-card-react__icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: 19, height: 19 }}
          >
            <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
          </svg>
        </div>
        <h3 style={{ margin: "4px 0 0", fontSize: 18, fontWeight: 600 }}>Instant performance</h3>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#52525b" }}>
          Server-side rendering with streaming and edge caching keeps every route under 100&nbsp;ms.
        </p>
      </article>
    </div>
  );
}
