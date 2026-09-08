/**
 * Flip clock: each digit is a split card; on change the top leaf flips down
 * (rotateX 0 -> -90) revealing the new top half, then the bottom leaf flips
 * shut (90 -> 0) revealing the new bottom half. Time is re-read from the
 * system clock every tick (no drift).
 */
(function () {
  var root = document.getElementById("fc2");
  if (!root) return;

  var DIGITS = 6; // HH MM SS
  var groups = [];

  function buildDigit() {
    var digit = document.createElement("span");
    digit.className = "fc2-digit";
    digit.innerHTML =
      '<span class="fc2-half fc2-half--top"><span>0</span></span>' +
      '<span class="fc2-half fc2-half--bottom"><span>0</span></span>';
    root.appendChild(digit);
    return {
      el: digit,
      topHalf: digit.querySelector(".fc2-half--top span"),
      bottomHalf: digit.querySelector(".fc2-half--bottom span"),
      current: "0",
      flipping: false,
    };
  }

  for (var i = 0; i < DIGITS; i++) {
    groups.push(buildDigit());
    if (i === 1 || i === 3) {
      var colon = document.createElement("span");
      colon.className = "fc2-colon";
      colon.innerHTML = "<span>:</span>";
      root.appendChild(colon);
    }
  }

  function setStatic(digit, value) {
    digit.topHalf.textContent = value;
    digit.bottomHalf.textContent = value;
    digit.current = value;
  }

  function flipTo(digit, value) {
    if (digit.flipping) {
      // 上一轮未结束：直接落地，跳过动画避免残影
      setStatic(digit, value);
      return;
    }
    if (digit.current === value) return;
    digit.flipping = true;

    var leafTop = document.createElement("span");
    leafTop.className = "fc2-leaf fc2-leaf--top";
    leafTop.innerHTML = "<span>" + digit.current + "</span>";
    var leafBottom = document.createElement("span");
    leafBottom.className = "fc2-leaf fc2-leaf--bottom";
    leafBottom.innerHTML = "<span>" + digit.current + "</span>";
    digit.el.appendChild(leafTop);
    digit.el.appendChild(leafBottom);

    // 第一段：上叶翻下
    requestAnimationFrame(function () {
      leafTop.classList.add("is-flipping");
    });

    setTimeout(function () {
      // 上叶已翻到底：静态上半换新数，上叶退场
      digit.topHalf.textContent = value;
      leafTop.querySelector("span").textContent = value;
      // 第二段：下叶翻合
      leafBottom.classList.add("is-flipping");
      setTimeout(function () {
        digit.bottomHalf.textContent = value;
        leafTop.remove();
        leafBottom.remove();
        digit.current = value;
        digit.flipping = false;
      }, 150);
    }, 150);
  }

  function render() {
    var now = new Date();
    var text =
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");
    for (var i = 0; i < DIGITS; i++) {
      flipTo(groups[i], text[i]);
    }
  }

  render();
  setInterval(render, 1000);
})();
