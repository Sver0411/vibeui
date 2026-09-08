(function () {
  "use strict";

  var SNIPPETS = {
    html: [
      '<span class="cm">&lt;!-- 结构 --&gt;</span>',
      '<span class="kw">&lt;button</span> <span class="fn">class</span>="demo-btn"<span class="kw">&gt;</span>',
      '  点我',
      '<span class="kw">&lt;/button&gt;</span>',
    ].join("\n"),
    css: [
      '<span class="cm">/* 样式 */</span>',
      '<span class="fn">.demo-btn</span> {',
      '  <span class="kw">background</span>: <span class="str">#2563eb</span>;',
      '  <span class="kw">color</span>: <span class="str">#fff</span>;',
      '  <span class="kw">border-radius</span>: <span class="str">10px</span>;',
      '}',
    ].join("\n"),
    js: [
      '<span class="cm">// 交互</span>',
      '<span class="kw">const</span> btn = document.<span class="fn">querySelector</span>(<span class="str">".demo-btn"</span>);',
      'btn.<span class="fn">addEventListener</span>(<span class="str">"click"</span>, () <span class="kw">=&gt;</span> {',
      '  console.<span class="fn">log</span>(<span class="str">"clicked"</span>);',
      '});',
    ].join("\n"),
  };

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".cs-tab"));
  var codeEl = document.querySelector("#cs-code code");
  var copyBtn = document.getElementById("cs-copy");
  var current = "html";
  var resetTimer = null;

  function renderTab(key) {
    current = key;
    codeEl.innerHTML = SNIPPETS[key];
    tabs.forEach(function (t) {
      var active = t.dataset.tab === key;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", String(active));
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () { renderTab(t.dataset.tab); });
  });

  copyBtn.addEventListener("click", function () {
    // 去掉高亮标签拿纯文本
    var text = codeEl.textContent;
    function done() {
      copyBtn.textContent = "已复制";
      copyBtn.classList.add("ok");
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(function () {
        copyBtn.textContent = "复制";
        copyBtn.classList.remove("ok");
      }, 1600);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done);
    } else {
      // 非安全上下文回退
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) { /* 忽略 */ }
      document.body.removeChild(ta);
      done();
    }
  });

  renderTab("html");
})();
