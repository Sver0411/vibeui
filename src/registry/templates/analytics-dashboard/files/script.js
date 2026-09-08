/**
 * Analytics dashboard: generates a plausible 30-day series locally, draws
 * two SVG polylines (current vs previous period), counts the stat cards up,
 * and live-drifts the visitor number. No external data or libraries.
 */
(function () {
  const chart = document.getElementById("db-chart");
  const rows = document.getElementById("db-rows");
  if (!chart || !rows) return;
  const paused = () => document.documentElement.classList.contains("atlas-paused");

  // Deterministic pseudo-random so the demo is stable between runs.
  let seed = 42;
  function random() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  function series(count, base, variance) {
    const points = [];
    let value = base;
    for (let i = 0; i < count; i++) {
      value = Math.max(base * 0.4, value + (random() - 0.48) * variance);
      points.push(value);
    }
    return points;
  }

  function polyline(values, max, color, width) {
    const stepX = 600 / (values.length - 1);
    const points = values
      .map((v, i) => (i * stepX).toFixed(1) + "," + (190 - (v / max) * 170).toFixed(1))
      .join(" ");
    return (
      '<polyline points="' +
      points +
      '" fill="none" stroke="' +
      color +
      '" stroke-width="' +
      width +
      '" stroke-linecap="round" stroke-linejoin="round" />'
    );
  }

  function draw() {
    const current = series(30, 620, 90);
    const previous = series(30, 520, 70);
    const max = Math.max.apply(null, current.concat(previous)) * 1.15;
    const grid = [0.25, 0.5, 0.75]
      .map(
        (f) =>
          '<line x1="0" x2="600" y1="' +
          (190 - f * 170) +
          '" y2="' +
          (190 - f * 170) +
          '" stroke="#eef0f1" stroke-width="1" />',
      )
      .join("");
    chart.innerHTML =
      grid +
      polyline(previous, max, "#cbd5d3", 1.6) +
      polyline(current, max, "#0f766e", 2.2) +
      // Area fill under the current line
      '<polygon fill="rgba(15,118,110,0.08)" points="0,190 ' +
      current
        .map(
          (v, i) =>
            ((i * 600) / (current.length - 1)).toFixed(1) +
            "," +
            (190 - (v / max) * 170).toFixed(1),
        )
        .join(" ") +
      ' 600,190" />';
  }

  function countUp(id, target, format) {
    const el = document.getElementById(id);
    if (!el) return;
    let elapsed = 0;
    let previousTime = null;
    function tick(now) {
      if (previousTime === null) previousTime = now;
      if (paused()) {
        previousTime = now;
      } else {
        elapsed += now - previousTime;
        previousTime = now;
        const t = Math.min(elapsed / 1400, 1);
        el.textContent = format(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t >= 1) return;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  draw();
  countUp("db-visitors", 48213, function (n) {
    return n.toLocaleString("en-US");
  });
  countUp("db-revenue", 86420, function (n) {
    return "$" + n.toLocaleString("en-US");
  });
  countUp("db-conversion", 4, function (n) {
    return n + ".2%";
  });

  const pages = [
    ["/", "18,204", "+6.2%"],
    ["/pricing", "9,451", "+11.8%"],
    ["/docs/getting-started", "7,882", "+2.4%"],
    ["/blog/launch-week", "5,530", "−1.2%"],
    ["/changelog", "3,914", "+4.7%"],
  ];
  rows.innerHTML = pages
    .map(function (row) {
      const changeClass = row[2].startsWith("−") ? "db-stat__delta--down" : "db-stat__delta--up";
      return (
        "<tr><td>" +
        row[0] +
        "</td><td>" +
        row[1] +
        '</td><td><span class="db-stat__delta ' +
        changeClass +
        '">' +
        row[2] +
        "</span></td></tr>"
      );
    })
    .join("");

  // Gentle live drift on the visitor count while visible.
  let visitors = 48213;
  setInterval(function () {
    if (paused()) return;
    visitors += Math.round(random() * 6);
    const el = document.getElementById("db-visitors");
    if (el) el.textContent = visitors.toLocaleString("en-US");
  }, 2200);
})();
