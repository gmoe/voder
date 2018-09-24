const canvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('console-display');
const ctx = canvas.getContext('2d');

const fillColor = '#340f20';
const activeFillColor = '';
const activeBorderCOlor = '';

let buttonsPressed = {};

function renderButton(button) {
  ctx.strokeStyle = "#340f20";
  if (buttonsPressed[button.boundKey]) {
    ctx.strokeStyle = "#ff0000";
  }
  ctx.strokeRect(...button.buttonBounds);
  ctx.fillText(button.displayName, ...button.textBounds);
}

function renderConsole(buttons) {
  ctx.font = "30px Poiret One";
  ctx.fillStyle = "#340f20";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < buttons.length; ++i) {
    renderButton(buttons[i]);
  }
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
