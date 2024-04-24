const canvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('console-display');
const ctx = canvas.getContext('2d');

const FILL_COLOR = '#340f20';
const ACTIVE_STROKE_COLOR = '#b14c6c';
const ACTIVE_FILL_COLOR = '#b14c6c09';

let buttonsPressed = {};

function renderButton(button) {
  ctx.lineJoin = 'round';
  ctx.lineWidth = 3;
  ctx.strokeStyle = FILL_COLOR;

  if (buttonsPressed[button.boundKey]) {
    ctx.fillStyle = ACTIVE_FILL_COLOR;
    ctx.strokeStyle = ACTIVE_STROKE_COLOR;
    ctx.fillRect(...button.buttonBounds);
  }

  ctx.strokeRect(...button.buttonBounds);

  ctx.fillStyle = FILL_COLOR;
  ctx.fillText(button.displayName, ...button.textBounds);
}

function renderConsole(buttons) {
  ctx.font = `bold ${Math.floor(ctx.canvas.width / 40)}px Poiret One`;
  ctx.fillStyle = FILL_COLOR;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  buttons.forEach(renderButton);
}

module.exports = {
  updateState(changes) {
    buttonsPressed = Object.assign(buttonsPressed, changes);
  },
  clearState() {
    buttonsPressed = {};
  },
  render(buttonLayout) {
    requestAnimationFrame(() => renderConsole(buttonLayout));
  },
};
