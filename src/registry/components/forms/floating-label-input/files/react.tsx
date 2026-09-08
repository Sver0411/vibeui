import { useEffect, useId, useState } from "react";

const STYLES = `
.fl-field-react { position: relative; }
.fl-input-react { width: 100%; box-sizing: border-box; height: 54px; padding: 20px 14px 6px;
  font-size: 14.5px; color: #26262b; background: #ffffff; border: 1px solid #d4d4d8; border-radius: 10px;
  outline: none; transition: border-color 0.15s ease, box-shadow 0.15s ease; }
.fl-input-react:hover { border-color: #a1a1aa; }
.fl-input-react:focus { border-color: #0f766e; box-shadow: 0 0 0 3px rgba(15,118,110,0.14); }
.fl-label-react { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 14px;
  color: #71717a; pointer-events: none; transition: top 0.16s ease, font-size 0.16s ease, color 0.16s ease; padding: 0 3px; }
.fl-input-react:focus + .fl-label-react, .fl-input-react:not(:placeholder-shown) + .fl-label-react {
  top: 0; font-size: 11px; font-weight: 600; }
.fl-input-react:focus + .fl-label-react { color: #0f766e; }
`;

export default function FloatingLabelInput({
  label = "Email address",
  type = "email",
}: {
  label?: string;
  type?: string;
}) {
  const id = useId();
  const [value, setValue] = useState("");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div className="fl-field-react">
      <input
        id={id}
        type={type}
        className="fl-input-react"
        placeholder=" "
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <label htmlFor={id} className="fl-label-react">
        {label}
      </label>
    </div>
  );
}
