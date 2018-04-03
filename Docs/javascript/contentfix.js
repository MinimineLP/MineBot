$(document).ready(function() {
  var funk = function() {
    $("#content").css("width",$(document).width()-340);
    $("#content table").css("width",$(document).width()-340);
  }
  window.setInterval(funk,100);
  funk();
});
