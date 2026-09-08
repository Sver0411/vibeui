(function () {
  "use strict";

  var ITEMS = [
    { name: "机械键盘", color: "#2563eb", price: 399 },
    { name: "降噪耳机", color: "#7c3aed", price: 1299 },
    { name: "桌面台灯", color: "#0d9488", price: 168 },
  ];

  var SHIPPING_FREE_FROM = 1000;
  var SHIPPING_FEE = 12;

  var listBox = document.getElementById("ck-items");
  var subtotalEl = document.getElementById("ck-subtotal");
  var shippingEl = document.getElementById("ck-shipping");
  var totalEl = document.getElementById("ck-total");

  function fmt(n) { return "¥" + n.toLocaleString(); }

  var subtotal = ITEMS.reduce(function (s, it) { return s + it.price; }, 0);
  var shipping = subtotal >= SHIPPING_FREE_FROM ? 0 : SHIPPING_FEE;

  ITEMS.forEach(function (it) {
    var li = document.createElement("li");
    li.innerHTML =
      '<span class="ck-thumb" style="background:linear-gradient(135deg,' +
      it.color + ',' + it.color + 'aa)"></span>' +
      '<span class="ck-name">' + it.name + "</span>" +
      '<span class="ck-price">' + fmt(it.price) + "</span>";
    listBox.appendChild(li);
  });

  subtotalEl.textContent = fmt(subtotal);
  shippingEl.textContent = shipping === 0 ? "免运费" : fmt(shipping);
  totalEl.textContent = fmt(subtotal + shipping);

  // 提交：简单校验必填，成功给出演示反馈
  document.getElementById("ck-submit").addEventListener("click", function () {
    var done = document.getElementById("ck-done");
    var missing = ["ck-name", "ck-phone", "ck-addr"].filter(function (id) {
      return !document.getElementById(id).value.trim();
    });
    if (missing.length) {
      document.getElementById(missing[0]).focus();
      return;
    }
    done.hidden = false;
  });
})();
