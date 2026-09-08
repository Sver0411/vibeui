(function () {
  const canvas = document.querySelector(".kpt-canvas");
  const paths = [
    document.querySelector("#kpt-path-a"),
    document.querySelector("#kpt-path-b"),
    document.querySelector("#kpt-path-c"),
  ];
  const guides = Array.from(document.querySelectorAll(".kpt-guide"));
  const textPaths = Array.from(document.querySelectorAll(".kpt-text textPath"));
  const meter = document.querySelector(".kpt-readout i");
  const reverse = document.querySelector(".kpt-reverse");
  if (!canvas || paths.some((path) => !path) || guides.length !== 3 || textPaths.length !== 3 || !meter || !reverse) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const bases = [68, 128, 190];
  const offsets = [-120, -250, -60];
  const factors = [1, -0.74, 0.88];
  let direction = 1;
  let velocity = 0.42;
  let impulse = 0;
  let bend = 0;
  let targetBend = 0;
  let lastX = null;
  let lastTime = 0;
  let raf = 0;
  let paused = false;

  function makePath(index, amount) {
    const y = bases[index];
    const sign = index === 1 ? -1 : 1;
    return `M-90 ${y} C70 ${y - 38 * sign - amount * 30}, 260 ${y + 44 * sign + amount * 42}, 510 ${y - 12 * sign - amount * 18}`;
  }

  function draw() {
    paths.forEach((path, index) => {
      const d = makePath(index, bend * (index === 1 ? -0.72 : 1));
      path.setAttribute("d", d);
      guides[index].setAttribute("d", d);
    });
    textPaths.forEach((textPath, index) => textPath.setAttribute("startOffset", `${offsets[index]}px`));
    meter.style.transform = `scaleX(${Math.min(1, 0.2 + Math.abs(velocity) / 2.7)})`;
  }

  function loop() {
    if (!paused) {
      impulse *= 0.9;
      const targetVelocity = direction * 0.42 + impulse;
      velocity += (targetVelocity - velocity) * 0.085;
      bend += (targetBend - bend) * 0.075;
      offsets.forEach((value, index) => {
        let next = value - velocity * factors[index];
        if (next < -420) next += 340;
        if (next > -40) next -= 340;
        offsets[index] = next;
      });
      draw();
    }
    raf = requestAnimationFrame(loop);
  }

  canvas.addEventListener("pointermove", (event) => {
    const now = performance.now();
    if (lastX !== null) {
      const delta = event.clientX - lastX;
      const elapsed = Math.max(8, now - lastTime);
      impulse = Math.max(-2.2, Math.min(2.2, (delta / elapsed) * 5.4));
    }
    const rect = canvas.getBoundingClientRect();
    targetBend = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    lastX = event.clientX;
    lastTime = now;
  });
  canvas.addEventListener("pointerleave", () => { lastX = null; targetBend = 0; });
  reverse.addEventListener("click", () => { direction *= -1; impulse += direction * 0.8; });
  document.addEventListener("atlas:visibility", (event) => { paused = Boolean(event.detail && event.detail.paused); });
  document.addEventListener("visibilitychange", () => { paused = document.hidden; });

  draw();
  if (!reduceMotion.matches) raf = requestAnimationFrame(loop);
  window.addEventListener("pagehide", () => cancelAnimationFrame(raf), { once: true });
})();
