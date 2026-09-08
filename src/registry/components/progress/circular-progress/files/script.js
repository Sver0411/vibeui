/**
 * Circular progress: setProgress(p) updates the ring + ARIA + label.
 * Includes a slider for manual control and a replay animation.
 */
(function () {
  const fill = document.getElementById("cp-fill");
  const value = document.getElementById("cp-value");
  const ring = document.getElementById("cp-ring");
  const range = document.getElementById("cp-range");
  const replay = document.getElementById("cp-replay");
  if (!fill || !value || !ring || !range || !replay) return;
  let replayTimer = null;

  function setProgress(percent) {
    fill.style.strokeDashoffset = String(100 - percent);
    value.textContent = percent + "%";
    ring.setAttribute("aria-valuenow", String(percent));
  }

  range.addEventListener("input", () => setProgress(Number(range.value)));

  replay.addEventListener("click", () => {
    if (replayTimer) clearInterval(replayTimer);
    const target = Number(range.value);
    let current = 0;
    setProgress(0);
    replayTimer = setInterval(() => {
      current = Math.min(current + 2, target);
      setProgress(current);
      if (current >= target) {
        clearInterval(replayTimer);
        replayTimer = null;
      }
    }, 12);
  });

  setProgress(Number(range.value));
})();
