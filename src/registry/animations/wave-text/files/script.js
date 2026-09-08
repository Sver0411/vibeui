/**
 * Wave text: split data-text into per-char spans with an index custom
 * property; negative animation-delay puts every char mid-wave immediately.
 */
(function () {
  document.querySelectorAll("[data-text]").forEach(function (el) {
    var text = el.getAttribute("data-text");
    el.textContent = "";
    Array.from(text).forEach(function (ch, i) {
      var span = document.createElement("span");
      span.className = "wv-char";
      span.style.setProperty("--i", String(i));
      span.textContent = ch === " " ? "\u00A0" : ch;
      el.appendChild(span);
    });
  });
})();
