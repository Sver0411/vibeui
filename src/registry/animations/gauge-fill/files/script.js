/**
 * Gauge: one rAF timeline (easeOutCubic) drives the arc dashoffset, the
 * needle rotation and the rolling number so all three stay in lockstep.
 */
(function () {
  var gauge = document.querySelector(".gf");
  if (!gauge) return;
  var valuePath = gauge.querySelector(".gf-value");
  var needle = gauge.querySelector(".gf-needle-g");
  var numEl = document.getElementById("gf-num");
  if (!valuePath || !needle || !numEl) return;

  var target = Number(gauge.getAttribute("data-value")) / 100 || 0.72;
  var DURATION = 1300;

  var length = valuePath.getTotalLength();
  valuePath.style.strokeDasharray = length + " 999";

  var start = null;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function frame(now) {
    if (start === null) start = now;
    var progress = Math.min(1, (now - start) / DURATION);
    var eased = easeOutCubic(progress);
    var current = eased * target;

    valuePath.style.strokeDashoffset = String(length * (1 - current));
    needle.style.transform = "rotate(" + (-90 + current * 180) + "deg)";
    numEl.textContent = String(Math.round(current * 100));

    if (progress < 1) requestAnimationFrame(frame);
  }

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    valuePath.style.strokeDashoffset = String(length * (1 - target));
    needle.style.transform = "rotate(" + (-90 + target * 180) + "deg)";
    numEl.textContent = String(Math.round(target * 100));
  } else {
    requestAnimationFrame(frame);
  }
})();
