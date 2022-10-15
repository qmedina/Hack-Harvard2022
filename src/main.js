$(document).ready(function() {

    $("body").mousemove(function(e) {
      mouseMoveHandler(e);
    });
    var currentMousePos = {
      x: -1,
      y: -1
    };
  
    function mouseMoveHandler(event) {
      currentMousePos.x = event.pageX;
      currentMousePos.y = event.pageY;
    }
  
    mouseMover = setInterval(positionUpdate, 20);
  
    function positionUpdate() {
  
      var x_cursor = currentMousePos.x;
      var y_cursor = currentMousePos.y;
      var position = $("#cube").offset();
      var x_box = position.left;
      var y_box = position.top;
  
      $("#cube").animate({
        left: x_box + 0.1 * (x_cursor - x_box),
        top: y_box + 0.1 * (y_cursor - y_box)
      }, 1, "linear");
    }
  });
  