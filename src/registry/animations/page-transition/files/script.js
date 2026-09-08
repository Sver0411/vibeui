/**
 * Page transition: exit animation completes before the next page enters.
 * A busy flag prevents overlapping transitions on rapid clicks.
 */
(function () {
  const screen = document.getElementById("pt-screen");
  if (!screen) return;
  const pages = Array.from(screen.querySelectorAll(".pt-page"));
  const links = Array.from(document.querySelectorAll(".pt-nav__link"));
  let busy = false;

  function goTo(name) {
    const next = pages.find((page) => page.dataset.page === name);
    const current = pages.find((page) => !page.hidden);
    if (!next || next === current || busy) return;
    busy = true;

    links.forEach((link) => {
      if (link.dataset.page === name) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    const showNext = () => {
      if (current) current.hidden = true;
      next.hidden = false;
      next.classList.add("is-entering");
      next.addEventListener(
        "animationend",
        () => {
          next.classList.remove("is-entering");
          busy = false;
        },
        { once: true },
      );
    };

    if (current) {
      current.classList.add("is-exiting");
      current.addEventListener(
        "animationend",
        () => {
          current.classList.remove("is-exiting");
          showNext();
        },
        { once: true },
      );
    } else {
      showNext();
    }
  }

  links.forEach((link) => link.addEventListener("click", () => goTo(link.dataset.page)));
})();
