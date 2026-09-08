(function () {
  "use strict";

  var list = document.getElementById("ac-list");
  var multiBox = document.getElementById("ac-multi");
  var items = Array.prototype.slice.call(list.querySelectorAll(".ac-item"));

  /** 展开 / 收起一项 */
  function setItem(item, open) {
    var trigger = item.querySelector(".ac-trigger");
    var panel = item.querySelector(".ac-panel");
    trigger.setAttribute("aria-expanded", String(open));
    panel.classList.toggle("open", open);
    panel.setAttribute("aria-hidden", String(!open));
  }

  function isOpen(item) {
    return item.querySelector(".ac-trigger").getAttribute("aria-expanded") === "true";
  }

  items.forEach(function (item) {
    item.querySelector(".ac-trigger").addEventListener("click", function () {
      var willOpen = !isOpen(item);
      // 单开模式：先收起其它项
      if (!multiBox.checked) {
        items.forEach(function (other) {
          if (other !== item && isOpen(other)) setItem(other, false);
        });
      }
      setItem(item, willOpen);
    });
  });

  // 初始状态与 HTML aria 一致：第一项展开
  setItem(items[0], true);
})();
