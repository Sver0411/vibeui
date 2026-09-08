(function () {
  const shell = document.querySelector(".gm-shell");
  const trigger = document.querySelector(".gm-trigger");
  const menu = document.querySelector(".gm-menu");
  const status = document.querySelector(".gm-status");
  const items = Array.from(document.querySelectorAll(".gm-option"));
  let focusTimer = 0;

  if (!shell || !trigger || !menu || !status || items.length === 0) return;

  const isOpen = () => shell.dataset.open === "true";

  function setOpen(next, moveFocus) {
    window.clearTimeout(focusTimer);
    shell.dataset.open = String(next);
    trigger.setAttribute("aria-expanded", String(next));
    menu.setAttribute("aria-hidden", String(!next));
    items.forEach((item) => item.setAttribute("tabindex", next ? "0" : "-1"));

    if (next && moveFocus) {
      focusTimer = window.setTimeout(() => items[0].focus(), 180);
    } else if (!next && moveFocus) {
      trigger.focus();
    }
  }

  trigger.addEventListener("click", () => setOpen(!isOpen(), false));
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true, true);
    }
    if (event.key === "Escape" && isOpen()) {
      event.preventDefault();
      setOpen(false, false);
    }
  });

  menu.addEventListener("keydown", (event) => {
    const current = items.indexOf(document.activeElement);
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false, true);
      return;
    }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = current;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;
    if (event.key === "ArrowDown") next = (Math.max(0, current) + 1) % items.length;
    if (event.key === "ArrowUp") next = (current <= 0 ? items.length : current) - 1;
    items[next].focus();
  });

  items.forEach((item) => {
    item.setAttribute("tabindex", "-1");
    item.addEventListener("click", () => {
      status.textContent = `${item.dataset.action} selected.`;
      setOpen(false, true);
    });
  });

  document.addEventListener("pointerdown", (event) => {
    if (isOpen() && !shell.contains(event.target)) setOpen(false, false);
  });
})();
