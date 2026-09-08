/**
 * 日期选择器：周一起始的中文月历
 * - 上 / 下月切换，非本月日期置灰但不可选
 * - 今天细描边、选中实心高亮，回到今天按钮
 * - 网格重建时走 keyboard 语义（按钮天然可 Tab），aria-live 播报当前值
 */
(function () {
  var root = document.querySelector(".dp-stage");
  if (!root) return;

  var WEEKDAY_OFFSET_MONDAY = 1; // 周一为第一列

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }
  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  function formatCN(d) {
    return d.getFullYear() + " 年 " + (d.getMonth() + 1) + " 月 " + d.getDate() + " 日";
  }

  /** 创建一个月历实例 */
  function createCalendar(options) {
    var cal = document.getElementById(options.root);
    if (!cal) return;
    var grid = cal.querySelector(".dp-grid");
    var label = document.getElementById(options.label);
    var valueEl = options.value ? document.getElementById(options.value) : null;
    var todayBtn = options.today ? document.getElementById(options.today) : null;

    var today = new Date();
    var view = new Date(today.getFullYear(), today.getMonth(), 1); // 当前展示的月份
    var selected = options.preset ? new Date(options.preset) : null;

    function render() {
      label.textContent = view.getFullYear() + " 年 " + (view.getMonth() + 1) + " 月";
      grid.innerHTML = "";

      var first = new Date(view.getFullYear(), view.getMonth(), 1);
      // 周一起始：JS 的 getDay() 周日=0，换算成周一=0
      var lead = (first.getDay() + 6) % 7;
      var start = new Date(first);
      start.setDate(first.getDate() - lead);
      var today = new Date();

      for (var i = 0; i < 42; i++) {
        var d = new Date(start);
        d.setDate(start.getDate() + i);
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "dp-day";
        btn.textContent = String(d.getDate());
        var outside = d.getMonth() !== view.getMonth();
        if (outside) btn.classList.add("is-outside");
        if (sameDay(d, today)) btn.classList.add("is-today");
        if (selected && sameDay(d, selected)) btn.classList.add("is-selected");
        if (outside) {
          btn.disabled = true;
        } else {
          btn.setAttribute("aria-label", formatCN(d));
          (function (date) {
            btn.addEventListener("click", function () {
              selected = date;
              paintValue();
              render();
            });
          })(d);
        }
        grid.appendChild(btn);
      }
    }

    function paintValue() {
      if (!valueEl) return;
      if (selected) {
        valueEl.textContent = selected.getFullYear() + "-" + pad(selected.getMonth() + 1) + "-" + pad(selected.getDate());
        valueEl.classList.add("is-set");
      } else {
        valueEl.textContent = "未选择日期";
        valueEl.classList.remove("is-set");
      }
    }

    cal.querySelectorAll(".dp-nav").forEach(function (btn) {
      btn.addEventListener("click", function () {
        view.setMonth(view.getMonth() + Number(btn.dataset.nav));
        render();
      });
    });

    if (todayBtn) {
      todayBtn.addEventListener("click", function () {
        view = new Date(today.getFullYear(), today.getMonth(), 1);
        selected = new Date(today);
        paintValue();
        render();
      });
    }

    render();
    paintValue();
  }

  createCalendar({
    root: "dpMain",
    label: "dpMainLabel",
    grid: null,
    value: "dpMainValue",
    today: "dpMainToday",
  });
  createCalendar({
    root: "dpMini",
    label: "dpMiniLabel",
    preset: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
  });
})();
