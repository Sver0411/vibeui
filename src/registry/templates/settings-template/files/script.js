/**
 * Settings template: tracks dirty state for the save bar, toggle switch,
 * two-step delete confirmation and save/discard handling.
 */
(function () {
  const savebar = document.getElementById("st-savebar");
  const save = document.getElementById("st-save");
  const discard = document.getElementById("st-discard");
  const digest = document.getElementById("st-digest");
  const deleteBtn = document.getElementById("st-delete");
  if (!savebar || !save || !discard || !digest || !deleteBtn) return;

  const inputs = [document.getElementById("st-name"), document.getElementById("st-handle")];
  const originals = inputs.map((input) => input.value);

  function checkDirty() {
    const dirty = inputs.some((input, index) => input.value !== originals[index]);
    savebar.hidden = !dirty;
  }

  inputs.forEach((input) => input.addEventListener("input", checkDirty));

  digest.addEventListener("click", () => {
    const on = digest.getAttribute("aria-checked") === "true";
    digest.setAttribute("aria-checked", String(!on));
    document.getElementById("st-digest-value").textContent = !on
      ? "Weekly summary on Mondays"
      : "Digests are off";
  });

  save.addEventListener("click", () => {
    originals.splice(0, originals.length, ...inputs.map((input) => input.value));
    checkDirty();
    save.textContent = "Saved ✓";
    setTimeout(() => (save.textContent = "Save changes"), 1300);
  });

  discard.addEventListener("click", () => {
    inputs.forEach((input, index) => (input.value = originals[index]));
    checkDirty();
  });

  // Two-step confirm: first click arms, second click within 3s deletes.
  let armed = false;
  let timer = null;
  deleteBtn.addEventListener("click", () => {
    if (!armed) {
      armed = true;
      deleteBtn.dataset.armed = "true";
      deleteBtn.textContent = "Really delete?";
      timer = setTimeout(() => {
        armed = false;
        deleteBtn.removeAttribute("data-armed");
        deleteBtn.textContent = "Delete…";
      }, 3000);
    } else {
      clearTimeout(timer);
      armed = false;
      deleteBtn.removeAttribute("data-armed");
      deleteBtn.textContent = "Deleted (demo)";
      setTimeout(() => (deleteBtn.textContent = "Delete…"), 1600);
    }
  });

  checkDirty();
})();
