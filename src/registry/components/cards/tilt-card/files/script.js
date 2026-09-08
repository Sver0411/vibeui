/**
 * 3D tilt: rotateX/Y from cursor position within the card bounds,
 * plus a glare highlight that tracks the pointer. Max tilt ~10°.
 */
(function () {
  const card = document.getElementById("tilt-card");
  if (!card) return;
  const MAX_TILT = 10;

  // Touch devices have no hover pointer — skip the effect.
  if (window.matchMedia("(hover: none)").matches) return;

  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 2 * MAX_TILT;
    const rotateX = (0.5 - py) * 2 * MAX_TILT;
    card.style.transform = "rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg)";
    card.style.setProperty("--glare-x", (px * 100).toFixed(1) + "%");
    card.style.setProperty("--glare-y", (py * 100).toFixed(1) + "%");
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
})();
