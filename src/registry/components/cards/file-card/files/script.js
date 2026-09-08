/**
 * File card list: simulated upload progress then swap to done state; delete
 * collapses the row smoothly. In real projects wire the progress loop to
 * XHR/fetch upload events instead.
 */
(function () {
  // 模拟上传
  var uploadingCard = document.getElementById("fc-uploading");
  var fill = document.getElementById("fc-fill");
  var percent = document.getElementById("fc-percent");
  if (uploadingCard && fill && percent) {
    var value = 0;
    var timer = setInterval(function () {
      value = Math.min(100, value + 4 + Math.round(Math.random() * 9));
      fill.style.width = value + "%";
      percent.textContent = value + "%";
      if (value >= 100) {
        clearInterval(timer);
        setTimeout(function () {
          uploadingCard.classList.remove("is-uploading");
          var row = uploadingCard.querySelector(".fc-progress-row");
          var body = uploadingCard.querySelector(".fc-body");
          if (row) row.remove();
          if (body) {
            var meta = document.createElement("p");
            meta.className = "fc-meta";
            meta.textContent = "1.1 MB · 刚刚";
            body.appendChild(meta);
          }
          uploadingCard.querySelector(".fc-ext").style.opacity = "";
        }, 350);
      }
    }, 160);
  }

  // 删除：平滑折叠
  document.querySelectorAll(".fc-btn--danger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".fc");
      if (!card || card.classList.contains("is-leaving")) return;
      card.classList.add("is-leaving");
      card.style.height = card.scrollHeight + "px";
      void card.offsetHeight;
      card.style.height = "0px";
      card.style.opacity = "0";
      card.style.paddingTop = "0";
      card.style.paddingBottom = "0";
      card.style.borderWidth = "0";
      card.addEventListener("transitionend", function (event) {
        if (event.propertyName === "height") card.remove();
      });
      setTimeout(function () {
        if (card.isConnected) card.remove();
      }, 400);
    });
  });
})();
