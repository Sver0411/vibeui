/**
 * 数量步进器：单击 ±step、长按连发、到达边界自动禁用
 * - 长按 400ms 后以 90ms 间隔连发，松开或移出按钮即停止
 * - 数值变化带轻微弹动动画，aria-live 播报
 */
(function () {
  var root = document.querySelector(".st-stage");
  if (!root) return;

  /** 创建一个步进器实例 */
  function createStepper(options) {
    var el = document.getElementById(options.root);
    if (!el) return;
    var out = el.querySelector(".stepper__value");
    var btns = el.querySelectorAll(".stepper__btn");
    var minus = btns[0];
    var plus = btns[1];

    var min = options.min;
    var max = options.max;
    var step = options.step || 1;
    var value = options.value;
    var hint = options.hint ? document.getElementById(options.hint) : null;
    var repeatTimer = null;

    function paint() {
      if (out) out.textContent = String(value);
      // 触发弹动动画（先移除再添加，保证可重复播放）
      if (out) {
        out.classList.remove("is-bump");
        void out.offsetWidth;
        out.classList.add("is-bump");
      }
      if (minus) minus.disabled = value <= min;
      if (plus) plus.disabled = value >= max;
      if (hint) {
        if (value >= max) {
          hint.textContent = "已达库存上限 " + max;
          hint.classList.add("is-warn");
        } else {
          hint.textContent = "库存充足";
          hint.classList.remove("is-warn");
        }
      }
    }

    function bump(delta) {
      var next = Math.min(max, Math.max(min, value + delta));
      if (next === value) return;
      value = next;
      paint();
    }

    /** 长按连发：先延迟 400ms，再以 90ms 间隔重复 */
    function startRepeat(delta, btn) {
      stopRepeat();
      repeatTimer = setTimeout(function () {
        repeatTimer = setInterval(function () {
          bump(delta);
        }, 90);
      }, 400);

      function stop() {
        stopRepeat();
        btn.removeEventListener("pointerup", stop);
        btn.removeEventListener("pointerleave", stop);
        btn.removeEventListener("pointercancel", stop);
      }
      btn.addEventListener("pointerup", stop);
      btn.addEventListener("pointerleave", stop);
      btn.addEventListener("pointercancel", stop);
    }

    function stopRepeat() {
      if (repeatTimer !== null) {
        clearTimeout(repeatTimer);
        clearInterval(repeatTimer);
        repeatTimer = null;
      }
    }

    Array.prototype.forEach.call(btns, function (btn) {
      var dir = Number(btn.dataset.dir);
      btn.addEventListener("click", function () {
        bump(dir * step);
      });
      btn.addEventListener("pointerdown", function () {
        startRepeat(dir * step, btn);
      });
    });

    paint();
  }

  createStepper({ root: "stBasic", min: 0, max: 99, step: 1, value: 1 });
  createStepper({
    root: "stBounded",
    min: 1,
    max: 9,
    step: 1,
    value: 1,
    hint: "stBoundedHint",
  });
})();
