(function () {
  "use strict";

  var ROWS = [
    { no: "SO-24091", who: "安安", status: "已完成", cls: "done", amount: "¥ 1,280.00", time: "09-05 10:24" },
    { no: "SO-24092", who: "北北", status: "待付款", cls: "pending", amount: "¥ 356.50", time: "09-05 09:58" },
    { no: "SO-24093", who: "晨晨", status: "已完成", cls: "done", amount: "¥ 2,140.00", time: "09-05 09:12" },
    { no: "SO-24094", who: "多多", status: "已退款", cls: "fail", amount: "¥ 89.00", time: "09-04 21:06" },
    { no: "SO-24095", who: "二凡", status: "待付款", cls: "pending", amount: "¥ 768.00", time: "09-04 18:33" },
  ];

  var body = document.getElementById("st-body");
  var skeleton = document.getElementById("st-skeleton");
  var table = document.getElementById("st-table");
  var tbody = document.getElementById("st-tbody");
  var listEl = document.getElementById("st-list");
  var reloadBtn = document.getElementById("st-reload");
  var segBtns = document.querySelectorAll(".st-segbtn");

  var view = "table";
  var timer = 0;

  /** 渲染表格版式的真实数据 */
  function renderTable() {
    tbody.innerHTML = ROWS.map(function (r) {
      return (
        "<tr><td>" + r.no + "</td><td>" + r.who +
        '</td><td><span class="st-pill ' + r.cls + '">' + r.status + "</span></td>" +
        '<td class="st-num">' + r.amount + "</td><td>" + r.time + "</td></tr>"
      );
    }).join("");
  }

  /** 渲染列表版式的真实数据 */
  function renderList() {
    listEl.innerHTML = ROWS.map(function (r) {
      return (
        '<li><span class="st-dot">' + r.who.charAt(0) + "</span>" +
        '<span class="st-meta"><b>' + r.no + "</b><span>" + r.who + " · " + r.time + "</span></span>" +
        '<span class="st-pill ' + r.cls + '">' + r.status + "</span>" +
        "<b>" + r.amount + "</b></li>"
      );
    }).join("");
  }

  /** 切换骨架 / 数据两种状态 */
  function setLoading(loading) {
    skeleton.hidden = !loading;
    table.hidden = loading || view !== "table";
    listEl.hidden = loading || view !== "list";
    body.setAttribute("aria-busy", String(loading));
    reloadBtn.disabled = loading;
    reloadBtn.style.opacity = loading ? "0.6" : "1";
  }

  /** 模拟一次加载：骨架停留 1.4 秒后填入数据 */
  function load(delay) {
    window.clearTimeout(timer);
    setLoading(true);
    timer = window.setTimeout(function () {
      if (view === "table") renderTable();
      else renderList();
      setLoading(false);
    }, delay);
  }

  reloadBtn.addEventListener("click", function () { load(1400); });

  // 版式切换：数据已存在则只做短暂骨架过渡
  segBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      view = btn.dataset.view;
      segBtns.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-selected", String(on));
      });
      load(600);
    });
  });

  load(1400);
})();
