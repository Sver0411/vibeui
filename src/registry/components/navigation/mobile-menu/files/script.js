/**
 * Animated mobile menu: opens the overlay, staggers the links (CSS handles
 * the animation via --i), manages focus and Esc.
 */
(function () {
  const burger = document.getElementById("mm-burger");
  const overlay = document.getElementById("mm-overlay");
  if (!burger || !overlay) return;

  function openMenu() {
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.setAttribute("data-open", "true"));
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close menu");
    const first = overlay.querySelector(".mm-nav__link");
    if (first) first.focus({ preventScroll: true });
  }

  function closeMenu() {
    overlay.removeAttribute("data-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
    setTimeout(() => {
      overlay.hidden = true;
      burger.focus({ preventScroll: true });
    }, 300);
  }

  burger.addEventListener("click", () => {
    if (overlay.hidden) openMenu();
    else closeMenu();
  });

  overlay.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest(".mm-nav__link")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) closeMenu();
  });
})();
