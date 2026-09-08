(function () {
  "use strict";

  var scene = document.getElementById("mx-scene");
  var layers = Array.prototype.slice.call(scene.querySelectorAll("[data-depth]"));

  var MAX_SHIFT = 18; // 最深层的最大位移（px）
  var EASE = 0.08;    // 插值缓动系数

  var target = { x: 0, y: 0 };
  var current = { x: 0, y: 0 };
  var rafId = null;

  function tick() {
    // 缓动逼近目标位置
    current.x += (target.x - current.x) * EASE;
    current.y += (target.y - current.y) * EASE;

    layers.forEach(function (el) {
      var depth = Number(el.dataset.depth) || 1;
      var x = (current.x / 2) * MAX_SHIFT * depth * 0.5;
      var y = (current.y / 2) * MAX_SHIFT * depth * 0.5;
      el.style.transform = "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0)";
    });

    // 未到位或指针还在场景内则继续
    var settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
    if (!settled || inside) rafId = requestAnimationFrame(tick);
    else rafId = null;
  }

  var inside = false;

  scene.addEventListener("pointermove", function (e) {
    var rect = scene.getBoundingClientRect();
    // 归一到 -1 ~ 1
    target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    target.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    inside = true;
    if (!rafId) rafId = requestAnimationFrame(tick);
  });

  scene.addEventListener("pointerleave", function () {
    target.x = 0;
    target.y = 0;
    inside = false;
    if (!rafId) rafId = requestAnimationFrame(tick);
  });
})();
