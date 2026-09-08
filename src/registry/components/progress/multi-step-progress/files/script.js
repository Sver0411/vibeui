/**
 * Multi-step progress: state = current step index (1-based).
 * Done steps are clickable to jump back; the fill line animates between dots.
 */
(function () {
  const stepper = document.getElementById("msp");
  const fill = document.getElementById("msp-fill");
  const status = document.getElementById("msp-status");
  const prev = document.getElementById("msp-prev");
  const next = document.getElementById("msp-next");
  if (!stepper || !fill || !status || !prev || !next) return;

  const steps = Array.from(stepper.querySelectorAll(".msp__step"));
  const labels = steps.map((step) => step.querySelector(".msp__label").textContent);
  const total = steps.length;
  let current = 2;

  function render() {
    steps.forEach((step, index) => {
      const n = index + 1;
      const state = n < current ? "done" : n === current ? "current" : "todo";
      step.dataset.state = state;
      const dot = step.querySelector(".msp__dot");
      dot.disabled = n >= current; // only completed steps are clickable
    });
    const progress = ((current - 1) / (total - 1)) * 100;
    fill.style.width = progress + "%";
    status.textContent =
      current > total ? "All steps complete" : "Step " + current + " of " + total + " — " + labels[current - 1];
    prev.disabled = current === 1;
    next.disabled = current >= total;
  }

  steps.forEach((step, index) => {
    step.querySelector(".msp__dot").addEventListener("click", () => {
      if (index + 1 < current) {
        current = index + 1;
        render();
      }
    });
  });
  prev.addEventListener("click", () => {
    current = Math.max(1, current - 1);
    render();
  });
  next.addEventListener("click", () => {
    current = Math.min(total, current + 1);
    render();
  });

  render();
})();
