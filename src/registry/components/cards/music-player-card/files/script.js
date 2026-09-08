(function () {
  "use strict";

  var TOTAL = 222; // 3:42，秒
  var card = document.getElementById("mp-card");
  var playBtn = document.getElementById("mp-play");
  var likeBtn = document.getElementById("mp-like");
  var progress = document.getElementById("mp-progress");
  var fill = document.getElementById("mp-fill");
  var cur = document.getElementById("mp-cur");

  var playing = false;
  var position = 0;
  var lastTick = 0;
  var rafId = null;
  var dragging = false;

  function fmt(sec) {
    sec = Math.max(0, Math.min(TOTAL, Math.round(sec)));
    return Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);
  }

  function render() {
    var pct = (position / TOTAL) * 100;
    fill.style.width = pct + "%";
    cur.textContent = fmt(position);
    progress.setAttribute("aria-valuenow", String(Math.round(position)));
    progress.setAttribute("aria-valuetext", fmt(position) + " / " + fmt(TOTAL));
  }

  function loop(now) {
    if (playing && !dragging) {
      // 依真实帧间隔推进，切后台回来不会跳变
      var dt = (now - lastTick) / 1000;
      position += dt;
      if (position >= TOTAL) { position = TOTAL; pause(); }
      render();
    }
    lastTick = now;
    if (playing || dragging) rafId = requestAnimationFrame(loop);
    else rafId = null;
  }

  function play() {
    playing = true;
    card.classList.add("playing");
    playBtn.textContent = "⏸";
    playBtn.setAttribute("aria-label", "暂停");
    playBtn.setAttribute("aria-pressed", "true");
    lastTick = performance.now();
    if (!rafId) rafId = requestAnimationFrame(loop);
  }

  function pause() {
    playing = false;
    card.classList.remove("playing");
    playBtn.textContent = "▶";
    playBtn.setAttribute("aria-label", "播放");
    playBtn.setAttribute("aria-pressed", "false");
  }

  playBtn.addEventListener("click", function () {
    if (playing) pause();
    else {
      if (position >= TOTAL) position = 0; // 播完重头再来
      play();
    }
  });

  likeBtn.addEventListener("click", function () {
    var liked = likeBtn.classList.toggle("liked");
    likeBtn.textContent = liked ? "♥" : "♡";
    likeBtn.setAttribute("aria-pressed", String(liked));
  });

  // 进度拖拽与点击定位
  function seek(clientX) {
    var rect = progress.getBoundingClientRect();
    var ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    position = ratio * TOTAL;
    render();
  }

  progress.addEventListener("pointerdown", function (e) {
    dragging = true;
    progress.setPointerCapture(e.pointerId);
    seek(e.clientX);
    if (!rafId) rafId = requestAnimationFrame(loop);
  });
  progress.addEventListener("pointermove", function (e) {
    if (dragging) seek(e.clientX);
  });
  progress.addEventListener("pointerup", function () { dragging = false; });
  progress.addEventListener("pointercancel", function () { dragging = false; });

  // 键盘：左右 5 秒
  progress.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); position = Math.min(TOTAL, position + 5); render(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); position = Math.max(0, position - 5); render(); }
  });

  // 上一首/下一首：重置进度模拟切歌
  function skip() { position = 0; render(); }
  document.getElementById("mp-prev").addEventListener("click", skip);
  document.getElementById("mp-next").addEventListener("click", skip);

  render();
})();
