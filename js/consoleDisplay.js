"use strict";
(function() {

  const canvas = document.getElementById("console-display");
  const ctx = canvas.getContext("2d");

  const buttonStates = {};
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
    try {
      ctx.addHitRegion({ id: 'band0' });
    } catch(e) {}
    ctx.fillText("A", 8, 95);

    buttonState("s");
    ctx.strokeRect(42, 30, 36, 90);
    try {
      ctx.addHitRegion({ id: 'band1' });
    } catch(e) {}
    ctx.fillText("S", 52, 85);

    buttonState("d");
    ctx.strokeRect(82, 20, 36, 90);
    try {
      ctx.addHitRegion({ id: 'band2' });
    } catch(e) {}
    ctx.fillText("D", 92, 75);

    buttonState("f");
    ctx.strokeRect(122, 30, 36, 90);
    try {
      ctx.addHitRegion({ id: 'band3' });
    } catch(e) {}
    ctx.fillText("F", 134, 85);

    buttonState("v");
    ctx.strokeRect(162, 60, 36, 90);
    try {
      ctx.addHitRegion({ id: 'band4' });
    } catch(e) {}
    ctx.fillText("V", 168, 115);

    //Left Wrist -------------------
    buttonState(" ");
    ctx.strokeRect(42, 240, 120, 36);
    try {
      ctx.addHitRegion({ id: 'noise_band' });
    } catch(e) {}
    ctx.fillText("Space", 54, 268);

    //Right Hand -------------------
    buttonState("b");
    ctx.strokeRect(222, 60, 36, 90);
    try {
      ctx.addHitRegion({ id: 'band5' });
    } catch(e) {}
    ctx.fillText("B", 234, 115);

    buttonState("h");
    ctx.strokeRect(262, 30, 36, 90);
    try {
      ctx.addHitRegion({ id: 'band6' });
    } catch(e) {}
    ctx.fillText("H", 269, 85);

    buttonState("j");
    ctx.strokeRect(302, 20, 36, 90);
    try {
      ctx.addHitRegion({ id: 'band7' });
    } catch(e) {}
    ctx.fillText("J", 312, 75);

    buttonState("k");
    ctx.strokeRect(342, 30, 36, 90);
    try {
      ctx.addHitRegion({ id: 'band8' });
    } catch(e) {}
    ctx.fillText("K", 352, 85);

    buttonState("l");
    ctx.strokeRect(382, 40, 36, 90);
    try {
      ctx.addHitRegion({ id: 'band9' });
    } catch(e) {}
    ctx.fillText("L", 394, 95);
  }

  window.addEventListener('keydown', function(event) {
    if(event.target === document.body) event.preventDefault();
    const eventVal = event.key || String.fromCharCode(event.keyCode).toLowerCase();
    buttonStates[eventVal] = true;
    requestAnimationFrame(draw);
  });

  window.addEventListener('keyup', function(event) {
    if(event.target === document.body) event.preventDefault();
    const eventVal = event.key || String.fromCharCode(event.keyCode).toLowerCase();
    buttonStates[eventVal] = false;
    requestAnimationFrame(draw);
  });

  // Wait for font file to load
  setTimeout(function() {
    requestAnimationFrame(draw);
  }, 1000);

}());
