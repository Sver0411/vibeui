(function () {
  "use strict";

  var USERS = [
    { name: "安安", id: "@anan", color: "#2563eb" },
    { name: "北北", id: "@beibei", color: "#7c3aed" },
    { name: "晨晨", id: "@chen", color: "#0d9488" },
    { name: "多多", id: "@duoduo", color: "#ea580c" },
    { name: "二凡", id: "@erfan", color: "#db2777" },
    { name: "霏霏", id: "@feifei", color: "#4f46e5" },
  ];

  var editor = document.getElementById("mn-editor");
  var menu = document.getElementById("mn-menu");
  var countEl = document.getElementById("mn-count");
  var MAX = 140;

  var state = { active: -1, items: [], query: "" };

  /** 取光标前的文本，判断是否处于 @词 中 */
  function currentQuery() {
    var sel = window.getSelection();
    if (!sel || !sel.rangeCount) return null;
    var node = sel.anchorNode;
    if (!node || node.nodeType !== Node.TEXT_NODE) return null;
    if (!editor.contains(node)) return null;
    var text = node.textContent.slice(0, sel.anchorOffset);
    var m = text.match(/@([^\s@]{0,12})$/);
    return m ? m[1] : null;
  }

  /** 渲染候选菜单 */
  function renderMenu() {
    var query = state.query.toLowerCase();
    state.items = USERS.filter(function (u) {
      return !query || u.name.toLowerCase().indexOf(query) > -1 || u.id.toLowerCase().indexOf(query) > -1;
    });
    menu.innerHTML = "";
    if (!state.items.length) {
      var empty = document.createElement("li");
      empty.className = "mn-empty";
      empty.textContent = "没有匹配的成员";
      menu.appendChild(empty);
    }
    state.items.forEach(function (u, i) {
      var li = document.createElement("li");
      li.className = "mn-item" + (i === state.active ? " active" : "");
      li.setAttribute("role", "option");
      li.dataset.name = u.name;
      li.innerHTML =
        '<span class="mn-avatar" style="background:' + u.color + '">' + u.name.charAt(0) + "</span>" +
        "<span>" + u.name + "</span><span class='mn-id'>" + u.id + "</span>";
      li.addEventListener("pointerdown", function (e) {
        e.preventDefault(); // 防止编辑器失焦
        pick(u.name);
      });
      menu.appendChild(li);
    });
    menu.hidden = false;
    // 高亮项滚动到可视区
    var act = menu.querySelector(".mn-item.active");
    if (act) act.scrollIntoView({ block: "nearest" });
  }

  /** 打开 / 关闭菜单 */
  function showMenu() {
    state.active = state.items.length ? 0 : -1;
    renderMenu();
  }

  function hideMenu() {
    menu.hidden = true;
    state.active = -1;
    state.items = [];
    state.query = "";
  }

  /** 把提及标签插入到 @词 的位置 */
  function pick(name) {
    var sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    var range = sel.getRangeAt(0);
    var node = range.startContainer;
    var offset = range.startOffset;
    if (node.nodeType !== Node.TEXT_NODE) return;

    var text = node.textContent;
    var before = text.slice(0, offset).replace(/@[^\s@]{0,12}$/, "");
    var after = text.slice(offset);
    node.textContent = before;

    var tag = document.createElement("span");
    tag.className = "mn-tag";
    tag.contentEditable = "false";
    tag.textContent = "@" + name;
    tag.dataset.mention = name;

    var tail = document.createTextNode(after);
    var parent = node.parentNode;
    parent.insertBefore(tag, node.nextSibling);
    parent.insertBefore(tail, tag.nextSibling);

    // 光标落到标签后的文本上
    range = document.createRange();
    range.setStart(tail, 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    hideMenu();
    updateCount();
    editor.focus();
  }

  function updateCount() {
    var len = editor.textContent.replace(/\u00a0/g, " ").length;
    countEl.textContent = len + "/" + MAX;
    countEl.classList.toggle("over", len > MAX);
  }

  editor.addEventListener("input", function () {
    updateCount();
    var q = currentQuery();
    if (q === null) { hideMenu(); return; }
    state.query = q;
    showMenu();
  });

  editor.addEventListener("keydown", function (e) {
    if (menu.hidden) return;
    var items = Array.prototype.slice.call(menu.querySelectorAll(".mn-item"));
    if (!items.length) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      var dir = e.key === "ArrowDown" ? 1 : -1;
      state.active = (state.active + dir + items.length) % items.length;
      items.forEach(function (el, i) { el.classList.toggle("active", i === state.active); });
      items[state.active].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      pick(items[state.active].dataset.name);
    } else if (e.key === "Escape") {
      hideMenu();
    }
  });

  // 点击编辑器外部关闭菜单
  document.addEventListener("pointerdown", function (e) {
    if (!menu.hidden && !e.target.closest(".mn-card")) hideMenu();
  });

  updateCount();
})();
