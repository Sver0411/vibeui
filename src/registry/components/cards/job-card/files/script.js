/**
 * Job card: favorite toggle with aria-pressed, Enter on the focused card
 * acts as a click (demo logs instead of navigating).
 */
(function () {
  document.querySelectorAll(".jb").forEach(function (card) {
    card.addEventListener("click", function () {
      // 实际项目跳转详情页
      var title = card.querySelector(".jb-title");
      if (title) console.log("打开职位详情:", title.textContent);
    });

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && event.target === card) {
        card.click();
      }
    });
  });

  document.querySelectorAll(".jb-fav").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.stopPropagation(); // 不触发卡片点击
      var pressed = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", pressed ? "false" : "true");
    });
  });
})();
