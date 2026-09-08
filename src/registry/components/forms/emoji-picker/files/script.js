(function () {
  "use strict";

  var CATS = [
    { id: "smileys", icon: "😀", label: "表情", items: "😀 😃 😄 😁 😆 😅 🤣 😂 🙂 😉 😊 😍 🥰 😘 😜 🤪 🤔 🤗 🤩 😴 🥱 😎 🥳 😇".split(" ") },
    { id: "gestures", icon: "👍", label: "手势", items: "👍 👎 👌 ✌️ 🤞 🤟 🤘 👏 🙌 🤝 💪 🙏 ✍️ 👋 🖐️ 🤙".split(" ") },
    { id: "animals", icon: "🐶", label: "动物", items: "🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🦄".split(" ") },
    { id: "food", icon: "🍕", label: "食物", items: "🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍒 🍑 🥭 🍍 🥝 🍕 🍔 🍟 🌭 🍿 🍩 🍪 🎂 🍦".split(" ") },
    { id: "objects", icon: "🚀", label: "物品", items: "⌚ 📱 💻 ⌨️ 🖥️ 🖱️ 💡 🔦 🕯️ 📦 ✏️ 📚 🎁 🎈 🚀 ⚡ 🔥 ✨ 🎉 🏆".split(" ") },
  ];

  var catsBox = document.getElementById("ep-cats");
  var grid = document.getElementById("ep-grid");
  var search = document.getElementById("ep-search");
  var recentBox = document.getElementById("ep-recent");
  var picked = document.getElementById("ep-picked");

  var activeCat = CATS[0].id;
  var recent = [];
  var RECENT_MAX = 8;

  function renderCats() {
    catsBox.innerHTML = "";
    CATS.forEach(function (c) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ep-cat" + (c.id === activeCat ? " active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", String(c.id === activeCat));
      btn.title = c.label;
      btn.textContent = c.icon;
      btn.addEventListener("click", function () {
        activeCat = c.id;
        search.value = "";
        renderCats();
        renderGrid();
      });
      catsBox.appendChild(btn);
    });
  }

  function renderGrid() {
    var kw = search.value.trim().toLowerCase();
    var cat = CATS.find(function (c) { return c.id === activeCat; });
    var items = kw
      ? CATS.flatMap(function (c) { return c.items; }).filter(function (e) { return e.indexOf(kw) > -1; })
      : cat.items;

    grid.innerHTML = "";
    if (!items.length) {
      var empty = document.createElement("div");
      empty.className = "ep-empty";
      empty.textContent = "没有匹配的表情";
      grid.appendChild(empty);
      return;
    }
    items.forEach(function (e) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ep-emoji";
      btn.setAttribute("role", "option");
      btn.textContent = e;
      btn.addEventListener("click", function () { pick(e); });
      grid.appendChild(btn);
    });
  }

  function pick(e) {
    picked.textContent = "已选择：" + e;
    // 记录最近使用（去重，最新在前）
    recent = [e].concat(recent.filter(function (r) { return r !== e; })).slice(0, RECENT_MAX);
    renderRecent();
  }

  function renderRecent() {
    recentBox.textContent = recent.join(" ");
  }

  search.addEventListener("input", renderGrid);

  document.getElementById("ep-close").addEventListener("click", function () {
    picked.textContent = "（演示：面板已可关闭）";
  });

  renderCats();
  renderGrid();
})();
