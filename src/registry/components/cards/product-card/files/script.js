/**
 * Product card interactions: size selection + add-to-cart feedback
 * ("Added ✓" then back). In a real app, hook these to your cart store.
 */
(function () {
  const card = document.querySelector(".pc-card");
  if (!card) return;

  card.querySelectorAll(".pc-size").forEach((size) => {
    size.addEventListener("click", () => {
      card.querySelectorAll(".pc-size").forEach((s) => s.setAttribute("aria-checked", "false"));
      size.setAttribute("aria-checked", "true");
    });
  });

  const add = document.getElementById("pc-add");
  const label = document.getElementById("pc-add-label");
  if (!add || !label) return;
  const original = label.textContent;
  let timer = null;

  add.addEventListener("click", () => {
    label.textContent = "Added ✓";
    add.style.background = "#0f766e";
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      label.textContent = original;
      add.style.background = "";
    }, 1400);
  });
})();
