/**
 * 树形选择器：父子勾选联动 + 半选态
 * - 勾选父级 → 所有后代同步；子级变化 → 逐级向上重算父级
 *   （全选中 = checked，部分 = indeterminate 半选，全不选 = 空）
 * - 展开/收起由按钮控制，aria-expanded 同步
 * - 汇总行实时统计已选叶子数量
 */
(function () {
  var root = document.getElementById("trTree");
  var summary = document.getElementById("trSummary");
  if (!root) return;

  /** 收集某个 checkbox 所在 li 的全部后代 checkbox */
  function descendants(input) {
    var node = input.closest(".tr-node");
    var childList = node ? node.querySelector(":scope > .tr-children") : null;
    return childList
      ? Array.prototype.slice.call(childList.querySelectorAll(".tr-check"))
      : [];
  }

  /** 根据后代状态重算某个父级 checkbox 的三态 */
  function refreshParent(nodeLi) {
    var check = nodeLi.querySelector(":scope > .tr-row .tr-check");
    var childList = nodeLi.querySelector(":scope > .tr-children");
    if (!check || !childList) return;
    var all = Array.prototype.slice.call(childList.querySelectorAll(".tr-check"));
    var checked = all.filter(function (c) {
      return c.checked;
    }).length;
    check.checked = checked === all.length;
    check.indeterminate = checked > 0 && checked < all.length;
  }

  root.querySelectorAll(".tr-check").forEach(function (input) {
    input.addEventListener("change", function () {
      // 向下同步所有后代
      descendants(input).forEach(function (child) {
        child.checked = input.checked;
        child.indeterminate = false;
      });
      // 向上逐级重算祖先
      var li = input.closest(".tr-node");
      while (li) {
        var parentLi = li.parentElement ? li.parentElement.closest(".tr-node") : null;
        if (parentLi) refreshParent(parentLi);
        li = parentLi;
      }
      paintSummary();
    });
  });

  function paintSummary() {
    var leaves = root.querySelectorAll(".is-leaf .tr-check");
    var picked = root.querySelectorAll(".is-leaf .tr-check:checked");
    if (summary) summary.textContent = "已选 " + picked.length + " / " + leaves.length + " 项";
  }

  root.querySelectorAll(".tr-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var node = btn.closest(".tr-node");
      var childList = node ? node.querySelector(":scope > .tr-children") : null;
      if (!childList) return;
      var show = childList.hidden;
      childList.hidden = !show;
      btn.setAttribute("aria-expanded", show ? "true" : "false");
      btn.setAttribute("aria-label", (show ? "收起 " : "展开 ") + btn.parentElement.querySelector(".tr-label span").textContent);
    });
  });

  paintSummary();
})();
