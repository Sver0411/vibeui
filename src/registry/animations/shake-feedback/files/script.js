(function () {
  "use strict";

  var form = document.getElementById("sf-form");
  var field = document.getElementById("sf-field");
  var input = document.getElementById("sf-email");
  var error = document.getElementById("sf-error");
  var success = document.getElementById("sf-success");

  function validate(value) {
    if (!value) return "请输入邮箱地址";
    // 简化校验：本地部分@域名.顶级域
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return "邮箱格式不正确";
    return null;
  }

  function showError(msg) {
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", "sf-error");
    error.textContent = msg;
    error.hidden = false;
    // 重启动画：先移除类，强制重排再加回
    field.classList.remove("shake");
    void field.offsetWidth;
    field.classList.add("shake");
    input.focus();
  }

  function clearError() {
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
    error.hidden = true;
    field.classList.remove("shake");
  }

  input.addEventListener("input", clearError);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    success.hidden = true;
    var msg = validate(input.value.trim());
    if (msg) {
      showError(msg);
      return;
    }
    clearError();
    success.hidden = false;
    input.value = "";
  });
})();
