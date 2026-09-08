/**
 * 悬浮操作组（Speed Dial）：FAB 展开一列子操作
 * - 点击 FAB 展开/收起，加号旋转成关闭；子操作带 stagger 弹入
 * - 点击外部或 ESC 收起；aria-expanded 同步，操作结果经 aria-live 播报
 */
(function () {
  var dial = document.getElementById("sdDial");
  var fab = document.getElementById("sdFab");
  var actions = document.getElementById("sdActions");
  var live = document.getElementById("sdLive");
  if (!dial || !fab || !actions) return;

  var open = false;

  function show() {
    open = true;
    actions.hidden = false;
    dial.classList.add("is-open");
    fab.setAttribute("aria-expanded", "true");
    var first = actions.querySelector("button");
    if (first) first.focus();
  }

  function hide() {
    open = false;
    actions.hidden = true;
    dial.classList.remove("is-open");
    fab.setAttribute("aria-expanded", "false");
  }

  fab.addEventListener("click", function () {
    open ? hide() : show();
  });

  actions.querySelectorAll(".sd-mini").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (live) live.textContent = "已触发：" + btn.dataset.label;
      hide();
      fab.focus();
    });
  });

  document.addEventListener("pointerdown", function (event) {
    if (open && !dial.contains(event.target)) hide();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && open) {
      hide();
      fab.focus();
    }
  });
})();
