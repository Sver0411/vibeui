(function () {
  "use strict";

  var MEMBERS = ["安安", "北北", "晨晨", "多多", "二凡", "霏霏", "光光", "含含"];

  var box = document.getElementById("ms-box");
  var panel = document.getElementById("ms-panel");
  var chipsBox = document.getElementById("ms-chips");
  var placeholder = document.getElementById("ms-placeholder");
  var search = document.getElementById("ms-search");
  var list = document.getElementById("ms-list");
  var countEl = document.getElementById("ms-count");
  var allBtn = document.getElementById("ms-all");
  var noneBtn = document.getElementById("ms-none");

  var selected = new Set();
  var open = false;

  /** 渲染选项列表（按关键词过滤） */
  function renderList(keyword) {
    var kw = (keyword || "").trim().toLowerCase();
    list.innerHTML = "";
    var shown = 0;
    MEMBERS.forEach(function (name) {
      if (kw && name.toLowerCase().indexOf(kw) === -1) return;
      shown++;
      var li = document.createElement("li");
      li.className = "ms-opt";
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", selected.has(name) ? "true" : "false");
      li.dataset.value = name;
      li.innerHTML =
        '<span class="ms-check"><svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">' +
        '<path d="M2 6.2 4.8 9 10 3.4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
        "<span>" + name + "</span>";
      list.appendChild(li);
    });
    if (!shown) {
      var empty = document.createElement("li");
      empty.className = "ms-empty";
      empty.textContent = "没有匹配的成员";
      list.appendChild(empty);
    }
  }

  /** 渲染触发框内的 chips */
  function renderChips() {
    chipsBox.innerHTML = "";
    var names = Array.from(selected);
    names.forEach(function (name) {
      var chip = document.createElement("span");
      chip.className = "ms-chip";
      chip.innerHTML =
        "<span>" + name + '</span><button type="button" class="ms-chip-x" data-remove="' +
        name + '" aria-label="移除 ' + name + '">×</button>';
      chipsBox.appendChild(chip);
    });
    chipsBox.hidden = names.length === 0;
    box.classList.toggle("has-value", names.length > 0);
    box.setAttribute("aria-label", "已选 " + names.join("、"));
    countEl.textContent = "已选 " + names.length + " 人";
  }

  function setOpen(next) {
    if (next === open) return;
    open = next;
    box.setAttribute("aria-expanded", String(open));
    if (open) {
      panel.hidden = false;
      requestAnimationFrame(function () { panel.classList.add("open"); });
      search.value = "";
      renderList("");
    } else {
      panel.classList.remove("open");
      window.setTimeout(function () { panel.hidden = true; }, 160);
    }
  }

  function toggle(name) {
    if (selected.has(name)) selected.delete(name);
    else selected.add(name);
    renderChips();
    renderList(search.value);
  }

  box.addEventListener("click", function () { setOpen(!open); });

  // 选项点击：切换选中态
  list.addEventListener("click", function (e) {
    var opt = e.target.closest(".ms-opt");
    if (opt) toggle(opt.dataset.value);
  });

  // 触发框内 chip 的 × 直接移除
  chipsBox.addEventListener("click", function (e) {
    var btn = e.target.closest(".ms-chip-x");
    if (!btn) return;
    e.stopPropagation();
    selected.delete(btn.dataset.remove);
    renderChips();
    if (open) renderList(search.value);
  });

  search.addEventListener("input", function () { renderList(search.value); });
  search.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      var first = list.querySelector(".ms-opt");
      if (first) { first.classList.add("active"); first.focus(); }
    }
  });

  allBtn.addEventListener("click", function () {
    MEMBERS.forEach(function (n) { selected.add(n); });
    renderChips(); renderList(search.value);
  });
  noneBtn.addEventListener("click", function () {
    selected.clear();
    renderChips(); renderList(search.value);
  });

  // 键盘：选项上用 Enter/Space 切换，上下移动焦点，ESC 关闭
  list.addEventListener("keydown", function (e) {
    var current = document.activeElement.closest(".ms-opt");
    var opts = Array.prototype.slice.call(list.querySelectorAll(".ms-opt"));
    if (!current) return;
    var idx = opts.indexOf(current);
    if (e.key === "ArrowDown") { e.preventDefault(); (opts[idx + 1] || current).focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); (opts[idx - 1] || current).focus(); }
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(current.dataset.value);
    } else if (e.key === "Escape") {
      setOpen(false); box.focus();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && open) { setOpen(false); box.focus(); }
  });

  // 点击面板外部关闭
  document.addEventListener("pointerdown", function (e) {
    if (open && !e.target.closest(".ms-field")) setOpen(false);
  });

  renderChips();
  renderList("");
})();
