// 纯 CSS 动效：脉冲扩散全部由 ::before/::after 关键帧完成。
// 本脚本只负责根据系统偏好关闭动画时给出提示，保持零逻辑负担。
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var hint = document.querySelector(".pr-hint");
    if (hint) hint.textContent = "已检测到减少动态偏好：脉冲动画已关闭，状态点静态显示。";
  }
})();
