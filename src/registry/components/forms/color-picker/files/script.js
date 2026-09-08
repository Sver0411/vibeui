/**
 * 色板选择器：radiogroup 语义 + 选中色驱动示例元素
 * - 点击/Enter 选中色板（aria-checked 单选语义，方向键移动）
 * - 预览区色块、名称、色值实时联动
 * - 选中色写入 --cl-live 变量，按钮与徽章跟随变色
 */
(function () {
  var root = document.querySelector(".cl-stage");
  if (!root) return;

  var pick = document.getElementById("clPick");
  var dot = document.getElementById("clDot");
  var nameEl = document.getElementById("clName");
  var hexEl = document.getElementById("clHex");
  var swatches = Array.prototype.slice.call(root.querySelectorAll(".cl-swatch"));
  if (!pick || !dot || !nameEl || !hexEl) return;

  function apply(sw) {
    swatches.forEach(function (s) {
      s.setAttribute("aria-checked", s === sw ? "true" : "false");
    });
    var hex = sw.dataset.hex;
    var name = sw.dataset.name;
    dot.style.setProperty("--c", hex);
    nameEl.textContent = name;
    hexEl.textContent = hex;
    root.style.setProperty("--cl-live", hex);
  }

  swatches.forEach(function (sw, i) {
    sw.addEventListener("click", function () {
      apply(sw);
    });
    // radiogroup 惯例：方向键在组内移动并选中
    sw.addEventListener("keydown", function (event) {
      var delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (!delta) return;
      event.preventDefault();
      var next = swatches[(i + delta + swatches.length) % swatches.length];
      next.focus();
      apply(next);
    });
  });

  // 只让选中项进入 tab 序列
  swatches.forEach(function (sw) {
    sw.tabIndex = sw.getAttribute("aria-checked") === "true" ? 0 : -1;
  });
})();
