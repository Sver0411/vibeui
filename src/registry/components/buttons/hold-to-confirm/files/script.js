/**
 * Hold-to-confirm: a progress ring fills while the pointer is held.
 * Releasing early cancels; completing fires the confirmed callback once.
 */
(function () {
  const button = document.getElementById("hold-button");
  const status = document.getElementById("hold-status");
  if (!button || !status) return;
  const ring = button.querySelector(".hold-button__ring-progress");
  const HOLD_DURATION = 1000;

  let raf = null;
  let startTime = 0;
  let holding = false;

  function tick(now) {
    if (!holding) return;
    const progress = Math.min((now - startTime) / HOLD_DURATION, 1);
    if (ring) ring.style.strokeDashoffset = String(100 - progress * 100);
    if (progress >= 1) {
      release(true);
      if (ring) ring.style.strokeDashoffset = "0";
      status.textContent = "Confirmed — action fired (no real data was deleted).";
      status.dataset.armed = "true";
      button.disabled = true;
      setTimeout(() => {
        button.disabled = false;
        if (ring) ring.style.strokeDashoffset = "100";
        status.textContent = "Press and hold for one second.";
        status.dataset.armed = "false";
      }, 1800);
      return;
    }
    raf = requestAnimationFrame(tick);
  }

  function release(completed) {
    holding = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    if (!completed) {
      if (ring) ring.style.strokeDashoffset = "100";
      status.textContent = "Cancelled — released too early.";
      status.dataset.armed = "false";
    }
  }

  function start(event) {
    event.preventDefault();
    if (button.disabled) return;
    holding = true;
    startTime = performance.now();
    status.textContent = "Keep holding…";
    status.dataset.armed = "false";
    raf = requestAnimationFrame(tick);
  }

  button.addEventListener("pointerdown", start);
  button.addEventListener("pointerup", () => holding && release(false));
  button.addEventListener("pointerleave", () => holding && release(false));
  // Keyboard parity: hold Space or Enter for the same duration.
  button.addEventListener("keydown", (event) => {
    if ((event.key === " " || event.key === "Enter") && !holding) start(event);
  });
  button.addEventListener("keyup", () => holding && release(false));
})();
