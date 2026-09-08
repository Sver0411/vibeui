import { useEffect, useRef } from "react";

const STYLES = `
.cg-stage-react { --cg-x: 50%; --cg-y: 40%; position: relative; min-height: 100vh; overflow: hidden;
  display: grid; place-items: center; background: #fafafa; font-family: ui-sans-serif, system-ui, sans-serif; }
.cg-glow-react { position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(340px circle at var(--cg-x) var(--cg-y), rgba(20,184,166,0.2), rgba(20,184,166,0.07) 40%, transparent 70%); }
`;

export default function CursorGlow() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const handleMove = (event: React.PointerEvent) => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(hover: none)").matches) return;
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty("--cg-x", `${event.clientX - rect.left}px`);
    stage.style.setProperty("--cg-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={stageRef} className="cg-stage-react" onPointerMove={handleMove}>
      <div className="cg-glow-react" aria-hidden="true" />
      <div
        style={{ position: "relative", maxWidth: "40ch", textAlign: "center", padding: "0 24px" }}
      >
        <h1
          style={{
            margin: "0 0 10px",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#18181b",
          }}
        >
          Move your cursor
        </h1>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#52525b" }}>
          The light is a radial-gradient positioned with CSS variables — cheap, smooth and
          GPU-friendly.
        </p>
      </div>
    </div>
  );
}
