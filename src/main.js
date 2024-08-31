import Synthesis from './synthesis';
import VoderConsole from './consoleDisplay';
import Buttons from './buttons';

import '../scss/styles.scss';
// Copy over images to build folder
import '../img/favicon.ico';
import '../img/favicon-152.png';
import '../img/favicon-144.png';
import '../img/logo_final.svg';
import '../img/console_operator.svg';

const canvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('console-display');
let touchPointButtonMap = {};
let buttonLayout = [];

function resizeCanvas() {
  canvas.width = canvasContainer.clientWidth;
  canvas.height = canvasContainer.clientHeight;
  buttonLayout = Buttons.map((button) => {
    const wRatio = canvasContainer.clientWidth;
    const hRatio = canvasContainer.clientHeight;
    const [x, y, w, h] = button.buttonBounds;
    const [tX, tY] = button.textBounds;
    return {
      ...button,
      buttonBounds: [x * wRatio, y * hRatio, w * wRatio, h * hRatio],
      textBounds: [tX * wRatio, tY * hRatio],
    };
  });
  VoderConsole.render(buttonLayout);
}

window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);
resizeCanvas();

window.addEventListener('keydown', (event) => {
  if (event.target === document.body) event.preventDefault();
  const eventKey = event.key || String.fromCharCode(event.keyCode).toLowerCase();
  Synthesis.updateState({ [eventKey]: true });
  VoderConsole.updateState({ [eventKey]: true });
  VoderConsole.render(buttonLayout);
});

window.addEventListener('keyup', (event) => {
  if (event.target === document.body) event.preventDefault();
  const eventKey = event.key || String.fromCharCode(event.keyCode).toLowerCase();
  Synthesis.updateState({ [eventKey]: false });
  VoderConsole.updateState({ [eventKey]: false });
  VoderConsole.render(buttonLayout);
});

canvas.addEventListener('touchstart', (event) => {
  const rect = canvas.getBoundingClientRect();
  for (let i = 0; i < event.touches.length; i += 1) {
    const touchX = (event.touches[i].clientX - rect.left) * (canvas.width / rect.width);
    const touchY = (event.touches[i].clientY - rect.top) * (canvas.height / rect.height);
    for (let j = 0; j < buttonLayout.length; j += 1) {
      const [btnX, btnY, btnWidth, btnHeight] = buttonLayout[j].buttonBounds;
      if ((touchX >= btnX && touchX <= btnX + btnWidth)
        && (touchY >= btnY && touchY <= btnY + btnHeight)) {
        touchPointButtonMap[event.touches[i].identifier] = buttonLayout[j].boundKey;
        Synthesis.updateState({ [buttonLayout[j].boundKey]: true });
        VoderConsole.updateState({ [buttonLayout[j].boundKey]: true });
        VoderConsole.render(buttonLayout);
      }
    }
  }
});

canvas.addEventListener('touchend', (event) => {
  for (let i = 0; i < event.changedTouches.length; i += 1) {
    Synthesis.updateState({ [touchPointButtonMap[event.changedTouches[i].identifier]]: false });
    VoderConsole.updateState({ [touchPointButtonMap[event.changedTouches[i].identifier]]: false });
    VoderConsole.render(buttonLayout);
    touchPointButtonMap[event.changedTouches[i].identifier] = '';
  }
});

canvas.addEventListener('touchcancel', () => {
  touchPointButtonMap = {};
  Synthesis.clearState();
  VoderConsole.clearState();
  VoderConsole.render(buttonLayout);
});

document.querySelector('#start-audio-btn').addEventListener('click', () => {
  Synthesis.initialize();
  document.querySelector('#start-audio-overlay').style = 'animation-name: disappear;';
});

document.querySelector('#start-audio-overlay').addEventListener('animationend', (event) => {
  event.target.remove();
});

// Disable long-press context menu on canvas
canvas.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  event.stopPropagation();
  return false;
});

// Re-render after font file loads
const poiretOneFont = new FontFace(
  'Poiret One',
  `url(${__webpack_public_path__}/assets/PoiretOne-Regular.woff)`,
);
poiretOneFont.load().then(() => {
  VoderConsole.render(buttonLayout);
});
