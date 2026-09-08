/**
 * Pricing page: the annual toggle recalculates every price from
 * data-monthly / data-annual attributes and announces the change.
 */
(function () {
  const sw = document.getElementById("pr-switch");
  if (!sw) return;
  const amounts = document.querySelectorAll(".pr-plan__amount[data-monthly]");

  sw.addEventListener("click", () => {
    const annual = sw.getAttribute("aria-checked") !== "true";
    sw.setAttribute("aria-checked", String(annual));
    amounts.forEach((el) => {
      const price = annual ? el.dataset.annual : el.dataset.monthly;
      el.textContent = "$" + price;
    });
  });
})();
