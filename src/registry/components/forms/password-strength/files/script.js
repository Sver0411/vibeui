/**
 * Password strength: scores against concrete rules (length, case, number,
 * symbol) and maps the count to a 4-step meter. Swap in zxcvbn for
 * entropy-based scoring in production.
 */
(function () {
  const input = document.getElementById("ps-input");
  const fill = document.getElementById("ps-fill");
  const label = document.getElementById("ps-label");
  const rules = document.getElementById("ps-rules");
  const toggle = document.getElementById("ps-toggle");
  if (!input || !fill || !label || !rules || !toggle) return;

  const LEVELS = [
    [0, "Enter a password", "#a1a1aa"],
    [1, "Weak", "#b3261e"],
    [2, "Fair", "#b45309"],
    [3, "Good", "#0f766e"],
    [4, "Strong", "#15803d"],
  ];

  function evaluate() {
    const value = input.value;
    const checks = {
      length: value.length >= 12,
      case: /[a-z]/.test(value) && /[A-Z]/.test(value),
      number: /\d/.test(value),
      symbol: /[^A-Za-z0-9]/.test(value),
    };
    rules.querySelectorAll("li").forEach((item) => {
      item.setAttribute("data-met", String(checks[item.dataset.rule] || false));
    });
    const passed = Object.values(checks).filter(Boolean).length;
    if (value.length === 0) {
      fill.style.width = "0%";
      label.textContent = LEVELS[0][1];
      fill.style.setProperty("--ps-color", LEVELS[0][2]);
      label.style.setProperty("--ps-color", LEVELS[0][2]);
      return;
    }
    const [, text, color] = LEVELS[passed];
    fill.style.width = (passed / 4) * 100 + "%";
    fill.style.setProperty("--ps-color", color);
    label.textContent = text;
    label.style.setProperty("--ps-color", color);
  }

  toggle.addEventListener("click", () => {
    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    toggle.textContent = showing ? "Show" : "Hide";
    toggle.setAttribute("aria-pressed", String(!showing));
    toggle.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  });

  input.addEventListener("input", evaluate);
  evaluate();
})();
