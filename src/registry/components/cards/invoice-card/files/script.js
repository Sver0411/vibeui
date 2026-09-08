/**
 * Invoice cards: head toggles the detail drawer (grid-rows 0fr<->1fr, no
 * height measuring); only the chevron rotation and drawer animate.
 */
(function () {
  document.querySelectorAll(".iv").forEach(function (card) {
    var head = card.querySelector(".iv-head");
    var detail = card.querySelector(".iv-detail");
    if (!head || !detail) return;

    head.addEventListener("click", function () {
      var open = head.getAttribute("aria-expanded") === "true";
      head.setAttribute("aria-expanded", String(!open));
      detail.classList.toggle("is-open", !open);
    });
  });
})();
