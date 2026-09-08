/**
 * Currency input: display value (grouped) is kept separate from the real
 * numeric string; caret offset is compensated by counting significant
 * chars left of the caret before re-formatting. CN uppercase shows on blur.
 */
(function () {
  var field = document.getElementById("ci-field");
  var upper = document.getElementById("ci-uppercase");
  if (!field || !upper) return;

  var MAX = 999999999.99;

  // 人民币大写映射
  var CN_DIGITS = "零壹贰叁肆伍陆柒捌玖";
  var CN_UNITS = ["", "拾", "佰", "仟"];
  var CN_BIG = ["", "万", "亿"];

  function format(value) {
    var parts = value.split(".");
    var intPart = parts[0] || "0";
    var decPart = parts.length > 1 ? parts[1] : "";
    var grouped = Number(intPart).toLocaleString("en-US");
    return decPart ? grouped + "." + decPart : grouped;
  }

  function toCnUppercase(num) {
    var n = Math.round(num * 100) / 100;
    if (n === 0) return "零元整";
    var intPart = Math.floor(n);
    var decPart = Math.round((n - intPart) * 100);
    var text = "";
    if (intPart > 0) {
      var groups = [];
      while (intPart > 0) {
        groups.push(intPart % 10000);
        intPart = Math.floor(intPart / 10000);
      }
      for (var g = groups.length - 1; g >= 0; g--) {
        var grp = groups[g];
        if (grp === 0) continue;
        var section = "";
        var zero = false;
        for (var i = 3; i >= 0; i--) {
          var digit = Math.floor(grp / Math.pow(10, i)) % 10;
          if (digit === 0) {
            zero = section !== "";
          } else {
            if (zero) { section += "零"; zero = false; }
            section += CN_DIGITS[digit] + CN_UNITS[i];
          }
        }
        text += section + CN_BIG[g];
      }
      text += "元";
    }
    if (decPart === 0) {
      text += "整";
    } else {
      var jiao = Math.floor(decPart / 10);
      var fen = decPart % 10;
      if (jiao) text += CN_DIGITS[jiao] + "角";
      else if (intPart > 0 && fen) text += "零";
      if (fen) text += CN_DIGITS[fen] + "分";
    }
    return text;
  }

  field.addEventListener("input", function () {
    var caret = field.selectionStart || 0;
    var raw = field.value;
    // 光标左侧的有效字符数（不含逗号）
    var leftOfCaret = raw.slice(0, caret).replace(/,/g, "").length;

    var cleaned = raw.replace(/[^\d.]/g, "");
    // 只保留第一个小数点
    var firstDot = cleaned.indexOf(".");
    if (firstDot !== -1) {
      cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, "");
    }
    // 小数截断 2 位
    var dotIdx = cleaned.indexOf(".");
    if (dotIdx !== -1 && cleaned.length - dotIdx - 1 > 2) {
      cleaned = cleaned.slice(0, dotIdx + 3);
    }
    // 最大值约束
    var numeric = parseFloat(cleaned);
    if (!isNaN(numeric) && numeric > MAX) cleaned = String(MAX);

    // 去前导零
    var parts = cleaned.split(".");
    parts[0] = parts[0].replace(/^0+(?=\d)/, "");
    cleaned = parts.length > 1 ? parts[0] + "." + parts[1] : parts[0];

    var formatted = cleaned === "" ? "" : format(cleaned);
    field.value = formatted;

    // 恢复光标：按有效字符数映射回格式化后的位置
    var count = 0;
    var pos = 0;
    while (pos < formatted.length && count < leftOfCaret) {
      if (formatted[pos] !== ",") count++;
      pos++;
    }
    field.setSelectionRange(pos, pos);
  });

  field.addEventListener("blur", function () {
    var numeric = parseFloat(field.value.replace(/,/g, ""));
    if (isNaN(numeric) || numeric === 0) {
      upper.textContent = "";
      return;
    }
    upper.textContent = "人民币大写：" + toCnUppercase(numeric);
  });
})();
