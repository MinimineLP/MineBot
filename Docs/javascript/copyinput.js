$(document).ready(function() {
  $("div#content .copy")
    .hover(function (e) {
      $(this).select();
    })
    .mouseleave(function (e) {
      document.getSelection().removeAllRanges();
    })
    .mouseup(function (e) {
      e.preventDefault();
    })
    .click(function(e) {
      document.execCommand("Copy");
    }).attr("title", "Click to copy")
});

// Use a closure to keep vars out of global scope
(function () {
    var ID = "tooltip", CLS_ON = "tooltip_ON", FOLLOW = true,
    DATA = "_tooltip", OFFSET_X = 0, OFFSET_Y = 10,
    showAt = function (e) {
        var ntop = e.pageY + OFFSET_Y, nleft = e.pageX + OFFSET_X;
        $("#" + ID).html($(e.target).data(DATA)).css({
            position: "absolute", top: ntop, left: nleft
        }).show();
    };
    $(document).on("mouseenter", "*[title]", function (e) {
        $(this).data(DATA, $(this).attr("title"));
        $(this).removeAttr("title").addClass(CLS_ON);
        $("<span class=\"tooltiptext\" id='" + ID + "' />").appendTo("body");
        showAt(e);
    });
    $(document).on("mouseleave", "." + CLS_ON, function (e) {
        $(this).attr("title", $(this).data(DATA)).removeClass(CLS_ON);
        $("#" + ID).remove();
    });
    if (FOLLOW) { $(document).on("mousemove", "." + CLS_ON, showAt); }
}());
