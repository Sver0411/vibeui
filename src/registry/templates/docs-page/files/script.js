(function () {
  "use strict";

  // 右侧目录 scroll-spy：标题进入视口上半部时高亮对应链接
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll("[data-toc]"));
  var headings = tocLinks
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  function setActive(id) {
    tocLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + id);
    });
  }

  if ("IntersectionObserver" in window) {
    var visible = new Set();
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) visible.add(en.target.id);
          else visible.delete(en.target.id);
        });
        // 取文档顺序中最靠上的可见标题
        var current = headings.find(function (h) { return visible.has(h.id); });
        if (current) setActive(current.id);
      },
      { rootMargin: "-12% 0px -70% 0px" }
    );
    headings.forEach(function (h) { io.observe(h); });
  }

  // 离屏检测兜底（与沙箱暂停约定配合）：无 observer 时退化为点击高亮
  tocLinks.forEach(function (a) {
    a.addEventListener("click", function () { setActive(a.getAttribute("href").slice(1)); });
  });
})();
