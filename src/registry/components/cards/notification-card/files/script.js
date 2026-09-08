/**
 * Notification feed: relative timestamps refresh every 30s; opening a card
 * marks it read; "read all" is a single batched action. The count badge
 * hides at zero.
 */
(function () {
  function timeAgo(secondsAgo) {
    if (secondsAgo < 60) return "刚刚";
    if (secondsAgo < 3600) return Math.floor(secondsAgo / 60) + " 分钟前";
    if (secondsAgo < 86400) return Math.floor(secondsAgo / 3600) + " 小时前";
    var days = Math.floor(secondsAgo / 86400);
    if (days < 7) return days + " 天前";
    var date = new Date(Date.now() - secondsAgo * 1000);
    return date.getMonth() + 1 + "-" + date.getDate();
  }

  var cards = Array.prototype.slice.call(document.querySelectorAll("[data-nf]"));
  var countBadge = document.getElementById("nf-count");
  var readAllBtn = document.getElementById("nf-readall");
  if (!cards.length || !countBadge || !readAllBtn) return;

  function unreadCount() {
    return cards.filter(function (card) {
      return card.classList.contains("is-unread");
    }).length;
  }

  function syncCount() {
    var unread = unreadCount();
    countBadge.textContent = String(unread);
    countBadge.classList.toggle("is-zero", unread === 0);
    countBadge.setAttribute("aria-label", "未读 " + unread + " 条");
    readAllBtn.disabled = unread === 0;
  }

  // 相对时间：data-ts 为相对秒数（演示），实际项目存时间戳
  function refreshTimes() {
    cards.forEach(function (card) {
      var timeEl = card.querySelector(".nf-time");
      if (!timeEl) return;
      var offset = Number(timeEl.getAttribute("data-ts"));
      timeEl.textContent = timeAgo(-offset);
    });
  }

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      card.classList.remove("is-unread");
      syncCount();
    });
  });

  readAllBtn.addEventListener("click", function () {
    cards.forEach(function (card) {
      card.classList.remove("is-unread");
    });
    syncCount();
  });

  refreshTimes();
  syncCount();
  setInterval(refreshTimes, 30000);
})();
