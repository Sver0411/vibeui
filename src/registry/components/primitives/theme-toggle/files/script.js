/**
 * 明暗切换开关：role="switch" + aria-checked
 * - 开：月亮滑入、轨道变深夜蓝；关：太阳复位、轨道变灰
 * - 点击切换 aria-checked，文案同步播报
 */
(function () {
  var root = document.querySelector(".tt-stage");
  if (!root) return;

  var main = document.getElementById("ttMain");
  var stateText = document.getElementById("ttState");

  function bind(toggle) {
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var on = toggle.classList.toggle("is-on");
      toggle.setAttribute("aria-checked", on ? "true" : "false");
      if (toggle === main && stateText) {
        stateText.textContent = on ? "深色" : "浅色";
      }
    });
  }

  bind(main);
  bind(document.querySelector(".tt--sm"));
})();
