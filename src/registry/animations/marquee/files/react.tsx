import { useEffect } from "react";

const STYLES = `
.mq-stage-react { min-height: 100vh; display: grid; place-content: center; gap: 18px; background: #fafafa;
  font-family: ui-sans-serif, system-ui, sans-serif; overflow: hidden; }
.mq-react { width: min(560px, 92vw); overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); }
.mq-react__track { display: flex; gap: 44px; width: max-content; padding-right: 44px;
  animation: mq-scroll-react 22s linear infinite; }
.mq-react:hover .mq-react__track { animation-play-state: paused; }
@keyframes mq-scroll-react { to { transform: translate3d(-50%, 0, 0); } }
.mq-react__item { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #b9b9c2; white-space: nowrap; }
`;

const BRANDS = ["Nimbus", "Fjord", "Kite Labs", "Atlas Co", "Hearth", "Vector"];

export default function Marquee() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div className="mq-stage-react">
      <p style={{ margin: "0 0 -8px", textAlign: "center", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#a1a1aa" }}>
        Trusted by teams at
      </p>
      <div className="mq-react" role="marquee" aria-label="Company names">
        <div className="mq-react__track">
          {[...BRANDS, ...BRANDS].map((brand, index) => (
            <span key={brand + index} className="mq-react__item" aria-hidden={index >= BRANDS.length}>
              {brand}
            </span>
          ))}
        </div>
      </div>
      <p style={{ margin: 0, textAlign: "center", fontSize: 12.5, color: "#a1a1aa" }}>Hover to pause.</p>
    </div>
  );
}
