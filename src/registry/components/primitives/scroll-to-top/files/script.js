/**
 * 回到顶部按钮：滚动阈值出现 + SVG 进度环
 * - 滚动超过一屏 60% 时浮现，进度环显示回顶剩余比例
 * - 点击平滑滚动到顶部；reduced-motion 下改用即时跳转
 */
(function () {
  var stage = document.getElementById("stopStage");
  var fab = document.getElementById("stopFab");
  var bar = document.getElementById("stopBar");
  if (!stage || !fab || !bar) return;

  var CIRCUMFERENCE = 125.66; // r=20 的圆周长
  var SHOW_AT = 0.6; // 滚动过 60% 一屏后出现

  function onScroll() {
    var scrollTop = window.scrollY;
    var viewport = window.innerHeight;
    var total = document.documentElement.scrollHeight - viewport;
    var progress = total > 0 ? Math.min(1, scrollTop / total) : 0;

    fab.hidden = scrollTop < viewport * SHOW_AT;
    // 环形进度：滚动越深环越满
    bar.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - progress));
  }

  fab.addEventListener("click", function () {
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
