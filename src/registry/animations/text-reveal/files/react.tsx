import { useEffect } from "react";

const STYLES = `
.tr-stage-react { min-height: 100vh; display: grid; place-content: center; justify-items: center; gap: 30px;
  background: #fafafa; font-family: ui-sans-serif, system-ui, sans-serif; padding: 20px; }
.tr-headline-react { margin: 0; display: flex; flex-wrap: wrap; gap: 0 0.28em; max-width: 16ch;
  font-size: clamp(30px, 6vw, 52px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.08; color: #18181b; }
.tr-word-react { display: inline-block; overflow: hidden; padding-bottom: 0.08em; margin-bottom: -0.08em; }
.tr-word-react > span { display: inline-block; transform: translateY(110%);
  animation: tr-rise-react 0.7s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: calc(var(--i) * 90ms + 120ms); }
@keyframes tr-rise-react { to { transform: translateY(0); } }
`;

const WORDS = ["Design", "once,", "reuse", "everywhere."];

export default function TextReveal() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const replay = () => {
    document.querySelectorAll<HTMLElement>(".tr-word-react > span").forEach((span) => {
      span.style.animation = "none";
      void span.offsetWidth;
      span.style.animation = "";
    });
  };

  return (
    <div className="tr-stage-react">
      <h1 className="tr-headline-react">
        {WORDS.map((word, index) => (
          <span key={word + index} className="tr-word-react" style={{ ["--i" as never]: index }}>
            <span>{word}</span>
          </span>
        ))}
      </h1>
      <button
        type="button"
        onClick={replay}
        style={{
          border: "1px solid #d4d4d8",
          borderRadius: 999,
          background: "#ffffff",
          color: "#52525b",
          fontSize: 12.5,
          fontWeight: 600,
          padding: "8px 18px",
          cursor: "pointer",
        }}
      >
        Replay
      </button>
    </div>
  );
}
