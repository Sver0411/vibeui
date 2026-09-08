/**
 * Profile card: follow toggle updates button state + follower count.
 */
(function () {
  const follow = document.getElementById("pf-follow");
  const followers = document.getElementById("pf-followers");
  if (!follow || !followers) return;

  follow.addEventListener("click", () => {
    const active = follow.getAttribute("aria-pressed") === "true";
    follow.setAttribute("aria-pressed", String(!active));
    follow.textContent = active ? "Follow" : "Following ✓";
    const current = parseInt(followers.textContent.replace(/,/g, ""), 10) || 0;
    followers.textContent = (active ? current - 1 : current + 1).toLocaleString("en-US");
  });
})();
