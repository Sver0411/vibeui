(function () {
  const CONFIG = {"slug":"ascii-depth-portrait","renderer":"ascii","style":"default","hue":196,"mark":"ASCII","seed":3620617456,"heavy":false};
  const frame = document.querySelector(".glab-frame");
  const canvas = document.querySelector(".glab-canvas");
  const shiftButton = document.querySelector(".glab-shift");
  const context = canvas && canvas.getContext("2d", { alpha: false });
  if (!frame || !canvas || !shiftButton || !context) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: 0, y: 0, nx: 0.64, ny: 0.56, active: false, down: false };
  const state = {};
  let width = 1;
  let height = 1;
  let dpr = 1;
  let variant = 0;
  let paused = false;
  let raf = 0;
  let previousTime = 0;
  let random = mulberry32(CONFIG.seed);

  function mulberry32(seed) {
    return function () {
      let value = (seed += 0x6d2b79f5);
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(from, to, amount) {
    return from + (to - from) * amount;
  }

  function hue(offset) {
    return (CONFIG.hue + offset + variant * 17 + 720) % 360;
  }

  function tone(offset, alpha, lightness) {
    return `hsla(${hue(offset)},58%,${lightness || 42}%,${alpha == null ? 1 : alpha})`;
  }

  function softNoise(x, y, z) {
    const a = Math.sin(x * 1.73 + z * 0.71);
    const b = Math.sin(y * 2.11 - z * 0.47);
    const c = Math.sin((x + y) * 1.07 + z * 0.29);
    const d = Math.cos((x - y) * 2.37 - z * 0.19);
    return (a + b + c + d) * 0.25;
  }

  function paintBase(tint) {
    context.fillStyle = tint || "#f8faf9";
    context.fillRect(0, 0, width, height);
  }

  function roundRectPath(x, y, w, h, radius) {
    const r = Math.min(radius, w / 2, h / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + w, y, x + w, y + h, r);
    context.arcTo(x + w, y + h, x, y + h, r);
    context.arcTo(x, y + h, x, y, r);
    context.arcTo(x, y, x + w, y, r);
    context.closePath();
  }

  function polygon(cx, cy, radius, sides, rotation) {
    context.beginPath();
    for (let index = 0; index < sides; index += 1) {
      const angle = rotation + (index / sides) * Math.PI * 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.closePath();
  }

  function resetState() {
    random = mulberry32(CONFIG.seed + variant * 7919);
    for (const key of Object.keys(state)) delete state[key];
    state.seeds = Array.from({ length: 10 }, () => ({
      x: random(),
      y: random(),
      phase: random() * Math.PI * 2,
      speed: 0.35 + random() * 0.8,
    }));
    state.particles = Array.from({ length: CONFIG.heavy ? 160 : 120 }, () => ({
      x: random() * width,
      y: random() * height,
      vx: (random() - 0.5) * 0.7,
      vy: (random() - 0.5) * 0.7,
      seed: random(),
    }));
    state.boids = Array.from({ length: 92 }, () => ({
      x: random() * width,
      y: random() * height,
      vx: (random() - 0.5) * 1.6,
      vy: (random() - 0.5) * 1.6,
    }));
    state.dial = -Math.PI * 0.72 + variant * 0.28;
    state.cableX = width * 0.64;
    state.cableY = height * 0.58;
    state.cableVX = 0;
    state.cableVY = 0;
    initializeReaction();
    initializeSandpile();
    initializeGlyph();
  }

  function initializeReaction() {
    const gridWidth = 96;
    const gridHeight = 60;
    state.reactionWidth = gridWidth;
    state.reactionHeight = gridHeight;
    state.u = new Float32Array(gridWidth * gridHeight);
    state.v = new Float32Array(gridWidth * gridHeight);
    state.nextU = new Float32Array(gridWidth * gridHeight);
    state.nextV = new Float32Array(gridWidth * gridHeight);
    state.u.fill(1);
    for (let spot = 0; spot < 11; spot += 1) {
      const cx = 12 + Math.floor(random() * (gridWidth - 24));
      const cy = 9 + Math.floor(random() * (gridHeight - 18));
      const radius = 2 + Math.floor(random() * 4);
      for (let y = -radius; y <= radius; y += 1) {
        for (let x = -radius; x <= radius; x += 1) {
          if (x * x + y * y <= radius * radius) {
            const index = (cy + y) * gridWidth + cx + x;
            state.v[index] = 0.88;
            state.u[index] = 0.18;
          }
        }
      }
    }
    state.reactionCanvas = document.createElement("canvas");
    state.reactionCanvas.width = gridWidth;
    state.reactionCanvas.height = gridHeight;
    state.reactionContext = state.reactionCanvas.getContext("2d");
    state.reactionImage = state.reactionContext.createImageData(gridWidth, gridHeight);
  }

  function initializeSandpile() {
    state.sandWidth = 96;
    state.sandHeight = 60;
    state.sand = new Uint32Array(state.sandWidth * state.sandHeight);
    state.sand[(state.sandHeight >> 1) * state.sandWidth + (state.sandWidth >> 1)] =
      120000 + variant * 18000;
    state.sandCanvas = document.createElement("canvas");
    state.sandCanvas.width = state.sandWidth;
    state.sandCanvas.height = state.sandHeight;
    state.sandContext = state.sandCanvas.getContext("2d");
    state.sandImage = state.sandContext.createImageData(state.sandWidth, state.sandHeight);
  }

  function initializeGlyph() {
    const sample = document.createElement("canvas");
    sample.width = 260;
    sample.height = 96;
    const sampleContext = sample.getContext("2d");
    sampleContext.fillStyle = "#000";
    sampleContext.textAlign = "center";
    sampleContext.textBaseline = "middle";
    sampleContext.font = `800 ${CONFIG.mark.length > 7 ? 52 : 66}px Inter, Arial, sans-serif`;
    sampleContext.fillText(CONFIG.mark, sample.width / 2, sample.height / 2 + 3);
    const pixels = sampleContext.getImageData(0, 0, sample.width, sample.height).data;
    const targets = [];
    for (let y = 2; y < sample.height; y += 4) {
      for (let x = 2; x < sample.width; x += 4) {
        if (pixels[(y * sample.width + x) * 4 + 3] > 80) targets.push({ x, y });
      }
    }
    state.glyphTargets = targets.slice(0, 760);
    state.glyphParticles = state.glyphTargets.map((target) => ({
      x: random() * sample.width,
      y: random() * sample.height,
      vx: 0,
      vy: 0,
      tx: target.x,
      ty: target.y,
      seed: random(),
    }));
  }

  function drawReaction() {
    const gw = state.reactionWidth;
    const gh = state.reactionHeight;
    const feed = CONFIG.style === "cellular" ? 0.032 : 0.037 + variant * 0.001;
    const kill = CONFIG.style === "cellular" ? 0.061 : 0.06;
    const steps = reduceMotion.matches ? 8 : 2;
    for (let step = 0; step < steps; step += 1) {
      for (let y = 1; y < gh - 1; y += 1) {
        for (let x = 1; x < gw - 1; x += 1) {
          const i = y * gw + x;
          const u = state.u[i];
          const v = state.v[i];
          const lapU =
            state.u[i - 1] + state.u[i + 1] + state.u[i - gw] + state.u[i + gw] - 4 * u;
          const lapV =
            state.v[i - 1] + state.v[i + 1] + state.v[i - gw] + state.v[i + gw] - 4 * v;
          const reaction = u * v * v;
          state.nextU[i] = clamp(u + 0.18 * lapU - reaction + feed * (1 - u), 0, 1);
          state.nextV[i] = clamp(v + 0.09 * lapV + reaction - (feed + kill) * v, 0, 1);
        }
      }
      const oldU = state.u;
      const oldV = state.v;
      state.u = state.nextU;
      state.v = state.nextV;
      state.nextU = oldU;
      state.nextV = oldV;
    }
    const data = state.reactionImage.data;
    for (let i = 0; i < gw * gh; i += 1) {
      const value = clamp((state.u[i] - state.v[i]) * 1.4, 0, 1);
      const ink = 1 - value;
      const light = 248 - ink * 112;
      const offset = i * 4;
      data[offset] = light - ink * ((CONFIG.hue + 20) % 32);
      data[offset + 1] = light - ink * (CONFIG.hue % 22);
      data[offset + 2] = light;
      data[offset + 3] = 255;
    }
    state.reactionContext.putImageData(state.reactionImage, 0, 0);
    context.imageSmoothingEnabled = false;
    context.drawImage(state.reactionCanvas, 0, 0, width, height);
  }

  function drawFlow(time) {
    paintBase("#f7faf9");
    context.lineCap = "round";
    const lines = 56;
    for (let i = 0; i < lines; i += 1) {
      let x = ((i * 47.3 + variant * 19) % width) - 30;
      let y = ((i * 83.1 + 20) % height) - 10;
      context.beginPath();
      context.moveTo(x, y);
      for (let segment = 0; segment < 28; segment += 1) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.max(24, Math.hypot(dx, dy));
        const curl = Math.sin(x * 0.018 + time * 0.7) + Math.cos(y * 0.021 - time * 0.48);
        const vortex = pointer.active && distance < 150 ? (1 - distance / 150) * 2.1 : 0;
        const angle = curl + Math.atan2(dy, dx) * vortex;
        x += Math.cos(angle) * 5.2;
        y += Math.sin(angle) * 5.2;
        context.lineTo(x, y);
      }
      context.strokeStyle = tone((i / lines) * 96, 0.16 + (i % 4) * 0.035, 38);
      context.lineWidth = 0.65 + (i % 5) * 0.16;
      context.stroke();
    }
  }

  function movingSeeds(time, count) {
    return state.seeds.slice(0, count).map((seed, index) => ({
      x:
        (0.12 + seed.x * 0.76 + Math.sin(time * seed.speed + seed.phase) * 0.09) *
        width,
      y:
        (0.14 + seed.y * 0.7 + Math.cos(time * seed.speed * 0.83 + seed.phase) * 0.1) *
        height,
      radius: 20 + (index % 4) * 9,
    }));
  }

  function drawMetaballs(time) {
    paintBase("#f8f9fb");
    const sources = movingSeeds(time, 7);
    const step = CONFIG.heavy ? 5 : 4;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        let field = 0;
        for (const source of sources) {
          const dx = x - source.x;
          const dy = y - source.y;
          field += (source.radius * source.radius) / (dx * dx + dy * dy + 24);
        }
        const band = Math.floor(field * 5.2);
        if (field > 0.34) {
          context.fillStyle =
            band % 3 === 0 ? tone(18 + band * 3, 0.78, 54) : tone(band * 6, 0.17, 42);
          context.fillRect(x, y, step + 0.5, step + 0.5);
        }
      }
    }
  }

  function drawVoronoi(time) {
    paintBase("#f8faf9");
    const sources = movingSeeds(time, 9);
    const step = 5;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        let first = Infinity;
        let second = Infinity;
        let owner = 0;
        sources.forEach((source, index) => {
          const distance = (x - source.x) ** 2 + (y - source.y) ** 2;
          if (distance < first) {
            second = first;
            first = distance;
            owner = index;
          } else if (distance < second) second = distance;
        });
        const edge = clamp((Math.sqrt(second) - Math.sqrt(first)) / 18, 0, 1);
        const lens = pointer.active
          ? clamp(1 - Math.hypot(x - pointer.x, y - pointer.y) / 130, 0, 1)
          : 0;
        const light = 94 - edge * 18 - lens * 9;
        context.fillStyle = `hsl(${hue(owner * 23 + lens * 48)} 52% ${light}%)`;
        context.fillRect(x, y, step + 0.5, step + 0.5);
      }
    }
  }

  function drawTopography(time) {
    paintBase("#f7f9f6");
    context.lineCap = "round";
    for (let layer = 0; layer < 30; layer += 1) {
      const baseY = 18 + layer * (height - 36) / 29;
      context.beginPath();
      for (let x = -8; x <= width + 8; x += 3.5) {
        const p = pointer.active ? 1 - clamp(Math.abs(x - pointer.x) / 140, 0, 1) : 0;
        const y =
          baseY +
          softNoise(x * 0.018, layer * 0.12, time * 0.35) * (8 + layer * 0.12) +
          Math.sin(x * 0.025 + time + layer * 0.43) * 2.8 -
          p * Math.sin(layer * 0.7) * 9;
        if (x === -8) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = tone(layer * 2.6, 0.2 + (layer % 5) * 0.06, 35);
      context.lineWidth = layer % 5 === 0 ? 1.25 : 0.62;
      context.stroke();
    }
  }

  function drawPixelSort(time) {
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, `hsl(${hue(-18)} 50% 96%)`);
    gradient.addColorStop(0.5, `hsl(${hue(42)} 64% 82%)`);
    gradient.addColorStop(1, `hsl(${hue(112)} 55% 93%)`);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    for (let x = 0; x < width; x += 3) {
      const wave = height * (0.48 + Math.sin(x * 0.023 + time * 1.4) * 0.13);
      const pull = pointer.active
        ? clamp(1 - Math.abs(x - pointer.x) / 110, 0, 1) * (pointer.y - wave)
        : 0;
      const length = 12 + Math.abs(Math.sin(x * 0.071 - time)) * 88 + Math.abs(pull) * 0.7;
      context.fillStyle = tone(x * 0.31, 0.36, 39 + (x % 9));
      context.fillRect(x, wave - length * 0.5, 1.35, length);
    }
  }

  function drawHalftone(time) {
    paintBase("#faf8f7");
    if (CONFIG.style === "poster") {
      context.save();
      context.globalAlpha = 0.055;
      context.fillStyle = "#18181b";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = "900 72px Inter, Arial, sans-serif";
      context.fillText(CONFIG.mark, width / 2, height / 2 + 5);
      context.restore();
    }
    const px = pointer.active ? pointer.x : width * (0.5 + Math.sin(time * 0.6) * 0.18);
    const py = pointer.active ? pointer.y : height * 0.54;
    const gap = 10;
    for (let y = 25; y < height - 16; y += gap) {
      for (let x = 12; x < width - 12; x += gap) {
        const distance = Math.hypot(x - px, y - py);
        const lens = clamp(1 - distance / 92, 0, 1);
        const wave = 0.5 + 0.5 * Math.sin(x * 0.04 + y * 0.026 - time);
        const radius = 1.2 + wave * 1.6 + lens * 3.4;
        [-1, 0, 1].forEach((channel) => {
          context.beginPath();
          context.arc(x + channel * lens * 2.6, y, radius, 0, Math.PI * 2);
          context.fillStyle = tone(channel * 92 + wave * 20, channel === 0 ? 0.58 : 0.28, 42);
          context.fill();
        });
      }
    }
  }

  function drawFeedback(time) {
    paintBase("#f8f8fa");
    context.save();
    context.translate(width / 2, height / 2);
    const lean = pointer.active ? (pointer.nx - 0.5) * 0.24 : Math.sin(time * 0.35) * 0.08;
    for (let layer = 24; layer >= 0; layer -= 1) {
      const scale = 0.16 + layer * 0.035;
      const drift = Math.sin(time * 0.8 + layer * 0.31) * layer * 0.55;
      context.save();
      context.rotate(lean * (layer / 24) + time * 0.007 * layer);
      context.translate(drift, Math.cos(time * 0.6 + layer) * 2);
      roundRectPath(-width * scale * 0.5, -height * scale * 0.44, width * scale, height * scale * 0.88, 12 * scale + 2);
      context.strokeStyle = tone(layer * 4.5, 0.12 + layer * 0.008, 42);
      context.lineWidth = 0.7 + (24 - layer) * 0.035;
      context.stroke();
      context.restore();
    }
    context.restore();
  }

  function drawGlyph(time) {
    paintBase("#f8faf9");
    const scale = Math.min(width / 292, height / 128);
    const ox = (width - 260 * scale) / 2;
    const oy = (height - 96 * scale) / 2 + 6;
    const orbitMix = (Math.sin(time * 0.75) + 1) * 0.5;
    state.glyphParticles.forEach((particle, index) => {
      const angle = index * 0.087 + time * 0.7;
      const orbitX = 130 + Math.cos(angle) * (35 + (index % 80));
      const orbitY = 48 + Math.sin(angle * 1.13) * (18 + (index % 34));
      const targetX = lerp(particle.tx, orbitX, Math.max(0, orbitMix - 0.63) * 1.85);
      const targetY = lerp(particle.ty, orbitY, Math.max(0, orbitMix - 0.63) * 1.85);
      particle.vx = (particle.vx + (targetX - particle.x) * 0.04) * 0.82;
      particle.vy = (particle.vy + (targetY - particle.y) * 0.04) * 0.82;
      particle.x += particle.vx;
      particle.y += particle.vy;
      context.fillStyle = tone(particle.seed * 96, 0.58, 37 + particle.seed * 16);
      context.fillRect(ox + particle.x * scale, oy + particle.y * scale, 1.35, 1.35);
    });
  }

  function jaggedLine(ax, ay, bx, by, depth, phase) {
    if (depth <= 0) {
      context.lineTo(bx, by);
      return;
    }
    const mx = (ax + bx) * 0.5;
    const my = (ay + by) * 0.5;
    const dx = bx - ax;
    const dy = by - ay;
    const length = Math.hypot(dx, dy);
    const jitter = Math.sin(phase * 7.31 + depth * 11.7) * length * 0.12;
    const nx = -dy / Math.max(1, length);
    const ny = dx / Math.max(1, length);
    const px = mx + nx * jitter;
    const py = my + ny * jitter;
    jaggedLine(ax, ay, px, py, depth - 1, phase + 0.37);
    jaggedLine(px, py, bx, by, depth - 1, phase + 0.73);
  }

  function drawElectric(time) {
    paintBase("#f8f9fb");
    const anchors = [
      { x: width * 0.16, y: height * (0.58 + Math.sin(time) * 0.08) },
      { x: width * 0.52, y: height * (0.36 + Math.cos(time * 0.8) * 0.1) },
      { x: width * 0.84, y: height * (0.62 + Math.sin(time * 1.2) * 0.07) },
    ];
    if (pointer.active) anchors[1] = { x: pointer.x, y: pointer.y };
    [[0, 1], [1, 2], [2, 0]].forEach(([from, to], link) => {
      for (let glow = 3; glow >= 0; glow -= 1) {
        context.beginPath();
        context.moveTo(anchors[from].x, anchors[from].y);
        jaggedLine(anchors[from].x, anchors[from].y, anchors[to].x, anchors[to].y, 5, time * 1.7 + link * 2.3);
        context.strokeStyle = tone(link * 58, glow === 0 ? 0.78 : 0.055, glow === 0 ? 52 : 44);
        context.lineWidth = glow === 0 ? 0.85 : glow * 4.2;
        context.stroke();
      }
    });
    anchors.forEach((anchor, index) => {
      context.beginPath();
      context.arc(anchor.x, anchor.y, 3.2 + index, 0, Math.PI * 2);
      context.fillStyle = tone(index * 64, 0.8, 48);
      context.fill();
    });
  }

  function drawBoids() {
    paintBase("#f7faf9");
    const targetX = pointer.active ? pointer.x : width * 0.5;
    const targetY = pointer.active ? pointer.y : height * 0.52;
    const center = state.boids.reduce(
      (sum, boid) => ({ x: sum.x + boid.x / state.boids.length, y: sum.y + boid.y / state.boids.length }),
      { x: 0, y: 0 },
    );
    state.boids.forEach((boid, index) => {
      const dx = targetX - boid.x;
      const dy = targetY - boid.y;
      const centerPullX = (center.x - boid.x) * 0.00055;
      const centerPullY = (center.y - boid.y) * 0.00055;
      boid.vx += dx * 0.00016 + centerPullX - dy * 0.00042;
      boid.vy += dy * 0.00016 + centerPullY + dx * 0.00042;
      const speed = Math.max(0.8, Math.hypot(boid.vx, boid.vy));
      if (speed > 2.4) {
        boid.vx = (boid.vx / speed) * 2.4;
        boid.vy = (boid.vy / speed) * 2.4;
      }
      boid.x += boid.vx;
      boid.y += boid.vy;
      if (boid.x < -10) boid.x = width + 10;
      if (boid.x > width + 10) boid.x = -10;
      if (boid.y < -10) boid.y = height + 10;
      if (boid.y > height + 10) boid.y = -10;
      const angle = Math.atan2(boid.vy, boid.vx);
      context.save();
      context.translate(boid.x, boid.y);
      context.rotate(angle);
      context.beginPath();
      context.moveTo(4.5, 0);
      context.lineTo(-3.4, -1.7);
      context.lineTo(-2.1, 0);
      context.lineTo(-3.4, 1.7);
      context.closePath();
      context.fillStyle = tone(index * 1.1, 0.55, 36 + (index % 4) * 5);
      context.fill();
      context.restore();
    });
  }

  function drawGravity(time) {
    paintBase("#f8f8fb");
    const left = { x: width * 0.38, y: height * 0.53 };
    const right = { x: width * 0.62, y: height * 0.48 };
    [left, right].forEach((core, index) => {
      const glow = context.createRadialGradient(core.x, core.y, 0, core.x, core.y, 42);
      glow.addColorStop(0, tone(index * 92, 0.38, 52));
      glow.addColorStop(1, tone(index * 92, 0, 52));
      context.fillStyle = glow;
      context.fillRect(core.x - 44, core.y - 44, 88, 88);
    });
    for (let i = 0; i < 180; i += 1) {
      const phase = i * 2.399 + time * (0.11 + (i % 7) * 0.008);
      const radius = 16 + (i % 54) * 2.1;
      const mix = 0.5 + Math.sin(i * 0.73 + time * 0.4) * 0.46;
      const cx = lerp(left.x, right.x, mix);
      const cy = lerp(left.y, right.y, mix);
      const x = cx + Math.cos(phase) * radius;
      const y = cy + Math.sin(phase) * radius * 0.43;
      context.fillStyle = tone(i * 1.8, 0.42, 42 + (i % 5) * 4);
      context.fillRect(x, y, 1.3, 1.3);
    }
  }

  function drawSandpile() {
    const sw = state.sandWidth;
    const sh = state.sandHeight;
    const sand = state.sand;
    const center = (sh >> 1) * sw + (sw >> 1);
    sand[center] += reduceMotion.matches ? 0 : 360 + variant * 24;
    for (let sweep = 0; sweep < (reduceMotion.matches ? 36 : 4); sweep += 1) {
      for (let y = 1; y < sh - 1; y += 1) {
        for (let x = 1; x < sw - 1; x += 1) {
          const index = y * sw + x;
          if (sand[index] >= 4) {
            const spill = sand[index] >> 2;
            sand[index] -= spill * 4;
            sand[index - 1] += spill;
            sand[index + 1] += spill;
            sand[index - sw] += spill;
            sand[index + sw] += spill;
          }
        }
      }
    }
    const data = state.sandImage.data;
    for (let i = 0; i < sand.length; i += 1) {
      const level = sand[i] % 4;
      const light = [248, 204, 142, 70][level];
      const offset = i * 4;
      data[offset] = level === 0 ? 248 : light + 24;
      data[offset + 1] = level === 0 ? 248 : light + ((CONFIG.hue + 8) % 36);
      data[offset + 2] = level === 0 ? 248 : Math.min(246, light + 72);
      data[offset + 3] = 255;
    }
    state.sandContext.putImageData(state.sandImage, 0, 0);
    context.imageSmoothingEnabled = false;
    context.drawImage(state.sandCanvas, 0, 0, width, height);
  }

  function drawInterference(time) {
    paintBase("#f8fafb");
    const sources = [
      { x: pointer.active ? pointer.x : width * 0.28, y: pointer.active ? pointer.y : height * 0.56 },
      { x: width * (0.68 + Math.sin(time * 0.4) * 0.08), y: height * 0.43 },
      { x: width * 0.52, y: height * (0.7 + Math.cos(time * 0.31) * 0.08) },
    ];
    const gap = 8;
    for (let y = 22; y < height - 12; y += gap) {
      for (let x = 10; x < width - 10; x += gap) {
        let amplitude = 0;
        sources.forEach((source, index) => {
          amplitude += Math.sin(Math.hypot(x - source.x, y - source.y) * 0.12 - time * (2 + index * 0.24));
        });
        amplitude /= sources.length;
        const radius = 0.8 + Math.abs(amplitude) * 3.2;
        context.beginPath();
        context.arc(x, y + amplitude * 2.4, radius, 0, Math.PI * 2);
        context.fillStyle = tone(amplitude * 74 + x * 0.08, 0.28 + Math.abs(amplitude) * 0.42, 44);
        context.fill();
      }
    }
  }

  function drawCaustic(time) {
    paintBase("#f6fbfb");
    context.globalCompositeOperation = "multiply";
    for (let line = 0; line < 54; line += 1) {
      context.beginPath();
      for (let x = -12; x <= width + 12; x += 4) {
        const base = 18 + line * (height - 36) / 53;
        const y =
          base +
          Math.sin(x * 0.031 + time * 1.25 + line * 0.29) * 6 +
          Math.sin(x * 0.012 - time * 0.72 + line * 0.57) * 7;
        if (x === -12) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = tone(line * 1.7, line % 5 === 0 ? 0.23 : 0.07, 45);
      context.lineWidth = line % 5 === 0 ? 2.2 : 0.7;
      context.stroke();
    }
    context.globalCompositeOperation = "source-over";
  }

  function drawAttractor(time) {
    paintBase("#f8f8fa");
    const a = -1.7 + Math.sin(time * 0.13 + variant) * 0.08;
    const b = 1.3 + Math.cos(time * 0.11) * 0.08;
    const c = -0.1 + Math.sin(time * 0.09) * 0.12;
    const d = -1.21 + Math.cos(time * 0.07 + variant) * 0.09;
    let x = 0.1;
    let y = 0.1;
    context.globalCompositeOperation = "multiply";
    for (let i = 0; i < 8200; i += 1) {
      const nx = Math.sin(a * y) + c * Math.cos(a * x);
      const ny = Math.sin(b * x) + d * Math.cos(b * y);
      x = nx;
      y = ny;
      if (i > 80) {
        const px = width * 0.5 + x * width * 0.19;
        const py = height * 0.52 + y * height * 0.22;
        context.fillStyle = tone(i * 0.012, 0.055, 38);
        context.fillRect(px, py, 0.75, 0.75);
      }
    }
    context.globalCompositeOperation = "source-over";
  }

  function drawRibbons(time) {
    paintBase("#faf8fa");
    context.lineCap = "round";
    const monogram = CONFIG.style === "monogram";
    for (let ribbon = 0; ribbon < 24; ribbon += 1) {
      const phase = ribbon / 23;
      context.beginPath();
      if (monogram) {
        const cx = width * 0.5;
        const top = 44;
        const bottom = height - 34;
        context.moveTo(cx - 76 + phase * 28, top);
        context.bezierCurveTo(
          cx - 24 + Math.sin(time + ribbon) * 16,
          height * 0.42,
          cx - 12 + Math.cos(time * 0.7 + ribbon) * 18,
          height * 0.73,
          cx,
          bottom,
        );
        context.bezierCurveTo(
          cx + 12 + Math.sin(time * 0.6 + ribbon) * 18,
          height * 0.73,
          cx + 24 + Math.cos(time + ribbon) * 16,
          height * 0.42,
          cx + 76 - phase * 28,
          top,
        );
      } else {
        const y = 22 + phase * (height - 44);
        context.moveTo(-18, y);
        context.bezierCurveTo(
          width * 0.28,
          y + Math.sin(time + ribbon * 0.38) * 54,
          width * 0.68,
          y + Math.cos(time * 0.72 + ribbon * 0.42) * 48,
          width + 18,
          y + Math.sin(time * 0.55 + ribbon) * 18,
        );
      }
      context.strokeStyle = tone(ribbon * 4.8, 0.14 + (ribbon % 5) * 0.06, 40);
      context.lineWidth = 0.7 + (ribbon % 6) * 0.35;
      context.stroke();
    }
  }

  function warpedPoint(x, y, lensX, lensY, strength) {
    const dx = x - lensX;
    const dy = y - lensY;
    const distance = Math.hypot(dx, dy);
    const radius = Math.min(width, height) * 0.32;
    if (distance >= radius) return { x, y, amount: 0 };
    const amount = (1 - distance / radius) ** 2 * strength;
    return { x: x + dx * amount, y: y + dy * amount, amount };
  }

  function drawRefraction(time) {
    paintBase("#f8faf9");
    const lensX = pointer.active ? pointer.x : width * (0.56 + Math.sin(time * 0.42) * 0.16);
    const lensY = pointer.active ? pointer.y : height * (0.52 + Math.cos(time * 0.36) * 0.08);
    for (let line = -height; line < width + height; line += 16) {
      [-2.2, 0, 2.2].forEach((channel, channelIndex) => {
        context.beginPath();
        for (let step = -height; step < width + height; step += 4) {
          const x = step;
          const y = step - line;
          const point = warpedPoint(x, y, lensX, lensY, -0.42);
          const px = point.x + channel * point.amount * 3;
          if (step === -height) context.moveTo(px, point.y);
          else context.lineTo(px, point.y);
        }
        context.strokeStyle = tone(channelIndex * 105, channelIndex === 1 ? 0.22 : 0.11, 42);
        context.lineWidth = channelIndex === 1 ? 0.8 : 1.2;
        context.stroke();
      });
    }
    const radius = Math.min(width, height) * 0.32;
    const glass = context.createRadialGradient(lensX - radius * 0.25, lensY - radius * 0.3, 2, lensX, lensY, radius);
    glass.addColorStop(0, "rgba(255,255,255,.72)");
    glass.addColorStop(0.55, tone(30, 0.05, 62));
    glass.addColorStop(0.86, tone(88, 0.08, 52));
    glass.addColorStop(1, "rgba(255,255,255,.74)");
    context.beginPath();
    context.arc(lensX, lensY, radius, 0, Math.PI * 2);
    context.fillStyle = glass;
    context.fill();
    context.strokeStyle = tone(48, 0.28, 52);
    context.lineWidth = 1.2;
    context.stroke();
  }

  function drawTypography(time) {
    paintBase(CONFIG.style === "chrome" ? "#f4f5f6" : "#faf9f8");
    const word = CONFIG.mark;
    const size = Math.min(72, Math.max(42, width / (word.length * 0.69)));
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `900 ${size}px Inter, Arial, sans-serif`;
    const cx = width / 2;
    const cy = height / 2 + 9;
    if (CONFIG.style === "chrome") {
      for (let layer = 12; layer >= 0; layer -= 1) {
        context.fillStyle = layer % 3 === 0 ? `rgba(255,255,255,${0.13 + layer * 0.02})` : `rgba(39,39,42,${0.025 + layer * 0.008})`;
        context.fillText(word, cx + Math.sin(time + layer) * layer * 0.12, cy + layer * 0.7 - 5);
      }
      const metal = context.createLinearGradient(0, cy - size, 0, cy + size);
      metal.addColorStop(0, "#ffffff");
      metal.addColorStop(0.28, "#818892");
      metal.addColorStop(0.47, "#fbfbfb");
      metal.addColorStop(0.68, "#454b55");
      metal.addColorStop(1, "#f7f7f7");
      context.fillStyle = metal;
      context.fillText(word, cx, cy);
      return;
    }
    if (CONFIG.style === "prism") {
      [-7, -3, 0, 3, 7].forEach((offset, index) => {
        context.fillStyle = tone(index * 78, index === 2 ? 0.62 : 0.25, 43);
        context.fillText(word, cx + offset * Math.sin(time * 0.7 + index), cy + offset * 0.25);
      });
      return;
    }
    if (CONFIG.style === "ink") {
      for (let ring = 10; ring >= 0; ring -= 1) {
        const drift = Math.sin(time * 1.2 + ring * 2.1) * ring * 0.28;
        context.strokeStyle = tone(ring * 3, 0.04 + ring * 0.017, 27);
        context.lineWidth = ring * 1.3 + 1;
        context.strokeText(word, cx + drift, cy);
      }
      context.fillStyle = tone(0, 0.82, 26);
      context.fillText(word, cx, cy);
      return;
    }
    if (CONFIG.style === "slice" || CONFIG.style === "scanline") {
      const slices = 15;
      for (let slice = 0; slice < slices; slice += 1) {
        const sliceHeight = size * 1.35 / slices;
        const top = cy - size * 0.68 + slice * sliceHeight;
        const scan = (time * 52) % (size * 1.6);
        const wave = Math.sin(slice * 0.82 + time * 1.6) * (CONFIG.style === "slice" ? 12 : 4);
        const active = Math.abs(top - (cy - size * 0.72 + scan)) < sliceHeight * 1.6;
        context.save();
        context.beginPath();
        context.rect(0, top, width, sliceHeight + 1);
        context.clip();
        context.shadowColor = active ? tone(76, 0.46, 48) : "transparent";
        context.shadowBlur = active ? 16 : 0;
        context.fillStyle = active ? tone(12, 0.86, 38) : "#29292e";
        context.fillText(word, cx + wave + (active ? 7 : 0), cy - (active ? 2 : 0));
        context.restore();
      }
      return;
    }
    if (CONFIG.style === "echo") {
      for (let layer = 22; layer >= 0; layer -= 1) {
        const scale = 0.38 + layer * 0.032;
        context.save();
        context.translate(cx, cy);
        context.scale(scale, scale);
        context.translate(-cx, -cy);
        context.strokeStyle = tone(layer * 4, 0.05 + layer * 0.012, 42);
        context.lineWidth = 2 / scale;
        context.strokeText(word, cx, cy);
        context.restore();
      }
      return;
    }
    if (CONFIG.style === "kerning") {
      const letters = [...word];
      const spacing = Math.min(54, width / (letters.length + 1));
      letters.forEach((letter, index) => {
        const influence = Math.sin(time * 1.1 + index * 0.72);
        context.save();
        context.translate(cx + (index - (letters.length - 1) / 2) * spacing, cy + influence * 10);
        context.rotate(influence * 0.09);
        context.scale(1 - Math.abs(influence) * 0.08, 1 + Math.abs(influence) * 0.07);
        context.fillStyle = tone(index * 13, 0.82, 34);
        context.fillText(letter, 0, 0);
        context.restore();
      });
      return;
    }
    if (CONFIG.style === "heat") {
      for (let band = 0; band < 12; band += 1) {
        const y = cy - size * 0.7 + band * (size * 1.4 / 12);
        const heatCenter = ((time * 84) % (width + 160)) - 80;
        const offset = Math.exp(-((cx - heatCenter) ** 2) / 18000) * Math.sin(time * 4 + band) * 13;
        context.save();
        context.beginPath();
        context.rect(0, y, width, size * 1.4 / 12 + 1);
        context.clip();
        context.fillStyle = tone(band * 4, 0.84, 35);
        context.fillText(word, cx + offset, cy);
        context.restore();
      }
      return;
    }
    context.fillStyle = "#242429";
    context.fillText(word, cx, cy);
    const lensX = pointer.active ? pointer.x : width * (0.5 + Math.sin(time * 0.5) * 0.23);
    const lens = context.createRadialGradient(lensX - 10, cy - 20, 2, lensX, cy, 66);
    lens.addColorStop(0, "rgba(255,255,255,.9)");
    lens.addColorStop(0.6, tone(60, 0.14, 70));
    lens.addColorStop(1, tone(120, 0, 55));
    context.beginPath();
    context.arc(lensX, cy, 62, 0, Math.PI * 2);
    context.fillStyle = lens;
    context.fill();
    context.strokeStyle = tone(70, 0.33, 55);
    context.stroke();
  }

  function drawTopographyType(time) {
    paintBase("#f8faf8");
    const buffer = state.buffer || (state.buffer = document.createElement("canvas"));
    buffer.width = Math.max(1, Math.round(width));
    buffer.height = Math.max(1, Math.round(height));
    const bufferContext = buffer.getContext("2d");
    bufferContext.clearRect(0, 0, width, height);
    bufferContext.textAlign = "center";
    bufferContext.textBaseline = "middle";
    bufferContext.font = `900 ${Math.min(102, width / 3.2)}px Inter, Arial, sans-serif`;
    bufferContext.fillStyle = "#000";
    bufferContext.fillText(CONFIG.mark, width / 2, height / 2 + 12);
    bufferContext.globalCompositeOperation = "source-in";
    for (let layer = 0; layer < 34; layer += 1) {
      bufferContext.beginPath();
      for (let x = -5; x <= width + 5; x += 3) {
        const y = 24 + layer * 5.7 + Math.sin(x * 0.033 + time + layer * 0.48) * 8;
        if (x === -5) bufferContext.moveTo(x, y);
        else bufferContext.lineTo(x, y);
      }
      bufferContext.strokeStyle = tone(layer * 3, 0.78, 32 + (layer % 6) * 5);
      bufferContext.lineWidth = layer % 6 === 0 ? 2 : 0.9;
      bufferContext.stroke();
    }
    bufferContext.globalCompositeOperation = "source-over";
    context.drawImage(buffer, 0, 0);
  }

  function drawMorph(time) {
    paintBase("#f8f9fb");
    const columns = 8;
    const rows = 4;
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const phase = time * 0.72 + row * 0.63 + column * 0.47;
        const sides = 3 + Math.floor(((Math.sin(phase) + 1) * 0.5) * 5);
        const radius = 10 + Math.sin(phase * 1.3) * 3.4;
        const x = 34 + column * (width - 68) / (columns - 1);
        const y = 55 + row * (height - 100) / (rows - 1);
        polygon(x, y, radius, sides, phase * 0.26);
        context.fillStyle = tone(column * 12 + row * 23, 0.12 + (row + 1) * 0.08, 46);
        context.fill();
        context.strokeStyle = tone(column * 8, 0.5, 40);
        context.lineWidth = 0.8;
        context.stroke();
      }
    }
  }

  function drawKnot(time) {
    paintBase("#f7faf9");
    context.save();
    context.translate(width / 2, height / 2 + 6);
    for (let pass = 0; pass < 3; pass += 1) {
      context.beginPath();
      for (let i = 0; i <= 720; i += 1) {
        const angle = (i / 720) * Math.PI * 2;
        const radius = 62 + Math.sin(angle * 3 + time) * 22;
        const x = Math.sin(angle * 2) * radius * 1.18;
        const y = Math.sin(angle * 3 + 0.4) * radius * 0.58;
        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = pass === 0 ? "rgba(255,255,255,.9)" : tone(pass * 74, pass === 1 ? 0.56 : 0.24, 42);
      context.lineWidth = pass === 0 ? 7 : pass === 1 ? 3.2 : 1.1;
      context.stroke();
    }
    context.restore();
  }

  function routeNodes(time) {
    return state.seeds.slice(0, 8).map((seed, index) => ({
      x: (0.12 + seed.x * 0.76) * width + Math.sin(time * seed.speed + seed.phase) * 13,
      y: (0.18 + seed.y * 0.64) * height + Math.cos(time * 0.7 + seed.phase) * 11,
      index,
    }));
  }

  function drawRoute(time) {
    paintBase("#f8faf9");
    const nodes = routeNodes(time);
    const links = [[0, 2], [2, 4], [4, 6], [1, 3], [3, 5], [5, 7], [0, 5], [2, 7]];
    links.forEach(([fromIndex, toIndex], linkIndex) => {
      const from = nodes[fromIndex];
      const to = nodes[toIndex];
      const bend = Math.sin(time * 0.9 + linkIndex) * 22;
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.bezierCurveTo((from.x + to.x) / 2, from.y + bend, (from.x + to.x) / 2, to.y - bend, to.x, to.y);
      context.strokeStyle = tone(linkIndex * 19, 0.24, 42);
      context.lineWidth = linkIndex % 3 === 0 ? 1.8 : 0.75;
      context.stroke();
      const progress = (time * 0.21 + linkIndex * 0.17) % 1;
      const px = lerp(from.x, to.x, progress);
      const py = lerp(from.y, to.y, progress) + Math.sin(progress * Math.PI) * bend * 0.7;
      context.beginPath();
      context.arc(px, py, 2.2, 0, Math.PI * 2);
      context.fillStyle = tone(70 + linkIndex * 13, 0.82, 49);
      context.fill();
    });
    nodes.forEach((node) => {
      context.beginPath();
      context.arc(node.x, node.y, 4.5, 0, Math.PI * 2);
      context.fillStyle = "#fff";
      context.fill();
      context.strokeStyle = tone(node.index * 24, 0.64, 38);
      context.lineWidth = 1.2;
      context.stroke();
    });
  }

  function drawPoster(time) {
    paintBase("#faf8f7");
    context.save();
    context.translate(width / 2, height / 2 + 8);
    for (let layer = 14; layer >= 0; layer -= 1) {
      const radius = 28 + layer * 7.2;
      const offset = Math.sin(time * 0.85 + layer * 0.61) * (layer % 2 === 0 ? 6 : -6);
      polygon(offset, 0, radius, 7 + (layer % 3), time * 0.07 + layer * 0.13);
      context.fillStyle = layer % 3 === 0 ? tone(layer * 8, 0.22, 48) : "rgba(255,255,255,.28)";
      context.fill();
      context.strokeStyle = tone(layer * 6, 0.38, 38);
      context.lineWidth = layer % 4 === 0 ? 1.5 : 0.65;
      context.stroke();
    }
    context.restore();
  }

  function drawShards(time) {
    paintBase("#f9f8fa");
    const assemble = (Math.cos(time * 0.74) + 1) * 0.5;
    const count = 54;
    for (let index = 0; index < count; index += 1) {
      const angle = index * 2.399;
      const targetRadius = 18 + (index % 9) * 8;
      const scatterRadius = 70 + (index % 12) * 8;
      const radius = lerp(scatterRadius, targetRadius, assemble);
      const cx = width / 2 + Math.cos(angle) * radius;
      const cy = height / 2 + 7 + Math.sin(angle * 1.17) * radius * 0.48;
      context.save();
      context.translate(cx, cy);
      context.rotate(angle + (1 - assemble) * time);
      context.beginPath();
      context.moveTo(-7, 6);
      context.lineTo(5 + (index % 5), -8);
      context.lineTo(10, 7);
      context.closePath();
      context.fillStyle = tone(index * 5, 0.18 + assemble * 0.48, 40 + (index % 5) * 5);
      context.fill();
      context.restore();
    }
  }

  function drawAscii(time) {
    paintBase("#f7faf9");
    const chars = "·:+*#%@";
    context.textAlign = "center";
    context.textBaseline = "middle";
    const focusX = pointer.active ? pointer.x : width * (0.5 + Math.sin(time * 0.5) * 0.25);
    for (let y = 32; y < height - 16; y += 11) {
      for (let x = 12; x < width - 12; x += 9) {
        const depth =
          0.5 +
          0.5 * Math.sin(x * 0.041 + time) * Math.cos(y * 0.054 - time * 0.73);
        const focus = clamp(1 - Math.abs(x - focusX) / 92, 0, 1);
        const index = Math.floor(clamp(depth * chars.length + focus * 2, 0, chars.length - 1));
        context.font = `${6 + focus * 4}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        context.fillStyle = tone(depth * 70, 0.18 + focus * 0.58, 34 + depth * 18);
        context.fillText(chars[index], x, y);
      }
    }
  }

  function drawLightShafts(time) {
    paintBase("#f9f8f4");
    context.globalCompositeOperation = "multiply";
    for (let beam = 0; beam < 12; beam += 1) {
      const sourceX = width * (0.08 + beam / 11 * 0.84) + Math.sin(time * 0.5 + beam) * 12;
      const targetX = width * (0.5 + Math.sin(time * 0.23 + beam * 0.81) * 0.42);
      const gradient = context.createLinearGradient(sourceX, 0, targetX, height);
      gradient.addColorStop(0, tone(beam * 15, 0.02, 55));
      gradient.addColorStop(0.55, tone(beam * 15, 0.11, 58));
      gradient.addColorStop(1, tone(beam * 15, 0, 58));
      context.beginPath();
      context.moveTo(sourceX - 3, 0);
      context.lineTo(sourceX + 3, 0);
      context.lineTo(targetX + 48, height);
      context.lineTo(targetX - 48, height);
      context.closePath();
      context.fillStyle = gradient;
      context.fill();
    }
    context.globalCompositeOperation = "source-over";
    for (let dot = 0; dot < 80; dot += 1) {
      const x = (dot * 71.7) % width;
      const y = (dot * 37.1 + time * 8) % height;
      context.fillStyle = tone(dot, 0.12, 48);
      context.fillRect(x, y, 0.8, 0.8);
    }
  }

  function drawGlassOrb(time) {
    paintBase("#f7faf9");
    const cx = pointer.active ? lerp(width / 2, pointer.x, 0.18) : width / 2;
    const cy = pointer.active ? lerp(height / 2 + 8, pointer.y, 0.15) : height / 2 + 8;
    const radius = Math.min(width, height) * 0.31;
    context.save();
    context.beginPath();
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.clip();
    for (let line = -radius * 2; line < radius * 2; line += 10) {
      context.beginPath();
      for (let x = cx - radius; x <= cx + radius; x += 3) {
        const normalized = (x - cx) / radius;
        const y = cy + line * 0.34 + Math.sin(normalized * Math.PI * 3 + time + line) * 13 * (1 - normalized * normalized);
        if (x === cx - radius) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = tone(line * 0.8, 0.12, 44);
      context.stroke();
    }
    const core = context.createRadialGradient(cx - radius * 0.32, cy - radius * 0.4, 2, cx, cy, radius);
    core.addColorStop(0, "rgba(255,255,255,.82)");
    core.addColorStop(0.52, tone(48, 0.06, 66));
    core.addColorStop(0.82, tone(110, 0.12, 52));
    core.addColorStop(1, "rgba(255,255,255,.72)");
    context.fillStyle = core;
    context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    context.restore();
    context.beginPath();
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.strokeStyle = tone(64, 0.28, 53);
    context.lineWidth = 1.3;
    context.stroke();
  }

  function drawFilm(time) {
    const gradient = context.createLinearGradient(0, 0, width, height);
    for (let stop = 0; stop <= 8; stop += 1) {
      gradient.addColorStop(stop / 8, `hsl(${hue(stop * 52 + time * 22)} 62% ${90 - (stop % 3) * 7}%)`);
    }
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = "screen";
    for (let blob = 0; blob < 9; blob += 1) {
      const x = width * (0.1 + ((blob * 0.173 + time * 0.017) % 0.9));
      const y = height * (0.18 + Math.sin(time * 0.32 + blob) * 0.25 + (blob % 3) * 0.2);
      const radius = 32 + (blob % 4) * 16;
      const glow = context.createRadialGradient(x, y, 0, x, y, radius);
      glow.addColorStop(0, tone(blob * 44, 0.28, 72));
      glow.addColorStop(1, tone(blob * 44, 0, 72));
      context.fillStyle = glow;
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    context.globalCompositeOperation = "source-over";
  }

  function drawDial(time) {
    paintBase("#f6f7f8");
    const cx = width / 2;
    const cy = height / 2 + 8;
    const radius = Math.min(width, height) * 0.28;
    if (!pointer.down) state.dial += Math.sin(time * 0.6) * 0.002;
    const shadow = context.createRadialGradient(cx - 16, cy - 20, 2, cx, cy, radius * 1.3);
    shadow.addColorStop(0, "#ffffff");
    shadow.addColorStop(0.45, "#d8dce0");
    shadow.addColorStop(0.72, "#8b929b");
    shadow.addColorStop(1, "#f5f6f7");
    context.beginPath();
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.fillStyle = shadow;
    context.fill();
    for (let tick = 0; tick < 96; tick += 1) {
      const angle = (tick / 96) * Math.PI * 2;
      context.beginPath();
      context.moveTo(cx + Math.cos(angle) * radius * 0.72, cy + Math.sin(angle) * radius * 0.72);
      context.lineTo(cx + Math.cos(angle) * radius * 0.92, cy + Math.sin(angle) * radius * 0.92);
      context.strokeStyle = tick % 8 === 0 ? tone(tick, 0.46, 32) : "rgba(39,39,42,.09)";
      context.lineWidth = tick % 8 === 0 ? 1.3 : 0.45;
      context.stroke();
    }
    context.beginPath();
    context.moveTo(cx, cy);
    context.lineTo(cx + Math.cos(state.dial) * radius * 0.6, cy + Math.sin(state.dial) * radius * 0.6);
    context.strokeStyle = tone(28, 0.86, 35);
    context.lineWidth = 3;
    context.lineCap = "round";
    context.stroke();
  }

  function drawRelief(time) {
    paintBase("#f1eee7");
    const lightX = pointer.active ? pointer.nx * 18 - 9 : Math.sin(time * 0.5) * 7;
    const lightY = pointer.active ? pointer.ny * 18 - 9 : Math.cos(time * 0.47) * 7;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `900 ${Math.min(76, width / 5)}px Georgia, serif`;
    for (let layer = 12; layer >= 1; layer -= 1) {
      context.fillStyle = layer % 2 === 0 ? "rgba(255,255,255,.18)" : "rgba(95,82,62,.035)";
      context.fillText(CONFIG.mark, width / 2 + lightX * layer * 0.08, height / 2 + 9 + lightY * layer * 0.08);
    }
    context.fillStyle = "#e8e2d7";
    context.fillText(CONFIG.mark, width / 2, height / 2 + 9);
    context.strokeStyle = "rgba(255,255,255,.7)";
    context.lineWidth = 1;
    context.strokeText(CONFIG.mark, width / 2 - lightX * 0.12, height / 2 + 9 - lightY * 0.12);
  }

  function isoPoint(gridX, gridY, gridZ) {
    const scale = 10;
    return {
      x: width / 2 + (gridX - gridY) * scale,
      y: height * 0.72 + (gridX + gridY) * scale * 0.5 - gridZ * scale,
    };
  }

  function drawVoxel(time) {
    paintBase("#f7f9fa");
    const cubes = [];
    for (let gy = -5; gy <= 5; gy += 1) {
      for (let gx = -7; gx <= 7; gx += 1) {
        const distance = Math.hypot(gx - (pointer.nx - 0.5) * 4, gy - (pointer.ny - 0.5) * 3);
        const heightValue = 0.6 + (Math.sin(distance * 1.1 - time * 1.5) + 1) * 1.7 + softNoise(gx, gy, variant) * 0.8;
        cubes.push({ gx, gy, h: heightValue });
      }
    }
    cubes.sort((a, b) => a.gx + a.gy - (b.gx + b.gy));
    cubes.forEach((cube, index) => {
      const base = isoPoint(cube.gx, cube.gy, 0);
      const top = isoPoint(cube.gx, cube.gy, cube.h);
      const half = 8;
      context.beginPath();
      context.moveTo(top.x, top.y - half * 0.45);
      context.lineTo(top.x + half, top.y);
      context.lineTo(top.x, top.y + half * 0.45);
      context.lineTo(top.x - half, top.y);
      context.closePath();
      context.fillStyle = tone(cube.h * 12, 0.58, 72);
      context.fill();
      context.beginPath();
      context.moveTo(top.x - half, top.y);
      context.lineTo(top.x, top.y + half * 0.45);
      context.lineTo(base.x, base.y + half * 0.45);
      context.lineTo(base.x - half, base.y);
      context.closePath();
      context.fillStyle = tone(index * 0.3, 0.34, 48);
      context.fill();
      context.beginPath();
      context.moveTo(top.x + half, top.y);
      context.lineTo(top.x, top.y + half * 0.45);
      context.lineTo(base.x, base.y + half * 0.45);
      context.lineTo(base.x + half, base.y);
      context.closePath();
      context.fillStyle = tone(38 + index * 0.2, 0.22, 42);
      context.fill();
    });
  }

  function drawHyperbolic(time) {
    paintBase("#f8f8fa");
    const cx = width / 2;
    const cy = height / 2 + 8;
    const boundary = Math.min(width, height) * 0.4;
    context.save();
    context.beginPath();
    context.arc(cx, cy, boundary, 0, Math.PI * 2);
    context.clip();
    for (let ring = 1; ring < 10; ring += 1) {
      const count = ring * 8;
      const radial = boundary * Math.tanh(ring * 0.23);
      for (let index = 0; index < count; index += 1) {
        const angle = index / count * Math.PI * 2 + time * 0.04 * (ring % 2 ? 1 : -1);
        const radius = boundary * 0.24 / (ring + 0.35);
        context.beginPath();
        context.arc(cx + Math.cos(angle) * radial, cy + Math.sin(angle) * radial, radius, 0, Math.PI * 2);
        context.strokeStyle = tone(ring * 19 + index, 0.18 + ring * 0.025, 40);
        context.lineWidth = ring % 3 === 0 ? 1.3 : 0.65;
        context.stroke();
      }
    }
    context.restore();
    context.beginPath();
    context.arc(cx, cy, boundary, 0, Math.PI * 2);
    context.strokeStyle = tone(30, 0.38, 38);
    context.stroke();
  }

  function drawSphere(time) {
    paintBase("#f7faf9");
    const cx = width / 2;
    const cy = height / 2 + 8;
    const radius = Math.min(width, height) * 0.36;
    const points = [];
    const count = 420;
    for (let index = 0; index < count; index += 1) {
      const y = 1 - (index / (count - 1)) * 2;
      const radial = Math.sqrt(1 - y * y);
      const theta = index * 2.399963 + time * 0.36;
      let x = Math.cos(theta) * radial;
      let z = Math.sin(theta) * radial;
      const rotate = (pointer.nx - 0.5) * 1.2;
      const rx = x * Math.cos(rotate) - z * Math.sin(rotate);
      const rz = x * Math.sin(rotate) + z * Math.cos(rotate);
      const dent = pointer.active ? Math.exp(-((rx - (pointer.nx - 0.5) * 1.4) ** 2 + (y - (pointer.ny - 0.5) * 1.4) ** 2) * 7) * 0.18 : 0;
      points.push({ x: rx * (1 - dent), y, z: rz, index });
    }
    points.sort((a, b) => a.z - b.z);
    points.forEach((point) => {
      const scale = 0.68 + (point.z + 1) * 0.18;
      context.beginPath();
      context.arc(cx + point.x * radius, cy + point.y * radius, 0.65 + scale * 1.35, 0, Math.PI * 2);
      context.fillStyle = tone(point.index * 0.22, 0.16 + scale * 0.34, 38 + scale * 14);
      context.fill();
    });
  }

  function drawGuilloche(time) {
    paintBase("#f8faf8");
    context.save();
    context.translate(width / 2, height / 2 + 8);
    const base = Math.min(width, height) * 0.28;
    for (let layer = 0; layer < 15; layer += 1) {
      const ratio = 5 + (layer % 6) + variant;
      context.beginPath();
      for (let step = 0; step <= 1100; step += 1) {
        const angle = step / 1100 * Math.PI * 2;
        const radius = base * (0.64 + layer * 0.018);
        const x = Math.cos(angle) * radius + Math.cos(angle * ratio + time * 0.4) * (18 + layer * 0.8);
        const y = Math.sin(angle) * radius * 0.58 + Math.sin(angle * ratio + time * 0.4) * (18 + layer * 0.8) * 0.58;
        if (step === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = tone(layer * 8, 0.11 + layer * 0.018, 38);
      context.lineWidth = layer % 4 === 0 ? 1 : 0.45;
      context.stroke();
    }
    context.restore();
  }

  function drawCable(time) {
    paintBase("#f7f9fa");
    const ports = [
      { x: width * 0.18, y: height * 0.38 },
      { x: width * 0.18, y: height * 0.67 },
      { x: width * 0.82, y: height * 0.38 },
      { x: width * 0.82, y: height * 0.67 },
    ];
    const desiredX = pointer.active ? pointer.x : width * (0.63 + Math.sin(time * 0.55) * 0.13);
    const desiredY = pointer.active ? pointer.y : height * (0.54 + Math.cos(time * 0.72) * 0.14);
    state.cableVX = (state.cableVX + (desiredX - state.cableX) * 0.055) * 0.79;
    state.cableVY = (state.cableVY + (desiredY - state.cableY) * 0.055) * 0.79;
    state.cableX += state.cableVX;
    state.cableY += state.cableVY;
    ports.forEach((port, index) => {
      context.beginPath();
      context.arc(port.x, port.y, 9, 0, Math.PI * 2);
      context.fillStyle = "#fff";
      context.fill();
      context.strokeStyle = tone(index * 46, 0.48, 39);
      context.lineWidth = 1.3;
      context.stroke();
      context.beginPath();
      context.arc(port.x, port.y, 2.4, 0, Math.PI * 2);
      context.fillStyle = tone(index * 46, 0.82, 42);
      context.fill();
    });
    const from = ports[0];
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.bezierCurveTo(width * 0.38, from.y + 68, state.cableX - 68, state.cableY + 52, state.cableX, state.cableY);
    context.strokeStyle = tone(10, 0.16, 46);
    context.lineWidth = 10;
    context.stroke();
    context.strokeStyle = tone(8, 0.78, 42);
    context.lineWidth = 2.2;
    context.stroke();
    context.beginPath();
    context.arc(state.cableX, state.cableY, 7, 0, Math.PI * 2);
    context.fillStyle = "#fff";
    context.fill();
    context.strokeStyle = tone(55, 0.72, 38);
    context.lineWidth = 2;
    context.stroke();
  }

  function drawOrigami(time) {
    paintBase("#faf8f6");
    const cx = width / 2;
    const cy = height / 2 + 8;
    const fold = (Math.sin(time * 0.62 + variant) + 1) * 0.5;
    const panels = [
      [[-120, -44], [-22, -64], [-4, 0], [-110, 22]],
      [[-22, -64], [70, -42], [12, 10], [-4, 0]],
      [[70, -42], [122, 10], [18, 38], [12, 10]],
      [[-110, 22], [-4, 0], [18, 38], [-78, 70]],
      [[18, 38], [122, 10], [86, 72], [-78, 70]],
    ];
    context.save();
    context.translate(cx, cy);
    panels.forEach((points, index) => {
      const lift = (index % 2 ? -1 : 1) * fold * (18 + index * 3);
      context.beginPath();
      points.forEach(([x, y], pointIndex) => {
        const px = x + lift * (pointIndex % 2 ? 0.35 : -0.15);
        const py = y - Math.abs(lift) * (pointIndex < 2 ? 0.42 : -0.12);
        if (pointIndex === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      });
      context.closePath();
      context.fillStyle = tone(index * 38, 0.22 + index * 0.07, 58 + (index % 2) * 14);
      context.fill();
      context.strokeStyle = tone(index * 31, 0.35, 42);
      context.lineWidth = 0.85;
      context.stroke();
    });
    context.restore();
  }

  function render(time) {
    context.save();
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    switch (CONFIG.renderer) {
      case "reaction": drawReaction(time); break;
      case "flow": drawFlow(time); break;
      case "metaballs": drawMetaballs(time); break;
      case "voronoi": drawVoronoi(time); break;
      case "topography": drawTopography(time); break;
      case "pixel-sort": drawPixelSort(time); break;
      case "halftone": drawHalftone(time); break;
      case "feedback": drawFeedback(time); break;
      case "glyph": drawGlyph(time); break;
      case "electric": drawElectric(time); break;
      case "boids": drawBoids(time); break;
      case "gravity": drawGravity(time); break;
      case "sandpile": drawSandpile(time); break;
      case "interference": drawInterference(time); break;
      case "caustic": drawCaustic(time); break;
      case "attractor": drawAttractor(time); break;
      case "ribbons": drawRibbons(time); break;
      case "refraction": drawRefraction(time); break;
      case "typography": drawTypography(time); break;
      case "topography-type": drawTopographyType(time); break;
      case "morph": drawMorph(time); break;
      case "knot": drawKnot(time); break;
      case "route": drawRoute(time); break;
      case "poster": drawPoster(time); break;
      case "shards": drawShards(time); break;
      case "ascii": drawAscii(time); break;
      case "light-shafts": drawLightShafts(time); break;
      case "glass-orb": drawGlassOrb(time); break;
      case "film": drawFilm(time); break;
      case "dial": drawDial(time); break;
      case "relief": drawRelief(time); break;
      case "voxel": drawVoxel(time); break;
      case "hyperbolic": drawHyperbolic(time); break;
      case "sphere": drawSphere(time); break;
      case "guilloche": drawGuilloche(time); break;
      case "cable": drawCable(time); break;
      case "origami": drawOrigami(time); break;
      default: drawFlow(time);
    }
    context.restore();
  }

  function frameLoop(timestamp) {
    const targetFrame = CONFIG.heavy ? 48 : 32;
    if (!paused && timestamp - previousTime >= targetFrame) {
      previousTime = timestamp;
      render(timestamp * 0.001);
    }
    raf = requestAnimationFrame(frameLoop);
  }

  function updatePointer(event) {
    const rect = frame.getBoundingClientRect();
    pointer.x = clamp(event.clientX - rect.left, 0, rect.width);
    pointer.y = clamp(event.clientY - rect.top, 0, rect.height);
    pointer.nx = pointer.x / Math.max(1, rect.width);
    pointer.ny = pointer.y / Math.max(1, rect.height);
    pointer.active = true;
    if (CONFIG.renderer === "dial" && pointer.down) {
      state.dial = Math.atan2(pointer.y - height / 2, pointer.x - width / 2);
    }
    if (CONFIG.renderer === "reaction" && pointer.down) {
      const gx = Math.floor(pointer.nx * state.reactionWidth);
      const gy = Math.floor(pointer.ny * state.reactionHeight);
      for (let y = -3; y <= 3; y += 1) {
        for (let x = -3; x <= 3; x += 1) {
          const px = clamp(gx + x, 1, state.reactionWidth - 2);
          const py = clamp(gy + y, 1, state.reactionHeight - 2);
          state.v[py * state.reactionWidth + px] = 0.9;
        }
      }
    }
  }

  function resize() {
    const rect = frame.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, CONFIG.heavy ? 1.15 : 1.35);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    pointer.x = pointer.nx * width;
    pointer.y = pointer.ny * height;
    resetState();
    render(variant * 0.7 + 1.2);
  }

  frame.addEventListener("pointermove", updatePointer);
  frame.addEventListener("pointerenter", updatePointer);
  frame.addEventListener("pointerleave", () => { pointer.active = false; pointer.down = false; });
  frame.addEventListener("pointerdown", (event) => {
    pointer.down = true;
    frame.setPointerCapture?.(event.pointerId);
    updatePointer(event);
  });
  frame.addEventListener("pointerup", () => { pointer.down = false; });
  shiftButton.addEventListener("click", () => {
    variant = (variant + 1) % 4;
    frame.dataset.variant = String(variant);
    resetState();
    render(performance.now() * 0.001);
  });
  document.addEventListener("atlas:visibility", (event) => {
    paused = Boolean(event.detail && event.detail.paused);
  });
  document.addEventListener("visibilitychange", () => { paused = document.hidden; });

  const observer = new ResizeObserver(resize);
  observer.observe(frame);
  resize();
  if (!reduceMotion.matches) raf = requestAnimationFrame(frameLoop);
  window.addEventListener(
    "pagehide",
    () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    },
    { once: true },
  );
})();
