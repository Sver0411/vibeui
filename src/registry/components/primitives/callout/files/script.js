/**
 * Callout dismiss: freeze the current height, then transition it to 0 so the
 * rows below slide up smoothly instead of jumping. Nodes are hidden (not
 * removed) so the demo's restore button can bring them back.
 */
(function () {
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function dismiss(node) {
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      node.removeEventListener("transitionend", onEnd);
      node.hidden = true;
      maybeShowRestore();
    }
    function onEnd(event) {
      if (event && event.propertyName !== "height") return;
      finish();
    }
    if (reduceMotion) {
      finish();
      return;
    }
    node.style.height = node.scrollHeight + "px";
    // 强制一帧回流，让起始高度生效
    void node.offsetHeight;
    node.classList.add("is-leaving");
    node.style.height = "0px";
    node.addEventListener("transitionend", onEnd);
    setTimeout(onEnd, 400); // transitionend 兜底
  }

  function maybeShowRestore() {
    var anyVisible = Array.prototype.some.call(
      document.querySelectorAll(".co"),
      function (node) { return !node.hidden; },
    );
    var restore = document.getElementById("co-restore");
    if (restore && !anyVisible) restore.hidden = false;
  }

  document.querySelectorAll(".co").forEach(function (node) {
    var close = node.querySelector(".co-close");
    if (!close) return;
    close.addEventListener("click", function () {
      dismiss(node);
    });
  });

  var restore = document.getElementById("co-restore");
  if (restore) {
    restore.addEventListener("click", function () {
      restore.hidden = true;
      document.querySelectorAll(".co").forEach(function (node) {
        node.classList.remove("is-leaving");
        node.style.height = "";
        node.hidden = false;
      });
    });
  }
})();
