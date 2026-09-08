(function () {
  "use strict";

  var group = document.getElementById("np-group");
  var followup = document.getElementById("np-followup");
  var followupLabel = document.getElementById("np-followup-label");
  var text = document.getElementById("np-text");
  var submit = document.getElementById("np-submit");
  if (!group) return;

  function segOf(score) {
    if (score <= 6) return "bad";
    if (score <= 8) return "mid";
    return "good";
  }

  function segText(score) {
    if (score <= 6) return "对不起，我们会做得更好";
    if (score <= 8) return "谢谢，期待打动你的那一点";
    return "太好了，快告诉朋友吧";
  }

  var selected = -1;

  for (var score = 0; score <= 10; score++) {
    (function (value) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "np-dot";
      dot.setAttribute("role", "radio");
      dot.setAttribute("aria-checked", "false");
      dot.dataset.seg = segOf(value);
      dot.textContent = String(value);

      var bubble = document.createElement("span");
      bubble.className = "np-bubble";
      bubble.textContent = String(value);
      dot.appendChild(bubble);

      dot.addEventListener("click", function () {
        selected = value;
        group.querySelectorAll(".np-dot").forEach(function (d, index) {
          d.setAttribute("aria-checked", index === value ? "true" : "false");
        });
        followup.classList.add("is-open");
        followupLabel.textContent = segText(value);
      });

      group.appendChild(dot);
    })(score);
  }

  if (text && submit) {
    text.addEventListener("input", function () {
      submit.disabled = selected < 0 || text.value.trim().length === 0;
    });
    submit.addEventListener("click", function () {
      submit.textContent = "已收到，谢谢！";
      submit.disabled = true;
    });
  }

  /* 键盘左右切换 */
  group.addEventListener("keydown", function (event) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    var next = event.key === "ArrowRight" ? Math.min(selected + 1, 10) : Math.max(selected - 1, 0);
    var target = group.children[next];
    if (target) target.click();
    target.focus();
  });
})();
