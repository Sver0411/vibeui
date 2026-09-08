/**
 * Toggle group: multi-select via aria-pressed; a single sync() updates the
 * count and action-button disabled states so select-all/clear only cause
 * one repaint pass.
 */
(function () {
  var group = document.getElementById("tg-group");
  var count = document.getElementById("tg-count");
  var allBtn = document.getElementById("tg-all");
  var clearBtn = document.getElementById("tg-clear");
  if (!group || !count || !allBtn || !clearBtn) return;

  var buttons = Array.prototype.slice.call(group.querySelectorAll(".tg"));

  function selected() {
    return buttons.filter(function (b) {
      return b.getAttribute("aria-pressed") === "true";
    });
  }

  function sync() {
    var n = selected().length;
    count.textContent = "已选 " + n + " 项";
    allBtn.disabled = n === buttons.length;
    clearBtn.disabled = n === 0;
  }

  function setPressed(btn, pressed) {
    if (btn.getAttribute("aria-pressed") === String(pressed)) return;
    if (pressed) {
      // 动态插入角标，未选中时不占 DOM
      var mark = document.createElement("span");
      mark.className = "tg-check";
      mark.setAttribute("aria-hidden", "true");
      mark.innerHTML =
        '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"/></svg>';
      btn.appendChild(mark);
    } else {
      var existing = btn.querySelector(".tg-check");
      if (existing) existing.remove();
    }
    btn.setAttribute("aria-pressed", String(pressed));
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setPressed(btn, btn.getAttribute("aria-pressed") !== "true");
      sync();
    });
  });

  allBtn.addEventListener("click", function () {
    buttons.forEach(function (b) { setPressed(b, true); });
    sync();
  });

  clearBtn.addEventListener("click", function () {
    buttons.forEach(function (b) { setPressed(b, false); });
    sync();
  });

  sync();
})();
