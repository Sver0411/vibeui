(function () {
  "use strict";

  // 12 幅程序化渐变"作品"：名称 + 双色渐变 + 角度，无图片资源
  var WORKS = [
    { name: "晨雾 · No.1", colors: ["#fbc2eb", "#a6c1ee"], angle: 135 },
    { name: "深海 · No.2", colors: ["#2b5876", "#4e4376"], angle: 160 },
    { name: "暮色 · No.3", colors: ["#ff9a9e", "#fecfef"], angle: 120 },
    { name: "苔原 · No.4", colors: ["#134e5e", "#71b280"], angle: 145 },
    { name: "熔岩 · No.5", colors: ["#f83600", "#f9d423"], angle: 100 },
    { name: "靛蓝 · No.6", colors: ["#4776e6", "#8e54e9"], angle: 155 },
    { name: "麦田 · No.7", colors: ["#f6d365", "#fda085"], angle: 130 },
    { name: "夜航 · No.8", colors: ["#0f0c29", "#53346d"], angle: 165 },
    { name: "薄荷 · No.9", colors: ["#43e97b", "#38f9d7"], angle: 110 },
    { name: "珊瑚 · No.10", colors: ["#ff9966", "#ff5e62"], angle: 140 },
    { name: "石墨 · No.11", colors: ["#232526", "#414345"], angle: 150 },
    { name: "极光 · No.12", colors: ["#00c9ff", "#92fe9d"], angle: 125 },
  ];

  var grid = document.getElementById("gl-grid");
  var lightbox = document.getElementById("gl-lightbox");
  var bigArt = document.getElementById("gl-bigart");
  var caption = document.getElementById("gl-caption");
  var current = 0;
  var lastFocus = null;

  function bg(w) {
    return "linear-gradient(" + w.angle + "deg, " + w.colors[0] + ", " + w.colors[1] + ")";
  }

  // 缩略图网格
  WORKS.forEach(function (w, i) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gl-item";
    btn.setAttribute("aria-label", "放大查看 " + w.name);
    btn.innerHTML = '<span class="gl-thumb" style="background:' + bg(w) + '"></span>';
    btn.addEventListener("click", function () { openAt(i); });
    grid.appendChild(btn);
  });

  function show() {
    var w = WORKS[current];
    bigArt.style.background = bg(w);
    caption.textContent = w.name + "（" + (current + 1) + " / " + WORKS.length + "）";
  }

  function openAt(i) {
    current = i;
    lastFocus = document.activeElement;
    lightbox.hidden = false;
    // 灯箱打开期间锁住背景滚动，避免底层页面跟着滚
    document.body.style.overflow = "hidden";
    show();
    document.getElementById("gl-close").focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  function step(dir) {
    current = (current + dir + WORKS.length) % WORKS.length;
    show();
  }

  document.getElementById("gl-close").addEventListener("click", close);
  document.getElementById("gl-prev").addEventListener("click", function () { step(-1); });
  document.getElementById("gl-next").addEventListener("click", function () { step(1); });

  // 点击遮罩关闭（点在内容外）
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  // 键盘：ESC 关闭、左右切换
  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });
})();
