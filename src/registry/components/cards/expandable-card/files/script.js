/**
 * Expandable card: toggles aria-expanded + data-open; the grid-rows trick
 * animates height without measuring content.
 */
(function () {
  const card = document.getElementById("ex-card");
  const toggle = document.getElementById("ex-toggle");
  if (!card || !toggle) return;

  toggle.addEventListener("click", () => {
    const open = card.dataset.open === "true";
    card.dataset.open = String(!open);
    toggle.setAttribute("aria-expanded", String(!open));
  });
})();
