/**
 * Multi-step form: per-step validation with inline errors, directional
 * slide animations, review summary and fake submit.
 */
(function () {
  const form = document.getElementById("msf");
  if (!form) return;
  const panels = Array.from(form.querySelectorAll(".msf__panel"));
  const progress = document.getElementById("msf-progress");
  const stepLabel = document.getElementById("msf-step-label");
  const back = document.getElementById("msf-back");
  const next = document.getElementById("msf-next");
  const review = document.getElementById("msf-review");
  const names = ["Account", "Workspace", "Review"];
  let step = 1;

  function setError(input, message) {
    input.setAttribute("aria-invalid", message ? "true" : "false");
    const error = form.querySelector('[data-error-for="' + input.name + '"]');
    if (error) error.textContent = message;
  }

  function validateStep(current) {
    let valid = true;
    panels[current - 1].querySelectorAll("input, select").forEach((input) => {
      const el = input;
      if (!el.checkValidity()) {
        valid = false;
        setError(el, el.validationMessage || "This field is required.");
      } else {
        setError(el, "");
      }
    });
    return valid;
  }

  function render(direction) {
    panels.forEach((panel, index) => {
      const isCurrent = index + 1 === step;
      panel.hidden = !isCurrent;
      if (isCurrent) panel.dataset.direction = direction;
    });
    progress.style.width = (step / panels.length) * 100 + "%";
    stepLabel.textContent = "Step " + step + " of " + panels.length + " — " + names[step - 1];
    back.hidden = step === 1;
    next.textContent = step === panels.length ? "Create account" : "Continue";

    if (step === panels.length) {
      const data = new FormData(form);
      review.innerHTML = Array.from(data.entries())
        .filter(([, value]) => value)
        .map(
          ([key, value]) =>
            "<div><dt>" + key + "</dt><dd></dd></div>",
        )
        .join("");
      const dds = review.querySelectorAll("dd");
      Array.from(data.entries())
        .filter(([, value]) => value)
        .forEach(([, value], index) => {
          dds[index].textContent = value;
        });
    }
  }

  next.addEventListener("click", () => {
    if (!validateStep(step)) return;
    if (step < panels.length) {
      step += 1;
      render("forward");
    } else {
      next.textContent = "Creating…";
      next.disabled = true;
      setTimeout(() => {
        stepLabel.textContent = "Account created ✓ (demo — nothing was sent)";
        next.textContent = "Done";
      }, 900);
    }
  });

  back.addEventListener("click", () => {
    if (step > 1) {
      step -= 1;
      render("back");
    }
  });

  form.addEventListener("submit", (event) => event.preventDefault());
  render("forward");
})();
