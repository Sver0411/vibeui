/**
 * Spotlight: the cursor position is written to --spot-x/--spot-y on each card
 * (event delegation keeps one listener for the whole grid).
 */
(function () {
  const stage = document.querySelector(".spot-stage");
  if (!stage) return;

  stage.addEventListener("pointermove", (event) => {
    document.querySelectorAll(".spot-card").forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty("--spot-x", x + "px");
      card.style.setProperty("--spot-y", y + "px");
    });
  });
})();
