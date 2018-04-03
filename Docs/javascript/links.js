$(document).ready(function() {
  $(".link").click(function() {
    window.location.href = $(this).attr("href");
  });
});
