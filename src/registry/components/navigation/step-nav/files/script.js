/**
 * 步骤导航条：已完成可点击回退，未完成锁定
 * - 状态机：current 之前的步骤 is-done，之后锁定
 * - 点击已完成步骤回退到该步；上一步 / 下一步按钮受边界控制
 */
(function () {
  var root = document.querySelector(".sn-stage");
  if (!root) return;

  var list = document.getElementById("snSteps");
  var text = document.getElementById("snText");
  var prevBtn = document.getElementById("snPrev");
  var nextBtn = document.getElementById("snNext");
  if (!list || !text || !prevBtn || !nextBtn) return;

  var steps = Array.prototype.slice.call(list.querySelectorAll(".sn-step"));
  var labels = steps.map(function (li) {
    return li.querySelector(".sn-name").textContent;
  });
  var current = steps.findIndex(function (li) {
    return li.classList.contains("is-current");
  });
  if (current < 0) current = 0;

  function paint() {
    steps.forEach(function (li, i) {
      li.classList.toggle("is-done", i < current);
      li.classList.toggle("is-current", i === current);
      // 只有已完成与当前步可点（当前步点了等于无操作，也允许聚焦）
      var btn = li.querySelector(".sn-btn");
      btn.disabled = i > current;
      btn.setAttribute("aria-current", i === current ? "step" : "false");
    });
    text.textContent = "第 " + (current + 1) + " 步：" + labels[current];
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === steps.length - 1;
    nextBtn.textContent = current === steps.length - 2 ? "完成" : "下一步";
    if (current === steps.length - 1) nextBtn.textContent = "已完成";
  }

  steps.forEach(function (li, i) {
    li.querySelector(".sn-btn").addEventListener("click", function () {
      if (i <= current) {
        current = i;
        paint();
      }
    });
  });

  prevBtn.addEventListener("click", function () {
    if (current > 0) {
      current -= 1;
      paint();
    }
  });
  nextBtn.addEventListener("click", function () {
    if (current < steps.length - 1) {
      current += 1;
      paint();
    }
  });

  paint();
})();
