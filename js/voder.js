"use strict";
(function () {

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function makeFormant(f1, f2) {

    const sinOsc = audioCtx.createOscillator();
    sinOsc.type = "sawtooth";
    sinOsc.frequency.value = 110;
    sinOsc.start();

    const bandPass = audioCtx.createBiquadFilter();
    bandPass.type = "bandpass";
    bandPass.frequency.value = (f1+f2)/2;
    bandPass.Q.value = ((f1+f2)/2) / (f2-f1);

    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.0;

    sinOsc.connect(bandPass);
    bandPass.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    return gainNode;
  }

  const formants = {};
  formants["a"] = makeFormant(0, 225);
  formants["s"] = makeFormant(225, 450);
  formants["d"] = makeFormant(450, 700);
  formants["f"] = makeFormant(700, 1000);
  formants["v"] = makeFormant(1000, 1400);
  formants["b"] = makeFormant(1400, 2000);
  formants["h"] = makeFormant(2000, 2700);
  formants["j"] = makeFormant(2700, 3800);
  formants["k"] = makeFormant(3800, 5400);
  formants["l"] = makeFormant(5400, 7500);

  const noise = audioCtx.createBufferSource();
  const buffer = audioCtx.createBuffer(1, 8192, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  for(let i=0; i < 8192; i++) {
    data[i] = Math.random();
  }
  data[0] = (data[0] + data[8191]) / 2;

  noise.buffer = buffer;
  noise.loop = true;

  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 5000;
  noiseFilter.Q.value = 0.5;

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.value = 0.0;

  formants[" "] = noiseGain;

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);
  noise.start(0);

  window.addEventListener('keydown', function(event) {
    Object.keys(formants).map((key) => {
      if(event.target === document.body) event.preventDefault();
      const eventVal = event.key || String.fromCharCode(event.keyCode).toLowerCase();
      if(eventVal === key) {
        formants[key].gain.setTargetAtTime(0.75, audioCtx.currentTime, 0.015);
      }
    });
  });

  window.addEventListener('keyup', function(event) {
    Object.keys(formants).map((key) => {
      if(event.target === document.body) event.preventDefault();
      const eventVal = event.key || String.fromCharCode(event.keyCode).toLowerCase();
      if(eventVal === key) {
        formants[key].gain.setTargetAtTime(0, audioCtx.currentTime, 0.015);
      }
    });
  });
  
}());
