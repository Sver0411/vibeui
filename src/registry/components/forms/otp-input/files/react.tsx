import { useEffect, useRef, useState } from "react";

const STYLES = `
.otp-box-react { width: 46px; height: 54px; text-align: center; font-size: 22px; font-weight: 600;
  font-variant-numeric: tabular-nums; color: #26262b; background: #ffffff; border: 1px solid #d4d4d8;
  border-radius: 11px; outline: none; caret-color: #0f766e;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease; }
.otp-box-react:focus { border-color: #0f766e; box-shadow: 0 0 0 3px rgba(15,118,110,0.15); }
.otp-box-react[data-filled="true"] { border-color: #a1a1aa; background: #f9f9fa; }
`;

const LENGTH = 6;
const CODE = "123456";

export default function OtpInput() {
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [status, setStatus] = useState<{ text: string; state: "" | "success" | "error" }>({
    text: "",
    state: "",
  });
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const verifyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => {
      style.remove();
      if (verifyTimerRef.current) clearTimeout(verifyTimerRef.current);
    };
  }, []);

  const verify = (code: string) => {
    if (verifyTimerRef.current) clearTimeout(verifyTimerRef.current);
    setStatus({ text: "Verifying…", state: "" });
    verifyTimerRef.current = setTimeout(() => {
      if (code === CODE) {
        setStatus({ text: "Verified ✓", state: "success" });
      } else {
        setStatus({ text: "Invalid code — try 123456 in this demo.", state: "error" });
        setDigits(Array(LENGTH).fill(""));
        refs.current[0]?.focus();
      }
    }, 500);
  };

  const setDigit = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    if (digit && index < LENGTH - 1) refs.current[index + 1]?.focus();
    const code = next.join("");
    if (code.length === LENGTH && !code.includes("")) {
      verify(code);
    } else {
      setStatus({ text: "", state: "" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#fafafa",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <form
        style={{ display: "grid", justifyItems: "center", gap: 6 }}
        onSubmit={(e) => e.preventDefault()}
      >
        <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "#26262b" }}>
          Enter verification code
        </p>
        <p style={{ margin: "0 0 18px", fontSize: 13, color: "#71717a" }}>
          We sent a 6-digit code to your email.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {digits.map((digit, index) => (
            <div key={index} style={{ display: "contents" }}>
              {index === 3 && (
                <span
                  aria-hidden="true"
                  style={{ width: 10, height: 2, borderRadius: 2, background: "#d4d4d8" }}
                />
              )}
              <input
                ref={(el) => {
                  refs.current[index] = el;
                }}
                className="otp-box-react"
                data-filled={digit !== ""}
                type="text"
                inputMode="numeric"
                maxLength={1}
                aria-label={`Digit ${index + 1}`}
                value={digit}
                onChange={(event) => setDigit(index, event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && !digits[index] && index > 0) {
                    event.preventDefault();
                    const next = [...digits];
                    next[index - 1] = "";
                    setDigits(next);
                    refs.current[index - 1]?.focus();
                  } else if (event.key === "ArrowLeft" && index > 0) {
                    refs.current[index - 1]?.focus();
                  } else if (event.key === "ArrowRight" && index < LENGTH - 1) {
                    refs.current[index + 1]?.focus();
                  }
                }}
                onPaste={(event) => {
                  event.preventDefault();
                  const pasted = event.clipboardData
                    .getData("text")
                    .replace(/\D/g, "")
                    .slice(0, LENGTH);
                  if (!pasted) return;
                  const next = Array(LENGTH).fill("");
                  pasted.split("").forEach((d, offset) => (next[offset] = d));
                  setDigits(next);
                  refs.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
                  if (pasted.length === LENGTH) verify(next.join(""));
                }}
              />
            </div>
          ))}
        </div>
        <p
          role="status"
          aria-live="polite"
          style={{
            margin: "10px 0 0",
            fontSize: 12.5,
            minHeight: "1.2em",
            color:
              status.state === "error"
                ? "#b3261e"
                : status.state === "success"
                  ? "#15803d"
                  : "#71717a",
            fontWeight: status.state ? 600 : 400,
          }}
        >
          {status.text}
        </p>
      </form>
    </div>
  );
}
