/**
 * Text scramble: text starts as random glyphs and locks into the target
 * string from left to right. Spaces stay in place so layout never jumps.
 */
(function () {
  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%&*+=?";
  const LOCK_INTERVAL_MS = 55;

  const els = Array.from(document.querySelectorAll("[data-scramble]"));
  if (els.length === 0) return;

  function randomGlyph() {
    return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }

  function scramble(el) {
    const target = el.dataset.scramble || el.textContent || "";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = target;
      return;
    }

    const total = target.length;
    let locked = 0;
    let tickCount = 0;

    const interval = setInterval(() => {
      tickCount++;
      // 每 2 tick 锁定 1 位：前段解锁稍慢，产生"解码"的节奏感
      locked = Math.min(total, Math.floor(tickCount / 2));

      let text = "";
      for (let i = 0; i < total; i++) {
        const char = target[i];
        text += char === " " || i < locked ? char : randomGlyph();
      }
      el.textContent = text;

      if (locked >= total) {
        clearInterval(interval);
        el.textContent = target;
      }
    }, LOCK_INTERVAL_MS);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          scramble(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  els.forEach((el) => observer.observe(el));
})();
