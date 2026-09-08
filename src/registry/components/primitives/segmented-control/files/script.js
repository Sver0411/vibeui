/**
 * 分段控件：让白色滑块对齐当前选中的分段。
 *
 * 选中态本身由原生 radio 驱动（:checked + .sg-text），JS 只负责测量并把
 * 滑块的宽度和位移写回去，因此键盘方向键、表单提交、无障碍语义都是原生的。
 *
 * 监听点：
 * - change / input：切换分段
 * - ResizeObserver：字体加载、容器变宽、换行时重新测量
 */
(function () {
  var groups = document.querySelectorAll("[data-segmented]");
  if (!groups.length) return;

  function sync(group) {
    var thumb = group.querySelector(".sg-thumb");
    var checked = group.querySelector("input:checked");
    if (!thumb || !checked) return;

    var item = checked.closest(".sg-item");
    if (!item) return;

    // offsetLeft 相对于是 .sg（position: relative），正好是滑块的坐标系
    thumb.style.width = item.offsetWidth + "px";
    thumb.style.transform = "translateX(" + item.offsetLeft + "px)";
    group.setAttribute("data-ready", "");
  }

  groups.forEach(function (group) {
    group.addEventListener("change", function () {
      sync(group);
    });

    // 键盘方向键在部分浏览器里不触发 change，用 keyup 兜底
    group.addEventListener("keyup", function (event) {
      if (event.key.indexOf("Arrow") === 0) sync(group);
    });

    if (typeof ResizeObserver !== "undefined") {
      var ro = new ResizeObserver(function () {
        sync(group);
      });
      ro.observe(group);
      group.querySelectorAll(".sg-item").forEach(function (item) {
        ro.observe(item);
      });
    } else {
      window.addEventListener("resize", function () {
        sync(group);
      });
    }

    sync(group);
    // 字体加载完成后文字宽度会变，等一帧再量一次
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        sync(group);
      });
    }
  });
})();
