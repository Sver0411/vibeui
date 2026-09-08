/**
 * Text rotate: one span node gets its text swapped (no N stacked nodes);
 * container width eases between measured word widths; hover pauses and
 * tab-switch re-syncs the timer.
 */
(function () {
  var viewport = document.getElementById("tr-viewport");
  var word = document.getElementById("tr-word");
  if (!viewport || !word) return;

  var WORDS = ["即刻落地", "自动交付", "精准还原", "自由扩展"];
  var INTERVAL = 2200;
  var index = 0;
  var timer = null;

  function measure(text) {
    var probe = word.cloneNode(true);
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.transform = "none";
    probe.textContent = text;
    viewport.appendChild(probe);
    var width = probe.offsetWidth;
    viewport.removeChild(probe);
    return width;
  }

  function showNext() {
    var current = WORDS[index];
    index = (index + 1) % WORDS.length;
    var next = WORDS[index];

    // 先量好下一词宽度，再同步做出入场
    viewport.style.width = measure(next) + "px";
    word.classList.remove("is-in");
    word.classList.add("is-out");
    setTimeout(function () {
      word.textContent = next;
      word.classList.remove("is-out");
      // 从下方进场：先瞬移到 110%，下一帧加 is-in
      word.style.transition = "none";
      word.style.transform = "translateY(110%)";
      void word.offsetHeight;
      word.style.transition = "";
      word.style.transform = "";
      word.classList.add("is-in");
    }, 330);
  }

  function start() {
    stop();
    timer = setInterval(showNext, INTERVAL);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  viewport.parentElement.addEventListener("mouseenter", stop);
  viewport.parentElement.addEventListener("mouseleave", start);
  document.addEventListener("visibilitychange", function () {
    document.visibilityState === "visible" ? start() : stop();
  });

  // 初始宽度对齐首个词
  viewport.style.width = measure(WORDS[0]) + "px";
  start();
})();
