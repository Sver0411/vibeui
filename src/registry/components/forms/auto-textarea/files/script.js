/**
 * 自适应文本域：输入时高度跟随内容，达到 max-height 后转为内部滚动
 * - 原理：先把 height 收缩到 auto 再读取 scrollHeight 赋回，避免高度只增不减
 * - 计数角标实时更新；带 maxlength 的变体超出时给错误反馈
 */
(function () {
  var root = document.querySelector(".at-stage");
  if (!root) return;

  function createAuto(options) {
    var area = document.getElementById(options.root);
    var wrap = document.getElementById(options.wrap);
    var count = document.getElementById(options.count);
    var hint = options.hint ? document.getElementById(options.hint) : null;
    if (!area || !wrap || !count) return;

    var MAX = options.max || Infinity;
    var MAX_HEIGHT = options.maxHeight || 220;

    function resize() {
      // 先收缩再测量，才能实现"只减不增"的正确高度
      area.style.height = "auto";
      var next = Math.min(area.scrollHeight, MAX_HEIGHT);
      area.style.height = next + "px";
      area.classList.toggle("is-overflow", area.scrollHeight > MAX_HEIGHT);
    }

    function paint(value) {
      var len = value.length;
      if (MAX === Infinity) {
        count.textContent = len + " 字";
      } else {
        count.textContent = len + " / " + MAX;
        var over = len >= MAX;
        wrap.classList.toggle("at-wrap--error", over);
        if (hint) {
          hint.textContent = over ? "已达字数上限，无法继续输入" : "";
        }
      }
    }

    area.addEventListener("input", function () {
      resize();
      paint(area.value);
    });

    // 初始按 rows 展示
    paint(area.value);
  }

  createAuto({ root: "atArea", wrap: "atWrap", count: "atCount" });
  createAuto({ root: "atArea2", wrap: "atWrap2", count: "atCount2", max: 30, hint: "atHint", maxHeight: 160 });
})();
