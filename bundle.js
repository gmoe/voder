(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
  "buttons": [
    {
      "boundKey": "a",
      "displayName": "A",
      "hitRegionName": "band0",
      "buttonBounds": [0, 0.1, 0.08, 0.45],
      "textBounds": [0.015, 0.35]
    },
    {
      "boundKey": "s",
      "displayName": "S",
      "hitRegionName": "band1",
      "buttonBounds": [0.1, 0.05, 0.08, 0.45],
      "textBounds": [0.125, 0.3]
    },
    {
      "boundKey": "d",
      "displayName": "D",
      "hitRegionName": "band2",
      "buttonBounds": [0.2, 0, 0.08, 0.45],
      "textBounds": [0.225, 0.25]
    },
    {
      "boundKey": "f",
      "displayName": "F",
      "hitRegionName": "band3",
      "buttonBounds": [0.3, 0.05, 0.08, 0.45],
      "textBounds": [0.33, 0.3]
    },
    {
      "boundKey": "v",
      "displayName": "V",
      "hitRegionName": "band4",
      "buttonBounds": [0.4, 0.1, 0.08, 0.45],
      "textBounds": [0.42, 0.35]
    },
    {
      "boundKey": " ",
      "displayName": "Space",
      "hitRegionName": "noise_band",
      "buttonBounds": [0.1, 0.8, 0.3, 0.15],
      "textBounds": [0.175, 0.9]
    },
    {
      "boundKey": "b",
      "displayName": "B",
      "hitRegionName": "band5",
      "buttonBounds": [0.52, 0.1, 0.08, 0.45],
      "textBounds": [0.55, 0.35]
    },
    {
      "boundKey": "h",
      "displayName": "H",
      "hitRegionName": "band6",
      "buttonBounds": [0.62, 0.05, 0.08, 0.45],
      "textBounds": [0.6425, 0.3]
    },
    {
      "boundKey": "j",
      "displayName": "J",
      "hitRegionName": "band7",
      "buttonBounds": [0.72, 0, 0.08, 0.45],
      "textBounds": [0.7455, 0.25]
    },
    {
      "boundKey": "k",
      "displayName": "K",
      "hitRegionName": "band8",
      "buttonBounds": [0.82, 0.05, 0.08, 0.45],
      "textBounds": [0.845, 0.3]
    },
    {
      "boundKey": "l",
      "displayName": "L",
      "hitRegionName": "band9",
      "buttonBounds": [0.92, 0.1, 0.08, 0.45],
      "textBounds": [0.9525, 0.35]
    }
  ]
}

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
const Synthesis = require( "./synthesis.js");
const VoderConsole = require("./consoleDisplay.js");
const Buttons = require('./buttons.json').buttons;

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
    return Object.assign({}, button, {
      buttonBounds: [x * wRatio, y * hRatio, w * wRatio, h * hRatio],
      textBounds: [tX * wRatio, tY * hRatio],
    });
  });
  VoderConsole.render(buttonLayout);
}

window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);
resizeCanvas();

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
    const touchX = (event.touches[i].clientX - rect.left) * (canvas.width / rect.width);
    const touchY = (event.touches[i].clientY - rect.top) * (canvas.height / rect.height);;
    for (let j = 0; j < buttonLayout.length; ++j) {
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

canvas.addEventListener('touchend', function(event) {
  for (let i = 0; i < event.changedTouches.length; ++i) {
    Synthesis.updateState({ [touchPointButtonMap[event.changedTouches[i].identifier] ]: false });
    VoderConsole.updateState({ [touchPointButtonMap[event.changedTouches[i].identifier] ]: false });
    VoderConsole.render(buttonLayout);
    touchPointButtonMap[event.changedTouches[i].identifier] = '';
  }
});

canvas.addEventListener('touchcancel', function(event) {
  touchPointButtonMap = {};
  Synthesis.clearState();
  VoderConsole.clearState();
  VoderConsole.render(buttonLayout);
});

document.querySelector('#start-audio-btn').addEventListener('click', function() {
  Synthesis.initialize();
  document.querySelector('#start-audio-overlay').style = 'animation-name: disappear;';
});

document.querySelector('#start-audio-overlay').addEventListener('animationend', function() {
  this.remove();
});

// Disable long-press context menu on canvas
canvas.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
});

