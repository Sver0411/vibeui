/**
 * Scroll spy: IntersectionObserver tracks which section crosses the reading
 * line; near page bottom the last item is force-lit because short final
 * sections may never reach the line.
 */
(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll(".ss-section"));
  var links = Array.prototype.slice.call(document.querySelectorAll(".ss-link"));
  if (!sections.length || !links.length) return;

  function setActive(id) {
    links.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
    });
  }

  var visible = new Map();

  function pickActive() {
    var activeId = null;
    sections.forEach(function (section) {
      if (visible.get(section.id) && !activeId) activeId = section.id;
    });
    // 接近底部时强制高亮最后一项
    var nearBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
    if (nearBottom) activeId = sections[sections.length - 1].id;
    if (activeId) setActive(activeId);
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible.set(entry.target.id, entry.isIntersecting);
        });
        pickActive();
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  } else {
    // 极老浏览器降级：默认点亮第一节
    setActive(sections[0].id);
  }

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var target = document.getElementById(link.getAttribute("href").slice(1));
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(target.id);
    });
  });
})();
