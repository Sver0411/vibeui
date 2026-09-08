/**
 * 打字机：逐字打出 → 停顿 → 逐字删除 → 下一段循环
 * - 打字 90ms/字、删除 45ms/字，段间停顿 1600ms
 * - 尊重 prefers-reduced-motion：静态展示第一段完整文案
 * - 文本节点只保留当前可见内容，读屏不会听到反复变化
 */
(function () {
  var el = document.getElementById("twText");
  if (!el) return;

  var PHRASES = ["让灵感落地成页面。", "复制即用的组件与动效。", "本地优先的 UI 资源库。"];
  var TYPE_MS = 90;
  var ERASE_MS = 45;
  var HOLD_MS = 1600;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    el.textContent = PHRASES[0];
    return;
  }

  var phraseIndex = 0;
  var visible = 0;
  var erasing = false;

  function tick() {
    var phrase = PHRASES[phraseIndex];
    if (!erasing) {
      visible += 1;
      el.textContent = phrase.slice(0, visible);
      if (visible === phrase.length) {
        erasing = true;
        timer = setTimeout(tick, HOLD_MS);
        return;
      }
      timer = setTimeout(tick, TYPE_MS);
    } else {
      visible -= 1;
      el.textContent = phrase.slice(0, visible);
      if (visible === 0) {
        erasing = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        timer = setTimeout(tick, 350);
        return;
      }
      timer = setTimeout(tick, ERASE_MS);
    }
  }

  var timer = setTimeout(tick, 500);

  // 页面不可见时暂停，回到前台继续
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      clearTimeout(timer);
    } else {
      timer = setTimeout(tick, 300);
    }
  });
})();
