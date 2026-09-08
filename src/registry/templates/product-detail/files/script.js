/**
 * Product detail: variant switching syncs gallery + price, quantity stepper
 * updates the add-to-cart total, and add shows confirmation feedback.
 */
(function () {
  const price = document.getElementById("pd-price");
  const total = document.getElementById("pd-total");
  const qtyEl = document.getElementById("pd-qty");
  const add = document.getElementById("pd-add");
  if (!price || !total || !qtyEl || !add) return;

  let variantPrice = 89;
  let qty = 1;

  function render() {
    price.textContent = "$" + variantPrice;
    total.textContent = "$" + variantPrice * qty;
    qtyEl.textContent = String(qty);
  }

  function selectVariant(name) {
    document.querySelectorAll(".pd-variant").forEach((v) => {
      v.setAttribute("aria-checked", String(v.dataset.variant === name));
    });
    document.querySelectorAll(".pd-thumb").forEach((t) => {
      t.setAttribute("aria-selected", String(t.dataset.variant === name));
    });
    document.querySelectorAll(".pd-visual").forEach((visual) => {
      visual.hidden = visual.dataset.variant !== name;
    });
    const active = document.querySelector('.pd-variant[data-variant="' + name + '"]');
    if (active) {
      variantPrice = parseInt(active.dataset.price, 10);
      render();
    }
  }

  document.querySelectorAll(".pd-variant").forEach((v) => {
    v.addEventListener("click", () => selectVariant(v.dataset.variant));
  });
  document.querySelectorAll(".pd-thumb").forEach((t) => {
    t.addEventListener("click", () => selectVariant(t.dataset.variant));
  });

  document.getElementById("pd-minus").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    render();
  });
  document.getElementById("pd-plus").addEventListener("click", () => {
    qty = Math.min(9, qty + 1);
    render();
  });

  add.addEventListener("click", () => {
    const original = add.textContent;
    add.textContent = "Added to cart ✓";
    add.style.background = "#0f766e";
    setTimeout(() => {
      add.textContent = original;
      add.style.background = "";
    }, 1500);
  });

  render();
})();
