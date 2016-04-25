// This is where it all goes :)
$(function() {
  $("a[data-scroll-to]").click(function(ev) {
    var id = $(this).data("scroll-to")

    $('html, body').animate({
      scrollTop: $("#" + id).offset().top
    }, 500);
  })
});
