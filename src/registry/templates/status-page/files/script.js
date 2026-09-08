/**
 * Status page: services and 90-day uptime bars are rendered from a data
 * array so swapping in real API data later is a one-line change. The
 * "last updated" label refreshes every 30s.
 */
(function () {
  var SERVICES = [
    { name: "API 网关", status: "ok", uptime: "99.99%", days: "ok" },
    { name: "Web 应用", status: "ok", uptime: "99.98%", days: "ok" },
    { name: "实时协作", status: "ok", uptime: "99.95%", days: "ok" },
    { name: "对象存储", status: "ok", uptime: "100%", days: "ok" },
    { name: "邮件通知", status: "warn", uptime: "99.42%", days: "warn" },
  ];

  var list = document.getElementById("sp-service-list");
  var updated = document.getElementById("sp-updated");
  if (!list) return;

  var LIGHT_LABEL = { ok: "正常", warn: "降级", down: "故障" };
  var lastUpdated = Date.now();

  function renderDays(kind) {
    var html = "";
    for (var i = 0; i < 90; i++) {
      // 演示：邮件服务历史里有两次抖动
      var cls = kind;
      if (kind === "warn" && (i === 33 || i === 64)) cls = "warn";
      else if (kind === "warn") cls = "ok";
      html += '<span class="sp-day sp-day--' + cls + '" title="' + (i - 89) + ' 天前"></span>';
    }
    return html;
  }

  list.innerHTML = SERVICES.map(function (service) {
    return (
      '<div class="sp-service">' +
      '<div class="sp-service-row">' +
      '<span class="sp-light sp-light--' + service.status + '" role="img" aria-label="' +
      LIGHT_LABEL[service.status] + '"></span>' +
      '<span class="sp-service-name">' + service.name + "</span>" +
      '<span class="sp-service-uptime">' + service.uptime + " · 90 天</span>" +
      "</div>" +
      '<div class="sp-days">' + renderDays(service.days) + "</div>" +
      "</div>"
    );
  }).join("");

  function refreshUpdated() {
    var seconds = Math.round((Date.now() - lastUpdated) / 1000);
    if (seconds < 60) updated.textContent = "刚刚";
    else updated.textContent = Math.floor(seconds / 60) + " 分钟前";
  }

  refreshUpdated();
  setInterval(refreshUpdated, 30000);
})();
