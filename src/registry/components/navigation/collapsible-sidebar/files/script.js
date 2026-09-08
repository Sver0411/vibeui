/**
 * Collapsible sidebar: toggles data-collapsed; tooltips are pure CSS via
 * the data-tip attribute, shown only while collapsed.
 */
(function () {
  const sidebar = document.querySelector(".cs");
  const toggle = document.getElementById("cs-toggle");
  if (!sidebar || !toggle) return;

  toggle.addEventListener("click", () => {
    const collapsed = sidebar.getAttribute("data-collapsed") === "true";
    sidebar.setAttribute("data-collapsed", String(!collapsed));
    toggle.setAttribute("aria-expanded", String(collapsed));
    toggle.setAttribute("aria-label", collapsed ? "Collapse sidebar" : "Expand sidebar");
  });
})();
