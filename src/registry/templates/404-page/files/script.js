/**
 * 404 页面：按 / 聚焦搜索、演示版站内搜索提示、返回上一页
 * - "/" 或 Ctrl/Cmd+K 聚焦搜索框（输入中不劫持）
 * - 提交搜索时给出演示反馈；返回按钮优先 history.back()
 */
(function () {
  var input = document.getElementById("nfInput");
  var hint = document.getElementById("nfHint");
  var form = document.getElementById("nfSearch");
  var back = document.getElementById("nfBack");
  var home = document.getElementById("nfHome");
  if (!input || !hint || !form) return;

  // ---- "/" 快捷聚焦 ----
  document.addEventListener("keydown", function (event) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if ((event.key === "/" || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) && !typing) {
      event.preventDefault();
      input.focus();
    }
  });

  // ---- 演示版搜索反馈 ----
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var q = input.value.trim();
    if (!q) {
      hint.textContent = "输入关键词试试，例如「卡片」「动效」";
      return;
    }
    hint.textContent = "演示环境：这里会跳转到「" + q + "」的搜索结果";
  });

  input.addEventListener("input", function () {
    hint.textContent = "";
  });

  // ---- 返回上一页 / 回到首页 ----
  if (back) {
    back.addEventListener("click", function () {
      if (history.length > 1) history.back();
      else hint.textContent = "没有历史记录了，试试回到首页";
    });
  }
  if (home) {
    home.addEventListener("click", function () {
      hint.textContent = "演示环境：这里会跳转到站点首页";
    });
  }
})();
