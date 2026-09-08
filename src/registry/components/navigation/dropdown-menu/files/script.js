/**
 * 下拉菜单：完整键盘语义
 * - Enter / Space / ↓ 打开；↑↓ 在菜单项间循环移动焦点；ESC 关闭并归还焦点
 * - 点击外部关闭；aria-expanded / role="menu" 同步给读屏
 * - 两个实例共用一套工厂函数，互不影响
 */
(function () {
  var root = document.querySelector(".dm-stage");
  if (!root) return;

  function createDropdown(containerId) {
    var box = document.getElementById(containerId);
    if (!box) return;
    var trigger = box.querySelector(".dm-trigger");
    var menu = box.querySelector(".dm-menu");
    var items = Array.prototype.slice.call(menu.querySelectorAll(".dm-item"));
    var open = false;

    function show() {
      open = true;
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      items[0].focus();
    }

    function hide() {
      open = false;
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }

    trigger.addEventListener("click", function () {
      open ? hide() : show();
    });

    trigger.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown" && !open) {
        event.preventDefault();
        show();
      }
    });

    menu.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.stopPropagation();
        hide();
        trigger.focus();
        return;
      }
      var index = items.indexOf(document.activeElement);
      if (event.key === "ArrowDown") {
        event.preventDefault();
        items[(index + 1) % items.length].focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        items[(index - 1 + items.length) % items.length].focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        items[0].focus();
      } else if (event.key === "End") {
        event.preventDefault();
        items[items.length - 1].focus();
      }
    });

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        // 切换 checked 型菜单项的选中态（演示）
        if (item.hasAttribute("aria-checked")) {
          item.setAttribute("aria-checked", item.getAttribute("aria-checked") === "true" ? "false" : "true");
        }
        hide();
        trigger.focus();
      });
    });

    document.addEventListener("pointerdown", function (event) {
      if (open && !box.contains(event.target)) hide();
    });
  }

  createDropdown("dmBasic");
  createDropdown("dmRich");
})();
