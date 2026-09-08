/**
 * Scripts injected into every sandboxed preview iframe.
 * Written as plain string concatenation (no template literals) so the code
 * ships exactly as displayed and avoids escaping pitfalls.
 *
 * Responsibilities:
 * - Bridge console output / runtime errors to the parent via postMessage.
 * - Toggle a `atlas-paused` class so CSS + rAF animations stop when the
 *   preview scrolls out of view (resources check this class in rAF loops).
 * - Report content height so previews can auto-size.
 * - All messages are tagged with `__atlas: true` and `__atlasControl`.
 */
export const PREVIEW_HARNESS_SCRIPT = `(function () {
  "use strict";
  var PAUSED = false;
  var MSG = { __atlas: true };

  function send(payload) {
    try { parent.postMessage(Object.assign({}, MSG, payload), "*"); } catch (e) {}
  }
  function formatValue(value) {
    if (value === undefined) return "undefined";
    if (value === null) return "null";
    if (value instanceof Error) return value.stack || value.message;
    if (typeof value === "string") return value;
    if (typeof value === "function") return "[function " + (value.name || "anonymous") + "]";
    try { return JSON.stringify(value) ?? String(value); } catch (e) { return String(value); }
  }

  ["log", "info", "warn", "error", "debug"].forEach(function (level) {
    var original = console[level] ? console[level].bind(console) : function () {};
    console[level] = function () {
      var args = Array.prototype.slice.call(arguments).map(formatValue);
      send({ type: "console", level: level, message: args.join(" ") });
      try { original.apply(null, arguments); } catch (e) {}
    };
  });

  window.addEventListener("error", function (event) {
    send({
      type: "error",
      message: (event.message || "Script error") + (event.lineno ? " (line " + event.lineno + ")" : "")
    });
  });
  window.addEventListener("unhandledrejection", function (event) {
    var reason = event.reason;
    var text = reason instanceof Error ? reason.stack || reason.message : String(reason);
    send({ type: "error", message: "Unhandled promise rejection: " + text });
  });

  function applyPause() {
    document.documentElement.classList.toggle("atlas-paused", PAUSED);
    try { window.__atlasPaused = PAUSED; } catch (e) {}
    try {
      document.dispatchEvent(new CustomEvent("atlas:visibility", { detail: { paused: PAUSED } }));
    } catch (e) {}
  }
  window.addEventListener("message", function (event) {
    var data = event.data;
    if (!data || data.__atlasControl !== true) return;
    if (data.type === "pause" && !PAUSED) { PAUSED = true; applyPause(); }
    if (data.type === "resume" && PAUSED) { PAUSED = false; applyPause(); }
    // 实时调参：父页面把用户改过的变量生成为覆盖 CSS，整体替换到一个
    // 专职 <style> 里。自定义属性是 live 的，改完动画立即跟随。
    if (data.type === "tuning") {
      var el = document.getElementById("atlas-tuning-style");
      if (!el) {
        el = document.createElement("style");
        el.id = "atlas-tuning-style";
        document.head.appendChild(el);
      }
      el.textContent = typeof data.css === "string" ? data.css : "";
    }
  });

  try {
    window.localStorage.getItem("__probe__");
  } catch (err) {
    send({ type: "console", level: "warn", message: "LocalStorage is disabled inside the preview sandbox." });
  }

  // 预览只用于观看：拦截沙箱内的链接跳转与表单提交。资源里的 <a href>
  // （如 "#"、"mailto:"、"/"）一旦被点击，会把 iframe 导航到其他页面
  // （例如站点首页），看起来就像"跳出去了"。统一阻止，保持预览原样。
  document.addEventListener("click", function (event) {
    var node = event.target;
    while (node && node !== document) {
      if (node.tagName === "A") { event.preventDefault(); return; }
      node = node.parentNode;
    }
  }, true);
  document.addEventListener("submit", function (event) {
    event.preventDefault();
  }, true);

  var lastHeight = 0;
  function reportHeight() {
    var root = document.documentElement;
    var body = document.body;
    var h = Math.ceil(Math.max(
      root.getBoundingClientRect().height,
      root.scrollHeight || 0,
      body ? body.getBoundingClientRect().height : 0,
      body ? body.scrollHeight || 0 : 0
    ));
    if (h > 0 && h !== lastHeight) {
      lastHeight = h;
      send({ type: "height", height: h });
    }
  }
  if (typeof ResizeObserver !== "undefined") {
    var heightObserver = new ResizeObserver(reportHeight);
    heightObserver.observe(document.documentElement);
    if (document.body) heightObserver.observe(document.body);
  }
  window.addEventListener("load", reportHeight);
  reportHeight();
  send({ type: "ready" });
})();`;

/** CSS that freezes all animations while the preview is paused. */
export const PREVIEW_PAUSE_CSS = `.atlas-paused *, .atlas-paused *::before, .atlas-paused *::after {
  animation-play-state: paused !important;
}`;
