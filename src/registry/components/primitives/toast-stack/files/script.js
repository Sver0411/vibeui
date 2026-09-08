/**
 * 通知提示（Toast）
 *
 * 设计要点：
 * - 倒计时就是进度条的 CSS 动画，悬停暂停动画即暂停关闭，两者天然同步，
 *   不需要 JS 里再维护一套会漂移的 setTimeout。
 * - 关闭前先量出实际高度写入 --ts-h，退场动画才能精确收拢行高，
 *   后面排队的通知平滑上移而不是瞬间跳位。
 * - 错误类型用 role="alert" 立即播报，其余用 role="status" 礼貌排队。
 */
(function () {
  var stack = document.getElementById("tsStack");
  if (!stack) return;

  var ICONS = {
    success:
      '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
    info:
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></svg>',
    warning:
      '<svg viewBox="0 0 24 24"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
    error:
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
  };

  var LABELS = {
    success: "已保存",
    info: "有新版本",
    warning: "存储空间不足",
    error: "同步失败",
  };

  var DESCS = {
    success: "草稿已同步到云端。",
    info: "v2.4 已发布，包含 3 项改进。",
    warning: "剩余 8% 空间，建议清理历史文件。",
    error: "网络连接中断，将在恢复后自动重试。",
  };

  var MAX_VISIBLE = 4;

  function dismiss(toast) {
    if (toast.dataset.leaving === "1") return;
    toast.dataset.leaving = "1";

    // 先记录高度，再触发退场动画（动画里用 --ts-h 收拢行高）
    toast.style.setProperty("--ts-h", toast.offsetHeight + "px");
    toast.classList.add("is-leaving");

    var remove = function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    };
    toast.addEventListener("animationend", remove, { once: true });
    // 动画被 reduced-motion 或浏览器跳过时的兜底
    setTimeout(remove, 600);
  }

  function push(type, options) {
    var opts = options || {};
    var toast = document.createElement("div");
    toast.className = "ts-toast";
    toast.dataset.type = type;
    // 错误需要打断读屏主动播报，其余排队读完当前句子再说
    toast.setAttribute("role", type === "error" ? "alert" : "status");
    toast.setAttribute("aria-live", type === "error" ? "assertive" : "polite");
    toast.style.setProperty("--ts-duration", (opts.duration || 4200) + "ms");

    toast.innerHTML =
      '<span class="ts-icon" aria-hidden="true">' +
      (ICONS[type] || ICONS.info) +
      "</span>" +
      '<div class="ts-body">' +
      '<p class="ts-toast-title">' +
      (opts.title || LABELS[type] || "通知") +
      "</p>" +
      '<p class="ts-toast-desc">' +
      (opts.desc || DESCS[type] || "") +
      "</p>" +
      "</div>" +
      '<button type="button" class="ts-close" aria-label="关闭通知">×</button>' +
      '<span class="ts-bar" aria-hidden="true"></span>';

    var bar = toast.querySelector(".ts-bar");
    // 进度条跑完 = 时间到，animationend 就是这次通知的"定时器"
    bar.addEventListener("animationend", function () {
      dismiss(toast);
    });

    toast.querySelector(".ts-close").addEventListener("click", function () {
      dismiss(toast);
    });

    stack.appendChild(toast);

    // 超出上限时让最早的一条退场，避免刷屏
    var pending = stack.querySelectorAll(".ts-toast:not(.is-leaving)");
    if (pending.length > MAX_VISIBLE) dismiss(pending[0]);
  }

  document.querySelectorAll("[data-toast]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      push(btn.dataset.toast);
    });
  });

  // 首屏依次推三条，展示堆叠与排队效果
  [["success", 0], ["info", 260], ["warning", 520]].forEach(function (item) {
    setTimeout(function () {
      push(item[0], { duration: 9000 });
    }, item[1]);
  });
})();
