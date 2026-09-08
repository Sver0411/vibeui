/**
 * Split button: primary click runs the main action; arrow toggles the menu.
 * Outside click / Esc close (focus returns to arrow); ArrowUp/Down move the
 * highlighted item, Enter picks it.
 */
(function () {
  var root = document.getElementById("sb-main");
  var main = root ? root.querySelector(".sb-main") : null;
  var arrow = root ? root.querySelector(".sb-arrow") : null;
  var menu = document.getElementById("sb-menu");
  var toast = document.getElementById("sb-toast");
  if (!root || !main || !arrow || !menu || !toast) return;

  var open = false;
  var activeIndex = -1;

  function showToast(text) {
    toast.textContent = text;
    toast.classList.add("is-show");
    setTimeout(function () {
      toast.classList.remove("is-show");
    }, 1800);
  }

  function openMenu() {
    menu.hidden = false;
    arrow.setAttribute("aria-expanded", "true");
    open = true;
    setActive(-1);
  }

  function closeMenu(refocus) {
    if (!open) return;
    menu.hidden = true;
    arrow.setAttribute("aria-expanded", "false");
    open = false;
    setActive(-1);
    if (refocus) arrow.focus();
  }

  function items() {
    return Array.prototype.slice.call(menu.querySelectorAll(".sb-item"));
  }

  function setActive(index) {
    var list = items();
    activeIndex = index;
    list.forEach(function (item, i) {
      if (i === index) item.focus();
    });
  }

  main.addEventListener("click", function () {
    showToast("已保存 ✓");
  });

  arrow.addEventListener("click", function (event) {
    event.stopPropagation();
    open ? closeMenu(false) : openMenu();
  });

  menu.addEventListener("click", function (event) {
    var item = event.target.closest(".sb-item");
    if (!item) return;
    showToast(item.dataset.action + " ✓");
    closeMenu(false);
    arrow.focus();
  });

  // 键盘：菜单内 ↑↓ 循环、Enter 选中（click 即触发）、Esc 关闭
  root.addEventListener("keydown", function (event) {
    if (!open) {
      if (event.key === "ArrowDown" && event.target === main) {
        event.preventDefault();
        openMenu();
      }
      return;
    }
    var list = items();
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((activeIndex + 1) % list.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((activeIndex - 1 + list.length) % list.length);
    } else if (event.key === "Escape") {
      event.stopPropagation();
      closeMenu(true);
    }
  });

  // 点外关闭
  document.addEventListener("click", function (event) {
    if (open && !root.contains(event.target)) closeMenu(false);
  });
})();
