(function() {
  "use strict";

  var canvas = document.getElementById("consoleDisplay");
  var ctx = canvas.getContext("2d");

  var buttonStates = {};

  function buttonState(letter) {
    if(buttonStates[letter]) {
      ctx.strokeStyle = "#ff0000";
    } else { 
      ctx.strokeStyle = "#340f20";
    }
  }

  function draw() {
    ctx.clearRect(0, 0, 420, 320);

    ctx.font = "30px Poiret One";
    ctx.fillStyle = "#340f20";

    // Left Hand -------------------
    buttonState("a");
    ctx.strokeRect(2, 40, 36, 90);
    ctx.fillText("A", 8, 95);

    buttonState("s");
    ctx.strokeRect(42, 30, 36, 90);
    ctx.fillText("S", 52, 85);

    buttonState("d");
    ctx.strokeRect(82, 20, 36, 90);
    ctx.fillText("D", 92, 75);

    buttonState("f");
    ctx.strokeRect(122, 30, 36, 90);
    ctx.fillText("F", 134, 85);

    buttonState("v");
    ctx.strokeRect(162, 60, 36, 90);
    ctx.fillText("V", 168, 115);

    //Left Wrist -------------------
    buttonState(" ");
    ctx.strokeRect(42, 240, 120, 36);
    ctx.fillText("Space", 54, 268);

    //Right Hand -------------------
    buttonState("n");
    ctx.strokeRect(222, 60, 36, 90);
    ctx.fillText("N", 228, 115);

    buttonState("j");
    ctx.strokeRect(262, 30, 36, 90);
    ctx.fillText("J", 272, 85);

    buttonState("k");
    ctx.strokeRect(302, 20, 36, 90);
    ctx.fillText("K", 310, 75);

    buttonState("l");
    ctx.strokeRect(342, 30, 36, 90);
    ctx.fillText("L", 350, 85);

    buttonState(";");
    ctx.strokeRect(382, 40, 36, 90);
    ctx.fillText(";", 394, 95);

    //Right Auxillary --------------
    ctx.strokeRect(200, 160, 60, 36);
    ctx.fillText("n/a", 204, 190);
    ctx.strokeRect(200, 200, 60, 36);
    ctx.fillText("n/a", 204, 230);
    ctx.strokeRect(200, 240, 60, 36);
    ctx.fillText("n/a", 204, 270);
  }

  window.addEventListener('keydown', function(event) {
    var eventVal = event.key || String.fromCharCode(event.keyCode).toLowerCase();
    buttonStates[eventVal] = true;
    requestAnimationFrame(draw);
  });

  window.addEventListener('keyup', function(event) {
    var eventVal = event.key || String.fromCharCode(event.keyCode).toLowerCase();
    buttonStates[eventVal] = false;
    requestAnimationFrame(draw);
  });

  requestAnimationFrame(draw);

}());
