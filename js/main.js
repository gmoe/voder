const buttonLayout = require('./buttons.json').buttons;
const Synthesis = require( "./synthesis.js");
const VoderConsole = require("./consoleDisplay.js");

const canvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('console-display');
let touchPointButtonMap = {};

function resizeCanvas() {
  canvas.width = canvasContainer.clientWidth;
  canvas.height = canvasContainer.clientHeight;
  VoderConsole.render(buttonLayout);
}

window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);

window.addEventListener('keydown', function(event) {
  if (event.target === document.body) event.preventDefault();
  const eventKey = event.key || String.fromCharCode(event.keyCode).toLowerCase();
  Synthesis.updateState({ [eventKey]: true });
  VoderConsole.updateState({ [eventKey]: true });
  VoderConsole.render(buttonLayout);
});

window.addEventListener('keyup', function(event) {
  if (event.target === document.body) event.preventDefault();
  const eventKey = event.key || String.fromCharCode(event.keyCode).toLowerCase();
  Synthesis.updateState({ [eventKey]: false });
  VoderConsole.updateState({ [eventKey]: false });
  VoderConsole.render(buttonLayout);
});

canvas.addEventListener('mousedown', function(event) {
});

canvas.addEventListener('mouseup', function(event) {
});

canvas.addEventListener('touchstart', function(event) {
  const rect = canvas.getBoundingClientRect();
  for (let i = 0; i < event.touches.length; ++i) {
    for (let j = 0; j < buttonLayout.length; ++j) {
      const [btnX, btnY, btnWidth, btnHeight] = buttonLayout[j].buttonBounds;
      const touchX = event.touches[i].clientX - rect.left;
      const touchY = event.touches[i].clientY - rect.top;
      console.log(`btnX: ${btnX}, btnY: ${btnY}, btnW: ${btnWidth}, btnH: ${btnHeight}, tX: ${touchX}, tY: ${touchY}`);
      if ((touchX >= btnX && touchX <= btnX + btnWidth)
        && (touchY >= btnY && touchY <= btnY + btnHeight)) {
        touchPointButtonMap[event.touches[i].identifier] = buttonLayout[j].boundKey;
        buttonsPressed[buttonLayout[j].boundKey] = true;
      }
    }
  }
  requestAnimationFrame(renderConsole);
});

canvas.addEventListener('touchend', function(event) {
  for (let i = 0; i < event.changedTouches.length; ++i) {
    buttonsPressed[touchPointButtonMap[event.changedTouches[i].identifier]] = false;
    touchPointButtonMap[event.changedTouches[i].identifier] = '';
  }
  requestAnimationFrame(renderConsole);
});

canvas.addEventListener('touchcancel', function(event) {
  touchPointButtonMap = {};
  buttonsPressed = {};
  requestAnimationFrame(renderConsole);
});

document.querySelector('#start-audio-btn').addEventListener('click', function() {
  Synthesis.initialize();
  VoderConsole.render(buttonLayout);
  document.querySelector('#start-audio-overlay').style = 'animation-name: disappear;';
});

document.querySelector('#start-audio-overlay').addEventListener('animationend', function() {
  this.remove();
});

// Re-render after font file loads
setTimeout(() => VoderConsole.render(buttonLayout), 1000);
