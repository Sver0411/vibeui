(function () {
  const frame = document.querySelector(".pff-frame");
  const canvas = document.querySelector(".pff-canvas");
  const toggle = document.querySelector(".pff-mode");
  const context = canvas && canvas.getContext("2d", { alpha: false });
  if (!frame || !canvas || !toggle || !context) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let width = 1;
  let height = 1;
  let dpr = 1;
  let charged = false;
  let paused = false;
  let raf = 0;
  let frameCount = 0;
  let particles = [];
  const pointer = { x: 0, y: 0, active: false };

  function particleBudget() {
    const areaScale = Math.max(0.7, Math.min(1.15, (width * height) / (378 * 236)));
    return Math.round((charged ? 210 : 132) * areaScale);
  }

  function resetParticle(particle, randomLife) {
    particle.x = Math.random() * width;
    particle.y = Math.random() * height;
    particle.px = particle.x;
    particle.py = particle.y;
    particle.vx = 0;
    particle.vy = 0;
    particle.life = randomLife ? Math.random() * 180 : 150 + Math.random() * 90;
    particle.tint = Math.random();
  }

  function rebuildParticles() {
    particles = Array.from({ length: particleBudget() }, () => {
      const particle = {};
      resetParticle(particle, true);
      return particle;
    });
  }

  function fieldAngle(x, y, time) {
    return (
      Math.sin(x * 0.012 + time * 0.00028) * 1.28 +
      Math.cos(y * 0.015 - time * 0.00023) * 1.04 +
      Math.sin((x + y) * 0.006) * 0.58
    );
  }

  function advance(particle, time, drawLine) {
    particle.px = particle.x;
    particle.py = particle.y;
    const angle = fieldAngle(particle.x, particle.y, time);
    const force = charged ? 0.54 : 0.36;
    particle.vx = particle.vx * 0.91 + Math.cos(angle) * force;
    particle.vy = particle.vy * 0.91 + Math.sin(angle) * force;

    if (pointer.active) {
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance = Math.max(12, Math.hypot(dx, dy));
      if (distance < 140) {
        const influence = (1 - distance / 140) * (charged ? 1.15 : 0.72);
        particle.vx += (-dy / distance) * influence;
        particle.vy += (dx / distance) * influence;
      }
    }

    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.life -= 1;
    const escaped = particle.x < -12 || particle.x > width + 12 || particle.y < -12 || particle.y > height + 12;
    if (escaped || particle.life <= 0) {
      resetParticle(particle, false);
      return;
    }

    if (drawLine) {
      const hue = 164 + particle.tint * 104;
      context.beginPath();
      context.moveTo(particle.px, particle.py);
      context.lineTo(particle.x, particle.y);
      context.strokeStyle = `hsla(${hue}, 54%, ${charged ? 42 : 36}%, ${charged ? 0.34 : 0.24})`;
      context.lineWidth = charged ? 0.9 : 0.72;
      context.stroke();
    }
  }

  function clear(full) {
    context.save();
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.fillStyle = full ? "#f8fbfa" : charged ? "rgba(248,251,250,0.055)" : "rgba(248,251,250,0.082)";
    context.fillRect(0, 0, width, height);
    context.restore();
  }

  function draw(time) {
    frameCount += 1;
    clear(frameCount % 620 === 0);
    context.save();
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles.forEach((particle) => advance(particle, time, true));
    context.restore();
  }

  function drawStatic() {
    clear(true);
    context.save();
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    for (let step = 0; step < 46; step += 1) particles.forEach((particle) => advance(particle, step * 20, step > 2));
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
    rebuildParticles();
    reduceMotion.matches ? drawStatic() : clear(true);
  }

  frame.addEventListener("pointermove", (event) => {
    const rect = frame.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
  });
  frame.addEventListener("pointerleave", () => { pointer.active = false; });
  toggle.addEventListener("click", () => {
    charged = !charged;
    frame.dataset.mode = charged ? "charged" : "calm";
    toggle.setAttribute("aria-pressed", String(charged));
    toggle.textContent = charged ? "Calm field" : "Charge field";
    rebuildParticles();
    clear(true);
    if (reduceMotion.matches) drawStatic();
  });
  document.addEventListener("atlas:visibility", (event) => { paused = Boolean(event.detail && event.detail.paused); });
  document.addEventListener("visibilitychange", () => { paused = document.hidden; });

  const observer = new ResizeObserver(resize);
  observer.observe(frame);
  resize();
  if (!reduceMotion.matches) raf = requestAnimationFrame(loop);
  window.addEventListener("pagehide", () => { cancelAnimationFrame(raf); observer.disconnect(); }, { once: true });
})();
