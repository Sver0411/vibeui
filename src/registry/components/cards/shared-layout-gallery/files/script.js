(function () {
  const cards = Array.from(document.querySelectorAll(".slg-card"));
  const overlay = document.querySelector(".slg-overlay");
  const dialog = document.querySelector(".slg-dialog");
  const targetVisual = document.querySelector(".slg-dialog__visual");
  const title = document.querySelector(".slg-dialog h3");
  const description = document.querySelector(".slg-dialog__description");
  const indexLabel = document.querySelector(".slg-dialog__index");
  const closeButton = document.querySelector(".slg-close");
  const action = document.querySelector(".slg-dialog__action");
  if (!overlay || !dialog || !targetVisual || !title || !description || !indexLabel || !closeButton || !action) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeCard = null;
  let animating = false;

  function copyTheme(from, to) {
    to.className = `slg-dialog__visual slg-visual slg-visual--${from.dataset.theme}`;
    to.innerHTML = "<i></i><i></i><i></i>";
  }

  function createFlight(source, first, last, reverse) {
    const flight = source.cloneNode(true);
    flight.classList.add("slg-flight");
    Object.assign(flight.style, {
      left: `${last.left}px`,
      top: `${last.top}px`,
      width: `${last.width}px`,
      height: `${last.height}px`,
    });
    document.body.appendChild(flight);
    const inverted = `translate(${first.left - last.left}px, ${first.top - last.top}px) scale(${first.width / last.width}, ${first.height / last.height})`;
    const frames = reverse ? [{ transform: "none" }, { transform: inverted }] : [{ transform: inverted }, { transform: "none" }];
    const animation = flight.animate(frames, {
      duration: reduceMotion.matches ? 1 : 560,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "both",
    });
    return animation.finished.catch(() => undefined).then(() => flight.remove());
  }

  async function openCard(card) {
    if (animating) return;
    animating = true;
    activeCard = card;
    const source = card.querySelector(".slg-card__visual");
    const first = source.getBoundingClientRect();
    copyTheme(card, targetVisual);
    title.textContent = card.dataset.title;
    description.textContent = card.dataset.copy;
    indexLabel.textContent = `Study ${String(cards.indexOf(card) + 1).padStart(2, "0")}`;
    overlay.hidden = false;
    overlay.dataset.visible = "false";
    dialog.dataset.ready = "false";
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const last = targetVisual.getBoundingClientRect();
    source.style.visibility = "hidden";
    overlay.dataset.visible = "true";
    await createFlight(source, first, last, false);
    dialog.dataset.ready = "true";
    closeButton.focus();
    animating = false;
  }

  async function closeDialog() {
    if (!activeCard || animating) return;
    animating = true;
    const source = activeCard.querySelector(".slg-card__visual");
    const first = source.getBoundingClientRect();
    const last = targetVisual.getBoundingClientRect();
    dialog.dataset.ready = "false";
    const flightSource = targetVisual.cloneNode(true);
    await createFlight(flightSource, first, last, true);
    overlay.dataset.visible = "false";
    source.style.visibility = "visible";
    await new Promise((resolve) => window.setTimeout(resolve, reduceMotion.matches ? 1 : 240));
    overlay.hidden = true;
    activeCard.focus();
    activeCard = null;
    animating = false;
  }

  cards.forEach((card) => card.addEventListener("click", () => openCard(card)));
  closeButton.addEventListener("click", closeDialog);
  overlay.addEventListener("pointerdown", (event) => {
    if (event.target === overlay) closeDialog();
  });
  overlay.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { event.preventDefault(); closeDialog(); }
    if (event.key !== "Tab") return;
    const focusables = [closeButton, action];
    const current = focusables.indexOf(document.activeElement);
    if (event.shiftKey && current <= 0) { event.preventDefault(); action.focus(); }
    if (!event.shiftKey && current === focusables.length - 1) { event.preventDefault(); closeButton.focus(); }
  });
})();
