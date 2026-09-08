/**
 * Magnetic button: the element translates toward the cursor while it is
 * within a radius, with the label moving a little further (parallax feel).
 * Movement resets with a smooth transition when the cursor leaves.
 */
(function () {
  const button = document.getElementById("magnetic");
  if (!button) return;
  const label = button.querySelector(".magnetic-button__label");
  const STRENGTH = 0.35;
  const LABEL_STRENGTH = 0.55;

  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    button.style.transform = "translate(" + x * STRENGTH + "px, " + y * STRENGTH + "px)";
    if (label) {
      label.style.transform = "translate(" + x * LABEL_STRENGTH + "px, " + y * LABEL_STRENGTH + "px)";
    }
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
    if (label) label.style.transform = "";
  });
})();
