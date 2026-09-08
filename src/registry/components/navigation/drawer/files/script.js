/**
 * 侧滑抽屉：左右双向、遮罩点击关闭、ESC 关闭、焦点管理
 * - hidden 属性控制挂载，is-open 类驱动过渡（两帧后添加以保证入场动画）
 * - 打开时焦点移入抽屉第一个可聚焦元素，关闭后归还给触发按钮
 */
(function () {
  var stage = document.getElementById("dwStage");
  if (!stage) return;

  var activeLayer = null;
  var lastTrigger = null;

  function open(layer, trigger) {
    if (activeLayer) close();
    lastTrigger = trigger;
    activeLayer = layer;
    layer.hidden = false;
    // 强制一帧重排，让 translateX(±100%) 的初始态先生效，再滑入
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        layer.classList.add("is-open");
      });
    });
    var focusable = layer.querySelector("button, a[href]");
    if (focusable) focusable.focus({ preventScroll: true });
  }

  function close() {
    if (!activeLayer) return;
    var layer = activeLayer;
    activeLayer = null;
    layer.classList.remove("is-open");
    // 等滑出动画结束再隐藏，避免闪断
    var panel = layer.querySelector(".dw-panel");
    var done = function () {
      layer.hidden = true;
      panel.removeEventListener("transitionend", done);
    };
    panel.addEventListener("transitionend", done);
    // reduced-motion 下 transitionend 可能不触发，兜底定时
    setTimeout(done, 350);
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  }

  stage.querySelectorAll(".dw-open").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var layer = document.getElementById(btn.dataset.drawer);
      if (layer) open(layer, btn);
    });
  });

  stage.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activeLayer) close();
  });
})();
