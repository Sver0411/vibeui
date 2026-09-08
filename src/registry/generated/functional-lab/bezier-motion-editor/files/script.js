(function () {
  const CONFIG = {"kind":"bezier","hue":196,"slug":"bezier-motion-editor"};
  const root = document.querySelector(".tool");
  const status = root && root.querySelector(".tool-status");
  if (!root || !status) return;

  let externallyPaused = false;
  const disposers = [];

  function setStatus(value) {
    status.textContent = value;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(from, to, amount) {
    return from + (to - from) * amount;
  }

  function hue(offset, alpha, lightness) {
    return `hsla(${(CONFIG.hue + offset + 720) % 360},58%,${lightness || 42}%,${alpha == null ? 1 : alpha})`;
  }

  async function copyText(value, label) {
    try {
      await navigator.clipboard.writeText(value);
      setStatus(label || "已复制");
    } catch {
      const input = document.createElement("textarea");
      input.value = value;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      setStatus(label || "已复制");
    }
  }

  function canvasSurface(draw) {
    const canvas = root.querySelector(".tool-canvas");
    const context = canvas && canvas.getContext("2d");
    if (!canvas || !context) return null;
    const surface = { canvas, context, width: 1, height: 1, dpr: 1, draw: () => draw(surface) };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      surface.width = Math.max(1, Math.round(rect.width));
      surface.height = Math.max(1, Math.round(rect.height));
      surface.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(surface.width * surface.dpr);
      canvas.height = Math.round(surface.height * surface.dpr);
      context.setTransform(surface.dpr, 0, 0, surface.dpr, 0, 0);
      surface.draw();
    };
    const point = (event) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: clamp(event.clientX - rect.left, 0, rect.width),
        y: clamp(event.clientY - rect.top, 0, rect.height),
      };
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    disposers.push(() => observer.disconnect());
    resize();
    surface.point = point;
    return surface;
  }

  function initWaveform() {
    const startInput = root.querySelector(".wave-start");
    const endInput = root.querySelector(".wave-end");
    const playButton = root.querySelector('[data-action="play"]');
    if (!startInput || !endInput || !playButton) return;
    const state = { start: 8, end: 38, playhead: 8, playing: false, raf: 0, previous: 0 };
    let surface;

    function draw(view) {
      const { context, width, height } = view;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#f8faf9";
      context.fillRect(0, 0, width, height);
      const startX = (state.start / 60) * width;
      const endX = (state.end / 60) * width;
      context.fillStyle = hue(0, 0.09, 48);
      context.fillRect(startX, 0, endX - startX, height);
      context.strokeStyle = "rgba(63,63,70,.16)";
      context.beginPath();
      context.moveTo(0, height / 2);
      context.lineTo(width, height / 2);
      context.stroke();
      for (let x = 2; x < width; x += 3) {
        const sample =
          Math.sin(x * 0.081) * 0.45 +
          Math.sin(x * 0.023 + 1.3) * 0.34 +
          Math.sin(x * 0.191) * 0.16;
        const envelope = 0.38 + 0.62 * Math.abs(Math.sin(x * 0.013 + 0.7));
        const amplitude = (9 + Math.abs(sample) * 40) * envelope;
        context.strokeStyle = x >= startX && x <= endX ? hue(x * 0.12, 0.72, 38) : "rgba(82,82,91,.25)";
        context.beginPath();
        context.moveTo(x, height / 2 - amplitude);
        context.lineTo(x, height / 2 + amplitude);
        context.stroke();
      }
      [startX, endX].forEach((x, index) => {
        context.fillStyle = "#fff";
        context.strokeStyle = hue(index * 48, 0.82, 36);
        context.lineWidth = 1.5;
        context.fillRect(x - 3, 9, 6, height - 18);
        context.strokeRect(x - 3, 9, 6, height - 18);
      });
      const playheadX = (state.playhead / 60) * width;
      context.strokeStyle = "#18181b";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(playheadX, 5);
      context.lineTo(playheadX, height - 5);
      context.stroke();
    }

    function sync() {
      state.start = Number(startInput.value);
      state.end = Number(endInput.value);
      if (state.start > state.end - 0.5) {
        if (document.activeElement === startInput) state.start = state.end - 0.5;
        else state.end = state.start + 0.5;
      }
      state.start = clamp(state.start, 0, 59.5);
      state.end = clamp(state.end, 0.5, 60);
      startInput.value = String(state.start);
      endInput.value = String(state.end);
      if (!state.playing) state.playhead = state.start;
      setStatus(`${state.start.toFixed(1)}–${state.end.toFixed(1)}s · ${(state.end - state.start).toFixed(1)}s`);
      surface?.draw();
    }

    function loop(timestamp) {
      if (!state.playing) return;
      if (!externallyPaused) {
        const delta = state.previous ? (timestamp - state.previous) / 1000 : 0;
        state.playhead += delta * 7;
        if (state.playhead >= state.end) state.playhead = state.start;
        surface.draw();
      }
      state.previous = timestamp;
      state.raf = requestAnimationFrame(loop);
    }

    surface = canvasSurface(draw);
    const onInput = sync;
    startInput.addEventListener("input", onInput);
    endInput.addEventListener("input", onInput);
    playButton.addEventListener("click", () => {
      state.playing = !state.playing;
      playButton.textContent = state.playing ? "暂停" : "播放片段";
      state.previous = 0;
      if (state.playing) state.raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(state.raf);
    });
    root.querySelectorAll("[data-range]").forEach((button) => {
      button.addEventListener("click", () => {
        const range = button.dataset.range === "intro" ? [0, 15] : [20, 40];
        startInput.value = String(range[0]);
        endInput.value = String(range[1]);
        sync();
      });
    });
    sync();
    disposers.push(() => cancelAnimationFrame(state.raf));
  }

  function initMask() {
    const sizeInput = root.querySelector(".mask-size");
    if (!sizeInput) return;
    const state = { drawing: false, last: null, history: [], mask: document.createElement("canvas"), maskContext: null };
    let surface;

    function prepareMask(view) {
      if (state.mask.width === view.width && state.mask.height === view.height) return;
      state.mask.width = view.width;
      state.mask.height = view.height;
      state.maskContext = state.mask.getContext("2d", { willReadFrequently: true });
      state.maskContext.fillStyle = "#000";
      state.maskContext.fillRect(0, 0, view.width, view.height);
      state.history = [];
    }

    function coverage() {
      if (!state.maskContext) return 0;
      const data = state.maskContext.getImageData(0, 0, state.mask.width, state.mask.height).data;
      let selected = 0;
      let samples = 0;
      for (let index = 0; index < data.length; index += 64) {
        selected += data[index] > 127 ? 1 : 0;
        samples += 1;
      }
      return Math.round((selected / Math.max(1, samples)) * 100);
    }

    function draw(view) {
      prepareMask(view);
      const { context, width, height } = view;
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#eef7f5");
      gradient.addColorStop(0.5, "#f6edf9");
      gradient.addColorStop(1, "#f8f0e7");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "rgba(63,63,70,.08)";
      for (let x = 0; x < width; x += 18) {
        context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
      }
      for (let y = 0; y < height; y += 18) {
        context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
      }
      context.beginPath();
      context.arc(width * 0.52, height * 0.5, Math.min(width, height) * 0.28, 0, Math.PI * 2);
      context.fillStyle = "rgba(255,255,255,.6)";
      context.fill();
      const overlay = document.createElement("canvas");
      overlay.width = width;
      overlay.height = height;
      const overlayContext = overlay.getContext("2d");
      overlayContext.fillStyle = hue(0, 0.44, 52);
      overlayContext.fillRect(0, 0, width, height);
      overlayContext.globalCompositeOperation = "destination-in";
      overlayContext.drawImage(state.mask, 0, 0);
      context.drawImage(overlay, 0, 0);
      setStatus(`蒙版覆盖 ${coverage()}%`);
    }

    function paint(point) {
      const radius = Number(sizeInput.value) / 2;
      const ctx = state.maskContext;
      ctx.strokeStyle = "#fff";
      ctx.fillStyle = "#fff";
      ctx.lineWidth = radius * 2;
      ctx.lineCap = "round";
      if (state.last) {
        ctx.beginPath();
        ctx.moveTo(state.last.x, state.last.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      } else {
        ctx.beginPath(); ctx.arc(point.x, point.y, radius, 0, Math.PI * 2); ctx.fill();
      }
      state.last = point;
      surface.draw();
    }

    surface = canvasSurface(draw);
    const canvas = surface.canvas;
    canvas.addEventListener("pointerdown", (event) => {
      state.history.push(state.maskContext.getImageData(0, 0, state.mask.width, state.mask.height));
      if (state.history.length > 16) state.history.shift();
      state.drawing = true;
      state.last = null;
      canvas.setPointerCapture?.(event.pointerId);
      paint(surface.point(event));
    });
    canvas.addEventListener("pointermove", (event) => { if (state.drawing) paint(surface.point(event)); });
    canvas.addEventListener("pointerup", () => { state.drawing = false; state.last = null; });
    root.querySelector('[data-action="undo"]').addEventListener("click", () => {
      const image = state.history.pop();
      if (image) state.maskContext.putImageData(image, 0, 0);
      surface.draw();
    });
    root.querySelector('[data-action="clear"]').addEventListener("click", () => {
      state.maskContext.fillStyle = "#000";
      state.maskContext.fillRect(0, 0, state.mask.width, state.mask.height);
      surface.draw();
    });
    root.querySelector('[data-action="invert"]').addEventListener("click", () => {
      const image = state.maskContext.getImageData(0, 0, state.mask.width, state.mask.height);
      for (let index = 0; index < image.data.length; index += 4) {
        const value = 255 - image.data[index];
        image.data[index] = value; image.data[index + 1] = value; image.data[index + 2] = value; image.data[index + 3] = 255;
      }
      state.maskContext.putImageData(image, 0, 0);
      surface.draw();
    });
    root.querySelector('[data-action="export"]').addEventListener("click", () => {
      state.mask.toBlob((blob) => {
        if (!blob) return;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "mask.png";
        link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
        setStatus("已导出 mask.png");
      });
    });
  }

  function initMesh() {
    const colorInput = root.querySelector(".mesh-color");
    const points = [
      { x: 0.18, y: 0.24, color: "#38b2ac" },
      { x: 0.82, y: 0.22, color: "#6d5bd0" },
      { x: 0.26, y: 0.8, color: "#f59e0b" },
      { x: 0.78, y: 0.76, color: "#fb7185" },
    ];
    let selected = 0;
    let dragging = false;
    let surface;

    function draw(view) {
      const { context, width, height } = view;
      context.fillStyle = "#f7f8fa";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "multiply";
      points.forEach((point) => {
        const x = point.x * width;
        const y = point.y * height;
        const radius = Math.max(width, height) * 0.62;
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `${point.color}d9`);
        gradient.addColorStop(0.5, `${point.color}55`);
        gradient.addColorStop(1, `${point.color}00`);
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      });
      context.globalCompositeOperation = "source-over";
      points.forEach((point, index) => {
        const x = point.x * width;
        const y = point.y * height;
        context.beginPath(); context.arc(x, y, index === selected ? 7 : 5, 0, Math.PI * 2);
        context.fillStyle = point.color; context.fill();
        context.strokeStyle = "#fff"; context.lineWidth = 2; context.stroke();
      });
      setStatus(`节点 ${selected + 1} / ${points.length}`);
    }

    function cssValue() {
      return points
        .map((point) => `radial-gradient(circle at ${Math.round(point.x * 100)}% ${Math.round(point.y * 100)}%, ${point.color}, transparent 58%)`)
        .join(",\n");
    }

    surface = canvasSurface(draw);
    const choose = (event) => {
      const point = surface.point(event);
      let best = Infinity;
      points.forEach((node, index) => {
        const distance = Math.hypot(point.x - node.x * surface.width, point.y - node.y * surface.height);
        if (distance < best) { best = distance; selected = index; }
      });
      colorInput.value = points[selected].color;
      return point;
    };
    surface.canvas.addEventListener("pointerdown", (event) => {
      dragging = true;
      const point = choose(event);
      points[selected].x = point.x / surface.width;
      points[selected].y = point.y / surface.height;
      surface.canvas.setPointerCapture?.(event.pointerId);
      surface.draw();
    });
    surface.canvas.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const point = surface.point(event);
      points[selected].x = clamp(point.x / surface.width, 0.04, 0.96);
      points[selected].y = clamp(point.y / surface.height, 0.06, 0.94);
      surface.draw();
    });
    surface.canvas.addEventListener("pointerup", () => { dragging = false; });
    colorInput.addEventListener("input", () => { points[selected].color = colorInput.value; surface.draw(); });
    root.querySelector('[data-action="copy"]').addEventListener("click", () => copyText(cssValue(), "CSS 已复制"));
    root.querySelector('[data-action="reset"]').addEventListener("click", () => {
      [[0.18,0.24],[0.82,0.22],[0.26,0.8],[0.78,0.76]].forEach((position, index) => { points[index].x = position[0]; points[index].y = position[1]; });
      surface.draw();
    });
  }

  function initHistogram() {
    const minInput = root.querySelector(".hist-min");
    const maxInput = root.querySelector(".hist-max");
    const bars = Array.from({ length: 54 }, (_, index) => {
      const first = Math.exp(-((index - 18) ** 2) / 120) * 0.8;
      const second = Math.exp(-((index - 37) ** 2) / 78) * 0.62;
      return 0.08 + first + second + Math.sin(index * 2.7) * 0.035;
    });
    let min = 180;
    let max = 780;
    let surface;

    function draw(view) {
      const { context, width, height } = view;
      context.fillStyle = "#faf9f7"; context.fillRect(0, 0, width, height);
      const gap = 1.5;
      const barWidth = width / bars.length;
      bars.forEach((value, index) => {
        const x = index * barWidth;
        const price = (index / (bars.length - 1)) * 1000;
        const selected = price >= min && price <= max;
        const barHeight = value * (height - 24);
        context.fillStyle = selected ? hue(index * 0.55, 0.7, 42) : "rgba(113,113,122,.18)";
        context.fillRect(x + gap / 2, height - 12 - barHeight, Math.max(1, barWidth - gap), barHeight);
      });
      const left = (min / 1000) * width;
      const right = (max / 1000) * width;
      context.strokeStyle = hue(0, 0.7, 36); context.lineWidth = 1.5;
      [left, right].forEach((x) => { context.beginPath(); context.moveTo(x, 3); context.lineTo(x, height - 4); context.stroke(); });
      setStatus(`¥${min}–¥${max}`);
    }

    function sync(source) {
      min = Number(minInput.value);
      max = Number(maxInput.value);
      if (min > max - 20) {
        if (source === minInput) min = max - 20;
        else max = min + 20;
      }
      minInput.value = String(min);
      maxInput.value = String(max);
      surface?.draw();
    }

    surface = canvasSurface(draw);
    minInput.addEventListener("input", () => sync(minInput));
    maxInput.addEventListener("input", () => sync(maxInput));
    root.querySelectorAll("[data-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        const ranges = { budget: [0, 300], popular: [200, 800], all: [0, 1000] };
        [min, max] = ranges[button.dataset.preset];
        minInput.value = String(min); maxInput.value = String(max); surface.draw();
      });
    });
  }

  function initTimeline() {
    const state = { keyframes: [0, 0.24, 0.58, 1], selected: 1, dragging: false, playing: false, playhead: 0, raf: 0, previous: 0 };
    let surface;

    function draw(view) {
      const { context, width, height } = view;
      context.fillStyle = "#f9f8fa"; context.fillRect(0, 0, width, height);
      const left = 24; const right = width - 18; const y = height * 0.58;
      context.strokeStyle = "rgba(82,82,91,.18)"; context.lineWidth = 2;
      context.beginPath(); context.moveTo(left, y); context.lineTo(right, y); context.stroke();
      for (let tick = 0; tick <= 8; tick += 1) {
        const x = lerp(left, right, tick / 8);
        context.strokeStyle = "rgba(82,82,91,.14)"; context.lineWidth = 1;
        context.beginPath(); context.moveTo(x, y - 15); context.lineTo(x, y + 15); context.stroke();
        context.fillStyle = "rgba(82,82,91,.54)"; context.font = "8px ui-monospace,monospace";
        context.fillText(`${(tick * 0.5).toFixed(1)}s`, x - 8, y + 28);
      }
      state.keyframes.forEach((value, index) => {
        const x = lerp(left, right, value);
        context.save(); context.translate(x, y); context.rotate(Math.PI / 4);
        context.fillStyle = index === state.selected ? hue(0, 0.88, 40) : "#fff";
        context.strokeStyle = hue(index * 23, 0.7, 38); context.lineWidth = 1.5;
        context.fillRect(-5, -5, 10, 10); context.strokeRect(-5, -5, 10, 10); context.restore();
      });
      const playX = lerp(left, right, state.playhead);
      context.strokeStyle = "#18181b"; context.lineWidth = 1;
      context.beginPath(); context.moveTo(playX, 12); context.lineTo(playX, height - 15); context.stroke();
      setStatus(`${(state.keyframes[state.selected] * 4).toFixed(2)}s · ${state.keyframes.length} 帧`);
    }

    function nearest(point) {
      const left = 24; const right = surface.width - 18;
      const value = clamp((point.x - left) / (right - left), 0, 1);
      let selected = 0; let distance = Infinity;
      state.keyframes.forEach((keyframe, index) => {
        const current = Math.abs(keyframe - value);
        if (current < distance) { distance = current; selected = index; }
      });
      return { value, selected, distance };
    }

    function play(timestamp) {
      if (!state.playing) return;
      if (!externallyPaused) {
        const delta = state.previous ? (timestamp - state.previous) / 4000 : 0;
        state.playhead = (state.playhead + delta) % 1;
        surface.draw();
      }
      state.previous = timestamp;
      state.raf = requestAnimationFrame(play);
    }

    surface = canvasSurface(draw);
    surface.canvas.tabIndex = 0;
    surface.canvas.addEventListener("pointerdown", (event) => {
      const found = nearest(surface.point(event));
      if (found.distance > 0.045) {
        state.keyframes.push(found.value); state.keyframes.sort((a, b) => a - b); state.selected = state.keyframes.indexOf(found.value);
      } else state.selected = found.selected;
      state.dragging = true; surface.canvas.setPointerCapture?.(event.pointerId); surface.draw();
    });
    surface.canvas.addEventListener("pointermove", (event) => {
      if (!state.dragging) return;
      const found = nearest(surface.point(event));
      state.keyframes[state.selected] = found.value;
      state.keyframes.sort((a, b) => a - b);
      state.selected = state.keyframes.indexOf(found.value);
      surface.draw();
    });
    surface.canvas.addEventListener("pointerup", () => { state.dragging = false; });
    const remove = () => {
      if (state.keyframes.length <= 2) return;
      state.keyframes.splice(state.selected, 1); state.selected = clamp(state.selected - 1, 0, state.keyframes.length - 1); surface.draw();
    };
    surface.canvas.addEventListener("keydown", (event) => {
      if (event.key === "Delete" || event.key === "Backspace") { event.preventDefault(); remove(); }
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        state.keyframes[state.selected] = clamp(state.keyframes[state.selected] + (event.key === "ArrowRight" ? 0.005 : -0.005), 0, 1);
        surface.draw();
      }
    });
    root.querySelector('[data-action="play"]').addEventListener("click", (event) => {
      state.playing = !state.playing; event.currentTarget.textContent = state.playing ? "暂停" : "播放"; state.previous = 0;
      if (state.playing) state.raf = requestAnimationFrame(play); else cancelAnimationFrame(state.raf);
    });
    root.querySelector('[data-action="add"]').addEventListener("click", () => { state.keyframes.push(0.5); state.keyframes.sort((a,b)=>a-b); state.selected = state.keyframes.indexOf(0.5); surface.draw(); });
    root.querySelector('[data-action="delete"]').addEventListener("click", remove);
    root.querySelector('[data-action="copy"]').addEventListener("click", () => copyText(JSON.stringify({ duration: 4, keyframes: state.keyframes.map((value) => Number((value * 4).toFixed(3))) }, null, 2), "JSON 已复制"));
    disposers.push(() => cancelAnimationFrame(state.raf));
  }

  function initColor() {
    const hueInput = root.querySelector(".color-hue");
    const alphaInput = root.querySelector(".color-alpha");
    const swatch = root.querySelector(".color-result i");
    const code = root.querySelector(".color-result code");
    const state = { hue: Number(hueInput.value), saturation: 72, lightness: 54, alpha: 1, dragging: false };
    let surface;

    function hslToRgb(h, s, l) {
      s /= 100; l /= 100;
      const chroma = (1 - Math.abs(2 * l - 1)) * s;
      const x = chroma * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l - chroma / 2;
      let rgb = [0, 0, 0];
      if (h < 60) rgb = [chroma, x, 0]; else if (h < 120) rgb = [x, chroma, 0]; else if (h < 180) rgb = [0, chroma, x]; else if (h < 240) rgb = [0, x, chroma]; else if (h < 300) rgb = [x, 0, chroma]; else rgb = [chroma, 0, x];
      return rgb.map((value) => Math.round((value + m) * 255));
    }

    function currentValue() {
      const [r, g, b] = hslToRgb(state.hue, state.saturation, state.lightness);
      const hex = `#${[r,g,b].map((value) => value.toString(16).padStart(2,"0")).join("")}`.toUpperCase();
      return { r, g, b, hex, rgba: `rgba(${r}, ${g}, ${b}, ${state.alpha.toFixed(2)})` };
    }

    function updateResult() {
      const value = currentValue();
      swatch.style.background = value.rgba;
      code.textContent = state.alpha === 1 ? value.hex : value.rgba;
      setStatus(`H${Math.round(state.hue)} S${Math.round(state.saturation)} L${Math.round(state.lightness)}`);
    }

    function draw(view) {
      const { context, width, height } = view;
      const step = 4;
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const saturation = (x / width) * 100;
          const lightness = 94 - (y / height) * 78;
          context.fillStyle = `hsl(${state.hue} ${saturation}% ${lightness}%)`;
          context.fillRect(x, y, step + 1, step + 1);
        }
      }
      const px = (state.saturation / 100) * width;
      const py = ((94 - state.lightness) / 78) * height;
      context.beginPath(); context.arc(px, py, 6, 0, Math.PI * 2); context.strokeStyle = "#fff"; context.lineWidth = 2.5; context.stroke();
      context.beginPath(); context.arc(px, py, 8, 0, Math.PI * 2); context.strokeStyle = "rgba(24,24,27,.7)"; context.lineWidth = 1; context.stroke();
      updateResult();
    }

    function choose(event) {
      const point = surface.point(event);
      state.saturation = clamp((point.x / surface.width) * 100, 0, 100);
      state.lightness = clamp(94 - (point.y / surface.height) * 78, 16, 94);
      surface.draw();
    }

    surface = canvasSurface(draw);
    surface.canvas.addEventListener("pointerdown", (event) => { state.dragging = true; surface.canvas.setPointerCapture?.(event.pointerId); choose(event); });
    surface.canvas.addEventListener("pointermove", (event) => { if (state.dragging) choose(event); });
    surface.canvas.addEventListener("pointerup", () => { state.dragging = false; });
    hueInput.addEventListener("input", () => { state.hue = Number(hueInput.value); surface.draw(); });
    alphaInput.addEventListener("input", () => { state.alpha = Number(alphaInput.value) / 100; updateResult(); });
    root.querySelector('[data-action="copy"]').addEventListener("click", () => copyText(code.textContent, "颜色已复制"));
  }

  function initBezier() {
    const state = { p1: { x: 0.22, y: 1 }, p2: { x: 0.36, y: 1 }, selected: 0, dragging: false, progress: 0, playing: true, raf: 0, start: performance.now() };
    let surface;

    function cubic(a, b, c, d, t) {
      const mt = 1 - t;
      return mt ** 3 * a + 3 * mt ** 2 * t * b + 3 * mt * t ** 2 * c + t ** 3 * d;
    }

    function value() {
      return `cubic-bezier(${state.p1.x.toFixed(2)}, ${state.p1.y.toFixed(2)}, ${state.p2.x.toFixed(2)}, ${state.p2.y.toFixed(2)})`;
    }

    function draw(view) {
      const { context, width, height } = view;
      context.fillStyle = "#f8faf9"; context.fillRect(0, 0, width, height);
      const pad = 23; const graphW = width - pad * 2; const graphH = height - pad * 2;
      const map = (point) => ({ x: pad + point.x * graphW, y: height - pad - point.y * graphH });
      const origin = map({ x: 0, y: 0 }); const end = map({ x: 1, y: 1 }); const p1 = map(state.p1); const p2 = map(state.p2);
      context.strokeStyle = "rgba(82,82,91,.12)"; context.strokeRect(pad, pad, graphW, graphH);
      context.setLineDash([4, 4]); context.beginPath(); context.moveTo(origin.x, origin.y); context.lineTo(p1.x, p1.y); context.moveTo(end.x, end.y); context.lineTo(p2.x, p2.y); context.stroke(); context.setLineDash([]);
      context.beginPath(); context.moveTo(origin.x, origin.y);
      for (let step = 1; step <= 80; step += 1) {
        const t = step / 80;
        context.lineTo(pad + cubic(0, state.p1.x, state.p2.x, 1, t) * graphW, height - pad - cubic(0, state.p1.y, state.p2.y, 1, t) * graphH);
      }
      context.strokeStyle = hue(0, 0.82, 39); context.lineWidth = 2; context.stroke();
      [p1, p2].forEach((point, index) => { context.beginPath(); context.arc(point.x, point.y, index === state.selected ? 6 : 5, 0, Math.PI * 2); context.fillStyle = index === state.selected ? hue(0, 0.9, 39) : "#fff"; context.fill(); context.strokeStyle = hue(index * 52, 0.75, 39); context.stroke(); });
      const t = state.progress;
      const dotX = pad + cubic(0, state.p1.x, state.p2.x, 1, t) * graphW;
      const dotY = height - pad - cubic(0, state.p1.y, state.p2.y, 1, t) * graphH;
      context.beginPath(); context.arc(dotX, dotY, 4, 0, Math.PI * 2); context.fillStyle = "#18181b"; context.fill();
      setStatus(value());
    }

    function loop(timestamp) {
      if (!state.playing) return;
      if (!externallyPaused) { state.progress = ((timestamp - state.start) % 1600) / 1600; surface.draw(); }
      state.raf = requestAnimationFrame(loop);
    }

    function choose(event) {
      const point = surface.point(event); const pad = 23; const graphW = surface.width - 46; const graphH = surface.height - 46;
      const candidates = [state.p1, state.p2].map((control) => ({ x: pad + control.x * graphW, y: surface.height - pad - control.y * graphH }));
      state.selected = Math.hypot(point.x - candidates[0].x, point.y - candidates[0].y) <= Math.hypot(point.x - candidates[1].x, point.y - candidates[1].y) ? 0 : 1;
      const control = state.selected === 0 ? state.p1 : state.p2;
      control.x = clamp((point.x - pad) / graphW, 0, 1);
      control.y = clamp((surface.height - pad - point.y) / graphH, -0.5, 1.5);
      surface.draw();
    }

    surface = canvasSurface(draw);
    surface.canvas.tabIndex = 0;
    surface.canvas.addEventListener("pointerdown", (event) => { state.dragging = true; surface.canvas.setPointerCapture?.(event.pointerId); choose(event); });
    surface.canvas.addEventListener("pointermove", (event) => { if (state.dragging) choose(event); });
    surface.canvas.addEventListener("pointerup", () => { state.dragging = false; });
    surface.canvas.addEventListener("keydown", (event) => {
      const control = state.selected === 0 ? state.p1 : state.p2;
      if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(event.key)) event.preventDefault(); else return;
      if (event.key === "ArrowLeft") control.x -= 0.01; if (event.key === "ArrowRight") control.x += 0.01; if (event.key === "ArrowUp") control.y += 0.01; if (event.key === "ArrowDown") control.y -= 0.01;
      control.x = clamp(control.x, 0, 1); control.y = clamp(control.y, -0.5, 1.5); surface.draw();
    });
    root.querySelector('[data-action="play"]').addEventListener("click", () => { state.start = performance.now(); state.progress = 0; state.playing = true; cancelAnimationFrame(state.raf); state.raf = requestAnimationFrame(loop); });
    root.querySelectorAll("[data-preset]").forEach((button) => button.addEventListener("click", () => {
      const preset = button.dataset.preset === "snappy" ? [0.22, 1, 0.36, 1] : [0.4, 0, 0.2, 1];
      state.p1 = { x: preset[0], y: preset[1] }; state.p2 = { x: preset[2], y: preset[3] }; surface.draw();
    }));
    root.querySelector('[data-action="copy"]').addEventListener("click", () => copyText(value(), "参数已复制"));
    state.raf = requestAnimationFrame(loop);
    disposers.push(() => cancelAnimationFrame(state.raf));
  }

  function initUpload() {
    const input = root.querySelector(".upload-input");
    const drop = root.querySelector(".upload-drop");
    const list = root.querySelector(".upload-list");
    const tasks = [];
    let nextId = 1;
    let allPaused = false;

    function addFiles(files) {
      [...files].forEach((file) => {
        tasks.push({ id: nextId++, file, progress: 0, status: "queued", failedOnce: false });
      });
      render();
    }

    function label(task) {
      if (task.status === "queued") return "等待中";
      if (task.status === "running") return `${Math.round(task.progress)}%`;
      if (task.status === "paused") return "已暂停";
      if (task.status === "done") return "已完成";
      if (task.status === "error") return "处理失败";
      return "已取消";
    }

    function render() {
      list.textContent = "";
      tasks.filter((task) => task.status !== "canceled").forEach((task) => {
        const item = document.createElement("li"); item.className = "upload-item"; item.dataset.id = task.id;
        const strong = document.createElement("strong"); strong.textContent = task.file.name;
        const small = document.createElement("small"); small.textContent = label(task);
        const progress = document.createElement("progress"); progress.max = 100; progress.value = task.progress;
        const actions = document.createElement("div"); actions.className = "row-actions";
        if (["running","queued"].includes(task.status)) actions.append(makeButton("暂停", "pause"));
        if (task.status === "paused") actions.append(makeButton("继续", "resume"));
        if (task.status === "error") actions.append(makeButton("重试", "retry"));
        if (task.status !== "done") actions.append(makeButton("取消", "cancel"));
        item.append(strong, small, actions, progress); list.appendChild(item);
      });
      const done = tasks.filter((task) => task.status === "done").length;
      const active = tasks.filter((task) => ["queued","running","paused","error"].includes(task.status)).length;
      setStatus(`${active} 进行中 · ${done} 完成`);
    }

    function makeButton(text, action) {
      const button = document.createElement("button"); button.type = "button"; button.textContent = text; button.dataset.taskAction = action; return button;
    }

    function tick() {
      if (externallyPaused || allPaused) return;
      const running = tasks.filter((task) => task.status === "running");
      tasks.filter((task) => task.status === "queued").slice(0, Math.max(0, 2 - running.length)).forEach((task) => { task.status = "running"; });
      tasks.filter((task) => task.status === "running").forEach((task) => {
        task.progress += 2 + (task.id % 4) * 0.7;
        if (!task.failedOnce && task.id % 5 === 0 && task.progress > 67) { task.status = "error"; task.failedOnce = true; }
        else if (task.progress >= 100) { task.progress = 100; task.status = "done"; }
      });
      render();
    }

    input.addEventListener("change", () => { addFiles(input.files); input.value = ""; });
    drop.addEventListener("dragover", (event) => { event.preventDefault(); drop.style.borderColor = "var(--tool-accent)"; });
    drop.addEventListener("dragleave", () => { drop.style.borderColor = ""; });
    drop.addEventListener("drop", (event) => { event.preventDefault(); drop.style.borderColor = ""; addFiles(event.dataTransfer.files); });
    list.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-task-action]"); if (!button) return;
      const task = tasks.find((entry) => entry.id === Number(button.closest(".upload-item").dataset.id)); if (!task) return;
      const action = button.dataset.taskAction;
      if (action === "pause") task.status = "paused";
      if (action === "resume") task.status = "queued";
      if (action === "retry") { task.progress = 0; task.status = "queued"; }
      if (action === "cancel") task.status = "canceled";
      render();
    });
    root.querySelector('[data-action="pause-all"]').addEventListener("click", (event) => { allPaused = !allPaused; event.currentTarget.textContent = allPaused ? "继续全部" : "暂停全部"; tasks.forEach((task) => { if (allPaused && task.status === "running") task.status = "paused"; else if (!allPaused && task.status === "paused") task.status = "queued"; }); render(); });
    root.querySelector('[data-action="clear"]').addEventListener("click", () => { for (let index = tasks.length - 1; index >= 0; index -= 1) if (["done","canceled"].includes(tasks[index].status)) tasks.splice(index, 1); render(); });
    const timer = setInterval(tick, 160);
    disposers.push(() => clearInterval(timer));
    render();
  }

  const initializers = {
    waveform: initWaveform,
    mask: initMask,
    mesh: initMesh,
    histogram: initHistogram,
    timeline: initTimeline,
    color: initColor,
    bezier: initBezier,
    upload: initUpload,
  };

  initializers[CONFIG.kind]?.();
  document.addEventListener("atlas:visibility", (event) => {
    externallyPaused = Boolean(event.detail && event.detail.paused);
  });
  document.addEventListener("visibilitychange", () => { externallyPaused = document.hidden; });
  window.addEventListener("pagehide", () => disposers.forEach((dispose) => dispose()), { once: true });
})();
