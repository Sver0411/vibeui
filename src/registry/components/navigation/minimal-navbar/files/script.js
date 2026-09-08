/**
 * Minimal navbar: scroll state toggles the blurred border, burger toggles
 * the mobile menu (with hidden attribute + aria-expanded).
 */
(function () {
  const header = document.getElementById("mn");
  const burger = document.getElementById("mn-burger");
  const mobile = document.getElementById("mn-mobile");
  const page = header ? header.closest(".mn-page") : null;
  if (!header || !burger || !mobile || !page) return;

  page.addEventListener("scroll", () => {
    header.dataset.scrolled = String(page.scrollTop > 8);
  }, { passive: true });

  burger.addEventListener("click", () => {
    const expanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!expanded));
    mobile.hidden = expanded;
  });
})();
