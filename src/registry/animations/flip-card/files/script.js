/**
 * Flip card: pure CSS handles hover/keyboard; this tiny script adds the
 * tap-to-flip toggle for touch screens via aria-pressed.
 */
(function () {
  document.querySelectorAll(".fl").forEach(function (card) {
    card.addEventListener("click", function () {
      var pressed = card.getAttribute("aria-pressed") === "true";
      card.setAttribute("aria-pressed", pressed ? "false" : "true");
    });
  });
})();
