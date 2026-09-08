(function () {
  "use strict";

  var HOURS = [
    { t: "现在", icon: "🌦", v: 23 },
    { t: "15时", icon: "🌧", v: 22 },
    { t: "16时", icon: "🌧", v: 21 },
    { t: "17时", icon: "🌥", v: 21 },
    { t: "18时", icon: "🌥", v: 20 },
    { t: "19时", icon: "🌙", v: 19 },
  ];

  var DAYS = [
    { name: "今天", icon: "🌦", hi: 24, lo: 18 },
    { name: "周六", icon: "🌧", hi: 22, lo: 17 },
    { name: "周日", icon: "⛅", hi: 25, lo: 18 },
    { name: "周一", icon: "☀️", hi: 28, lo: 20 },
    { name: "周二", icon: "☀️", hi: 29, lo: 21 },
  ];

  var hoursBox = document.getElementById("wc-hours");
  var daysBox = document.getElementById("wc-days");

  HOURS.forEach(function (h) {
    var el = document.createElement("span");
    el.className = "wc-h";
    el.innerHTML = "<em>" + h.t + "</em><i>" + h.icon + "</i><b>" + h.v + "°</b>";
    hoursBox.appendChild(el);
  });

  DAYS.forEach(function (d) {
    var li = document.createElement("li");
    li.innerHTML =
      '<span class="d-name">' + d.name + '</span>' +
      '<span class="d-icon">' + d.icon + '</span>' +
      '<span class="d-range"><b>' + d.hi + "°</b><span>" + d.lo + "°</span></span>";
    daysBox.appendChild(li);
  });
})();
