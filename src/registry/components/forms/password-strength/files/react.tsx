import { useEffect, useState } from "react";

const STYLES = `
.ps-react { width: min(330px, 90vw); display: grid; gap: 8px; font-family: ui-sans-serif, system-ui, sans-serif; }
.ps-input-react { width: 100%; box-sizing: border-box; height: 46px; padding: 0 62px 0 13px; font-size: 14px;
  color: #26262b; border: 1px solid #d4d4d8; border-radius: 10px; background: #ffffff; outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease; }
.ps-input-react:focus { border-color: #26262b; box-shadow: 0 0 0 3px rgba(38,38,43,0.1); }
.ps-toggle-react { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); border: 0;
  background: transparent; color: #71717a; font-size: 12px; font-weight: 600; padding: 6px 8px;
  border-radius: 7px; cursor: pointer; }
.ps-toggle-react:hover { color: #26262b; background: #f4f4f5; }
.ps-meter-track-react { height: 4px; border-radius: 999px; background: #e4e4e7; overflow: hidden; }
.ps-meter-fill-react { height: 100%; border-radius: inherit; transition: width 0.25s ease, background-color 0.25s ease; }
.ps-rules-react { list-style: none; margin: 2px 0 0; padding: 0; display: grid;
  grid-template-columns: 1fr 1fr; gap: 4px 10px; }
.ps-rules-react li { font-size: 11.5px; color: #a1a1aa; display: flex; align-items: center; gap: 5px;
  transition: color 0.2s ease; }
.ps-rules-react li::before { content: ""; width: 11px; height: 11px; border-radius: 50%;
  border: 1.5px solid #d4d4d8; flex-shrink: 0; transition: background-color 0.2s ease, border-color 0.2s ease; }
.ps-rules-react li[data-met="true"] { color: #15803d; }
.ps-rules-react li[data-met="true"]::before { border-color: #15803d; background: #15803d;
  box-shadow: inset 0 0 0 2px #ffffff; }
`;

const LEVELS: Array<[string, string, string]> = [
  ["0", "Enter a password", "#a1a1aa"],
  ["1", "Weak", "#b3261e"],
  ["2", "Fair", "#b45309"],
  ["3", "Good", "#0f766e"],
  ["4", "Strong", "#15803d"],
];

const RULES: Array<[string, string, (value: string) => boolean]> = [
  ["length", "12+ characters", (v) => v.length >= 12],
  ["case", "Upper & lowercase", (v) => /[a-z]/.test(v) && /[A-Z]/.test(v)],
  ["number", "A number", (v) => /\d/.test(v)],
  ["symbol", "A symbol", (v) => /[^A-Za-z0-9]/.test(v)],
];

export default function PasswordStrength() {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const passed = RULES.filter(([, , check]) => check(value)).length;
  const [, text, color] = value.length === 0 ? LEVELS[0] : LEVELS[passed];

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#fafafa" }}>
      <div className="ps-react">
        <label style={{ fontSize: 13, fontWeight: 600, color: "#26262b" }} htmlFor="ps-react-input">
          Create password
        </label>
        <div style={{ position: "relative" }}>
          <input
            id="ps-react-input"
            type={show ? "text" : "password"}
            className="ps-input-react"
            placeholder="At least 12 characters"
            autoComplete="new-password"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <button
            type="button"
            className="ps-toggle-react"
            aria-pressed={show}
            onClick={() => setShow((v) => !v)}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
        <div role="status" aria-label="Password strength" style={{ display: "grid", gap: 5 }}>
          <div className="ps-meter-track-react">
            <div
              className="ps-meter-fill-react"
              style={{ width: `${value.length === 0 ? 0 : (passed / 4) * 100}%`, background: color }}
            />
          </div>
          <span style={{ fontSize: 11.5, fontWeight: 600, color }}>{text}</span>
        </div>
        <ul className="ps-rules-react">
          {RULES.map(([id, label, check]) => (
            <li key={id} data-met={check(value)}>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
