(function () {
  "use strict";

  var KEY = "cc-demo-choice";
  var bar = document.getElementById("cc-bar");
  var settingsBtn = document.getElementById("cc-settings");
  var prefs = document.getElementById("cc-prefs");
  var analytics = document.getElementById("cc-analytics");
  var marketing = document.getElementById("cc-marketing");
  var toast = document.getElementById("cc-toast");
  var toastTimer = null;

  function showToast(text) {
    toast.textContent = text;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.textContent = ""; }, 2400);
  }

  /** 收起并移除同意条（先播离场动画） */
  function dismiss() {
    bar.classList.add("leaving");
    window.setTimeout(function () { bar.hidden = true; }, 260);
  }

  function acceptAll() {
    analytics.checked = true;
    marketing.checked = true;
    save({ essential: true, analytics: true, marketing: true });
  }

  function essentialOnly() {
    save({ essential: true, analytics: false, marketing: false });
  }

  function savePrefs() {
    save({ essential: true, analytics: analytics.checked, marketing: marketing.checked });
  }

  function save(choice) {
    try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch (e) { /* 隐私模式忽略 */ }
    dismiss();
    showToast("偏好已保存：" + summarize(choice));
  }

  function summarize(c) {
    var on = ["必要"];
    if (c.analytics) on.push("分析");
    if (c.marketing) on.push("营销");
    return on.join(" / ");
  }

  settingsBtn.addEventListener("click", function () {
    var open = prefs.hidden;
    prefs.hidden = !open;
    settingsBtn.setAttribute("aria-expanded", String(open));
  });

  document.getElementById("cc-accept").addEventListener("click", acceptAll);
  document.getElementById("cc-essential").addEventListener("click", essentialOnly);
  document.getElementById("cc-save").addEventListener("click", savePrefs);

  // 重置演示：清掉已存选择并重新弹出
  document.getElementById("cc-reset").addEventListener("click", function () {
    try { localStorage.removeItem(KEY); } catch (e) { /* 忽略 */ }
    bar.hidden = false;
    bar.classList.remove("leaving");
    prefs.hidden = true;
    settingsBtn.setAttribute("aria-expanded", "false");
    toast.textContent = "";
  });

  // 已有选择则不再弹出
  try {
    var saved = localStorage.getItem(KEY);
    if (saved) {
      bar.hidden = true;
      showToast("已恢复上次选择：" + summarize(JSON.parse(saved)));
    }
  } catch (e) { /* 忽略 */ }
})();
