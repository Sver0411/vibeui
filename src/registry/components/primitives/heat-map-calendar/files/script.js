(function () {
  "use strict";

  var WEEKS = 20; // 演示 20 周
  var LEVEL_COLORS = { 0: 0, 1: 2, 2: 5, 3: 9, 4: 14 }; // 每级样本提交数

  var grid = document.getElementById("hm-grid");
  var totalEl = document.getElementById("hm-total");
  var tip = document.createElement("div");
  tip.className = "hm-tip";
  document.body.appendChild(tip);

  var total = 0;

  for (var w = 0; w < WEEKS; w++) {
    for (var d = 0; d < 7; d++) {
      var cell = document.createElement("span");
      cell.className = "hm-cell";
      // 伪随机分布：周末更容易摸鱼
      var isWeekend = d === 0 || d === 6;
      var roll = Math.random();
      var level = roll > (isWeekend ? 0.72 : 0.45)
        ? 0
        : Math.min(4, 1 + Math.floor(Math.random() * (isWeekend ? 3 : 4)));
      cell.dataset.level = level;
      var count = roll > 0.97 ? 0 : LEVEL_COLORS[level];
      total += count;

      // 悬浮提示
      cell.addEventListener("pointerenter", function (e) {
        tip.textContent = e.target.dataset.count + " 次提交";
        tip.classList.add("show");
      });
      cell.addEventListener("pointermove", function (e) {
        tip.style.left = e.clientX + "px";
        tip.style.top = e.clientY + "px";
      });
      cell.addEventListener("pointerleave", function () {
        tip.classList.remove("show");
      });
      cell.dataset.count = count;
      grid.appendChild(cell);
    }
  }

  totalEl.textContent = "过去 " + WEEKS + " 周共 " + total + " 次提交";
})();
