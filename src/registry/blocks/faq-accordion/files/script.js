/**
 * FAQ 手风琴：展开动画 + 单开互斥
 *
 * 两个关键点：
 * 1. 用 grid-template-rows: 0fr → 1fr 做展开，不需要 JS 去量内容高度，
 *    答案里换成长文案或多段落也不用改代码。
 * 2. details 的 open 属性一旦被移除，内容会立刻消失、没有收起动画。
 *    所以先移除 is-open 让高度动画跑完，再把 open 置回 false。
 *    因此 summary 的默认行为被 preventDefault 接管，由脚本控制开合。
 */
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll(".fa-item"));
  if (!items.length) return;

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DURATION = reduced ? 0 : 300;

  function isOpen(item) {
    return item.classList.contains("is-open");
  }

  function expand(item) {
    item.open = true;
    // 读一次布局，让 0fr 真正成为过渡起点，否则会直接跳到展开态
    void item.offsetHeight;
    item.classList.add("is-open");
  }

  function collapse(item) {
    if (!isOpen(item)) {
      item.open = false;
      return;
    }
    item.classList.remove("is-open");
    if (DURATION === 0) {
      item.open = false;
      return;
    }

    var done = false;
    var finish = function () {
      if (done) return;
      done = true;
      clearTimeout(timer);
      item.removeEventListener("transitionend", onEnd);
      item.open = false;
    };
    var onEnd = function (event) {
      // 只认高度那一条过渡，图标旋转也会冒泡上来
      if (event.propertyName === "grid-template-rows") finish();
    };
    var timer = setTimeout(finish, DURATION + 80);

    item.addEventListener("transitionend", onEnd);
  }

  items.forEach(function (item) {
    var summary = item.querySelector(".fa-q");
    if (!summary) return;

    // HTML 里带 open 的项，补上 is-open 才能显示展开态
    if (item.open) item.classList.add("is-open");

    summary.addEventListener("click", function (event) {
      event.preventDefault();
      var shouldOpen = !isOpen(item);

      // 同一时刻只展开一条，避免页面被顶得跳动
      items.forEach(function (other) {
        if (other !== item && isOpen(other)) collapse(other);
      });

      if (shouldOpen) expand(item);
      else collapse(item);
    });
  });
})();
