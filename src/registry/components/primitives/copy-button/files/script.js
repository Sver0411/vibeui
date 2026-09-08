/**
 * 复制按钮：写剪贴板 + 成功反馈
 * - 优先 navigator.clipboard，失败（沙箱/旧内核）回退到隐藏 textarea + execCommand
 * - 成功后按钮进入 is-copied 态（图标换对勾），1.6s 后恢复
 * - 结果通过 aria-live 的隐藏节点播报
 */
(function () {
  var root = document.querySelector(".cp-stage");
  if (!root) return;
  var live = document.getElementById("cpLive");

  var OK_SVG =
    '<svg class="cp-ok" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5l3 3 6-7" /></svg>';

  function writeClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // 回退方案：临时 textarea + execCommand
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy") ? resolve() : reject(new Error("copy failed"));
      } catch (err) {
        reject(err);
      } finally {
        ta.remove();
      }
    });
  }

  root.querySelectorAll(".cp-btn").forEach(function (btn) {
    // 预置成功对勾（隐藏，成功时显示）
    btn.insertAdjacentHTML("beforeend", OK_SVG);
    var label = btn.querySelector(".cp-label");
    var timer = null;

    btn.addEventListener("click", function () {
      writeClipboard(btn.dataset.copy)
        .then(function () {
          btn.classList.add("is-copied");
          if (label) label.textContent = "已复制";
          if (live) live.textContent = "已复制到剪贴板";
          clearTimeout(timer);
          timer = setTimeout(function () {
            btn.classList.remove("is-copied");
            if (label) label.textContent = "复制";
          }, 1600);
        })
        .catch(function () {
          if (live) live.textContent = "复制失败，请手动选择文本";
        });
    });
  });
})();
