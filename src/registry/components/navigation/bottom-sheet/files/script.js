/**
 * 底部弹层：把手拖拽跟手、下滑关闭
 * - 拖动把手时面板 translateY 跟随手指（关闭过渡暂停）
 * - 松手时位移超过 90px 或 350ms 内快速下滑 ≥ 220px/s 即关闭，否则弹回
 * - 遮罩点击 / 取消按钮 / ESC 同样可关闭
 */
(function () {
  var stage = document.getElementById("bsStage");
  var layer = document.getElementById("bsLayer");
  var mask = document.getElementById("bsMask");
  var sheet = layer ? layer.querySelector(".bs-sheet") : null;
  var grip = document.getElementById("bsGrip");
  var cancel = document.getElementById("bsCancel");
  var openBtn = document.getElementById("bsOpen");
  if (!stage || !layer || !sheet || !grip) return;

  var isOpen = false;

  function open() {
    layer.hidden = false;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        layer.classList.add("is-open");
      });
    });
    isOpen = true;
    var first = sheet.querySelector("button");
    if (first) first.focus({ preventScroll: true });
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    layer.classList.remove("is-open");
    sheet.style.transform = "";
    var done = function () {
      layer.hidden = true;
      sheet.removeEventListener("transitionend", done);
    };
    sheet.addEventListener("transitionend", done);
    setTimeout(done, 380); // reduced-motion 兜底
    openBtn && openBtn.focus({ preventScroll: true });
  }

  if (openBtn) openBtn.addEventListener("click", open);
  if (mask) mask.addEventListener("click", close);
  if (cancel) cancel.addEventListener("click", close);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen) close();
  });

  // ---- 把手拖拽 ----
  var startY = 0;
  var startTranslate = 0;
  var lastY = 0;
  var lastT = 0;
  var dragging = false;
  var CLOSE_DISTANCE = 90;
  var FLICK_SPEED = 0.22; // px/ms

  grip.addEventListener("pointerdown", function (event) {
    if (!isOpen) return;
    event.preventDefault();
    grip.setPointerCapture(event.pointerId);
    dragging = true;
    startY = event.clientY;
    lastY = startY;
    lastT = performance.now();
    startTranslate = 0;
    sheet.classList.add("is-dragging");
  });

  grip.addEventListener("pointermove", function (event) {
    if (!dragging) return;
    var delta = Math.max(0, event.clientY - startY); // 只允许向下滑
    lastY = event.clientY;
    lastT = performance.now();
    sheet.style.transform = "translateY(" + delta + "px)";
  });

  function finishDrag(event) {
    if (!dragging) return;
    dragging = false;
    grip.releasePointerCapture(event.pointerId);
    sheet.classList.remove("is-dragging");

    var delta = event.clientY - startY;
    var speed = (event.clientY - lastY) / Math.max(1, performance.now() - lastT);
    if (delta > CLOSE_DISTANCE || (delta > 24 && speed > FLICK_SPEED)) {
      sheet.style.transform = "translateY(" + delta + "px)";
      close();
    } else {
      sheet.style.transform = ""; // 弹回原位（恢复过渡）
    }
  }

  grip.addEventListener("pointerup", finishDrag);
  grip.addEventListener("pointercancel", finishDrag);
})();
