(function () {
  "use strict";

  var form = document.getElementById("ct-form");
  var done = document.getElementById("ct-done");
  var again = document.getElementById("ct-again");

  var RULES = {
    "ct-name": function (v) {
      if (!v.trim()) return "请填写称呼";
      return null;
    },
    "ct-email": function (v) {
      if (!v.trim()) return "请填写邮箱";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "邮箱格式不正确";
      return null;
    },
    "ct-msg": function (v) {
      if (v.trim().length < 10) return "再描述详细一点（至少 10 个字）";
      return null;
    },
  };

  /** 校验单个字段，同步错误文案与 aria */
  function checkField(id) {
    var input = document.getElementById(id);
    var errEl = document.querySelector('[data-err-for="' + id + '"]');
    var msg = RULES[id](input.value);
    if (msg) {
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", errEl.id || "");
      errEl.textContent = msg;
      errEl.hidden = false;
    } else {
      input.removeAttribute("aria-invalid");
      errEl.hidden = true;
    }
    return !msg;
  }

  Object.keys(RULES).forEach(function (id) {
    var input = document.getElementById(id);
    // 失焦即校验，输入时若已有错误则实时复检
    input.addEventListener("blur", function () { checkField(id); });
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true") checkField(id);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var allOk = Object.keys(RULES).map(checkField).every(Boolean);
    if (!allOk) {
      // 聚焦第一个出错字段
      var firstErr = form.querySelector('[aria-invalid="true"]');
      if (firstErr) firstErr.focus();
      return;
    }
    form.hidden = true;
    done.hidden = false;
  });

  again.addEventListener("click", function () {
    form.reset();
    Object.keys(RULES).forEach(function (id) {
      document.getElementById(id).removeAttribute("aria-invalid");
      document.querySelector('[data-err-for="' + id + '"]').hidden = true;
    });
    done.hidden = true;
    form.hidden = false;
    document.getElementById("ct-name").focus();
  });
})();
