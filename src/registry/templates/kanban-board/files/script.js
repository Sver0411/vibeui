(function () {
  "use strict";

  var COLUMNS = ["待办", "进行中", "已完成"];
  var TAG_COLORS = { 设计: "#7c3aed", 开发: "#2563eb", 调研: "#0d9488", 运营: "#ea580c" };

  var state = [
    [
      { title: "新版落地页设计稿", tag: "设计", who: "安", due: "9/8" },
      { title: "竞品筛选交互调研", tag: "调研", who: "北", due: "9/10" },
    ],
    [
      { title: "多选下拉组件开发", tag: "开发", who: "晨", due: "9/6" },
      { title: "九月份社媒排期", tag: "运营", who: "多", due: "9/7" },
    ],
    [
      { title: "深色模式变量梳理", tag: "开发", who: "霏", due: "9/3" },
    ],
  ];

  var board = document.getElementById("kb-board");
  var meta = document.getElementById("kb-meta");
  var dragEl = null;

  /** 用户输入的标题渲染前必须转义，防止标题里的 HTML 被当作标签执行 */
  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function total() {
    return state.reduce(function (s, col) { return s + col.length; }, 0);
  }

  /** 全量渲染三列 */
  function render() {
    board.innerHTML = "";
    meta.textContent = total() + " 个任务";

    state.forEach(function (cards, ci) {
      var col = document.createElement("section");
      col.className = "kb-column";
      col.dataset.col = ci;
      col.setAttribute("aria-label", COLUMNS[ci]);

      col.innerHTML =
        '<div class="kb-col-head"><span class="kb-col-title">' + COLUMNS[ci] +
        '</span><span class="kb-col-count">' + cards.length + "</span></div>" +
        '<div class="kb-cards"></div>';

      var wrap = col.querySelector(".kb-cards");

      cards.forEach(function (card, ri) {
        wrap.appendChild(buildCard(card, ci, ri));
      });

      col.appendChild(buildAdd(ci));
      board.appendChild(col);
      bindDnD(col, wrap);
    });
  }

  function buildCard(card, ci, ri) {
    var el = document.createElement("article");
    el.className = "kb-card";
    el.draggable = true;
    el.tabIndex = 0;
    el.dataset.col = ci;
    el.dataset.row = ri;
    el.setAttribute("aria-label", card.title + "，" + COLUMNS[ci]);

    el.innerHTML =
      '<div class="kb-card-title">' + escapeHtml(card.title) + "</div>" +
      '<div class="kb-card-meta">' +
      '<button type="button" class="kb-move" data-dir="-1" aria-label="向左移动" ' + (ci === 0 ? "disabled" : "") + ">◀</button>" +
      '<span class="kb-tag" style="background:' + (TAG_COLORS[card.tag] || "#64748b") + '">' + escapeHtml(card.tag) + "</span>" +
      '<span class="kb-avatar" style="background:' + (TAG_COLORS[card.tag] || "#64748b") + '">' + escapeHtml(card.who) + "</span>" +
      '<span class="kb-due">' + escapeHtml(card.due) + "</span>" +
      '<button type="button" class="kb-move" data-dir="1" aria-label="向右移动" ' + (ci === COLUMNS.length - 1 ? "disabled" : "") + ">▶</button>" +
      "</div>";

    // 拖拽源
    el.addEventListener("dragstart", function (e) {
      dragEl = el;
      el.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", ci + ":" + ri);
    });
    el.addEventListener("dragend", function () {
      el.classList.remove("dragging");
      dragEl = null;
      clearIndicators();
    });

    // 键盘友好的左右移动
    el.addEventListener("click", function (e) {
      var btn = e.target.closest(".kb-move");
      if (!btn) return;
      move(ci, ri, Number(btn.dataset.dir));
    });

    return el;
  }

  function buildAdd(ci) {
    var add = document.createElement("div");
    add.className = "kb-add";
    add.innerHTML = '<input type="text" placeholder="新任务标题…" aria-label="在' + COLUMNS[ci] + '添加任务" /><button type="button" aria-label="添加">＋</button>';
    var input = add.querySelector("input");
    function submit() {
      var title = input.value.trim();
      if (!title) return;
      state[ci].push({ title: title, tag: "调研", who: "新", due: "—" });
      render();
    }
    add.querySelector("button").addEventListener("click", submit);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") submit();
    });
    return add;
  }

  /** 列级拖放：计算插入位置并移动卡片 */
  function bindDnD(col, wrap) {
    col.addEventListener("dragover", function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      col.classList.add("dragover");
      clearIndicators();

      var indicator = document.createElement("div");
      indicator.className = "kb-indicator";
      var after = null;
      var cards = Array.prototype.slice.call(wrap.querySelectorAll(".kb-card:not(.dragging)"));
      cards.some(function (card) {
        var rect = card.getBoundingClientRect();
        if (e.clientY < rect.top + rect.height / 2) { after = card; return true; }
        return false;
      });
      if (after) wrap.insertBefore(indicator, after);
      else wrap.appendChild(indicator);
    });

    col.addEventListener("dragleave", function (e) {
      if (!col.contains(e.relatedTarget)) col.classList.remove("dragover");
    });

    col.addEventListener("drop", function (e) {
      e.preventDefault();
      col.classList.remove("dragover");
      clearIndicators();
      var from = e.dataTransfer.getData("text/plain").split(":");
      var fi = Number(from[0]), ri = Number(from[1]);
      var ti = Number(col.dataset.col);
      if (isNaN(fi) || isNaN(ti)) return;
      var moved = state[fi].splice(ri, 1)[0];
      // 依据指示线位置决定插入索引
      var cards = Array.prototype.slice.call(wrap.querySelectorAll(".kb-card:not(.dragging)"));
      var insertAt = cards.length;
      cards.some(function (card, idx) {
        var rect = card.getBoundingClientRect();
        if (e.clientY < rect.top + rect.height / 2) { insertAt = idx; return true; }
        return false;
      });
      state[ti].splice(insertAt, 0, moved);
      render();
    });
  }

  function clearIndicators() {
    board.querySelectorAll(".kb-indicator").forEach(function (el) { el.remove(); });
  }

  /** 键盘/按钮移动：ci 列 ri 行向 dir 方向移一列 */
  function move(ci, ri, dir) {
    var ti = ci + dir;
    if (ti < 0 || ti >= COLUMNS.length) return;
    var moved = state[ci].splice(ri, 1)[0];
    state[ti].push(moved);
    render();
  }

  render();
})();
