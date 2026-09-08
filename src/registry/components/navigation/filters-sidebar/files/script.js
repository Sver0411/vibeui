(function () {
  "use strict";

  var PRODUCTS = [
    { name: "机械键盘", cat: "数码", price: 399, stock: true },
    { name: "降噪耳机", cat: "数码", price: 1299, stock: true },
    { name: "显示器支架", cat: "家居", price: 219, stock: false },
    { name: "桌面台灯", cat: "家居", price: 168, stock: true },
    { name: "人体工学椅", cat: "家居", price: 1599, stock: true },
    { name: "USB-C 扩展坞", cat: "配件", price: 249, stock: true },
    { name: "鼠标垫加长款", cat: "配件", price: 89, stock: false },
    { name: "4K 摄像头", cat: "数码", price: 699, stock: true },
  ];

  var search = document.getElementById("fs-search");
  var price = document.getElementById("fs-price");
  var priceOut = document.getElementById("fs-price-out");
  var stockOnly = document.getElementById("fs-stock");
  var catBoxes = Array.prototype.slice.call(document.querySelectorAll('input[data-fs="cat"]'));
  var list = document.getElementById("fs-list");
  var countEl = document.getElementById("fs-count");
  var chipsBox = document.getElementById("fs-chips");
  var clearBtn = document.getElementById("fs-clear");
  var toggleBtn = document.getElementById("fs-toggle");
  var side = document.getElementById("fs-side");

  /** 当前筛选条件 */
  function filters() {
    return {
      kw: search.value.trim(),
      cats: catBoxes.filter(function (c) { return c.checked; }).map(function (c) { return c.value; }),
      max: Number(price.value),
      stock: stockOnly.checked,
    };
  }

  function apply() {
    var f = filters();
    priceOut.textContent = "¥" + f.max;

    var matched = PRODUCTS.filter(function (p) {
      if (f.kw && p.name.toLowerCase().indexOf(f.kw.toLowerCase()) === -1) return false;
      if (f.cats.indexOf(p.cat) === -1) return false;
      if (p.price > f.max) return false;
      if (f.stock && !p.stock) return false;
      return true;
    });

    // 结果列表
    list.innerHTML = "";
    matched.forEach(function (p) {
      var li = document.createElement("li");
      li.className = "fs-item" + (p.stock ? "" : " out");
      li.innerHTML =
        '<span class="fs-item-name">' + p.name + "</span>" +
        '<span class="fs-item-cat">' + p.cat + "</span>" +
        '<span class="fs-item-price">¥' + p.price.toLocaleString() + "</span>" +
        (p.stock ? "" : '<span class="fs-item-cat">缺货</span>');
      list.appendChild(li);
    });
    if (!matched.length) {
      list.innerHTML = '<li class="fs-empty">没有符合条件的商品，试试放宽筛选。</li>';
    }
    countEl.textContent = matched.length + " 件商品";

    // 激活条件 chips（分类外的条件可单独移除）
    chipsBox.innerHTML = "";
    function chip(label, remove) {
      var span = document.createElement("span");
      span.className = "fs-chip";
      span.innerHTML = "<span>" + label + '</span><button type="button" aria-label="移除条件 ' + label + '">×</button>';
      span.querySelector("button").addEventListener("click", remove);
      chipsBox.appendChild(span);
    }
    if (f.kw) chip("“" + f.kw + "”", function () { search.value = ""; apply(); });
    if (f.cats.length < catBoxes.length) {
      chip(f.cats.length ? f.cats.join("/") : "无分类", function () {
        catBoxes.forEach(function (b) { b.checked = true; });
        apply();
      });
    }
    if (f.max < Number(price.max)) chip("≤ ¥" + f.max, function () { price.value = price.max; apply(); });
    if (f.stock) chip("有货", function () { stockOnly.checked = false; apply(); });
  }

  // 移动端侧栏抽屉
  toggleBtn.addEventListener("click", function () {
    var open = side.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(open));
  });

  [search, price, stockOnly].forEach(function (el) {
    el.addEventListener("input", apply);
  });
  catBoxes.forEach(function (box) { box.addEventListener("change", apply); });

  clearBtn.addEventListener("click", function () {
    search.value = "";
    price.value = price.max;
    stockOnly.checked = false;
    catBoxes.forEach(function (b) { b.checked = true; });
    apply();
  });

  apply();
})();
