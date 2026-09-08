/**
 * Inline edit: swap the static text for an input sized to the text via
 * canvas measureText so the layout never jumps. Enter/blur commits, Esc
 * cancels (a flag keeps blur from double-firing), empty input shakes and
 * stays in edit mode.
 */
(function () {
  var measureCanvas = document.createElement("canvas");
  var measureCtx = measureCanvas.getContext("2d");

  function textWidth(text, font) {
    if (!measureCtx) return text.length * 10 + 20;
    measureCtx.font = font;
    return measureCtx.measureText(text).width;
  }

  function initInlineEdit(root) {
    var text = root.querySelector(".ie-text");
    var input = root.querySelector(".ie-input");
    var pencil = root.querySelector(".ie-pencil");
    if (!text || !input || !pencil) return;

    var editing = false;
    var cancelNextBlur = false;

    function font() {
      return '600 16px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';
    }

    function startEdit() {
      if (editing) return;
      editing = true;
      cancelNextBlur = false;
      input.value = text.textContent;
      input.hidden = false;
      text.hidden = true;
      pencil.hidden = true;
      // 按文本实测宽度设置输入框宽度，避免布局跳动
      var w = Math.ceil(textWidth(input.value, font())) + 20;
      input.style.width = Math.max(w, 56) + "px";
      input.focus();
      input.select();
    }

    function stopEdit() {
      editing = false;
      input.hidden = true;
      text.hidden = false;
      pencil.hidden = false;
      input.classList.remove("is-shake");
    }

    function commit() {
      var value = input.value.trim();
      if (!value) {
        // 空值：抖动提示并保持编辑态
        input.classList.remove("is-shake");
        void input.offsetWidth;
        input.classList.add("is-shake");
        return;
      }
      var changed = value !== text.textContent;
      text.textContent = value;
      input.value = value;
      stopEdit();
      if (changed) {
        text.classList.remove("is-flash");
        void text.offsetWidth;
        text.classList.add("is-flash");
      }
    }

    function cancel() {
      input.value = text.textContent;
      stopEdit();
    }

    text.addEventListener("click", startEdit);
    pencil.addEventListener("click", startEdit);

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        commit();
      } else if (event.key === "Escape") {
        event.stopPropagation();
        cancelNextBlur = true; // 防止随后的 blur 走保存路径
        cancel();
        text.focus && text.focus();
      }
    });

    input.addEventListener("blur", function () {
      if (cancelNextBlur) {
        cancelNextBlur = false;
        return;
      }
      commit();
    });
  }

  document.querySelectorAll(".ie").forEach(initInlineEdit);
})();
