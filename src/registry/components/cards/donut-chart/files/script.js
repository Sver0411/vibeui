(function () {
  "use strict";

  // 数据与配色
  var DATA = [
    { name: "开发", value: 14, color: "#2563eb" },
    { name: "设计", value: 8.5, color: "#7c3aed" },
    { name: "会议", value: 5, color: "#0d9488" },
    { name: "其他", value: 5, color: "#94a3b8" },
  ];
  var TOTAL = DATA.reduce(function (s, d) { return s + d.value; }, 0);

  var segs = Array.prototype.slice.call(document.querySelectorAll(".dc-seg"));
  var ring = document.querySelector(".dc-ring");
  var center = document.getElementById("dc-center");
  var legend = document.getElementById("dc-legend");

  /** 依百分比排布各扇区：dasharray 前段为占比，其余为剩余 */
  function layout() {
    var offset = 0;
    DATA.forEach(function (d, i) {
      var pct = (d.value / TOTAL) * 100;
      var seg = segs[i];
      seg.style.stroke = d.color;
      // 先归零再延迟生长，形成入场动画
      seg.style.strokeDasharray = "0 100";
      seg.style.strokeDashoffset = String(-offset);
      window.setTimeout(function () {
        seg.style.strokeDasharray = Math.max(pct - 1.2, 0.5) + " " + (100 - Math.max(pct - 1.2, 0.5));
      }, 120 + i * 110);
      offset += pct;
    });
  }

  /** 悬浮高亮：图例与扇区联动，中心切换为该项 */
  function highlight(index) {
    if (index == null) {
      ring.classList.remove("dim");
      segs.forEach(function (s) { s.classList.remove("hot"); });
      legend.querySelectorAll(".dc-item").forEach(function (li) { li.classList.remove("hot"); });
      center.innerHTML = "<strong>" + TOTAL + "h</strong><span>总计</span>";
      return;
    }
    var d = DATA[index];
    ring.classList.add("dim");
    segs.forEach(function (s, i) { s.classList.toggle("hot", i === index); });
    legend.querySelectorAll(".dc-item").forEach(function (li, i) {
      li.classList.toggle("hot", i === index);
    });
    var pct = Math.round((d.value / TOTAL) * 1000) / 10;
    center.innerHTML = "<strong>" + d.value + "h</strong><span>" + d.name + " · " + pct + "%</span>";
  }

  // 生成图例
  DATA.forEach(function (d, i) {
    var li = document.createElement("li");
    li.className = "dc-item";
    li.tabIndex = 0;
    li.innerHTML =
      '<span class="dc-dot" style="background:' + d.color + '"></span>' +
      '<span class="dc-name">' + d.name + "</span>" +
      '<span class="dc-val">' + d.value + "h</span>";
    li.addEventListener("mouseenter", function () { highlight(i); });
    li.addEventListener("mouseleave", function () { highlight(null); });
    li.addEventListener("focus", function () { highlight(i); });
    li.addEventListener("blur", function () { highlight(null); });
    legend.appendChild(li);
  });

  segs.forEach(function (seg, i) {
    seg.addEventListener("mouseenter", function () { highlight(i); });
    seg.addEventListener("mouseleave", function () { highlight(null); });
  });

  layout();
})();
