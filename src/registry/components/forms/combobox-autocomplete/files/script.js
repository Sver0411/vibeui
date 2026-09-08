/**
 * Combobox: filter-as-type with keyboard navigation. Highlighted fragments
 * are escaped before <mark> wrapping; composition (IME) input pauses
 * filtering; blur closes with a small delay so option clicks land first.
 */
(function () {
  var DATA = [
    { label: "北京 · 北京区域", keywords: "北京 beijing bj" },
    { label: "上海 · 华东区域", keywords: "上海 shanghai sh" },
    { label: "广州 · 华南区域", keywords: "广州 guangzhou gz" },
    { label: "深圳 · 华南区域", keywords: "深圳 shenzhen sz" },
    { label: "杭州 · 华东区域", keywords: "杭州 hangzhou hz" },
    { label: "成都 · 西南区域", keywords: "成都 chengdu cd" },
    { label: "香港 · 亚太区域", keywords: "香港 hongkong hk" },
    { label: "新加坡 · 东南亚区域", keywords: "新加坡 singapore xinjiapo sg" },
  ];

  var input = document.getElementById("cbx-input");
  var list = document.getElementById("cbx-list");
  if (!input || !list) return;

  var items = [];      // 当前渲染的选项 {label, keywords}
  var activeIndex = -1;
  var blurTimer = null;
  var composing = false;

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function markHit(label, q) {
    if (!q) return escapeHtml(label);
    var idx = label.toLowerCase().indexOf(q);
    if (idx === -1) return escapeHtml(label);
    return (
      escapeHtml(label.slice(0, idx)) +
      "<mark>" + escapeHtml(label.slice(idx, idx + q.length)) + "</mark>" +
      escapeHtml(label.slice(idx + q.length))
    );
  }

  function open() {
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  function close() {
    list.hidden = true;
    input.setAttribute("aria-expanded", "false");
    setActive(-1);
  }

  function setActive(index) {
    activeIndex = index;
    var options = list.querySelectorAll(".cbx-option");
    options.forEach(function (option, i) {
      if (i === index) {
        option.setAttribute("aria-selected", "true");
        option.scrollIntoView({ block: "nearest" });
      } else {
        option.removeAttribute("aria-selected");
      }
    });
    input.setAttribute(
      "aria-activedescendant",
      index >= 0 && options[index] ? options[index].id : "",
    );
  }

  function choose(index) {
    if (index < 0 || !items[index]) return;
    input.value = items[index].label.split(" · ")[0];
    close();
    input.focus();
  }

  function render(query) {
    var q = query.trim().toLowerCase();
    items = q
      ? DATA.filter(function (item) {
          return (item.label + " " + item.keywords).toLowerCase().includes(q);
        })
      : [];
    list.innerHTML = "";

    if (items.length === 0) {
      var emptyRow = document.createElement("li");
      emptyRow.className = "cbx-option cbx-option--empty";
      emptyRow.textContent = q ? "无匹配区域，换个关键词试试" : "";
      list.appendChild(emptyRow);
    } else {
      items.forEach(function (item, i) {
        var row = document.createElement("li");
        row.className = "cbx-option";
        row.id = "cbx-option-" + i;
        row.setAttribute("role", "option");
        row.innerHTML = markHit(item.label, q);
        row.addEventListener("mousedown", function (event) {
          event.preventDefault(); // 抢在 input blur 之前
          choose(i);
        });
        list.appendChild(row);
      });
    }
    setActive(-1);
    open();
  }

  input.addEventListener("compositionstart", function () {
    composing = true;
  });

  input.addEventListener("compositionend", function () {
    composing = false;
    render(input.value);
  });

  input.addEventListener("input", function () {
    if (composing) return;
    render(input.value);
  });

  input.addEventListener("keydown", function (event) {
    var count = items.length;
    if (event.key === "ArrowDown" && count) {
      event.preventDefault();
      setActive((activeIndex + 1) % count);
    } else if (event.key === "ArrowUp" && count) {
      event.preventDefault();
      setActive((activeIndex - 1 + count) % count);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex >= 0) choose(activeIndex);
    } else if (event.key === "Escape") {
      close();
    }
  });

  input.addEventListener("focus", function () {
    if (input.value.trim()) render(input.value);
  });

  input.addEventListener("blur", function () {
    blurTimer = setTimeout(close, 150);
  });

  list.addEventListener("mousedown", function () {
    clearTimeout(blurTimer); // 选项 mousedown 已 preventDefault，这里双保险
  });
})();