// Re-render after font file loads
setTimeout(() => VoderConsole.render(buttonLayout), 1000);

},{"./buttons.json":1,"./consoleDisplay.js":2,"./synthesis.js":4}],4:[function(require,module,exports){
const NOISE_BUFFER_SIZE = 8192;

let audioCtx;
const audioNodes = {};

function makeFormantNode(ctx, f1, f2) {
  const sinOsc = ctx.createOscillator();
  sinOsc.type = 'sawtooth';
  sinOsc.frequency.value = 110;
  sinOsc.start();

  const bandPass = ctx.createBiquadFilter();
  bandPass.type = 'bandpass';
  bandPass.frequency.value = (f1 + f2) / 2;
  bandPass.Q.value = ((f1 + f2) / 2) / (f2 - f1);

  const gainNode = ctx.createGain();
  gainNode.gain.value = 0.0;

  sinOsc.connect(bandPass);
  bandPass.connect(gainNode);
  gainNode.connect(ctx.destination);

  return {
    start() {
      gainNode.gain.setTargetAtTime(0.75, ctx.currentTime, 0.015);
    },
    stop() {
      gainNode.gain.setTargetAtTime(0.0, ctx.currentTime, 0.015);
    },
    panic() {
      gainNode.gain.cancelScheduledValues(ctx.currentTime);
      gainNode.gain.setTargetAtTime(0, ctx.currentTime, 0.015);
    },
  };
}

function makeSibilanceNode(ctx) {
  const buffer = ctx.createBuffer(1, NOISE_BUFFER_SIZE, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < NOISE_BUFFER_SIZE; ++i) {
    data[i] = Math.random();
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 5000;
  noiseFilter.Q.value = 0.5;

  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.0;

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start();

  return {
    start() {
      noiseGain.gain.setTargetAtTime(0.75, ctx.currentTime, 0.015);
    },
    stop() {
      noiseGain.gain.setTargetAtTime(0.0, ctx.currentTime, 0.015);
    },
    panic() {
      noiseGain.gain.cancelScheduledValues(ctx.currentTime);
      noiseGain.gain.setTargetAtTime(0, ctx.currentTime, 0.015);
    },
  };
}

function initialize() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  audioNodes['a'] = makeFormantNode(audioCtx, 0, 225);
  audioNodes['s'] = makeFormantNode(audioCtx, 225, 450);
  audioNodes['d'] = makeFormantNode(audioCtx, 450, 700);
  audioNodes['f'] = makeFormantNode(audioCtx, 700, 1000);
  audioNodes['v'] = makeFormantNode(audioCtx, 1000, 1400);
  audioNodes['b'] = makeFormantNode(audioCtx, 1400, 2000);
  audioNodes['h'] = makeFormantNode(audioCtx, 2000, 2700);
  audioNodes['j'] = makeFormantNode(audioCtx, 2700, 3800);
  audioNodes['k'] = makeFormantNode(audioCtx, 3800, 5400);
  audioNodes['l'] = makeFormantNode(audioCtx, 5400, 7500);
  audioNodes[' '] = makeSibilanceNode(audioCtx);
}

module.exports = {
  initialize,
  updateState(changes) {
    const [key] = Object.keys(changes);
    if (changes[key]) {
      audioNodes[key] && audioNodes[key].start();
    } else {
      audioNodes[key] && audioNodes[key].stop();
    }
  },
  clearState() {
    Object.keys(audioNodes).forEach(node => audioNodes[node].panic());
  },
};

},{}]},{},[3]);
