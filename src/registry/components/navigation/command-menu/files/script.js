/**
 * Command menu: fuzzy subsequence scoring, grouped results, full keyboard
 * navigation (↑ ↓ ↵ Esc) and an action registry you can extend.
 */
(function () {
  const openButton = document.getElementById("cmd-open");
  const dialog = document.getElementById("cmd-dialog");
  const input = document.getElementById("cmd-input");
  const results = document.getElementById("cmd-results");
  if (!openButton || !dialog || !input || !results) return;

  const ACTIONS = [
    { group: "Actions", label: "Create new project", hint: "⌘N", keywords: "new create project" },
    {
      group: "Actions",
      label: "Invite team member",
      hint: "",
      keywords: "invite member team share",
    },
    { group: "Navigation", label: "Go to Dashboard", hint: "G D", keywords: "dashboard home" },
    { group: "Navigation", label: "Go to Settings", hint: "G S", keywords: "settings preferences" },
    { group: "Navigation", label: "Open Billing", hint: "", keywords: "billing plan invoice" },
    {
      group: "Theme",
      label: "Toggle dark mode",
      hint: "⌘⇧L",
      keywords: "dark light theme appearance",
    },
    { group: "Theme", label: "Increase font size", hint: "", keywords: "font size text bigger" },
  ];

  let activeIndex = 0;
  let visible = [];

  function escapeHtml(text) {
    return String(text).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  }

  function fuzzyScore(query, text) {
    const q = query.toLowerCase();
    const t = (text + " " + text.toLowerCase()).toLowerCase();
    if (!q) return 1;
    let score = 0;
    let i = 0;
    for (const ch of q) {
      const idx = t.indexOf(ch, i);
      if (idx === -1) return 0;
      score += idx === i ? 2 : 1;
      i = idx + 1;
    }
    if (text.toLowerCase().includes(q)) score += 10;
    return score;
  }

  function render() {
    const query = input.value.trim();
    visible = ACTIONS.map((action) => ({
      action,
      score: Math.max(fuzzyScore(query, action.label), fuzzyScore(query, action.keywords) * 0.8),
    }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);
    activeIndex = 0;

    if (visible.length === 0) {
      results.innerHTML = '<p class="cmd-empty">No commands match “' + escapeHtml(query) + "”.</p>";
      return;
    }

    let html = "";
    let lastGroup = "";
    visible.forEach((entry, index) => {
      if (entry.action.group !== lastGroup) {
        lastGroup = entry.action.group;
        html += '<p class="cmd-group">' + escapeHtml(lastGroup) + "</p>";
      }
      html +=
        '<button type="button" class="cmd-item" role="option" data-index="' +
        index +
        '"' +
        (index === 0 ? ' data-active="true"' : "") +
        '><svg class="cmd-item__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="m3 8.5 3 3 7-7"/></svg>' +
        escapeHtml(entry.action.label) +
        (entry.action.hint
          ? '<span class="cmd-item__hint">' + escapeHtml(entry.action.hint) + "</span>"
          : "") +
        "</button>";
    });
    results.innerHTML = html;
    results.querySelectorAll(".cmd-item").forEach((item) => {
      item.addEventListener("click", () => run(Number(item.dataset.index)));
      item.addEventListener("mousemove", () => setActive(Number(item.dataset.index)));
    });
  }

  function setActive(index) {
    activeIndex = index;
    results.querySelectorAll(".cmd-item").forEach((item) => {
      const isActive = Number(item.dataset.index) === index;
      if (isActive) item.setAttribute("data-active", "true");
      else item.removeAttribute("data-active");
    });
    const active = results.querySelector('[data-active="true"]');
    if (active) active.scrollIntoView({ block: "nearest" });
  }

  function run(index) {
    const entry = visible[index];
    close();
    if (entry) console.log("Command:", entry.action.label);
  }

  function open() {
    dialog.hidden = false;
    input.value = "";
    render();
    input.focus();
  }

  function close() {
    dialog.hidden = true;
    openButton.focus();
  }

  openButton.addEventListener("click", open);
  dialog.querySelector("[data-cmd-close]").addEventListener("click", close);
  input.addEventListener("input", render);
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (dialog.hidden) open();
      else close();
      return;
    }
    if (dialog.hidden) return;
    if (event.key === "Escape") close();
    else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (visible.length === 0) return;
      setActive((activeIndex + 1) % visible.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (visible.length === 0) return;
      setActive((activeIndex - 1 + visible.length) % visible.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (visible.length === 0) return;
      run(activeIndex);
    }
  });
})();
