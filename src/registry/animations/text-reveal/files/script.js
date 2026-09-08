/**
 * Text reveal: replays the entrance by removing and re-adding the
 * animation class on the next frame (forces a style recalc).
 */
(function () {
  const headline = document.getElementById("tr-headline");
  const replay = document.getElementById("tr-replay");
  if (!headline || !replay) return;

  replay.addEventListener("click", () => {
    headline.querySelectorAll(".tr-word > span").forEach((span) => {
      const el = span;
      el.style.animation = "none";
      void el.offsetWidth; // reflow to reset the animation
      el.style.animation = "";
    });
  });
})();
