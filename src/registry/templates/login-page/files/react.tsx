import { useState, type FormEvent } from "react";

const STYLES = `
.lg-react-page { position: relative; min-height: 100vh; display: grid; place-items: center; overflow: hidden;
  background: #f7f8f6; font-family: ui-sans-serif, system-ui, sans-serif; padding: 24px 16px; }
.lg-react-blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.42; pointer-events: none; }
.lg-react-card { position: relative; width: min(360px, 100%); padding: 30px 26px 24px; border-radius: 18px;
  background: rgba(255,255,255,0.74); border: 1px solid rgba(255,255,255,0.9);
  backdrop-filter: blur(18px) saturate(1.3); -webkit-backdrop-filter: blur(18px) saturate(1.3);
  box-shadow: 0 30px 70px rgba(24,24,27,0.14); color: #18181b; }
.lg-react-input { height: 44px; width: 100%; box-sizing: border-box; padding: 0 12px; font-size: 14px;
  color: #18181b; background: rgba(255,255,255,0.78); border: 1px solid #d4d4d8;
  border-radius: 10px; outline: none; transition: border-color 0.15s ease, box-shadow 0.15s ease; }
.lg-react-input:focus { border-color: rgba(15,118,110,0.55); box-shadow: 0 0 0 3px rgba(15,118,110,0.12); }
.lg-react-input[aria-invalid="true"] { border-color: rgba(248,113,113,0.7); }
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [busy, setBusy] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      nextErrors.email = "Enter a valid email address.";
    if (password.length < 8) nextErrors.password = "Password must be at least 8 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setBusy(true);
    setErrors({});
    setTimeout(() => {
      setBusy(false);
      setErrors({ form: "Demo only — no credentials are checked. Wire this to your API." });
    }, 900);
  };

  return (
    <div className="lg-react-page">
      <div
        className="lg-react-blob"
        style={{
          width: "44vmax",
          height: "44vmax",
          left: "4%",
          top: "10%",
          background: "rgba(20,184,166,0.2)",
        }}
      />
      <div
        className="lg-react-blob"
        style={{
          width: "38vmax",
          height: "38vmax",
          right: "2%",
          bottom: "6%",
          background: "rgba(99,102,241,0.16)",
        }}
      />
      <main className="lg-react-card">
        <h1 style={{ margin: "0 0 4px", fontSize: 21, fontWeight: 700 }}>Welcome back</h1>
        <p style={{ margin: "0 0 22px", fontSize: 13, color: "#71717a" }}>
          Sign in to your workspace
        </p>
        <form onSubmit={handleSubmit} noValidate style={{ display: "grid", gap: 14 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="lg-react-email" style={{ fontSize: 12.5, fontWeight: 600 }}>
              Email
            </label>
            <input
              id="lg-react-email"
              className="lg-react-input"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              aria-invalid={Boolean(errors.email)}
              onChange={(event) => setEmail(event.target.value)}
            />
            {errors.email && (
              <p style={{ margin: 0, fontSize: 12, color: "#f87171" }}>{errors.email}</p>
            )}
          </div>
          <div style={{ display: "grid", gap: 6 }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
            >
              <label htmlFor="lg-react-password" style={{ fontSize: 12.5, fontWeight: 600 }}>
                Password
              </label>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ fontSize: 12, color: "#0f766e", textDecoration: "none" }}
              >
                Forgot?
              </a>
            </div>
            <div style={{ position: "relative" }}>
              <input
                id="lg-react-password"
                className="lg-react-input"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                aria-invalid={Boolean(errors.password)}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                aria-label={show ? "Hide password" : "Show password"}
                aria-pressed={show}
                onClick={() => setShow((v) => !v)}
                style={{
                  position: "absolute",
                  right: 6,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 32,
                  height: 32,
                  border: 0,
                  borderRadius: 8,
                  background: "transparent",
                  color: "#71717a",
                  cursor: "pointer",
                }}
              >
                {show ? "🙈" : "👁"}
              </button>
            </div>
            {errors.password && (
              <p style={{ margin: 0, fontSize: 12, color: "#f87171" }}>{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={busy}
            style={{
              height: 44,
              marginTop: 4,
              border: 0,
              borderRadius: 10,
              background: "#18181b",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
          {errors.form && (
            <p
              role="alert"
              style={{ margin: 0, fontSize: 12, textAlign: "center", color: "#0f766e" }}
            >
              {errors.form}
            </p>
          )}
        </form>
        <p style={{ margin: "20px 0 0", textAlign: "center", fontSize: 12.5, color: "#71717a" }}>
          No account?{" "}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ color: "#0f766e", textDecoration: "none", fontWeight: 600 }}
          >
            Request access
          </a>
        </p>
      </main>
    </div>
  );
}
