/**
 * Countdown: remaining time is always derived from target timestamp - now,
 * never from an accumulated counter, so background throttling can't skew it.
 * Only cells whose value changed get the tick animation. Urgent state at
 * <=10s, single-shot finish at 0.
 */
(function () {
  var URGENT_AT = 10; // 秒

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function initCountdown(root) {
    var units = {};
    root.querySelectorAll("[data-unit]").forEach(function (el) {
      units[el.getAttribute("data-unit")] = el;
    });

    var secondsIn = Number(root.getAttribute("data-deadline-in"));
    var deadline = Date.now() + secondsIn * 1000;
    var finished = false;
    var lastText = {};

    function setText(unit, value) {
      var el = units[unit];
      if (!el) return;
      if (lastText[unit] === value) return; // 值没变不重绘不动画
      lastText[unit] = value;
      el.textContent = value;
      el.classList.remove("is-tick");
      // 强制回流重启动画
      void el.offsetWidth;
      el.classList.add("is-tick");
    }

    function render() {
      var diff = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      var d = Math.floor(diff / 86400);
      var h = Math.floor((diff % 86400) / 3600);
      var m = Math.floor((diff % 3600) / 60);
      var s = diff % 60;

      setText("d", String(d));
      setText("h", pad(h));
      setText("m", pad(m));
      setText("s", pad(s));

      root.classList.toggle("is-urgent", diff > 0 && diff <= URGENT_AT);

      if (diff <= 0 && !finished) {
        finished = true;
        root.classList.remove("is-urgent");
        root.classList.add("is-done");
        var note = document.createElement("p");
        note.className = "cd-done-text";
        note.textContent = "已结束";
        root.appendChild(note);
        clearInterval(timer);
      }
    }

    render();
    var timer = setInterval(render, 250);

    // 后台节流后回到页面立即重算
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible" && !finished) render();
    });
  }

  document.querySelectorAll(".cd").forEach(initCountdown);
})();
