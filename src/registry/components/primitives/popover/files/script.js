/**
 * Popover: open on trigger click, close on outside click / Esc, flip the
 * placement when the viewport edge is near, and keep the arrow pointing at
 * the trigger. One instance open at a time.
 */
(function () {
  var instances = [];

  function createInstance(anchor) {
    var trigger = anchor.querySelector(".pv-trigger");
    var panel = anchor.querySelector(".pv-panel");
    if (!trigger || !panel) return;
    var instance = { anchor: anchor, trigger: trigger, panel: panel, open: false };
    instances.push(instance);

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      instance.open ? close(instance) : open(instance);
    });

    panel.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }

  function open(instance) {
    instances.forEach(function (other) {
      if (other !== instance && other.open) close(other);
    });

    var panel = instance.panel;
    var triggerRect = instance.trigger.getBoundingClientRect();
    // 按可用空间决定方向：上方放不下就翻到下方
    var placeBelow = triggerRect.top < 190;
    panel.classList.toggle("pv--bottom", placeBelow);
    panel.classList.toggle("pv--top", !placeBelow);

    panel.hidden = false;
    // 双 rAF 确保初始态先渲染，transition 才会生效
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        panel.classList.add("is-open");
      });
    });

    // 箭头对准触发器中心，clamp 在浮层宽度内
    var panelWidth = panel.offsetWidth || 250;
    var triggerCenterInAnchor =
      instance.trigger.offsetLeft + instance.trigger.offsetWidth / 2;
    var panelLeftInAnchor = instance.anchor.offsetWidth / 2 - panelWidth / 2;
    var x = Math.max(16, Math.min(triggerCenterInAnchor - panelLeftInAnchor, panelWidth - 16));
    panel.style.setProperty("--pv-arrow-x", x + "px");

    instance.trigger.setAttribute("aria-expanded", "true");
    instance.open = true;
  }

  function close(instance) {
    if (!instance.open) return;
    var panel = instance.panel;
    panel.classList.remove("is-open");
    instance.trigger.setAttribute("aria-expanded", "false");
    instance.open = false;
    var done = false;
    function hide() {
      if (done) return;
      done = true;
      panel.hidden = true;
    }
    panel.addEventListener("transitionend", hide, { once: true });
    setTimeout(hide, 240);
  }

  document.querySelectorAll(".pv-anchor").forEach(createInstance);

  // 点外关闭（捕获阶段，配合面板内 stopPropagation 防误关）
  document.addEventListener(
    "click",
    function (event) {
      instances.forEach(function (instance) {
        if (!instance.open) return;
        if (instance.anchor.contains(event.target)) return;
        close(instance);
      });
    },
    true,
  );

  // Esc 关闭并归还焦点
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    instances.forEach(function (instance) {
      if (!instance.open) return;
      close(instance);
      instance.trigger.focus();
    });
  });
})();
