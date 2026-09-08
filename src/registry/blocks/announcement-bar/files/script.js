/**
 * Announcement bar: horizontal carousel via translateX on a grid track,
 * auto-play with hover/focus pause, smooth height collapse on dismiss and
 * localStorage memory (keyed by content version).
 */
(function () {
  var bar = document.getElementById("ab-bar");
  var track = document.getElementById("ab-track");
  var dotsBox = document.getElementById("ab-dots");
  var closeBtn = document.getElementById("ab-close");
  if (!bar || !track || !closeBtn) return;

  var STORAGE_KEY = "vibeui-announcement-v3";
  var SLIDE_MS = 350;
  var AUTOPLAY_MS = 5000;

  // 已关闭过：直接不渲染（带版本号，新公告换 key 即可重新展示）
  var dismissed = false;
  try {
    dismissed = localStorage.getItem(STORAGE_KEY) === "1";
  } catch (error) { /* 隐私模式等场景静默降级 */ }
  if (dismissed) {
    bar.style.display = "none";
    return;
  }

  var items = track.children;
  var index = 0;
  var count = items.length;
  var timer = null;
  var leaving = false;

  // 圆点
  var dots = [];
  for (var i = 0; i < count; i++) {
    (function (i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "ab-dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "公告 " + (i + 1) + " / " + count);
      dot.addEventListener("click", function () {
        goTo(i, true);
      });
      dotsBox.appendChild(dot);
      dots.push(dot);
    })(i);
  }

  function goTo(next, byUser) {
    index = (next + count) % count;
    track.style.transform = "translateX(-" + index * 100 + "%)";
    dots.forEach(function (dot, i) {
      dot.setAttribute("aria-selected", i === index ? "true" : "false");
    });
    if (byUser) restartAutoplay();
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(function () {
      goTo(index + 1, false);
    }, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // hover / 键盘聚焦时暂停
  bar.addEventListener("mouseenter", stopAutoplay);
  bar.addEventListener("mouseleave", startAutoplay);
  bar.addEventListener("focusin", stopAutoplay);
  bar.addEventListener("focusout", startAutoplay);

  closeBtn.addEventListener("click", function () {
    if (leaving) return;
    leaving = true;
    stopAutoplay();
    bar.classList.add("is-leaving");
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      bar.style.display = "none";
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch (error) { /* 静默降级 */ }
    }
    bar.addEventListener("transitionend", function (event) {
      if (event.propertyName === "height") finish();
    });
    setTimeout(finish, 380);
  });

  goTo(0, false);
  startAutoplay();
})();
