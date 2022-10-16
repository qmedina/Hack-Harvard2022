$(document).ready(function () {
  $("body").on({
    mousemove: function (e) {
      mouseMoveHandler(e);
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

  console.log(window.innerHeight);
  console.log(window.innerWidth);

  function isInViewport(element) {
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
    if (tagged) {
      document.getElementById("cube").style.background = "red";
      document.getElementById("title").innerHTML = "Run!";
    } else {
      document.getElementById("cube").style.background = "blue";
      document.getElementById("title").innerHTML = "Tag! You're it!";
    }
    tagged = !tagged;
  }

  setInterval(callPositionUpdate, 20);

  function callPositionUpdate() {
    if (!inCorner) {
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
    var chaseSpeed = 1000;
    var runSpeed = 0.07;

    if (tagged == false) {
      $("#cube").animate(
        {
          left: x_box + runSpeed * (x_cursor - x_box),
          top: y_box + runSpeed * (y_cursor - y_box),
        },
        1,
        "linear"
      );
    } else {
      if (isInViewport(position)) {
        $("#cube").animate(
          {
            left: x_box - chaseSpeed / (5 * (x_cursor - x_box + 1)),
            top: y_box - chaseSpeed / (5 * (y_cursor - y_box + 1)),
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
        $("#cube").animate(
          {
            left: x_box - chaseSpeed / (x_cursor - x_box),
          },
          1,
          "linear"
        );
      } else if (
        position.left < leftTopConstraint ||
        window.innerWidth - position.left < RightBottomConstraint
      ) {
        //left or right
        $("#cube").animate(
          {
            top: y_box - chaseSpeed / (y_cursor - y_box + 1),
          },
          1,
          "linear"
        );
      }
    }
  }
});
