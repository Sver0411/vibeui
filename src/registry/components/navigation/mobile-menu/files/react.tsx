import { useEffect, useRef, useState } from "react";

const STYLES = `
.mm-phone-react { min-height: 100vh; display: grid; place-items: center; background: #fafafa; padding: 24px;
  font-family: ui-sans-serif, system-ui, sans-serif; }
.mm-app-react { position: relative; width: min(340px, 100%); height: 560px; border-radius: 28px;
  border: 1px solid #e4e4e7; background: #ffffff; overflow: hidden; color: #18181b; box-shadow: 0 24px 70px rgba(24,24,27,0.12); }
.mm-burger-react { display: grid; gap: 4px; width: 36px; height: 36px; place-content: center; border: 0;
  border-radius: 10px; background: #f4f4f5; cursor: pointer; z-index: 3; }
.mm-burger-react span { width: 16px; height: 2px; border-radius: 2px; background: #27272a;
  transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease; }
.mm-burger-react[data-open="true"] span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.mm-burger-react[data-open="true"] span:nth-child(2) { opacity: 0; }
.mm-burger-react[data-open="true"] span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
.mm-overlay-react { position: absolute; inset: 0; z-index: 2; display: flex; flex-direction: column;
  justify-content: center; padding: 0 34px; background: rgba(255,255,255,0.97);
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.mm-nav-react { display: grid; gap: 6px; }
.mm-nav-react a { font-size: 30px; font-weight: 600; letter-spacing: -0.02em; color: #18181b;
  text-decoration: none; padding: 8px 0; border-bottom: 1px solid #ececef;
  opacity: 0; transform: translateY(16px); }
.mm-overlay-react[data-open="true"] .mm-nav-react a { animation: mm-rise-react 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
  animation-delay: calc(var(--i) * 55ms + 60ms); }
@keyframes mm-rise-react { to { opacity: 1; transform: translateY(0); } }
`;

const LINKS = ["Home", "Projects", "Journal", "About", "Contact"];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Focus management: into the menu on open, back to the burger on close.
  useEffect(() => {
    if (open) {
      overlayRef.current
        ?.querySelector<HTMLAnchorElement>(".mm-nav-react a")
        ?.focus({ preventScroll: true });
    } else {
      burgerRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="mm-phone-react">
      <div className="mm-app-react">
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px",
            borderBottom: "1px solid #ececef",
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600 }}>Overview</span>
          <button
            ref={burgerRef}
            type="button"
            className="mm-burger-react"
            data-open={open}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </header>
        <div style={{ padding: "24px 20px", display: "grid", gap: 12 }}>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#71717a" }}>
            Tap the ☰ button to open the full-screen menu.
          </p>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#71717a" }}>
            Links cascade in with staggered transitions.
          </p>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#71717a" }}>
            Esc also closes it; focus returns to the button.
          </p>
        </div>
        {open && (
          <div
            ref={overlayRef}
            className="mm-overlay-react"
            data-open="true"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <nav className="mm-nav-react" aria-label="Mobile menu">
              {LINKS.map((link, index) => (
                <a
                  key={link}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                  }}
                  style={{ ["--i" as never]: index }}
                >
                  {link}
                </a>
              ))}
            </nav>
            <p
              style={{
                position: "absolute",
                bottom: 30,
                left: 34,
                margin: 0,
                fontSize: 12,
                color: "#71717a",
              }}
            >
              hello@example.com
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
