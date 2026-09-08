/**
 * 订阅区块：邮箱格式校验 + 成功态
 * - 非法邮箱：输入框描红 + 提示
 * - 合法邮箱：表单切换为成功反馈（演示环境不真正发请求）
 */
(function () {
  var form = document.getElementById("nlForm");
  var input = document.getElementById("nlEmail");
  var hint = document.getElementById("nlHint");
  if (!form || !input || !hint) return;

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var value = input.value.trim();

    if (!value) {
      fail("请输入邮箱地址");
      return;
    }
    if (!EMAIL_RE.test(value)) {
      fail("邮箱格式看起来不太对，检查一下？");
      return;
    }

    // 成功：清错误态，展示确认文案
    input.classList.remove("is-error");
    hint.classList.remove("is-error");
    hint.classList.add("is-ok");
    hint.textContent = "订阅成功！确认邮件已发送至 " + value;
    form.classList.remove("is-done");
    void form.offsetWidth; // 重放进场动画
    form.classList.add("is-done");
    input.value = "";
    input.blur();
  });

  input.addEventListener("input", function () {
    input.classList.remove("is-error");
    hint.textContent = "";
    hint.classList.remove("is-ok");
  });

  function fail(message) {
    input.classList.add("is-error");
    hint.classList.remove("is-ok");
    hint.textContent = message;
    input.focus();
  }
})();
