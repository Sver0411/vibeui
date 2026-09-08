/**
 * Ripple effect: on pointer down, spawn a circle at the click position,
 * sized to cover the whole button, and let the CSS animation fade it out.
 */
(function () {
  document.querySelectorAll(".ripple-button").forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      const rect = button.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height) * 2;
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = diameter + "px";
      ripple.style.left = event.clientX - rect.left - diameter / 2 + "px";
      ripple.style.top = event.clientY - rect.top - diameter / 2 + "px";
      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
})();
