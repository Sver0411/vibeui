/**
 * Linear progress demo: animates the value 0 → 100 on load and on replay.
 * Real usage would set fill width + aria-valuenow from your own progress.
 */
(function () {
  const fill = document.getElementById("lp-fill");
  const value = document.getElementById("lp-value");
  const restart = document.getElementById("lp-restart");
  const bar = fill ? fill.closest(".lp") : null;
  if (!fill || !value || !restart) return;

  let raf = null;
  const paused = () => document.documentElement.classList.contains("atlas-paused");

  function animate() {
    const duration = 2600;
    let elapsed = 0;
    let previousTime = null;
    function tick(now) {
      if (previousTime === null) previousTime = now;
      if (paused()) {
        previousTime = now;
      } else {
        elapsed += now - previousTime;
        previousTime = now;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 2.4);
        const percent = Math.round(eased * 100);
        fill.style.width = percent + "%";
        value.textContent = percent + "%";
        if (bar) bar.setAttribute("aria-valuenow", String(percent));
        if (t >= 1) return;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
  }

  restart.addEventListener("click", () => {
    if (raf) cancelAnimationFrame(raf);
    animate();
  });

  animate();
})();
