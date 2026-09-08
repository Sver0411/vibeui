/**
 * 定价表：切换计费周期。
 *
 * 价格数据写在 HTML 的 data-month / data-year 上，JS 只负责搬运，
 * 这样即使脚本没跑起来，页面也完整显示月付价格，不会留下空白。
 * 数字切换用一次淡出淡入掩盖跳变，避免价格瞬间变化造成误读。
 */
(function () {
  var toggle = document.querySelector(".pr-toggle");
  if (!toggle) return;

  var buttons = Array.prototype.slice.call(toggle.querySelectorAll("[data-cycle]"));
  var amounts = Array.prototype.slice.call(document.querySelectorAll(".pr-amount"));
  var billings = Array.prototype.slice.call(document.querySelectorAll(".pr-billing"));

  function apply(cycle) {
    buttons.forEach(function (btn) {
      var active = btn.dataset.cycle === cycle;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    amounts.forEach(function (el) {
      var next = el.dataset[cycle];
      if (!next || next === el.textContent) return;
      el.classList.add("is-swapping");
      setTimeout(function () {
        el.textContent = next;
        el.classList.remove("is-swapping");
      }, 160);
    });

    billings.forEach(function (el) {
      var next = el.dataset[cycle];
      if (next) el.textContent = next;
    });
  }

  buttons.forEach(function (btn) {
    btn.setAttribute("aria-pressed", btn.classList.contains("is-active") ? "true" : "false");
    btn.addEventListener("click", function () {
      apply(btn.dataset.cycle);
    });
  });
})();
