(function () {
  "use strict";

  var card = document.getElementById("gb-card");

  card.addEventListener("pointermove", function (e) {
    var rect = card.getBoundingClientRect();
    card.style.setProperty("--x", (e.clientX - rect.left) + "px");
    card.style.setProperty("--y", (e.clientY - rect.top) + "px");
  });

  // 离开时把辉光移出视野（居中到不可见的角落），避免停在原地
  card.addEventListener("pointerleave", function () {
    card.style.setProperty("--x", "-999px");
    card.style.setProperty("--y", "-999px");
  });
})();
