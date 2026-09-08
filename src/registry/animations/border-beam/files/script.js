// 纯 CSS 动效：光束由 ::after 的 conic-gradient + @property 角度插值完成。
// 脚本仅做特性检测说明，不改动画本身。
(function () {
  "use strict";
  var supportsAngle = false;
  try {
    supportsAngle = CSS.supports("background", "conic-gradient(from 0deg, red, blue)");
    if ("CSSPropertyRule" in window) supportsAngle = true;
  } catch (e) { /* 忽略 */ }
  if (!supportsAngle) {
    var hint = document.querySelector(".bb-hint");
    if (hint) hint.textContent = "当前浏览器不支持 @property，已降级为整圈微光边框。";
  }
})();
