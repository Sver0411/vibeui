/**
 * 区间滑块：单值 / 双端区间 / 步进刻度共用一套工厂函数
 * - 指针拖拽（Pointer Events，支持触摸）+ 方向键 / Home / End
 * - 双端滑块自动防交叉：min 永远不超过 max，反之亦然
 * - 所有变化同步到 role="slider" 的 aria-valuenow / aria-valuetext
 */
(function () {
  var root = document.querySelector(".rs-stage");
  if (!root) return;

  /** 创建一个滑块控制实例 */
  function createSlider(options) {
    var el = document.getElementById(options.root);
    var thumb = document.getElementById(options.thumb);
    var fill = document.getElementById(options.fill);
    if (!el || !thumb || !fill) return null;

    var min = options.min;
    var max = options.max;
    var step = options.step || 1;
    var value = options.value;
    var format = options.format || function (v) { return v; };
    var onChange = options.onChange || function () {};
    /** 双端区间时，另一侧滑块实例（用于防交叉） */
    var peer = null;
    var edge = options.edge || null; // "min" | "max"

    function clamp(v) {
      var low = min;
      var high = max;
      if (peer) {
        // 与另一端保持至少一个 step 的间距
        if (edge === "min") high = Math.min(high, peer.value - step);
        if (edge === "max") low = Math.max(low, peer.value + step);
      }
      return Math.min(high, Math.max(low, v));
    }

    function snapToStep(v) {
      return Math.round((v - min) / step) * step + min;
    }

    function render() {
      var pct = ((value - min) / (max - min)) * 100;
      thumb.style.left = pct + "%";
      thumb.setAttribute("aria-valuenow", String(value));
      thumb.setAttribute("aria-valuetext", String(format(value)));
      if (edge === null) {
        fill.style.width = pct + "%";
      } else if (edge === "min") {
        fill.style.left = pct + "%";
      } else {
        fill.style.right = (100 - pct) + "%";
      }
    }

    function set(v) {
      value = clamp(snapToStep(v));
      render();
      onChange(value);
    }

    /** 由指针横坐标反算数值 */
    function valueFromClientX(clientX) {
      var rect = el.getBoundingClientRect();
      var ratio = (clientX - rect.left) / Math.max(1, rect.width);
      return min + ratio * (max - min);
    }

    thumb.addEventListener("pointerdown", function (event) {
      event.preventDefault();
      thumb.setPointerCapture(event.pointerId);
      el.classList.add("is-dragging");
    });
    thumb.addEventListener("pointermove", function (event) {
      if (!thumb.hasPointerCapture(event.pointerId)) return;
      set(valueFromClientX(event.clientX));
    });
    thumb.addEventListener("pointerup", function (event) {
      thumb.releasePointerCapture(event.pointerId);
      el.classList.remove("is-dragging");
    });
    thumb.addEventListener("pointercancel", function () {
      el.classList.remove("is-dragging");
    });

    thumb.addEventListener("keydown", function (event) {
      var delta = 0;
      if (event.key === "ArrowRight" || event.key === "ArrowUp") delta = step;
      else if (event.key === "ArrowLeft" || event.key === "ArrowDown") delta = -step;
      else if (event.key === "PageUp") delta = step * 5;
      else if (event.key === "PageDown") delta = -step * 5;
      else if (event.key === "Home") { event.preventDefault(); set(min); return; }
      else if (event.key === "End") { event.preventDefault(); set(max); return; }
      else return;
      event.preventDefault();
      set(value + delta);
    });

    set(value);
    return { set: set, get value() { return value; }, __setPeer: function (p) { peer = p; } };
  }

  // ---- 单值滑块 ----
  var singleValueEl = document.getElementById("rsSingleValue");
  createSlider({
    root: "rsSingle",
    thumb: "rsSingleThumb",
    fill: "rsSingleFill",
    min: 0,
    max: 100,
    value: 40,
    onChange: function (v) {
      if (singleValueEl) singleValueEl.textContent = String(v);
    },
  });

  // ---- 双端区间：先各自创建，再互为 peer 防交叉 ----
  var rangeValueEl = document.getElementById("rsRangeValue");
  function paintRange(lo, hi) {
    if (rangeValueEl) rangeValueEl.textContent = "¥" + lo + " – ¥" + hi;
  }
  var rangeMin = createSlider({
    root: "rsRange",
    thumb: "rsRangeMin",
    fill: "rsRangeFill",
    min: 0,
    max: 1000,
    step: 10,
    value: 120,
    edge: "min",
    onChange: function (v) { paintRange(v, rangeMax ? rangeMax.value : 680); },
  });
  var rangeMax = createSlider({
    root: "rsRange",
    thumb: "rsRangeMax",
    fill: "rsRangeFill",
    min: 0,
    max: 1000,
    step: 10,
    value: 680,
    edge: "max",
    onChange: function (v) { paintRange(rangeMin ? rangeMin.value : 120, v); },
  });
  if (rangeMin && rangeMax) {
    rangeMin.__setPeer(rangeMax);
    rangeMax.__setPeer(rangeMin);
  }

  // ---- 步进刻度滑块 ----
  createSlider({
    root: "rsTicks",
    thumb: "rsTicksThumb",
    fill: "rsTicksFill",
    min: 0,
    max: 100,
    step: 25,
    value: 50,
  });
})();
