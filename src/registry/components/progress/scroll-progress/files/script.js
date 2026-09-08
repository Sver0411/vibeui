/**
 * Scroll progress: fill width = scrolled fraction of the container.
 * rAF-throttled passive scroll listener keeps updates cheap.
 */
(function () {
  const demo = document.getElementById("sp-demo");
  const fill = document.getElementById("sp-fill");
  const percent = document.getElementById("sp-percent");
  if (!demo || !fill || !percent) return;

  let ticking = false;

  function update() {
    ticking = false;
    const max = demo.scrollHeight - demo.clientHeight;
    const fraction = max > 0 ? demo.scrollTop / max : 0;
    fill.style.width = fraction * 100 + "%";
    percent.textContent = Math.round(fraction * 100) + "%";
  }

  demo.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );

  update();
})();
