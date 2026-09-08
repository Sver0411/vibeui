(function () {
  "use strict";

  var trigger = document.getElementById("mm-trigger");
  var panel = document.getElementById("mm-panel");
  var entry = trigger.closest(".mm-entry");

  var open = false;
  var hoverTimer = null;
  var closeTimer = null;

  // 悬停意图：进入 80ms 后才打开，避免误扫；离开 200ms 后关闭
  var INTENT_MS = 80;
  var CLOSE_DELAY_MS = 200;

  function setOpen(next) {
    if (next === open) return;
    open = next;
    trigger.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
  }

  entry.addEventListener("pointerenter", function () {
    window.clearTimeout(closeTimer);
    hoverTimer = window.setTimeout(function () { setOpen(true); }, INTENT_MS);
  });

  entry.addEventListener("pointerleave", function () {
    window.clearTimeout(hoverTimer);
    closeTimer = window.setTimeout(function () { setOpen(false); }, CLOSE_DELAY_MS);
  });

  // 触屏 / 键盘：点击切换
  trigger.addEventListener("click", function () {
    setOpen(!open);
  });

  // 键盘：ESC 关闭并归还焦点
  panel.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      setOpen(false);
      trigger.focus();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && open) setOpen(false);
  });

  // 点击外部关闭
  document.addEventListener("pointerdown", function (e) {
    if (open && !entry.contains(e.target)) setOpen(false);
  });
})();
