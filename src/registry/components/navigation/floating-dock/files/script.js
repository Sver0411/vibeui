/**
 * Floating dock magnification: for each icon, distance to the cursor maps to
 * a magnification factor via a smooth falloff. One pointermove listener.
 */
(function () {
  const dock = document.getElementById("fd");
  if (!dock) return;
  const items = Array.from(dock.querySelectorAll(".fd__item"));
  const RADIUS = 110;

  if (window.matchMedia("(hover: none)").matches) return;

  dock.addEventListener("pointermove", (event) => {
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(event.clientX - (rect.left + rect.width / 2));
      const magnify = Math.max(0, 1 - distance / RADIUS);
      item.style.setProperty("--magnify", magnify.toFixed(3));
    });
  });

  dock.addEventListener("pointerleave", () => {
    items.forEach((item) => item.style.setProperty("--magnify", "0"));
  });

  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((other) => other.setAttribute("data-active", "false"));
      item.setAttribute("data-active", "true");
    });
  });
})();
