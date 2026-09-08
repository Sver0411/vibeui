/**
 * Upload progress simulation. In a real app the tick() numbers come from
 * XMLHttpRequestProgressEvent / fetch stream chunks — the UI contract is
 * identical: bytes loaded, total bytes, speed, pause/resume/cancel.
 */
(function () {
  const card = document.getElementById("up-card");
  const fill = document.getElementById("up-fill");
  const sizeEl = document.getElementById("up-size");
  const metaEl = document.getElementById("up-meta");
  const percentEl = document.getElementById("up-percent");
  const toggle = document.getElementById("up-toggle");
  const cancel = document.getElementById("up-cancel");
  const pauseIcon = document.getElementById("up-pause-icon");
  const resumeIcon = document.getElementById("up-resume-icon");
  if (!card || !fill || !sizeEl || !metaEl || !percentEl || !toggle || !cancel) return;

  const TOTAL = 8.4 * 1024 * 1024; // 8.4 MB
  const SPEED = 2.1 * 1024 * 1024; // 2.1 MB/s
  let loaded = 0;
  let state = "running"; // running | paused | done | cancelled
  let lastTime = null;

  const paused = () => document.documentElement.classList.contains("atlas-paused");

  function fmtMB(bytes) {
    return (bytes / (1024 * 1024)).toFixed(1);
  }

  function render() {
    const percent = Math.min((loaded / TOTAL) * 100, 100);
    fill.style.width = percent + "%";
    percentEl.textContent = Math.round(percent) + "%";
    sizeEl.textContent = fmtMB(loaded) + " MB / " + fmtMB(TOTAL) + " MB";
  }

  function tick(now) {
    if (state === "running" && !paused()) {
      if (lastTime !== null) {
        loaded = Math.min(loaded + (SPEED * (now - lastTime)) / 1000, TOTAL);
      }
      lastTime = now;
      metaEl.textContent = "Uploading at " + (SPEED / (1024 * 1024)).toFixed(1) + " MB/s";
      render();
      if (loaded >= TOTAL) {
        state = "done";
        card.dataset.state = "done";
        metaEl.textContent = "Upload complete";
        toggle.disabled = true;
        return;
      }
    } else {
      lastTime = now;
    }
    requestAnimationFrame(tick);
  }

  toggle.addEventListener("click", () => {
    if (state === "running") {
      state = "paused";
      card.dataset.state = "paused";
      metaEl.textContent = "Paused";
      if (pauseIcon) pauseIcon.style.display = "none";
      if (resumeIcon) resumeIcon.style.display = "block";
      toggle.setAttribute("aria-label", "Resume upload");
    } else if (state === "paused") {
      state = "running";
      card.dataset.state = "running";
      if (pauseIcon) pauseIcon.style.display = "block";
      if (resumeIcon) resumeIcon.style.display = "none";
      toggle.setAttribute("aria-label", "Pause upload");
    }
  });

  cancel.addEventListener("click", () => {
    if (state === "done") return;
    state = "cancelled";
    card.dataset.state = "cancelled";
    metaEl.textContent = "Cancelled";
    toggle.disabled = true;
    cancel.disabled = true;
  });

  requestAnimationFrame(tick);
})();
