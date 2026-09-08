/**
 * Scroll shadow: one rAF-throttled pass per scroll frame toggles the top /
 * bottom fade masks based on clipping state.
 */
(function () {
  var outer = document.querySelector(".ss2-outer");
  var el = document.getElementById("ss2-scroll");
  if (!outer || !el) return;
  var topFade = outer.querySelector(".ss2-fade--top");
  var bottomFade = outer.querySelector(".ss2-fade--bottom");
  if (!topFade || !bottomFade) return;

  var ticking = false;

  function update() {
    ticking = false;
    var max = el.scrollHeight - el.clientHeight;
    topFade.classList.toggle("is-on", el.scrollTop > 2);
    bottomFade.classList.toggle("is-on", el.scrollTop < max - 2);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  el.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
