/**
 * Coming Soon 落地页：倒计时 + 上线通知
 * - 目标时间取 2026-12-31，若已过期则顺延 30 天，保证演示永远有数
 * - 每秒刷新天/时/分/秒，数字用 tabular-nums 防跳动
 * - 邮箱简单校验后给出演示反馈
 */
(function () {
  var days = document.getElementById("csDays");
  var hours = document.getElementById("csHours");
  var mins = document.getElementById("csMins");
  var secs = document.getElementById("csSecs");
  if (!days || !hours || !mins || !secs) return;

  var pad = function (n) {
    return n < 10 ? "0" + n : String(n);
  };

  var target = new Date("2026-12-31T00:00:00+08:00").getTime();
  if (Date.now() > target) {
    target = Date.now() + 30 * 24 * 3600 * 1000;
  }

  function tick() {
    var diff = Math.max(0, target - Date.now());
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    days.textContent = pad(d);
    hours.textContent = pad(h);
    mins.textContent = pad(m);
    secs.textContent = pad(s);
  }

  tick();
  setInterval(tick, 1000);

  // ---- 通知表单（演示反馈） ----
  var form = document.getElementById("csForm");
  var input = document.getElementById("csEmail");
  var hint = document.getElementById("csHint");
  if (!form || !input || !hint) return;

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var value = input.value.trim();
    if (!EMAIL_RE.test(value)) {
      input.classList.add("is-error");
      hint.classList.remove("is-ok");
      hint.textContent = value ? "邮箱格式看起来不太对" : "请输入邮箱地址";
      input.focus();
      return;
    }
    input.classList.remove("is-error");
    hint.classList.add("is-ok");
    hint.textContent = "收到！上线时会第一时间通知 " + value;
    input.value = "";
  });

  input.addEventListener("input", function () {
    input.classList.remove("is-error");
    hint.textContent = "";
    hint.classList.remove("is-ok");
  });
})();
