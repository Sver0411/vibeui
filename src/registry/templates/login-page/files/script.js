/**
 * Login page: client-side validation, show/hide password, fake submit.
 * Wire the submit handler to your auth endpoint; the UI states stay the same.
 */
(function () {
  const form = document.getElementById("lg-form");
  const eye = document.getElementById("lg-eye");
  const submit = document.getElementById("lg-submit");
  if (!form || !eye || !submit) return;

  function setError(name, message) {
    const el = form.querySelector('[data-error="' + name + '"]');
    if (el) el.textContent = message;
  }

  eye.addEventListener("click", () => {
    const input = document.getElementById("lg-password");
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    eye.setAttribute("aria-pressed", String(show));
    eye.setAttribute("aria-label", show ? "Hide password" : "Show password");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.email;
    const password = form.password;
    let valid = true;

    if (!email.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
      setError("email", "Enter a valid email address.");
      email.setAttribute("aria-invalid", "true");
      valid = false;
    } else {
      setError("email", "");
      email.removeAttribute("aria-invalid");
    }
    if (!password.value || password.value.length < 8) {
      setError("password", "Password must be at least 8 characters.");
      password.setAttribute("aria-invalid", "true");
      valid = false;
    } else {
      setError("password", "");
      password.removeAttribute("aria-invalid");
    }
    if (!valid) return;

    setError("form", "");
    submit.disabled = true;
    submit.textContent = "Signing in…";
    // Demo: simulate a failed login so the error path is visible.
    setTimeout(() => {
      submit.disabled = false;
      submit.textContent = "Sign in";
      setError("form", "Demo only — no credentials are checked. Wire this to your API.");
    }, 900);
  });
})();
