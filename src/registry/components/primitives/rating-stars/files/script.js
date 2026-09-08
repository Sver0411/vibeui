/**
 * 评分星：半星预览 + 键盘微调
 * - 指针悬停/移动按 0.5 步进预览，离开恢复已选值
 * - 方向键 ±0.5，Home / End 跳到首尾
 * - 所有状态同步到 aria-checked，屏幕阅读器可获取当前值
 */
(function () {
  var root = document.getElementById("rtLive");
  var fill = document.getElementById("rtFill");
  var valueEl = document.getElementById("rtValue");
  if (!root || !fill) return;

  var hits = Array.prototype.slice.call(root.querySelectorAll(".rt-hit"));
  var MAX = hits.length;
  var value = 0; // 已确认的评分，0–5，步长 0.5

  function paint(v) {
    fill.style.width = (v / MAX) * 100 + "%";
  }

  function announce(v) {
    if (valueEl) valueEl.textContent = v % 1 === 0 ? String(v) : v.toFixed(1);
    hits.forEach(function (btn, i) {
      // 半星时该星处于"部分选中"，仍标记为 true 以便读屏连续
      btn.setAttribute("aria-checked", v >= i + 1 ? "true" : "false");
    });
  }

  function commit(v) {
    value = Math.min(MAX, Math.max(0, v));
    paint(value);
    announce(value);
  }

  /** 根据指针在某个星星内的横向位置判断是整星还是半星 */
  function valueFromPointer(btn, clientX) {
    var rect = btn.getBoundingClientRect();
    var index = Number(btn.dataset.index);
    var isHalf = rect.width > 0 && (clientX - rect.left) / rect.width < 0.5;
    return index + (isHalf ? 0.5 : 1);
  }

  hits.forEach(function (btn) {
    btn.addEventListener("mousemove", function (event) {
      paint(valueFromPointer(btn, event.clientX));
    });
    btn.addEventListener("click", function (event) {
      commit(valueFromPointer(btn, event.clientX));
    });
  });

  root.addEventListener("mouseleave", function () {
    paint(value);
  });

  root.addEventListener("keydown", function (event) {
    var step = 0;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") step = 0.5;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") step = -0.5;
    else if (event.key === "Home") {
      event.preventDefault();
      commit(0.5);
      hits[0].focus();
      return;
    } else if (event.key === "End") {
      event.preventDefault();
      commit(MAX);
      hits[MAX - 1].focus();
      return;
    } else return;

    event.preventDefault();
    var next = Math.min(MAX, Math.max(0, value + step));
    commit(next);
    // 焦点跟随到当前值所在的那颗星
    var focusIndex = Math.min(MAX - 1, Math.max(0, Math.ceil(next) - 1));
    hits[focusIndex].focus();
  });

  // 默认只让一颗星进入 tab 序列，方向键在组内移动（radiogroup 惯例）
  hits.forEach(function (btn, i) {
    btn.tabIndex = i === 0 ? 0 : -1;
  });

  commit(0);
})();
