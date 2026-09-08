import { useEffect, useState } from "react";

const STYLES = `
.pf-react { width: min(280px, 90vw); display: grid; justify-items: center; gap: 4px; padding: 28px 24px 24px;
  border: 1px solid #e4e4e7; border-radius: 18px; background: #ffffff; text-align: center;
  font-family: ui-sans-serif, system-ui, sans-serif; }
.pf-react__avatar { display: grid; place-items: center; width: 76px; height: 76px; border-radius: 50%; padding: 3px;
  background: conic-gradient(from 210deg, #0f766e, #14b8a6, #5eead4, #0f766e); margin-bottom: 10px; }
.pf-react__avatar span { display: grid; place-items: center; width: 100%; height: 100%; border-radius: 50%;
  border: 3px solid #ffffff; background: #26262b; color: #fafafa; font-size: 20px; font-weight: 700; }
.pf-react__follow { width: 100%; margin-top: 10px; border: 0; border-radius: 10px; background: #26262b;
  color: #fafafa; font-size: 13.5px; font-weight: 600; padding: 11px 0; cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease; }
.pf-react__follow[aria-pressed="true"] { background: rgba(15,118,110,0.12); color: #0f766e;
  box-shadow: inset 0 0 0 1px rgba(15,118,110,0.35); }
`;

export default function ProfileCard({
  name = "Maya Krishnan",
  role = "Design Engineer · Accessibility",
  initials = "MK",
  bio = "Builds interfaces that are fast, legible and kind to keyboards.",
}: {
  name?: string;
  role?: string;
  initials?: string;
  bio?: string;
}) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f4f4f5", padding: 20 }}>
      <article className="pf-react">
        <div className="pf-react__avatar" aria-hidden="true"><span>{initials}</span></div>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#26262b" }}>{name}</h3>
        <p style={{ margin: 0, fontSize: 12.5, color: "#0f766e", fontWeight: 500 }}>{role}</p>
        <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.65, color: "#71717a" }}>{bio}</p>
        <dl style={{ display: "flex", gap: 26, margin: "16px 0 4px", padding: 0 }}>
          {[
            ["Projects", "24"],
            ["Followers", (1208 + (following ? 1 : 0)).toLocaleString("en-US")],
            ["Following", "312"],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "grid", gap: 2 }}>
              <dt style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.07em", color: "#a1a1aa" }}>{label}</dt>
              <dd style={{ margin: 0, fontSize: 15, fontWeight: 700, fontVariantNumeric: "tabular-nums", color: "#26262b" }}>{value}</dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          className="pf-react__follow"
          aria-pressed={following}
          onClick={() => setFollowing((v) => !v)}
        >
          {following ? "Following ✓" : "Follow"}
        </button>
      </article>
    </div>
  );
}
