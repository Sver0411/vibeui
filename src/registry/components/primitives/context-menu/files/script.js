(function () {
  "use strict";

  var stage = document.getElementById("cm-stage");
  var menu = document.getElementById("cm-menu");
  var toast = document.getElementById("cm-toast");
  var toastTimer = null;
  var pressTimer = null;

  /** 在指定坐标打开菜单，并保证不超出视口 */
  function openAt(x, y) {
    menu.hidden = false;
    // 先显示拿到尺寸再定位
    var rect = menu.getBoundingClientRect();
    var left = Math.min(x, window.innerWidth - rect.width - 8);
    var top = Math.min(y, window.innerHeight - rect.height - 8);
    menu.style.left = Math.max(8, left) + "px";
    menu.style.top = Math.max(8, top) + "px";
    // 焦点移到第一个可用项，便于键盘操作
    var first = menu.querySelector(".cm-item:not(:disabled)");
    if (first) first.focus();
  }

  function close() {
    menu.hidden = true;
  }

  function showToast(text) {
    toast.textContent = text;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 1600);
  }

  // 桌面右键
  stage.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    openAt(e.clientX, e.clientY);
  });

  // 触屏长按 500ms 等效右键
  stage.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) return;
    var t = e.touches[0];
    pressTimer = window.setTimeout(function () {
      openAt(t.clientX, t.clientY);
    }, 500);
  }, { passive: true });

  ["touchmove", "touchend", "touchcancel"].forEach(function (evt) {
    stage.addEventListener(evt, function () {
      window.clearTimeout(pressTimer);
    }, { passive: true });
  });

  // 菜单内键盘导航：上下循环、Enter 触发、ESC 关闭
  menu.addEventListener("keydown", function (e) {
    var items = Array.prototype.slice.call(menu.querySelectorAll(".cm-item:not(:disabled)"));
    var idx = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      (items[idx + 1] || items[0]).focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      (items[idx - 1] || items[items.length - 1]).focus();
    } else if (e.key === "Escape") {
      close();
      stage.focus();
    }
  });

  // 点击菜单项：禁用项不响应，其余给出执行反馈
  menu.addEventListener("click", function (e) {
    var item = e.target.closest(".cm-item");
    if (!item || item.disabled) return;
    close();
    showToast("已执行：" + item.textContent.trim());
  });

  // 点击外部 / 滚动 / 缩放时关闭
  document.addEventListener("pointerdown", function (e) {
    if (!menu.hidden && !menu.contains(e.target)) close();
  });
  window.addEventListener("scroll", close, { passive: true });
  window.addEventListener("resize", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.hidden) close();
  });

  // 舞台可聚焦，便于关闭后归还焦点
  stage.tabIndex = -1;
})();
