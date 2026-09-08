/**
 * Cursor glow: pointer position is written into --cg-x/--cg-y and consumed
 * by a radial-gradient. rAF throttling avoids layout thrash.
 */
(function () {
  const stage = document.getElementById("cg-stage");
  if (!stage) return;
  if (window.matchMedia("(hover: none)").matches) return;

  let frame = 0;
  let x = 0;
  let y = 0;

  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    if (!frame) {
      frame = requestAnimationFrame(() => {
        stage.style.setProperty("--cg-x", x + "px");
        stage.style.setProperty("--cg-y", y + "px");
        frame = 0;
      });
    }
  });
})();
