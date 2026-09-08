/**
 * 分页器
 *
 * 页码窗口策略：首末两页永远可见，当前页左右各留 sibling 页，
 * 中间断开的地方补一个省略号。这样无论翻到哪一页，按钮数量都稳定，
 * 不会因为页数变化导致整排按钮跳动、误点到相邻页码。
 *
 * 紧凑模式下不渲染页码，只留上下页 + "当前 / 总数"，适配窄屏。
 */
(function () {
  var DOTS = "dots";
  var SIBLINGS = 1;

  function range(start, end) {
    var out = [];
    for (var i = start; i <= end; i++) out.push(i);
    return out;
  }

  /** 返回由页码和 'dots' 组成的序列 */
  function pageWindow(current, total, siblings) {
    // 首 + 尾 + 当前 + 左右各 siblings 个 + 2 个省略号 = 能完整铺开的最大页数
    var slots = siblings * 2 + 5;
    if (slots >= total) return range(1, total);

    var left = Math.max(current - siblings, 1);
    var right = Math.min(current + siblings, total);
    var showLeftDots = left > 2;
    var showRightDots = right < total - 1;

    // 靠近开头：左侧不折叠，右侧折叠
    if (!showLeftDots) {
      return range(1, slots - 2).concat([DOTS, total]);
    }
    // 靠近结尾：右侧不折叠，左侧折叠
    if (!showRightDots) {
      return [1, DOTS].concat(range(total - slots + 3, total));
    }
    // 中间：两侧都折叠
    return [1, DOTS].concat(range(left, right), [DOTS, total]);
  }

  function makeButton(label, options) {
    var opts = options || {};
    var el = document.createElement("button");
    el.type = "button";
    el.className = "pg-btn" + (opts.className ? " " + opts.className : "");
    if (opts.current) {
      el.setAttribute("aria-current", "page");
    }
    // 重渲染后靠这个属性把焦点交回同一个页码
    if (opts.page != null) el.dataset.page = String(opts.page);
    if (opts.label) el.setAttribute("aria-label", opts.label);
    if (opts.disabled) el.disabled = true;

    if (opts.arrow) {
      var arrow = document.createElement("span");
      arrow.className = "pg-arrow pg-arrow--" + opts.arrow;
      arrow.setAttribute("aria-hidden", "true");
      el.appendChild(arrow);
    } else {
      el.appendChild(document.createTextNode(String(label)));
    }

    if (opts.onClick && !opts.disabled) {
      el.addEventListener("click", opts.onClick);
    }
    return el;
  }

  function makeGap() {
    var el = document.createElement("span");
    el.className = "pg-gap";
    el.setAttribute("aria-hidden", "true");
    el.textContent = "…";
    return el;
  }

  function makeStatus(current, total) {
    var el = document.createElement("span");
    el.className = "pg-status";
    el.innerHTML =
      "<strong>" + current + "</strong> / " + total;
    return el;
  }

  function render(nav) {
    var total = Math.max(1, Number(nav.dataset.total || 1));
    var compact = nav.dataset.mode === "compact";
    var current = Math.min(total, Math.max(1, Number(nav.dataset.page || 1)));

    nav.textContent = "";
    nav.dataset.page = String(current);

    var go = function (page) {
      nav.dataset.page = String(page);
      render(nav);
      // 重新渲染后焦点会丢失，把焦点交回同方向的新按钮
      var next = nav.querySelector('[data-page="' + page + '"]');
      if (next) next.focus();
    };

    nav.appendChild(
      makeButton("", {
        arrow: "prev",
        className: "pg-btn--nav",
        label: "上一页",
        disabled: current === 1,
        onClick: function () {
          go(current - 1);
        },
      }),
    );

    if (compact) {
      nav.appendChild(makeStatus(current, total));
    } else {
      pageWindow(current, total, SIBLINGS).forEach(function (item) {
        if (item === DOTS) {
          nav.appendChild(makeGap());
          return;
        }
        nav.appendChild(
          makeButton(item, {
            page: item,
            current: item === current,
            label: "第 " + item + " 页",
            onClick: function () {
              go(item);
            },
          }),
        );
      });
    }

    nav.appendChild(
      makeButton("", {
        arrow: "next",
        className: "pg-btn--nav",
        label: "下一页",
        disabled: current === total,
        onClick: function () {
          go(current + 1);
        },
      }),
    );
  }

  document.querySelectorAll("[data-pagination]").forEach(render);
})();
