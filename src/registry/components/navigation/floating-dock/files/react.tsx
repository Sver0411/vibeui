import { useEffect, useRef, useState } from "react";

const STYLES = `
.fd-stage-react { min-height: 100vh; display: grid; place-content: center; justify-items: center; gap: 44px;
  background: radial-gradient(60vmax 40vmax at 50% -10%, rgba(20,184,166,0.12), transparent), #fafafa;
  font-family: ui-sans-serif, system-ui, sans-serif; }
.fd-react { display: flex; align-items: flex-end; gap: 8px; padding: 10px 14px; border-radius: 20px;
  border: 1px solid rgba(24,24,27,0.08); background: rgba(255,255,255,0.82);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 20px 50px rgba(24,24,27,0.13); }
.fd-react__item { position: relative; width: 46px; height: 46px; border: 0; padding: 0; border-radius: 13px;
  background: transparent; cursor: pointer; transform-origin: bottom center;
  transform: scale(calc(1 + var(--magnify, 0) * 0.35)) translateY(calc(var(--magnify, 0) * -8px));
  transition: transform 0.12s ease-out; }
.fd-react__glyph { display: block; width: 100%; height: 100%; border-radius: inherit;
  background: linear-gradient(160deg, var(--c1), var(--c2));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), 0 8px 18px rgba(24,24,27,0.16); }
.fd-react__item[data-active="true"]::after { content: ""; position: absolute; bottom: -7px; left: 50%;
  transform: translateX(-50%); width: 4px; height: 4px; border-radius: 50%; background: #18181b; }
.fd-react__item::before { content: attr(data-tip); position: absolute; bottom: calc(100% + 12px); left: 50%;
  transform: translateX(-50%) translateY(4px); padding: 5px 10px; border-radius: 8px; background: #ffffff;
  border: 1px solid #e4e4e7; box-shadow: 0 8px 24px rgba(24,24,27,0.12); color: #27272a; font-size: 11.5px; font-weight: 500; white-space: nowrap; opacity: 0; pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease; }
.fd-react__item:hover::before, .fd-react__item:focus-visible::before { opacity: 1; transform: translateX(-50%) translateY(0); }
`;

const APPS = [
  { label: "Finder", c1: "#8ab4ff", c2: "#3b6fe0" },
  { label: "Messages", c1: "#7ce8b0", c2: "#18a558" },
  { label: "Photos", c1: "#ffd27c", c2: "#f09a3e" },
  { label: "Music", c1: "#ff9db4", c2: "#e0447a" },
  { label: "Calendar", c1: "#c4b5fd", c2: "#7c5ce0" },
  { label: "Settings", c1: "#b9c0cc", c2: "#6b7280" },
];

const RADIUS = 110;

export default function FloatingDock() {
  const dockRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState("Photos");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const handleMove = (event: React.PointerEvent) => {
    if (window.matchMedia("(hover: none)").matches || !dockRef.current) return;
    for (const item of dockRef.current.querySelectorAll<HTMLElement>(".fd-react__item")) {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(event.clientX - (rect.left + rect.width / 2));
      item.style.setProperty("--magnify", Math.max(0, 1 - distance / RADIUS).toFixed(3));
    }
  };

  return (
    <div className="fd-stage-react">
      <p style={{ margin: 0, fontSize: 13, color: "#71717a" }}>
        Hover the dock — icons scale by distance to the cursor.
      </p>
      <nav
        ref={dockRef}
        className="fd-react"
        aria-label="Applications"
        onPointerMove={handleMove}
        onPointerLeave={() => {
          dockRef.current
            ?.querySelectorAll<HTMLElement>(".fd-react__item")
            .forEach((item) => item.style.setProperty("--magnify", "0"));
        }}
      >
        {APPS.map((app) => (
          <button
            key={app.label}
            type="button"
            className="fd-react__item"
            data-tip={app.label}
            aria-label={app.label}
            data-active={active === app.label}
            onClick={() => setActive(app.label)}
          >
            <span
              className="fd-react__glyph"
              style={{ ["--c1" as never]: app.c1, ["--c2" as never]: app.c2 }}
            />
          </button>
        ))}
      </nav>
    </div>
  );
}
