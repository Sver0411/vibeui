/**
 * Scroll progress: the scroll handler only raises a dirty flag; the actual
 * width write happens once per frame inside rAF. Turns accent-colored past
 * the threshold, clamps overscroll bounce.
 */
(function () {
  var fill = document.getElementById("sp-fill");
  if (!fill) return;

  var HOT_AT = 0.6;
  var ticking = false;
  var lastWidth = -1;

  function compute() {
    ticking = false;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    // 量化到 0.1%，避免无意义的重复重绘
    var width = Math.round(progress * 1000) / 10;
    if (width !== lastWidth) {
      lastWidth = width;
      fill.style.width = width + "%";
    }
    fill.classList.toggle("is-hot", progress >= HOT_AT);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(compute);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  compute();
})();
