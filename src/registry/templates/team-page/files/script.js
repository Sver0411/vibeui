(function () {
  "use strict";

  var MEMBERS = [
    { name: "林一舟", role: "工程 · 前端负责人", group: "eng", grad: ["#6366f1", "#a855f7"], links: ["github", "twitter", "mail"] },
    { name: "陈晓雨", role: "设计 · 视觉设计", group: "design", grad: ["#ec4899", "#f59e0b"], links: ["dribbble", "twitter"] },
    { name: "周远", role: "工程 · 平台工程师", group: "eng", grad: ["#0ea5e9", "#6366f1"], links: ["github", "mail"] },
    { name: "吴梓桐", role: "运营 · 内容负责人", group: "ops", grad: ["#10b981", "#84cc16"], links: ["twitter", "mail"] },
    { name: "郑南", role: "设计 · 交互设计", group: "design", grad: ["#f59e0b", "#ef4444"], links: ["dribbble", "github"] },
    { name: "苏黎", role: "工程 · 全栈工程师", group: "eng", grad: ["#8b5cf6", "#ec4899"], links: ["github", "twitter", "mail"] },
    { name: "何栖", role: "运营 · 社区运营", group: "ops", grad: ["#14b8a6", "#0ea5e9"], links: ["twitter", "mail"] },
    { name: "顾北", role: "设计 · 设计工程师", group: "design", grad: ["#f97316", "#ef4444"], links: ["dribbble", "github", "mail"] }
  ];

  var ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-4 1.2-4-2-5.6-2.6M15 21v-3.4c0-1 .1-1.4-.5-2 2.3-.2 4.5-1.1 4.5-5a3.9 3.9 0 0 0-1.1-2.7 3.6 3.6 0 0 0-.1-2.8s-1.1-.3-3.5 1.3a9.5 9.5 0 0 0-4.6 0C7.3 4.8 6.2 5.1 6.2 5.1a3.6 3.6 0 0 0-.1 2.8A3.9 3.9 0 0 0 5 10.6c0 3.9 2.2 4.8 4.5 5-.6.6-.6 1.2-.5 2V21"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 5.5c-.7.3-1.4.5-2.1.6a3.7 3.7 0 0 0 1.6-2 7.3 7.3 0 0 1-2.3.9 3.7 3.7 0 0 0-6.3 3.3A10.4 10.4 0 0 1 4.2 4.5a3.7 3.7 0 0 0 1.1 4.9c-.6 0-1.1-.2-1.6-.4 0 1.8 1.2 3.3 2.9 3.6-.5.2-1 .2-1.6.1a3.7 3.7 0 0 0 3.4 2.6A7.4 7.4 0 0 1 3 17.1a10.4 10.4 0 0 0 5.7 1.7c6.8 0 10.5-5.6 10.5-10.5v-.5c.7-.5 1.3-1.2 1.8-1.9Z"/></svg>',
    dribbble: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.6"/><path d="M5.5 7.6c3.2 2.6 8 4.4 14.5 3.4M15.4 4.2c-2.6 4.6-5.4 9.5-9.8 14.6M8.2 3.9c3.8 3.6 6.4 8.6 7.4 16"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.2" y="5.4" width="17.6" height="13.2" rx="2.2"/><path d="m4.2 7.2 7.8 5.6 7.8-5.6"/></svg>'
  };

  var LINK_LABEL = { github: "GitHub", twitter: "Twitter", dribbble: "Dribbble", mail: "邮箱" };

  var grid = document.getElementById("tp-grid");
  var empty = document.getElementById("tp-empty");
  var chips = document.querySelectorAll(".tp-chip");
  if (!grid) return;

  function render(filter) {
    grid.innerHTML = "";
    var shown = 0;
    MEMBERS.forEach(function (m, i) {
      if (filter !== "all" && m.group !== filter) return;
      shown++;
      var card = document.createElement("article");
      card.className = "tp-card";
      card.style.animationDelay = (shown - 1) * 40 + "ms";

      var avatar = document.createElement("span");
      avatar.className = "tp-avatar";
      avatar.style.background = "linear-gradient(135deg, " + m.grad[0] + ", " + m.grad[1] + ")";
      avatar.textContent = m.name.charAt(0);
      avatar.setAttribute("aria-hidden", "true");

      var name = document.createElement("h3");
      name.className = "tp-name";
      name.textContent = m.name;

      var role = document.createElement("p");
      role.className = "tp-role";
      role.textContent = m.role;

      var links = document.createElement("div");
      links.className = "tp-links";
      m.links.forEach(function (k) {
        var a = document.createElement("a");
        a.className = "tp-link";
        a.href = "#";
        a.setAttribute("aria-label", m.name + " 的" + LINK_LABEL[k]);
        a.innerHTML = ICONS[k];
        a.addEventListener("click", function (e) { e.preventDefault(); });
        links.appendChild(a);
      });

      card.appendChild(avatar);
      card.appendChild(name);
      card.appendChild(role);
      card.appendChild(links);
      grid.appendChild(card);
    });
    empty.hidden = shown > 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) {
        c.classList.remove("is-active");
        c.setAttribute("aria-pressed", "false");
      });
      chip.classList.add("is-active");
      chip.setAttribute("aria-pressed", "true");
      render(chip.getAttribute("data-filter"));
    });
  });

  render("all");

  /* ---- 统计数字进视口滚动 ---- */
  var stats = document.getElementById("tp-stats");
  if (!stats) return;
  var counted = false;

  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var start = null;
    var DUR = 1100;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / DUR, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !counted) {
        counted = true;
        stats.querySelectorAll(".tp-num").forEach(countUp);
        io.disconnect();
      }
    });
  }, { threshold: 0.4 });

  io.observe(stats);
})();
