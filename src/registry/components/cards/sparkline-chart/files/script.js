(function () {
  "use strict";

  // 三张卡片：折线 / 折线 / 迷你柱状；涨红跌绿
  var CARDS = [
    {
      label: "营收", value: "12,480", unit: "¥", delta: "+8.2%", dir: "up",
      type: "line", color: "#dc2626", data: [32, 38, 35, 42, 40, 48, 46, 55, 58, 62, 60, 68],
      fmt: function (v) { return "¥" + (v * 180).toFixed(0); },
    },
    {
      label: "订单量", value: "326", unit: "单", delta: "-3.4%", dir: "down",
      type: "line", color: "#2563eb", data: [50, 46, 52, 44, 47, 40, 43, 38, 41, 36, 39, 34],
      fmt: function (v) { return (v * 1.2).toFixed(0) + " 单"; },
    },
    {
      label: "转化率", value: "4.7", unit: "%", delta: "+0.6pt", dir: "up",
      type: "bar", color: "#0d9488", data: [30, 42, 36, 50, 44, 58, 52, 64, 60, 70],
      fmt: function (v) { return (v / 10).toFixed(1) + "%"; },
    },
  ];

  var W = 200, H = 64, PAD = 6;
  var grid = document.getElementById("sp-grid");

  /** 归一化数据点为 SVG 坐标 */
  function pointsOf(data) {
    var min = Math.min.apply(null, data);
    var max = Math.max.apply(null, data);
    var span = max - min || 1;
    return data.map(function (v, i) {
      return {
        x: PAD + (i / (data.length - 1)) * (W - PAD * 2),
        y: H - PAD - ((v - min) / span) * (H - PAD * 2),
        v: v,
      };
    });
  }

  function buildLineCard(cfg, card) {
    var pts = pointsOf(cfg.data);
    var d = pts.map(function (p, i) {
      return (i ? "L" : "M") + p.x.toFixed(1) + " " + p.y.toFixed(1);
    }).join(" ");
    var area = d + " L" + (W - PAD) + " " + H + " L" + PAD + " " + H + " Z";

    var wrap = document.createElement("div");
    wrap.className = "sp-chart";
    wrap.innerHTML =
      '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<path class="sp-area" d="' + area + '" fill="' + cfg.color + '"/>' +
      '<path class="sp-line" d="' + d + '" stroke="' + cfg.color + '"/>' +
      '<circle class="sp-dot" r="4" stroke="' + cfg.color + '"/>' +
      "</svg>" +
      '<span class="sp-tip"></span>';
    card.appendChild(wrap);

    var dot = wrap.querySelector(".sp-dot");
    var tip = wrap.querySelector(".sp-tip");

    // 指示板：找最近的数据点
    function onMove(e) {
      var rect = wrap.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * W;
      var best = pts.reduce(function (a, b) {
        return Math.abs(b.x - x) < Math.abs(a.x - x) ? b : a;
      });
      dot.setAttribute("cx", best.x);
      dot.setAttribute("cy", best.y);
      dot.classList.add("show");
      tip.textContent = cfg.fmt(best.v);
      tip.style.left = (best.x / W) * 100 + "%";
      tip.style.top = (best.y / H) * 100 + "%";
      tip.classList.add("show");
    }
    function onLeave() {
      dot.classList.remove("show");
      tip.classList.remove("show");
    }
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
  }

  function buildBarCard(cfg, card) {
    var max = Math.max.apply(null, cfg.data);
    var wrap = document.createElement("div");
    wrap.className = "sp-chart";
    var bars = cfg.data.map(function (v, i) {
      return '<div class="sp-bar" style="height:' + ((v / max) * 100).toFixed(1) +
        "%;background:" + cfg.color + ";animation-delay:" + i * 45 + 'ms" data-v="' + v + '"></div>';
    }).join("");
    wrap.innerHTML = '<div class="sp-bars" role="img" aria-label="迷你柱状图">' + bars + "</div>" +
      '<span class="sp-tip"></span>';
    card.appendChild(wrap);

    var tip = wrap.querySelector(".sp-tip");
    var barWrap = wrap.querySelector(".sp-bars");
    barWrap.addEventListener("pointermove", function (e) {
      var bar = e.target.closest(".sp-bar");
      if (!bar) return;
      wrap.querySelectorAll(".sp-bar").forEach(function (b) {
        b.classList.toggle("hot", b === bar);
      });
      tip.textContent = cfg.fmt(Number(bar.dataset.v));
      tip.style.left = (bar.offsetLeft + bar.offsetWidth / 2) + "px";
      tip.style.top = bar.style.height;
      tip.classList.add("show");
    });
    barWrap.addEventListener("pointerleave", function () {
      wrap.querySelectorAll(".sp-bar").forEach(function (b) { b.classList.remove("hot"); });
      tip.classList.remove("show");
    });
  }

  CARDS.forEach(function (cfg) {
    var card = document.createElement("div");
    card.className = "sp-card";
    card.innerHTML =
      '<div class="sp-top"><span class="sp-label">' + cfg.label + "</span>" +
      '<span class="sp-delta ' + cfg.dir + '">' + cfg.delta + "</span></div>" +
      '<div class="sp-value">' + cfg.value + "<small>" + cfg.unit + "</small></div>";
    if (cfg.type === "line") buildLineCard(cfg, card);
    else buildBarCard(cfg, card);
    grid.appendChild(card);
  });
})();
