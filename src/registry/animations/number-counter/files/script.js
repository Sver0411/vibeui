/**
 * Number counter: counts from 0 to data-count with easeOutCubic when the
 * element enters the viewport. Honors preview pausing and reduced motion.
 */
(function () {
  const values = Array.from(document.querySelectorAll(".nc-value"));
  const replay = document.getElementById("nc-replay");
  if (values.length === 0) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const paused = () => document.documentElement.classList.contains("atlas-paused");

  function animate(el) {
    const target = parseFloat(el.dataset.count || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    if (reduced) {
      el.textContent = target.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      return;
    }
    const duration = 1500;
    let elapsed = 0;
    let previousTime = null;
    function tick(now) {
      if (previousTime === null) previousTime = now;
      if (paused()) {
        previousTime = now;
        requestAnimationFrame(tick);
        return;
      }
      elapsed += now - previousTime;
      previousTime = now;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;
      el.textContent = current.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );

  values.forEach((el) => observer.observe(el));

  if (replay) {
    replay.addEventListener("click", () => {
      values.forEach((el) => {
        el.textContent = "0";
        observer.observe(el);
      });
    });
  }
})();
