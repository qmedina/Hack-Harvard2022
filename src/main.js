$(document).ready(function () {
  $("body").on({
    mousemove: function (e) {
      mouseMoveHandler(e);
    },
    mouseleave: function (e) {
        mouseLeaveHandler(e);
    },

    mouseenter: function (e) {
        mouseEnterHandler(e);
    },

  });

  $("#cube").on({
    mouseover: function (e) {
      mouseOverHandler(e);
    },

    mouseout: function (e) {
      mouseOutHandler(e);
    },
  });

  var currentMousePos = {
    x: -1,
    y: -1,
  };

  var tagged = false;
  var inCorner = false;
  var leftTopConstraint = 60;
  var RightBottomConstraint = 100;
  var mouseOnScreen = false;

  console.log(window.innerHeight);
  console.log(window.innerWidth);

  function isInViewport(element) {
    console.log("ran isInViewport");
    return (
      element.top >= leftTopConstraint &&
      element.left >= leftTopConstraint &&
      window.innerHeight - element.top >= RightBottomConstraint &&
      window.innerWidth - element.left >= RightBottomConstraint
    );
  }

  function mouseMoveHandler(event) {
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
  }

  function mouseOverHandler(event) {
    document.getElementById("cube").top = Math.random() * Window.innerHeight;
    document.getElementById("cube").left = Math.random() * Window.innerWidth;
    if (tagged) {
      document.getElementById("cube").style.background = "red";
      document.getElementById("title").innerHTML = "Run!";
    } else {
      document.getElementById("cube").style.background = "blue";
      document.getElementById("title").innerHTML = "Tag! You're it!";
    }
    tagged = !tagged;
  }

  function mouseEnterHandler(event) {
      mouseOnScreen = !mouseOnScreen;
      console.log(mouseOnScreen);
  }

  function mouseLeaveHandler(event) {
    mouseOnScreen = !mouseOnScreen;
    console.log(mouseOnScreen);
}


  setInterval(callPositionUpdate, 20);

  function callPositionUpdate() {
    if (!(inCorner) && mouseOnScreen) {
      positionUpdate();
    }
  }

  function positionUpdate() {
    var x_cursor = currentMousePos.x;
    var y_cursor = currentMousePos.y;
    var position = $("#cube").offset();
    var x_box = position.left;
    var y_box = position.top;
    var delayInMilliseconds = 100;
    var chaseSpeed = 0.07;
    var runSpeed = 0.07;
    if (x_cursor - x_box > 0) {
      if (Math.abs(x_cursor - x_box) <= 0.25 * window.innerWidth) {
        var xMultiplier = 150;
      } else if (Math.abs(x_cursor - x_box) <= 0.5 * window.innerWidth) {
        var xMultiplier = 100;
      } else if (Math.abs(x_cursor - x_box) > 0.5 * window.innerWidth) {
        var xMultiplier = 50;
      }
    } else if (x_cursor - x_box <= 0) {
      if (Math.abs(x_cursor - x_box) <= 0.25 * window.innerWidth) {
        var xMultiplier = -150;
      } else if (Math.abs(x_cursor - x_box) <= 0.5 * window.innerWidth) {
        var xMultiplier = -100;
      } else if (Math.abs(x_cursor - x_box) > 0.5 * window.innerWidth) {
        var xMultiplier = -50;
      }
    }
    if (y_cursor - y_box > 0) {
      if (Math.abs(y_cursor - y_box) <= 0.25 * window.innerHeight) {
        var yMultiplier = 100;
      } else if (Math.abs(y_cursor - y_box) <= 0.5 * window.innerHeight) {
        var yMultiplier = 50;
      } else if (Math.abs(y_cursor - y_box) > 0.5 * window.innerHeight) {
        var yMultiplier = 25;
      }
    } else if (y_cursor - y_box <= 0) {
      if (Math.abs(y_cursor - y_box) <= 0.25 * window.innerHeight) {
        var yMultiplier = -100;
      } else if (Math.abs(y_cursor - y_box) <= 0.5 * window.innerHeight) {
        var yMultiplier = -50;
      } else if (Math.abs(y_cursor - y_box) > 0.5 * window.innerHeight) {
        var yMultiplier = -25;
      }
    }

    if (tagged == false) {
        if (x_cursor - x_box > 0) {
            if (y_cursor - y_box > 0){
                $("#cube").animate(
                    {
                      left: x_box + runSpeed * (x_cursor - x_box)* 7 * Math.random() + 25 * Math.random(),
                      top: y_box + runSpeed * (y_cursor - y_box)* 7 * Math.random() + 25 * Math.random(),
                    },
                    1,
                    "linear"
                  );
            }
            else{
                $("#cube").animate(
                    {
                      left: x_box + runSpeed * (x_cursor - x_box)* 7 * Math.random() + 25 * Math.random(),
                      top: y_box + runSpeed * (y_cursor - y_box)* 7 * Math.random() - 25 * Math.random(),
                    },
                    1,
                    "linear"
                  );
            }
        }
        else{
            if (y_cursor - y_box > 0){
                $("#cube").animate(
                    {
                      left: x_box + runSpeed * (x_cursor - x_box)* 7 * Math.random() - 25 * Math.random(),
                      top: y_box + runSpeed * (y_cursor - y_box)* 7 * Math.random() + 25 * Math.random(),
                    },
                    1,
                    "linear"
                  );
            } 
            else{
                $("#cube").animate(
                    {
                        left: x_box + runSpeed * (x_cursor - x_box)* 7 * Math.random() - 25 * Math.random(),
                        top: y_box + runSpeed * (y_cursor - y_box)* 7 * Math.random() - 25 * Math.random(),
                    },
                    1,
                    "linear"
                    );
            }
        }

    } else {
      if (isInViewport(position)) {
        $("#cube").animate(
          {
            left: x_box - chaseSpeed * xMultiplier,
            top: y_box - chaseSpeed * yMultiplier,
          },
          1,
          "linear"
        );
      } else if (
        position.left < leftTopConstraint &&
        position.top < leftTopConstraint
      ) {
        //top left
        inCorner = true;
        $("#cube").animate(
          {
            left: window.innerWidth * 0.25,
            top: window.innerHeight * 0.25,
          },
          delayInMilliseconds,
          "linear"
        );
        setTimeout(function () {
          inCorner = false;
        }, delayInMilliseconds);
      } else if (
        window.innerWidth - position.left < RightBottomConstraint &&
        position.top < RightBottomConstraint
      ) {
        //top right
        inCorner = true;
        $("#cube").animate(
          {
            left: window.innerWidth * 0.75,
            top: window.innerHeight * 0.25,
          },
          delayInMilliseconds,
          "linear"
        );
        setTimeout(function () {
          inCorner = false;
        }, delayInMilliseconds);
      } else if (
        position.left < leftTopConstraint &&
        window.innerHeight - position.top < RightBottomConstraint
      ) {
        //bottom left
        inCorner = true;
        $("#cube").animate(
          {
            left: window.innerWidth * 0.25,
            top: window.innerHeight * 0.75,
          },
          delayInMilliseconds,
          "linear"
        );
        setTimeout(function () {
          inCorner = false;
        }, delayInMilliseconds);
      } else if (
        window.innerWidth - position.left < RightBottomConstraint &&
        window.innerHeight - position.top < RightBottomConstraint
      ) {
        //bottom right
        inCorner = true;
        $("#cube").animate(
          {
            left: window.innerWidth * 0.75,
            top: window.innerHeight * 0.75,
          },
          delayInMilliseconds,
          "linear"
        );
        setTimeout(function () {
          inCorner = false;
        }, delayInMilliseconds);
      } else if (
        position.top < leftTopConstraint ||
        window.innerHeight - position.top < RightBottomConstraint
      ) {
        //top or bottom
        inCorner = true;
        $("#cube").animate(
          {
            left: x_box - chaseSpeed * xMultiplier * 10,
            top: y_box + chaseSpeed * yMultiplier * 20,
          },
          delayInMilliseconds,
          "linear"
        );
        setTimeout(function () {
          inCorner = false;
        }, delayInMilliseconds);
      } else if (
        position.left < leftTopConstraint ||
        window.innerWidth - position.left < RightBottomConstraint
      ) {
        //left or right
        inCorner = true;
        $("#cube").animate(
          {
            left: x_box + chaseSpeed * xMultiplier * 20,
            top: y_box - chaseSpeed * yMultiplier * 10,
          },
          delayInMilliseconds,
          "linear"
        );
        setTimeout(function () {
          inCorner = false;
        }, delayInMilliseconds);
      }
    }
  }
});
