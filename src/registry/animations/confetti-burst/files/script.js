(function () {
  "use strict";

  var stage = document.getElementById("cf-stage");
  var canvas = document.getElementById("cf-canvas");
  var btn = document.getElementById("cf-btn");
  var toast = document.getElementById("cf-toast");
  var ctx = canvas.getContext("2d");

  var COLORS = ["#2563eb", "#7c3aed", "#0d9488", "#ea580c", "#db2777", "#f59e0b", "#16a34a"];
  var GRAVITY = 0.16;
  var DRAG = 0.992;

  var particles = [];
  var rafId = null;
  var dpr = 1;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** 画布按 DPR 缩放，保证高清 */
  function resize() {
    dpr = window.devicePixelRatio || 1;
    canvas.width = stage.clientWidth * dpr;
    canvas.height = stage.clientHeight * dpr;
  }
  window.addEventListener("resize", resize);
  resize();

  /** 从指定点喷射一批纸屑 */
  function burst(x, y) {
    var count = 110;
    for (var i = 0; i < count; i++) {
      var angle = Math.random() * Math.PI * 2;
      var speed = 4 + Math.random() * 7;
      particles.push({
        x: x, y: y,
        vx: Math.cos(angle) * speed * (0.6 + Math.random() * 0.8),
        vy: Math.sin(angle) * speed - 6, // 初始整体向上抛
        size: 5 + Math.random() * 6,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        round: Math.random() < 0.3,
        wobble: Math.random() * Math.PI * 2,
      });
    }
    if (!rafId) tick();
  }

  function tick() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(function (p) {
      p.vy += GRAVITY;
      p.vx *= DRAG;
      p.vy *= DRAG;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.wobble += 0.12;
      if (p.y > canvas.height / dpr + 40) return false;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      // 轻微左右摆动模拟纸片飘落
      ctx.scale(1, 0.55 + 0.45 * Math.sin(p.wobble));
      ctx.fillStyle = p.color;
      if (p.round) {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      }
      ctx.restore();
      return true;
    });

    if (particles.length) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  btn.addEventListener("click", function () {
    var rect = btn.getBoundingClientRect();
    var stageRect = stage.getBoundingClientRect();
    var x = rect.left + rect.width / 2 - stageRect.left;
    var y = rect.top + rect.height / 2 - stageRect.top;
    if (reduceMotion) {
      // 降级：不喷射，仅文字庆祝
      toast.textContent = "🎉 恭喜！目标达成！";
      return;
    }
    burst(x, y);
    toast.textContent = "";
  });
})();
