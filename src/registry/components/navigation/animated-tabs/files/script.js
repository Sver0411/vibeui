/**
 * Animated tabs: the indicator is measured from the selected tab's geometry
 * and moved with transform/width — correct at any size. Full keyboard support.
 */
(function () {
  const tablist = document.getElementById("at-tablist");
  const indicator = document.getElementById("at-indicator");
  if (!tablist || !indicator) return;
  const tabs = Array.from(tablist.querySelectorAll("[role='tab']"));

  function moveIndicator(tab) {
    indicator.style.width = tab.offsetWidth + "px";
    indicator.style.transform = "translateX(" + tab.offsetLeft + "px)";
  }

  function select(tab) {
    tabs.forEach((other) => {
      other.setAttribute("aria-selected", String(other === tab));
      other.tabIndex = other === tab ? 0 : -1;
      const panel = document.getElementById(other.getAttribute("aria-controls"));
      if (panel) panel.hidden = other !== tab;
    });
    moveIndicator(tab);
    tab.focus();
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (event) => {
      const index = tabs.indexOf(tab);
      if (event.key === "ArrowRight") select(tabs[(index + 1) % tabs.length]);
      else if (event.key === "ArrowLeft") select(tabs[(index - 1 + tabs.length) % tabs.length]);
      else if (event.key === "Home") select(tabs[0]);
      else if (event.key === "End") select(tabs[tabs.length - 1]);
    });
  });

  window.addEventListener("resize", () => {
    const selected = tablist.querySelector("[aria-selected='true']");
    if (selected) moveIndicator(selected);
  });

  moveIndicator(tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0]);
})();
