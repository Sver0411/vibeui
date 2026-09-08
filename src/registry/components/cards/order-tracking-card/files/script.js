(function () {
  "use strict";

  var LOGS = [
    { t: "9/5 08:12", text: "快件已到达【杭州转运中心】", hot: false },
    { t: "9/5 06:40", text: "快件已从【上海浦东集散点】发出", hot: false },
    { t: "9/4 21:15", text: "快件已到达【上海浦东集散点】", hot: false },
    { t: "9/4 18:05", text: "顺丰速运已揽收快件", hot: false },
    { t: "9/4 10:20", text: "您的订单已确认，商品打包完成", hot: true },
  ];

  var log = document.getElementById("ot-log");

  LOGS.forEach(function (item) {
    var li = document.createElement("li");
    if (item.hot) li.className = "hot";
    li.innerHTML = "<b>" + item.text + '</b><span class="ot-t">' + item.t + "</span>";
    log.appendChild(li);
  });
})();
