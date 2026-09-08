import { useEffect, useRef } from "react";

const STYLES = `
.sr-stage-react { min-height: 100vh; overflow-y: auto; background: #fafafa; font-family: ui-sans-serif, system-ui, sans-serif; }
.sr-card-react { --d: 0; opacity: 0; transform: translateY(18px);
  transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1);
  transition-delay: calc(var(--d) * 70ms); padding: 18px; border: 1px solid #e4e4e7;
  border-radius: 13px; background: #ffffff; }
.sr-card-react.is-visible { opacity: 1; transform: none; }
.sr-card-react h3 { margin: 0 0 7px; font-size: 14.5px; font-weight: 600; color: #26262b; }
.sr-card-react p { margin: 0; font-size: 13px; line-height: 1.65; color: #71717a; }
`;

const CARDS = [
  { title: "Observation, not scroll events", text: "IntersectionObserver fires only when needed — no scroll listener thrash." },
  { title: "One class to animate", text: "The observer adds .is-visible; CSS owns the transition entirely." },
  { title: "Unobserve after reveal", text: "Once shown, the observer releases the element — zero ongoing cost." },
  { title: "Stagger via --d", text: "A custom property delays each card by 70ms for a cascade feel." },
  { title: "Respects reduced motion", text: "With prefers-reduced-motion, everything is simply visible." },
  { title: "Works in any layout", text: "Grids, lists, articles — the observer does not care about CSS." },
];

export default function ScrollReveal() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => {
    const cards = stageRef.current?.querySelectorAll<HTMLElement>(".sr-card-react") ?? [];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => card.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.25 },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stageRef} className="sr-stage-react">
      <header style={{ padding: "64px 24px 26px", textAlign: "center" }}>
        <h1 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", color: "#26262b" }}>Scroll down</h1>
        <p style={{ margin: 0, fontSize: 14, color: "#71717a" }}>Each card reveals as it enters the viewport — once.</p>
      </header>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, maxWidth: 760, margin: "0 auto", padding: "10px 24px 80px" }}>
        {CARDS.map((card, index) => (
          <div key={card.title} className="sr-card-react" style={{ ["--d" as never]: index }}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
