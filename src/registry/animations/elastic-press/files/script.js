/**
 * Elastic press: press shrinks the button, release springs it back with
 * a real spring simulation (stiffness + damping) that overshoots slightly —
 * the same feel Anime.js-style spring physics gives, in ~40 lines.
 *
 * 积分采用半隐式欧拉：先更新速度（含 -c·v 阻尼力），再位移 += 速度×dt。
 * 位移必须乘 dt、阻尼必须进加速度，否则数值发散，按钮会剧烈振荡而不是回弹。
 */
(function () {
  const btn = document.getElementById("ep-btn");
  if (!btn) return;

  const SPRING = {
    stiffness: 320,   // 越高回弹越快
    damping: 18,      // ζ ≈ 0.5，轻微过冲后归位
    mass: 1,
  };
  const PRESS_SCALE = 0.88;
  const MOVE_OUT = 8; // 按下时的位移
  const MAX_DT = 1 / 30; // 掉帧/切回标签页时限制步长，防止大步长引爆模拟

  let scale = 1;
  let y = 0;
  let velocityScale = 0;
  let velocityY = 0;
  let rafId = null;
  let lastTime = 0;
  let target = { scale: 1, y: 0 };

  function tick(now) {
    // 首帧用固定步长，之后用真实帧间隔——不同刷新率手感一致
    const dt = lastTime ? Math.min((now - lastTime) / 1000, MAX_DT) : 1 / 60;
    lastTime = now;

    // 弹簧力 = 刚度×位移差 - 阻尼×速度（阻尼必须作为力进入加速度）
    const accelScale =
      ((target.scale - scale) * SPRING.stiffness - velocityScale * SPRING.damping) /
      SPRING.mass;
    const accelY =
      ((target.y - y) * SPRING.stiffness - velocityY * SPRING.damping) / SPRING.mass;

    velocityScale += accelScale * dt;
    velocityY += accelY * dt;
    scale += velocityScale * dt;
    y += velocityY * dt;

    btn.style.transform = "translateY(" + y + "px) scale(" + scale + ")";

    const settled =
      Math.abs(target.scale - scale) < 0.001 &&
      Math.abs(target.y - y) < 0.1 &&
      Math.abs(velocityScale) < 0.05 &&
      Math.abs(velocityY) < 5;
    if (!settled) {
      rafId = requestAnimationFrame(tick);
    } else {
      // 收敛：归位并清零速度，rAF 停转不空转
      scale = target.scale;
      y = target.y;
      velocityScale = 0;
      velocityY = 0;
      btn.style.transform = "translateY(" + y + "px) scale(" + scale + ")";
      rafId = null;
      lastTime = 0;
    }
  }

  function start() {
    if (rafId === null) {
      lastTime = 0;
      rafId = requestAnimationFrame(tick);
    }
  }

  function release() {
    target = { scale: 1, y: 0 };
    start();
  }

  // prefers-reduced-motion：不做弹簧动画，直接切换按压/松开两态
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    btn.addEventListener("pointerdown", () => {
      btn.style.transform =
        "translateY(" + MOVE_OUT + "px) scale(" + PRESS_SCALE + ")";
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach((event) =>
      btn.addEventListener(event, () => {
        btn.style.transform = "";
      }),
    );
    return;
  }

  btn.addEventListener("pointerdown", () => {
    target = { scale: PRESS_SCALE, y: MOVE_OUT };
    start();
  });

  // 指针离开也回弹，避免卡在按下状态
  ["pointerup", "pointercancel", "pointerleave"].forEach((event) =>
    btn.addEventListener(event, release),
  );
})();
