/**
 * Page loader: fake staged progress, then fade the splash out.
 * Replace the stages with real signals (window load, data fetched, …).
 */
(function () {
  const splash = document.getElementById("pl-splash");
  const fill = document.getElementById("pl-fill");
  const status = document.getElementById("pl-status");
  const page = document.getElementById("pl-page");
  if (!splash || !fill || !status) return;

  const paused = () => document.documentElement.classList.contains("atlas-paused");
  const stages = [
    [18, "Loading assets…"],
    [46, "Loading assets…"],
    [74, "Preparing interface…"],
    [100, "Ready"],
  ];
  let stageIndex = 0;

  function restart() {
    if (paused()) {
      setTimeout(restart, 400);
      return;
    }
    stageIndex = 0;
    splash.dataset.done = "false";
    if (page) page.setAttribute("aria-hidden", "true");
    nextStage();
  }

  function nextStage() {
    if (paused()) {
      setTimeout(nextStage, 200);
      return;
    }
    const [percent, message] = stages[stageIndex];
    fill.style.width = percent + "%";
    status.textContent = message;
    stageIndex += 1;
    if (stageIndex < stages.length) {
      setTimeout(nextStage, 620);
    } else {
      setTimeout(() => {
        splash.dataset.done = "true";
        if (page) page.setAttribute("aria-hidden", "false");
        // Restart the demo after a pause so the preview stays alive.
        setTimeout(restart, 2600);
      }, 500);
    }
  }

  nextStage();
})();
