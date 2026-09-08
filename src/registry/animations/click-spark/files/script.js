/**
 * Click spark: on every pointerdown, burst a ring of line particles from the
 * click position. Particles are removed on animation end — no lingering DOM.
 */
(function () {
  const COUNT = 10;
  const MIN_DIST = 26;
  const MAX_DIST = 52;

  document.addEventListener("pointerdown", (event) => {
    const burst = document.createElement("span");
    burst.className = "cs-spark";
    burst.style.left = `${event.clientX}px`;
    burst.style.top = `${event.clientY}px`;

    for (let i = 0; i < COUNT; i++) {
      const particle = document.createElement("i");
      particle.className = "cs-particle";
      particle.style.setProperty("--angle", `${(360 / COUNT) * i + (Math.random() * 14 - 7)}deg`);
      particle.style.setProperty("--distance", `${MIN_DIST + Math.random() * (MAX_DIST - MIN_DIST)}px`);
      particle.addEventListener("animationend", () => particle.remove());
      burst.appendChild(particle);
    }

    document.body.appendChild(burst);
    burst.addEventListener("animationend", () => burst.remove(), { once: true });
  });
})();
