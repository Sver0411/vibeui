import { useEffect, useRef, useState } from "react";

const STYLES = `
.pt-screen-react { position: relative; width: min(420px, 92vw); height: 240px; border: 1px solid #e4e4e7;
  border-radius: 16px; background: #ffffff; overflow: hidden; }
.pt-page-react { position: absolute; inset: 0; display: grid; place-content: center; justify-items: center;
  gap: 8px; padding: 24px; text-align: center; }
.pt-page-react.is-entering { animation: pt-enter-react 0.26s cubic-bezier(0.22,1,0.36,1); }
.pt-page-react.is-exiting { animation: pt-exit-react 0.2s ease-in forwards; }
@keyframes pt-enter-react { from { opacity: 0; transform: translateY(16px); } }
@keyframes pt-exit-react { to { opacity: 0; transform: translateY(-12px); } }
`;

const PAGES = [
  { id: "home", title: "Home", text: "Tap another tab — the current screen exits up while the next one rises in." },
  { id: "work", title: "Work", text: "The transition is timed (200ms out, 260ms in) and queued so rapid clicks never overlap." },
  { id: "about", title: "About", text: "In a real app, await your route data before playing the enter animation." },
];

export default function PageTransition() {
  const [current, setCurrent] = useState("home");
  const [exiting, setExiting] = useState<string | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const goTo = (id: string) => {
    if (id === current || busy.current) return;
    busy.current = true;
    setExiting(current);
    setTimeout(() => {
      setCurrent(id);
      setExiting(null);
      busy.current = false;
    }, 200);
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeContent: "center", gap: 18, background: "#fafafa", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <nav aria-label="Demo pages" style={{ display: "flex", justifyContent: "center", gap: 4 }}>
        {PAGES.map((page) => (
          <button
            key={page.id}
            type="button"
            data-page={page.id}
            aria-current={current === page.id ? "page" : undefined}
            onClick={() => goTo(page.id)}
            style={{ border: 0, background: current === page.id ? "#ececef" : "transparent", padding: "8px 16px",
              borderRadius: 8, fontSize: 13.5, fontWeight: 600, color: current === page.id ? "#26262b" : "#71717a", cursor: "pointer" }}
          >
            {page.title}
          </button>
        ))}
      </nav>
      <main className="pt-screen-react" aria-live="polite">
        {PAGES.map((page) => {
          const visible = page.id === current || page.id === exiting;
          if (!visible) return null;
          return (
            <section
              key={page.id}
              className={`pt-page-react ${page.id === exiting ? "is-exiting" : "is-entering"}`}
              aria-hidden={page.id === exiting}
            >
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", color: "#26262b" }}>{page.title}</h2>
              <p style={{ margin: 0, maxWidth: "34ch", fontSize: 13.5, lineHeight: 1.7, color: "#71717a" }}>{page.text}</p>
            </section>
          );
        })}
      </main>
    </div>
  );
}
