(function () {
  const frame = document.querySelector(".pdr-frame");
  const canvas = document.querySelector(".pdr-canvas");
  const pointer = document.querySelector(".pdr-pointer");
  const replay = document.querySelector(".pdr-replay");
  const context = canvas && canvas.getContext("2d", { alpha: false });
  if (!frame || !canvas || !pointer || !replay || !context) return;

  const CELL = 6;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let width = 1;
  let height = 1;
  let dpr = 1;
  let noise = [];
  let raf = 0;
  let paused = false;
  let startTime = performance.now();
  let pointerActive = false;
  let pointerX = 0;
  let pointerY = 0;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const smoothstep = (edge0, edge1, value) => {
    const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
    return x * x * (3 - 2 * x);
  };

  function hash(x, y) {
    const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return value - Math.floor(value);
  }

  function rebuildNoise() {
    const columns = Math.ceil(width / CELL);
    const rows = Math.ceil(height / CELL);
    noise = new Float32Array(columns * rows);
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) noise[y * columns + x] = hash(x, y);
    }
  }

  function colorA(x, y) {
    const wave = Math.sin(x * 0.024) * 9 + Math.cos(y * 0.031) * 6;
    const light = 92 + wave * 0.22;
    return `hsl(${166 + Math.sin(y * 0.02) * 12} 34% ${light}%)`;
  }

  function colorB(x, y) {
    const diagonal = (x + y) / Math.max(1, width + height);
    const hue = 252 + diagonal * 72 + Math.sin(y * 0.035) * 18;
    const light = 79 + Math.sin(x * 0.018 + y * 0.026) * 7;
    return `hsl(${hue} 62% ${light}%)`;
  }

  function draw(time) {
    const columns = Math.ceil(width / CELL);
    const rows = Math.ceil(height / CELL);
    const elapsed = Math.max(0, time - startTime);
    const cycle = (elapsed % 5200) / 5200;
    const pingPong = cycle < 0.5 ? cycle * 2 : 2 - cycle * 2;
    const autoFront = -90 + pingPong * (width + height + 180);
    const radius = Math.max(width, height) * 0.42;

    context.save();
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.fillStyle = "#eef8f5";
    context.fillRect(0, 0, width, height);

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const x = column * CELL;
        const y = row * CELL;
        const grain = noise[row * columns + column];
        context.fillStyle = colorA(x, y);
        context.fillRect(x, y, CELL + 0.45, CELL + 0.45);

        let reveal;
        if (pointerActive) {
          const distance = Math.hypot(x + CELL * 0.5 - pointerX, y + CELL * 0.5 - pointerY);
          reveal = smoothstep(30, -24, distance - radius + (grain - 0.5) * 76);
        } else {
          reveal = smoothstep(-34, 34, autoFront - (x + y) + (grain - 0.5) * 94);
        }

        if (reveal > 0.02) {
          const edge = 1 - Math.abs(reveal * 2 - 1);
          const inset = edge * (1 - grain) * 2.2;
          context.globalAlpha = clamp(reveal * 1.25, 0, 1);
          context.fillStyle = colorB(x, y);
          context.fillRect(x + inset, y + inset, CELL + 0.45 - inset * 2, CELL + 0.45 - inset * 2);
          context.globalAlpha = 1;
        }
      }
    }

    context.restore();
  }

  function loop(time) {
    if (!paused) draw(time);
    raf = requestAnimationFrame(loop);
  }

  function resize() {
    const rect = frame.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    rebuildNoise();
    draw(performance.now());
  }

  frame.addEventListener("pointermove", (event) => {
    const rect = frame.getBoundingClientRect();
    pointerActive = true;
    pointerX = event.clientX - rect.left;
    pointerY = event.clientY - rect.top;
    frame.dataset.pointer = "true";
    pointer.style.left = `${pointerX}px`;
    pointer.style.top = `${pointerY}px`;
    if (reduceMotion.matches) draw(performance.now());
  });
  frame.addEventListener("pointerleave", () => {
    pointerActive = false;
    frame.dataset.pointer = "false";
    if (reduceMotion.matches) draw(performance.now());
  });
  replay.addEventListener("click", () => {
    startTime = performance.now();
    pointerActive = false;
    frame.dataset.pointer = "false";
    draw(startTime);
  });
  document.addEventListener("atlas:visibility", (event) => {
    paused = Boolean(event.detail && event.detail.paused);
  });
  document.addEventListener("visibilitychange", () => { paused = document.hidden; });

  const observer = new ResizeObserver(resize);
  observer.observe(frame);
  resize();
  if (!reduceMotion.matches) raf = requestAnimationFrame(loop);
  window.addEventListener("pagehide", () => { cancelAnimationFrame(raf); observer.disconnect(); }, { once: true });
})();
