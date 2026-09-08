import { useEffect } from "react";

const STYLES = `
.spot-stage-react { min-height: 100vh; display: grid; place-items: center; background: #fafafa; padding: 24px;
  font-family: ui-sans-serif, system-ui, sans-serif; }
.spot-grid-react { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 18px; width: min(680px, 100%); }
.spot-card-react { --spot-x: 50%; --spot-y: 50%; position: relative; border-radius: 14px; padding: 18px;
  background: #ffffff; border: 1px solid #e4e4e7; transition: border-color 0.3s ease; }
.spot-card-react::before { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: radial-gradient(240px circle at var(--spot-x) var(--spot-y), rgba(15,118,110,0.14), transparent 65%);
  opacity: 0; transition: opacity 0.3s ease; }
.spot-card-react:hover { border-color: rgba(15,118,110,0.35); }
.spot-card-react:hover::before { opacity: 1; }
.spot-card-react h3 { margin: 0; font-size: 14px; font-weight: 600; color: #18181b; }
.spot-card-react p { margin: 6px 0 0; font-size: 12.5px; line-height: 1.6; color: #71717a; }
`;

const FEATURES = [
  { title: "Real-time sync", text: "Changes propagate to every connected client in under 50 ms." },
  {
    title: "End-to-end encryption",
    text: "Keys never leave the device. Audited, open-source protocol.",
  },
  {
    title: "Granular permissions",
    text: "Share single documents or entire workspaces with per-role access.",
  },
];

export default function SpotlightCards() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const handleMove = (event: React.PointerEvent) => {
    for (const card of document.querySelectorAll<HTMLElement>(".spot-card-react")) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    }
  };

  return (
    <div className="spot-stage-react" onPointerMove={handleMove}>
      <div className="spot-grid-react">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="spot-card-react">
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
