import { useEffect, useRef, useState } from "react";

const STYLES = `
.sp-react { height: 100%; overflow-y: auto; background: #fafafa; color: #26262b;
  font-family: ui-sans-serif, system-ui, sans-serif; position: relative; }
.sp-react__bar { position: sticky; top: 0; height: 4px; background: #e4e4e7; }
.sp-react__fill { height: 100%; background: linear-gradient(90deg, #0f766e, #14b8a6);
  border-radius: 0 999px 999px 0; }
.sp-react__content { padding: 26px 26px 40px; display: grid; gap: 16px; }
.sp-react__content p { margin: 0; font-size: 14px; line-height: 1.75; color: #52525b; max-width: 60ch; }
`;

const PARAGRAPHS = [
  "Scroll this box — the bar at the top fills according to how far through the content you are.",
  "The component listens to scroll events on its own container, computes scrollTop / (scrollHeight - clientHeight) and updates a width.",
  "Passive listeners plus requestAnimationFrame throttling keep the update cheap even on long pages.",
  "Because the bar is driven by scroll position, it is fully deterministic — scroll back and it empties again.",
  "Mark it aria-hidden: it is decorative, since scroll position is already exposed to assistive technology.",
  "Keep scrolling…",
  "Almost done.",
  "Complete — the bar reads 100%.",
];

export default function ScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = container.scrollHeight - container.clientHeight;
      setProgress(max > 0 ? container.scrollTop / max : 0);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="sp-react">
      <div className="sp-react__bar" aria-hidden="true">
        <div className="sp-react__fill" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="sp-react__content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h1 style={{ margin: 0, fontSize: 19, fontWeight: 600 }}>Reading progress</h1>
          <span style={{ fontSize: 13, fontVariantNumeric: "tabular-nums", color: "#71717a" }}>
            {Math.round(progress * 100)}%
          </span>
        </div>
        {PARAGRAPHS.map((text) => (
          <p key={text.slice(0, 24)}>{text}</p>
        ))}
      </div>
    </div>
  );
}
