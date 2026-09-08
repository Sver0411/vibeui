/**
 * Scroll reveal: IntersectionObserver adds .is-visible once per element,
 * then unobserves. Scroll the container to see the cascade.
 */
(function () {
  const stage = document.getElementById("sr-stage");
  if (!stage) return;

  const cards = stage.querySelectorAll(".sr-card");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || typeof IntersectionObserver === "undefined") {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 },
  );

  cards.forEach((card) => observer.observe(card));
})();
