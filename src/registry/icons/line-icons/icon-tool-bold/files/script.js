(function () {
  var art = document.getElementById("ic-art");
  if (!art) return;
  document.querySelectorAll(".ic-size").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".ic-size").forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      art.style.setProperty("--ic-size", btn.getAttribute("data-size") + "px");
    });
  });
})();
