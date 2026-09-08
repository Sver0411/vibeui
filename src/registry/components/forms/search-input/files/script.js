/**
 * Search input: debounced filtering over a local dataset, keyboard
 * navigation (↑ ↓ ↵ Esc), highlighted matches and recent-search chips.
 */
(function () {
  const root = document.getElementById("si");
  const input = document.getElementById("si-input");
  const clear = document.getElementById("si-clear");
  const results = document.getElementById("si-results");
  const recent = document.getElementById("si-recent");
  if (!root || !input || !clear || !results || !recent) return;

  const DATA = [
    { label: "Data tables", type: "Component", keywords: "table grid rows" },
    { label: "Onboarding checklist", type: "Template", keywords: "welcome steps" },
    { label: "Dark theme tokens", type: "Guide", keywords: "dark theme colors" },
    { label: "Team directory", type: "Template", keywords: "people profiles" },
    { label: "Command palette", type: "Component", keywords: "cmdk search palette" },
    { label: "Billing settings", type: "Page", keywords: "plans invoices payment" },
    { label: "Notification center", type: "Component", keywords: "inbox alerts toasts" },
  ];

  let matches = [];
  let activeIndex = -1;
  let debounceTimer = null;

  function escapeHtml(text) {
    return text.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
  }

  function highlight(text, query) {
    if (!query) return escapeHtml(text);
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return escapeHtml(text);
    return (
      escapeHtml(text.slice(0, index)) +
      "<mark>" + escapeHtml(text.slice(index, index + query.length)) + "</mark>" +
      escapeHtml(text.slice(index + query.length))
    );
  }

  function open() {
    results.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  function close() {
    results.hidden = true;
    input.setAttribute("aria-expanded", "false");
    activeIndex = -1;
  }

  function render() {
    const query = input.value.trim();
    clear.hidden = query.length === 0;
    recent.style.display = query ? "none" : "block";
    if (!query) {
      close();
      return;
    }
    matches = DATA.filter(
      (item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.toLowerCase().includes(query.toLowerCase()),
    );
    if (matches.length === 0) {
      results.innerHTML = '<p class="si__empty">No results for “' + escapeHtml(query) + '”.</p>';
      open();
      return;
    }
    results.innerHTML = matches
      .map(
        (item, index) =>
          '<button type="button" class="si__option" role="option" data-index="' + index + '">' +
          highlight(item.label, query) +
          '<span class="si__option-type">' + item.type + "</span></button>",
      )
      .join("");
    results.querySelectorAll(".si__option").forEach((option) => {
      option.addEventListener("click", () => select(Number(option.dataset.index)));
      option.addEventListener("mousemove", () => setActive(Number(option.dataset.index)));
    });
    open();
  }

  function setActive(index) {
    activeIndex = index;
    results.querySelectorAll(".si__option").forEach((option) => {
      if (Number(option.dataset.index) === index) option.setAttribute("data-active", "true");
      else option.removeAttribute("data-active");
    });
  }

  function select(index) {
    const item = matches[index];
    input.value = item ? item.label : input.value;
    close();
    console.log("Selected:", item && item.label);
  }

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(render, 180);
  });

  input.addEventListener("focus", () => {
    if (input.value.trim()) render();
  });

  input.addEventListener("keydown", (event) => {
    if (results.hidden) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive(Math.min(activeIndex + 1, matches.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(Math.max(activeIndex - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      select(activeIndex >= 0 ? activeIndex : 0);
    } else if (event.key === "Escape") {
      close();
    }
  });

  clear.addEventListener("click", () => {
    input.value = "";
    clear.hidden = true;
    recent.style.display = "block";
    close();
    input.focus();
  });

  recent.querySelectorAll(".si__chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      input.value = chip.dataset.query;
      render();
      input.focus();
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target instanceof Element && !root.contains(event.target)) close();
  });
})();
