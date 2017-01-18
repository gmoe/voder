(function () {
  "use strict";

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function makeFormant(f1, f2) {

    var sinOsc = audioCtx.createOscillator();
    sinOsc.type = "sawtooth";
    sinOsc.frequency.value = 220;
    sinOsc.start();

    var bandPass = audioCtx.createBiquadFilter();
    bandPass.type = "bandpass";
    bandPass.frequency.value = (f1+f2)/2;
    bandPass.Q.value = ((f1+f2)/2) / (f2-f1);

    var gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.0;

    sinOsc.connect(bandPass);
    bandPass.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    return gainNode;
  }

  var formants = {};
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

  var noise = audioCtx.createBufferSource();
  var buffer = audioCtx.createBuffer(1, 8192, audioCtx.sampleRate);
  var data = buffer.getChannelData(0);

  for(var i=0; i < 8192; i++) {
    data[i] = Math.random();
  }
  data[0] = (data[0] + data[8191]) / 2;

  noise.buffer = buffer;
  noise.loop = true;

  var noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 5000;
  noiseFilter.Q.value = 0.5;

  var noiseGain = audioCtx.createGain();
  noiseGain.gain.value = 0.0;

  formants[" "] = noiseGain;

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);
  noise.start(0);

  window.addEventListener('keydown', function(event) {
    for(var key in formants) {
      if(event.target == document.body) event.preventDefault();
      var eventVal = event.key || String.fromCharCode(event.keyCode).toLowerCase();
      if(eventVal == key) { formants[key].gain.value = 0.75; }
    }
  });

  window.addEventListener('keyup', function(event) {
    for(var key in formants) {
      if(event.target == document.body) event.preventDefault();
      var eventVal = event.key || String.fromCharCode(event.keyCode).toLowerCase();
      if(eventVal == key) formants[key].gain.value = 0.0;
    }
  });
  
}());
