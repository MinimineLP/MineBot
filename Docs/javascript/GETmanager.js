const __GET__ = new Array();
window.location.search.substr(1).split("&").forEach(function (item) {
  tmp = item.split("=");
  __GET__[tmp[0]] = tmp[1];
});

if(!__GET__["location"])__GET__["location"] = "start";
