(function () {
  "use strict";

  var badge = document.getElementById("cb-badge");
  var live = document.getElementById("cb-live");
  var count = 3;
  var CAP = 99;

  function render(animate) {
    if (count <= 0) {
      badge.hidden = true;
      live.textContent = "没有未读通知";
      return;
    }
    badge.hidden = false;
    badge.textContent = count > CAP ? CAP + "+" : String(count);
    badge.setAttribute("aria-label", count + " 条未读通知");
    live.textContent = "当前 " + count + " 条未读" + (count > CAP ? "（超过 99 封顶显示）" : "");
    if (animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      badge.classList.remove("pop");
      // 强制重排以重启动画
      void badge.offsetWidth;
      badge.classList.add("pop");
    }
  }

  document.getElementById("cb-inc").addEventListener("click", function () {
    count += 1;
    render(true);
  });

  document.getElementById("cb-add10").addEventListener("click", function () {
    count += 10;
    render(true);
  });

  document.getElementById("cb-clear").addEventListener("click", function () {
    count = 0;
    render(false);
  });

  render(false);
})();
