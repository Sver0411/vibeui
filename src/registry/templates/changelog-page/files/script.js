/**
 * Changelog: IntersectionObserver watches version blocks; whichever is in
 * the reading zone highlights its nav anchor. Click = smooth scroll.
 */
(function () {
  var versions = Array.prototype.slice.call(document.querySelectorAll("[data-version]"));
  var navItems = Array.prototype.slice.call(document.querySelectorAll(".cl-nav-item"));
  if (!versions.length || !navItems.length) return;

  function setActive(id) {
    navItems.forEach(function (item) {
      var target = item.getAttribute("href").slice(1);
      item.classList.toggle("is-active", target === id);
    });
  }

  if ("IntersectionObserver" in window) {
    var visible = new Map(); // id -> 是否在阅读区
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible.set(entry.target.id, entry.isIntersecting);
        });
        // 取最靠近视口顶部的可见版本
        var activeId = null;
        versions.forEach(function (block) {
          if (visible.get(block.id) && !activeId) activeId = block.id;
        });
        if (activeId) setActive(activeId);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    versions.forEach(function (block) {
      observer.observe(block);
    });
  }

  navItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      var target = document.getElementById(item.getAttribute("href").slice(1));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
