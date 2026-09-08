import { useEffect, useState } from "react";

const STYLES = `
.msf-react { width: min(380px, 92vw); padding: 26px 24px 22px; border: 1px solid #e4e4e7; border-radius: 16px;
  background: #ffffff; overflow: hidden; font-family: ui-sans-serif, system-ui, sans-serif; }
.msf-react__panel { display: grid; gap: 16px; animation: msf-slide-react 0.3s cubic-bezier(0.22,1,0.36,1); }
.msf-react__panel[data-direction="back"] { animation-name: msf-slide-back-react; }
@keyframes msf-slide-react { from { opacity: 0; transform: translateX(24px); } }
@keyframes msf-slide-back-react { from { opacity: 0; transform: translateX(-24px); } }
.msf-react__field { display: grid; gap: 6px; }
.msf-react__field label { font-size: 13px; font-weight: 600; color: #26262b; }
.msf-react__field input, .msf-react__field select { height: 44px; padding: 0 12px; font-size: 14px;
  color: #26262b; border: 1px solid #d4d4d8; border-radius: 9px; background: #ffffff; outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease; }
.msf-react__field input:focus, .msf-react__field select:focus { border-color: #0f766e;
  box-shadow: 0 0 0 3px rgba(15,118,110,0.13); }
.msf-react__field input[aria-invalid="true"], .msf-react__field select[aria-invalid="true"] { border-color: #b3261e; }
.msf-react__error { margin: 0; min-height: 1em; font-size: 12px; color: #b3261e; }
`;

const STEP_NAMES = ["Account", "Workspace", "Review"];

interface Values {
  name: string;
  email: string;
  company: string;
  size: string;
}

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [values, setValues] = useState<Values>({ name: "", email: "", company: "", size: "" });
  const [errors, setErrors] = useState<Partial<Values>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const validate = (target: number): boolean => {
    const nextErrors: Partial<Values> = {};
    if (target >= 1) {
      if (values.name.trim().length < 2) nextErrors.name = "Please enter your full name.";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) nextErrors.email = "Enter a valid email address.";
    }
    if (target >= 2) {
      if (values.company.trim().length < 2) nextErrors.company = "Please enter your company.";
      if (!values.size) nextErrors.size = "Select a team size.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goTo = (target: number) => {
    setDirection(target > step ? "forward" : "back");
    setStep(target);
  };

  const handleNext = () => {
    if (!validate(step)) return;
    if (step < 3) {
      goTo(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const field = (key: keyof Values, label: string, input: React.ReactNode) => (
    <div className="msf-react__field">
      <label htmlFor={`msf-${key}`}>{label}</label>
      {input}
      <p className="msf-react__error">{errors[key] ?? ""}</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f4f4f5", padding: 20 }}>
      <form className="msf-react" noValidate onSubmit={(event) => event.preventDefault()}>
        <div style={{ height: 4, borderRadius: 999, background: "#e4e4e7", overflow: "hidden", marginBottom: 12 }} aria-hidden="true">
          <span style={{ display: "block", height: "100%", width: `${(step / 3) * 100}%`, borderRadius: "inherit", background: "#0f766e", transition: "width 0.35s cubic-bezier(0.22,1,0.36,1)" }} />
        </div>
        <p role="status" style={{ margin: "0 0 20px", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#71717a" }}>
          {submitted ? "Account created ✓ (demo — nothing was sent)" : `Step ${step} of 3 — ${STEP_NAMES[step - 1]}`}
        </p>

        {step === 1 && (
          <section className="msf-react__panel" data-direction={direction}>
            {field(
              "name",
              "Full name",
              <input id="msf-name" type="text" required minLength={2} placeholder="Ada Lovelace" value={values.name}
                aria-invalid={Boolean(errors.name)}
                onChange={(event) => setValues((v) => ({ ...v, name: event.target.value }))} />,
            )}
            {field(
              "email",
              "Work email",
              <input id="msf-email" type="email" required placeholder="ada@company.com" value={values.email}
                aria-invalid={Boolean(errors.email)}
                onChange={(event) => setValues((v) => ({ ...v, email: event.target.value }))} />,
            )}
          </section>
        )}

        {step === 2 && (
          <section className="msf-react__panel" data-direction={direction}>
            {field(
              "company",
              "Company",
              <input id="msf-company" type="text" required minLength={2} placeholder="Acme Inc." value={values.company}
                aria-invalid={Boolean(errors.company)}
                onChange={(event) => setValues((v) => ({ ...v, company: event.target.value }))} />,
            )}
            {field(
              "size",
              "Team size",
              <select id="msf-size" required value={values.size} aria-invalid={Boolean(errors.size)}
                onChange={(event) => setValues((v) => ({ ...v, size: event.target.value }))}>
                <option value="">Select…</option>
                <option value="1-10">1–10</option>
                <option value="11-50">11–50</option>
                <option value="51-200">51–200</option>
                <option value="200+">200+</option>
              </select>,
            )}
          </section>
        )}

        {step === 3 && (
          <section className="msf-react__panel" data-direction={direction}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#26262b" }}>Review your details</p>
            <dl style={{ margin: 0, display: "grid", gap: 9 }}>
              {Object.entries(values)
                .filter(([, value]) => value)
                .map(([key, value]) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13.5 }}>
                    <dt style={{ color: "#71717a" }}>{key}</dt>
                    <dd style={{ margin: 0, fontWeight: 600, color: "#26262b" }}>{value}</dd>
                  </div>
                ))}
            </dl>
          </section>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 22 }}>
          <button
            type="button"
            hidden={step === 1 || submitted}
            onClick={() => goTo(step - 1)}
            style={{ border: "1px solid #d4d4d8", borderRadius: 9, background: "#ffffff", color: "#26262b", fontSize: 13.5, fontWeight: 600, padding: "10px 18px", cursor: "pointer" }}
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={submitted}
            style={{ background: "#26262b", border: "1px solid #26262b", color: "#fafafa", fontSize: 13.5, fontWeight: 600, padding: "10px 18px", borderRadius: 9, cursor: "pointer", marginLeft: "auto" }}
          >
            {submitted ? "Done" : step === 3 ? "Create account" : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
