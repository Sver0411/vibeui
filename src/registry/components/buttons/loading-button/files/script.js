/**
 * Loading button state machine: idle → loading → success → idle.
 * The fake task simulates any async call (fetch, form submit…).
 */
(function () {
  const button = document.getElementById("load-button");
  if (!button) return;
  const label = button.querySelector(".load-button__label");
  const originalLabel = label ? label.textContent : "";

  function setState(state) {
    button.dataset.state = state;
    button.disabled = state !== "idle";
  }

  button.addEventListener("click", () => {
    setState("loading");
    if (label) label.textContent = "Deploying…";

    // Simulated async work — replace with a real fetch/submit.
    setTimeout(() => {
      setState("success");
      if (label) label.textContent = "Deployed";
      setTimeout(() => {
        setState("idle");
        if (label) label.textContent = originalLabel;
      }, 1600);
    }, 1800);
  });
})();
