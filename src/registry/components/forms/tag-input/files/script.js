/**
 * 标签输入框：回车添加、退格删除末位、重复/超上限抖动报错
 * - 点击输入区空白处聚焦输入框
 * - 删除按钮逐个移除，计数同步到下方提示
 * - 最多 5 个标签，超限或重复时闪烁错误色
 */
(function () {
  var field = document.getElementById("tiField");
  var input = document.getElementById("tiInput");
  var hint = document.getElementById("tiHint");
  if (!field || !input || !hint) return;

  var MAX = 5;
  /** 初始标签从 DOM 反推，保证 HTML 即初始状态 */
  var tags = Array.prototype.slice
    .call(field.querySelectorAll(".ti-chip"))
    .map(function (chip) {
      return chip.firstChild ? chip.firstChild.textContent.trim() : "";
    })
    .filter(Boolean);

  function paintError() {
    field.classList.remove("is-error");
    // 触发 reflow 让 shake 动画可重复播放
    void field.offsetWidth;
    field.classList.add("is-error");
  }

  function render() {
    field.querySelectorAll(".ti-chip").forEach(function (chip) {
      chip.remove();
    });
    tags.forEach(function (tag) {
      var chip = document.createElement("span");
      chip.className = "ti-chip";
      chip.appendChild(document.createTextNode(tag));

      var x = document.createElement("button");
      x.type = "button";
      x.className = "ti-x";
      x.setAttribute("aria-label", "移除标签 " + tag);
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 12 12");
      svg.setAttribute("aria-hidden", "true");
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M3 3l6 6M9 3l-6 6");
      svg.appendChild(path);
      x.appendChild(svg);
      x.addEventListener("click", function () {
        remove(tag);
        input.focus();
      });
      chip.appendChild(x);
      field.insertBefore(chip, input);
    });
    hint.textContent = "已添加 " + tags.length + " / " + MAX + " 个标签";
    hint.classList.remove("is-error");
  }

  function remove(tag) {
    tags = tags.filter(function (t) {
      return t !== tag;
    });
    render();
  }

  function add(raw) {
    var tag = raw.trim().replace(/\s+/g, " ");
    if (!tag) return;
    if (tags.length >= MAX) {
      hint.textContent = "最多添加 " + MAX + " 个标签";
      hint.classList.add("is-error");
      paintError();
      return;
    }
    if (tags.indexOf(tag) !== -1) {
      hint.textContent = "标签「" + tag + "」已存在";
      hint.classList.add("is-error");
      paintError();
      return;
    }
    tags.push(tag);
    render();
  }

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      add(input.value);
      input.value = "";
    } else if (event.key === "Backspace" && input.value === "" && tags.length) {
      remove(tags[tags.length - 1]);
    }
  });

  // 点击输入区空白聚焦输入框
  field.addEventListener("pointerdown", function (event) {
    if (event.target === field) {
      event.preventDefault();
      input.focus();
    }
  });

  render();
})();
