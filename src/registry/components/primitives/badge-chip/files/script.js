/**
 * Removable chips: animate out, then remove from the DOM.
 */
(function () {
  document.querySelectorAll(".chip--removable input").forEach((button) => {
    button.addEventListener("click", () => {
      const chip = button.closest(".chip");
      if (!chip) return;
      chip.classList.add("is-leaving");
      chip.addEventListener("transitionend", () => chip.remove(), { once: true });
    });
  });
})();
