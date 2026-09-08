/**
 * Podcast card: simulated playback driven by timestamp deltas × rate (not
 * setInterval +1s); track click seeks by ratio; rate button cycles
 * 1x -> 1.25x -> 1.5x -> 2x.
 */
(function () {
  var card = document.querySelector(".pc");
  if (!card) return;
  var playBtn = card.querySelector(".pc-play");
  var rateBtn = card.querySelector(".pc-rate");
  var track = card.querySelector(".pc-track");
  var fill = card.querySelector(".pc-fill");
  var playedEl = card.querySelector("[data-played]");
  var remainingEl = card.querySelector("[data-remaining]");

  var duration = Number(card.getAttribute("data-duration")) || 60;
  var position = Math.round(duration * 0.5); // 演示：从一半开始
  var rate = 1;
  var playing = false;
  var lastTick = null;

  function fmt(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return m + ":" + String(s).padStart(2, "0");
  }

  function render() {
    fill.style.width = (position / duration) * 100 + "%";
    track.setAttribute("aria-valuenow", String(Math.round(position)));
    playedEl.textContent = fmt(position);
    remainingEl.textContent = "-" + fmt(duration - position);
  }

  function tick(now) {
    if (playing) {
      if (lastTick !== null) {
        position = Math.min(duration, position + ((now - lastTick) / 1000) * rate);
        if (position >= duration) {
          position = 0;
          setPlaying(false);
        }
        render();
      }
      lastTick = now;
    }
    requestAnimationFrame(tick);
  }

  function setPlaying(value) {
    playing = value;
    card.classList.toggle("is-playing", playing);
    playBtn.setAttribute("aria-label", playing ? "暂停" : "播放");
    lastTick = null;
  }

  playBtn.addEventListener("click", function () {
    setPlaying(!playing);
  });

  rateBtn.addEventListener("click", function () {
    var rates = [1, 1.25, 1.5, 2];
    var idx = rates.indexOf(rate);
    rate = rates[(idx + 1) % rates.length];
    rateBtn.textContent = rate === 1 ? "1x" : rate + "x";
  });

  function seekTo(clientX) {
    var rect = track.getBoundingClientRect();
    var ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    position = ratio * duration;
    render();
  }

  track.addEventListener("click", function (event) {
    seekTo(event.clientX);
  });

  track.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      position = Math.min(duration, position + 10);
      render();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      position = Math.max(0, position - 10);
      render();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setPlaying(!playing);
    }
  });

  render();
  requestAnimationFrame(tick);
})();
