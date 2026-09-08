/**
 * OTP input: digit filtering, auto-advance, backspace-to-previous,
 * multi-digit paste distribution, arrow navigation, auto-submit.
 */
(function () {
  const form = document.getElementById("otp-form");
  const boxes = Array.from(document.querySelectorAll(".otp__box"));
  const status = document.getElementById("otp-status");
  if (!form || boxes.length === 0 || !status) return;
  let verificationTimer = null;

  function value() {
    return boxes.map((box) => box.value).join("");
  }

  function refresh() {
    boxes.forEach((box) => {
      box.setAttribute("data-filled", String(box.value !== ""));
    });
  }

  function verifyIfComplete() {
    clearTimeout(verificationTimer);
    const code = value();
    if (code.length !== boxes.length) {
      status.textContent = "";
      status.dataset.state = "";
      return;
    }
    status.textContent = "Verifying " + code + "…";
    status.dataset.state = "";
    verificationTimer = setTimeout(() => {
      if (code === "123456") {
        status.textContent = "Verified ✓";
        status.dataset.state = "success";
      } else {
        status.textContent = "Invalid code — try 123456 in this demo.";
        status.dataset.state = "error";
        boxes.forEach((box) => (box.value = ""));
        boxes[0].focus();
        refresh();
      }
    }, 500);
  }

  boxes.forEach((box, index) => {
    box.addEventListener("input", () => {
      // Keep only the last typed character, digits only.
      box.value = box.value.replace(/\D/g, "").slice(-1);
      if (box.value && index < boxes.length - 1) boxes[index + 1].focus();
      refresh();
      verifyIfComplete();
    });

    box.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && !box.value && index > 0) {
        boxes[index - 1].focus();
        boxes[index - 1].value = "";
        refresh();
        event.preventDefault();
      } else if (event.key === "ArrowLeft" && index > 0) {
        boxes[index - 1].focus();
      } else if (event.key === "ArrowRight" && index < boxes.length - 1) {
        boxes[index + 1].focus();
      }
    });

    box.addEventListener("paste", (event) => {
      event.preventDefault();
      const pasted = (event.clipboardData || window.clipboardData).getData("text");
      const digits = pasted.replace(/\D/g, "").slice(0, boxes.length);
      digits.split("").forEach((digit, offset) => {
        if (boxes[offset]) boxes[offset].value = digit;
      });
      boxes[Math.min(digits.length, boxes.length - 1)].focus();
      refresh();
      verifyIfComplete();
    });
  });

  refresh();
})();
