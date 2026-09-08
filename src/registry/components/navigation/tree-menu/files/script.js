/**
 * Tree menu: group rows toggle their branch via grid-rows 0fr<->1fr (no
 * height measuring); leaf items set aria-current exclusively.
 */
(function () {
  document.querySelectorAll(".tm").forEach(function (tree) {
    // 分组：整行可点，切换展开态
    tree.querySelectorAll(".tm-row--group").forEach(function (row) {
      var toggle = row.querySelector(".tm-toggle");
      var branch = row.parentElement.querySelector(".tm-branch");
      if (!toggle || !branch) return;

      function sync() {
        var expanded = toggle.getAttribute("aria-expanded") === "true";
        branch.classList.toggle("is-open", expanded);
      }

      function flip() {
        toggle.setAttribute(
          "aria-expanded",
          toggle.getAttribute("aria-expanded") === "true" ? "false" : "true",
        );
        sync();
      }

      toggle.addEventListener("click", flip);
      row.addEventListener("click", function (event) {
        if (event.target === toggle) return; // 避免双触发
        flip();
      });
      toggle.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          flip();
        }
      });
      sync();
    });

    // 叶子：互斥高亮
    tree.querySelectorAll(".tm-item").forEach(function (item) {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        tree.querySelectorAll(".tm-item").forEach(function (other) {
          other.classList.remove("is-current");
          other.removeAttribute("aria-current");
        });
        item.classList.add("is-current");
        item.setAttribute("aria-current", "true");
      });
    });
  });
})();
