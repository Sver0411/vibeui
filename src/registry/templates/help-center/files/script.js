/**
 * Help center search: debounced keyword filter over data-keywords; empty
 * result state with a one-click clear; hot tags fill the input and filter.
 */
(function () {
  var input = document.getElementById("hc-input");
  var empty = document.getElementById("hc-empty");
  var clearBtn = document.getElementById("hc-clear");
  if (!input || !empty) return;

  var groups = Array.prototype.slice.call(document.querySelectorAll("[data-group]"));
  var DEBOUNCE_MS = 150;
  var timer = null;

  function applyFilter(term) {
    var q = term.trim().toLowerCase();
    var anyHit = false;

    groups.forEach(function (group) {
      var articles = group.querySelectorAll(".hc-article");
      var groupHit = false;
      articles.forEach(function (article) {
        var keywords = (article.getAttribute("data-keywords") || "") + " " + article.textContent;
        var hit = !q || keywords.toLowerCase().indexOf(q) !== -1;
        article.style.display = hit ? "" : "none";
        if (hit) groupHit = true;
      });
      group.style.display = groupHit ? "" : "none";
      if (groupHit) anyHit = true;
    });

    // 无关键词时展示初始态（不显示空态）
    empty.hidden = !(q && !anyHit);
  }

  input.addEventListener("input", function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      applyFilter(input.value);
    }, DEBOUNCE_MS);
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      input.value = "";
      applyFilter("");
      input.focus();
    });
  }

  // 热门标签：填入并立即过滤
  document.querySelectorAll(".hc-hot-tag").forEach(function (tag) {
    tag.addEventListener("click", function () {
      input.value = tag.textContent;
      applyFilter(input.value);
      input.focus();
    });
  });
})();
