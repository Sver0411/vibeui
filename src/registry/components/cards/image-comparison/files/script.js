/**
 * 图片对比滑块：拖拽 / 键盘控制分割线位置
 * - Pointer Events 拖拽跟手（容器任意位置按住即可拖动）
 * - 方向键 ±2、PageUp/Down ±10、Home/End 跳转，aria-valuenow 同步
 * - 上层用 clip-path: inset(0 right 0 0) 裁切，右侧百分比 = 100 - 位置
 */
(function () {
  var box = document.getElementById("icBox");
  var before = document.getElementById("icBefore");
  var handle = document.getElementById("icHandle");
  if (!box || !before || !handle) return;

  var pos = 50; // 0–100，分割线位置百分比

  function paint() {
    var clamped = Math.min(100, Math.max(0, pos));
    before.style.clipPath = "inset(0 " + (100 - clamped) + "% 0 0)";
    handle.style.left = clamped + "%";
    handle.setAttribute("aria-valuenow", String(Math.round(clamped)));
  }

  function posFromClientX(clientX) {
    var rect = box.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  box.addEventListener("pointerdown", function (event) {
    if (event.target === handle) return; // 手柄自身走 capture 拖拽
    pos = posFromClientX(event.clientX);
    paint();
  });

  handle.addEventListener("pointerdown", function (event) {
    event.preventDefault();
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener("pointermove", function (event) {
    if (!handle.hasPointerCapture(event.pointerId)) return;
    pos = posFromClientX(event.clientX);
    paint();
  });
  handle.addEventListener("pointerup", function (event) {
    handle.releasePointerCapture(event.pointerId);
  });

  handle.addEventListener("keydown", function (event) {
    var delta = 0;
    if (event.key === "ArrowRight") delta = 2;
    else if (event.key === "ArrowLeft") delta = -2;
    else if (event.key === "PageUp") delta = 10;
    else if (event.key === "PageDown") delta = -10;
    else if (event.key === "Home") { event.preventDefault(); pos = 0; paint(); return; }
    else if (event.key === "End") { event.preventDefault(); pos = 100; paint(); return; }
    else return;
    event.preventDefault();
    pos += delta;
    paint();
  });

  paint();
})();
