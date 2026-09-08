/**
 * Wallet card: balance rolls from 0 to the target with eased rAF steps;
 * the card number toggles between masked and real, auto re-masking after
 * 3s so a forgotten reveal doesn't linger on screen.
 */
(function () {
  var balanceEl = document.getElementById("wc-balance");
  var eyeBtn = document.getElementById("wc-eye");
  var numberEl = document.getElementById("wc-number");
  if (!balanceEl || !eyeBtn || !numberEl) return;

  var target = parseFloat(balanceEl.getAttribute("data-value")) || 0;
  var DURATION = 1200;
  var start = null;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function frame(now) {
    if (start === null) start = now;
    var progress = Math.min(1, (now - start) / DURATION);
    var value = target * easeOutCubic(progress);
    balanceEl.textContent = "¥" + value.toLocaleString("zh-CN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);

  var masked = true;
  var realNumber = numberEl.getAttribute("data-real");
  var maskTimer = null;

  eyeBtn.addEventListener("click", function () {
    masked = !masked;
    eyeBtn.setAttribute("aria-pressed", masked ? "false" : "true");
    eyeBtn.setAttribute("aria-label", masked ? "显示卡号" : "隐藏卡号");
    if (masked) {
      numberEl.textContent = realNumber.slice(0, 4) + " •••• •••• •••• ";
      clearTimeout(maskTimer);
    } else {
      numberEl.textContent = realNumber;
      // 3 秒后自动重新遮罩，防止卡号一直留在屏幕上
      maskTimer = setTimeout(function () {
        masked = true;
        numberEl.textContent = realNumber.slice(0, 4) + " •••• •••• •••• ";
        eyeBtn.setAttribute("aria-pressed", "false");
        eyeBtn.setAttribute("aria-label", "显示卡号");
      }, 3000);
    }
  });
})();
