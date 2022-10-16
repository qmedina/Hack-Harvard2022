$(document).ready(function() {

    $("body").on({
        mousemove: function(e) {
            mouseMoveHandler(e);
        }
        });

    $("#cube").on({ 
        mouseover: function(e) {
            mouseOverHandler(e);
        },

        mouseout: function(e) {
            mouseOutHandler(e);
        }
    });
    
    var currentMousePos = {
      x: -1,
      y: -1
    };

    var tagged = false;

    console.log(window.innerHeight);
    console.log(window.innerWidth);

    function isInViewport(element) {
        console.log("ran isInViewport");
        return (
            element.top >= 40 &&
            element.left >= 40 &&
            window.innerHeight - element.top >=  60 &&
            window.innerWidth - element.left >= 60 
        )
    }
  
    function mouseMoveHandler(event) {
      currentMousePos.x = event.pageX;
      currentMousePos.y = event.pageY;
    }

    function mouseOverHandler(event){
        if (tagged){
            document.getElementById("cube").style.background = "red";
            document.getElementById("title").innerHTML = "Run!";
        }
        else {
            document.getElementById("cube").style.background = "blue";
            document.getElementById("title").innerHTML = "Tag! You're it!";
        }
        tagged = !tagged;
    }
  
    setInterval(positionUpdate, 20);
  
    function positionUpdate() {
        var x_cursor = currentMousePos.x;
            var y_cursor = currentMousePos.y;
            var position = $("#cube").offset();
            var x_box = position.left;
            var y_box = position.top;

        if (tagged == false) {
            $("#cube").animate({
                left: x_box + 0.1 * (x_cursor - x_box),
                top: y_box + 0.1 * (y_cursor - y_box)
            }, 1, "linear");
        } else {
            if (isInViewport(position)) {
                console.log("isInViewport");
                $("#cube").animate({
                    left: x_box - 0.06 * (x_cursor - x_box),
                    top: y_box - 0.06 * (y_cursor - y_box)
                }, 1, "linear");
            } else {
                console.log("isnooooootInViewport");
                document.getElementById("body").style.background = "red";
            } 
        } 
    }
  });
  