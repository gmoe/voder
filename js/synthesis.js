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
