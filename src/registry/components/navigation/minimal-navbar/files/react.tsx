import { useEffect, useRef, useState } from "react";

const STYLES = `
.mn-page-react { min-height: 100vh; background: #fafafa; font-family: ui-sans-serif, system-ui, sans-serif; }
.mn-react { position: sticky; top: 0; z-index: 5; border-bottom: 1px solid transparent;
  transition: border-color 0.25s ease, background-color 0.25s ease; }
.mn-react[data-scrolled="true"] { background: rgba(250,250,250,0.85); backdrop-filter: blur(10px); border-color: #e4e4e7; }
.mn-react__inner { display: flex; align-items: center; gap: 22px; max-width: 860px; margin: 0 auto; padding: 0 20px; height: 58px; }
.mn-react__logo { display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; color: #26262b; text-decoration: none; }
.mn-react__mark { width: 18px; height: 18px; border-radius: 6px; background: conic-gradient(from 200deg, #26262b 0 60%, #52525b 60% 100%); }
.mn-react__link { position: relative; padding: 7px 11px; font-size: 13.5px; font-weight: 500; color: #71717a;
  text-decoration: none; border-radius: 7px; transition: color 0.15s ease; background: none; border: 0; cursor: pointer; }
.mn-react__link:hover { color: #26262b; }
.mn-react__link[data-active="true"] { color: #26262b; }
.mn-react__link[data-active="true"]::after { content: ""; position: absolute; left: 11px; right: 11px; bottom: -1px;
  height: 2px; border-radius: 2px; background: #26262b; }
.mn-react__cta { font-size: 13px; font-weight: 600; color: #fafafa; background: #26262b; padding: 7px 14px;
  border-radius: 8px; text-decoration: none; border: 0; cursor: pointer; }
.mn-react__burger { display: flex; flex-direction: column; justify-content: center; gap: 5px; width: 34px; height: 34px;
  border: 1px solid #e4e4e7; border-radius: 8px; background: #ffffff; cursor: pointer; padding: 0 8px; }
.mn-react__burger span { height: 2px; border-radius: 2px; background: #26262b; transition: transform 0.25s ease; }
.mn-react__burger[aria-expanded="true"] span:first-child { transform: translateY(3.5px) rotate(45deg); }
.mn-react__burger[aria-expanded="true"] span:last-child { transform: translateY(-3.5px) rotate(-45deg); }
`;

const LINKS = ["Product", "Docs", "Pricing", "Blog"];

export default function MinimalNavbar() {
  const [active, setActive] = useState("Product");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const handleScroll = () => setScrolled((pageRef.current?.scrollTop ?? 0) > 8);

  return (
    <div ref={pageRef} onScroll={handleScroll} className="mn-page-react">
      <header className="mn-react" data-scrolled={scrolled}>
        <div className="mn-react__inner">
          <a className="mn-react__logo" href="#" onClick={(e) => e.preventDefault()}>
            <span className="mn-react__mark" aria-hidden="true" />
            Acme
          </a>
          <nav aria-label="Main" style={{ display: "flex", gap: 2 }}>
            {LINKS.map((link) => (
              <button
                key={link}
                type="button"
                className="mn-react__link"
                data-active={active === link}
                aria-current={active === link ? "page" : undefined}
                onClick={() => setActive(link)}
              >
                {link}
              </button>
            ))}
          </nav>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <button type="button" className="mn-react__cta">Get started</button>
            <button
              type="button"
              className="mn-react__burger"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span /><span />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile" style={{ padding: "8px 20px 14px", borderTop: "1px solid #f4f4f5" }}>
            {LINKS.map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => { setActive(link); setMenuOpen(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 4px", fontSize: 14,
                  fontWeight: 500, color: "#52525b", background: "none", border: 0, borderBottom: "1px solid #f4f4f5", cursor: "pointer" }}
              >
                {link}
              </button>
            ))}
          </nav>
        )}
      </header>
      <main style={{ maxWidth: 640, margin: "0 auto", padding: "40px 20px 80px", display: "grid", gap: 18 }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#52525b" }}>Scroll the page — the navbar gains a blurred border.</p>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#52525b" }}>The active link carries an underline that follows clicks.</p>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#52525b" }}>The burger is a real button with aria-expanded state.</p>
      </main>
    </div>
  );
}
