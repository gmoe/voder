(function () {
  "use strict";

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function makeFormant(freq) {

    var sinOsc = audioCtx.createOscillator();
    sinOsc.type = "sawtooth";
    sinOsc.frequency.value = 220;
    sinOsc.start();

    var bandPass = audioCtx.createBiquadFilter();
    bandPass.type = "bandpass";
    bandPass.frequency.value = freq;
    bandPass.Q.value = 4.0;

    var gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.0;

    sinOsc.connect(bandPass);
    bandPass.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    return gainNode;
  }

  var formants = {};
  formants["a"] = makeFormant(225);
  formants["s"] = makeFormant(450);
  formants["d"] = makeFormant(700);
  formants["f"] = makeFormant(1000);
  formants["v"] = makeFormant(1400);
  formants["n"] = makeFormant(2000);
  formants["j"] = makeFormant(2700);
  formants["k"] = makeFormant(3800);
  formants["l"] = makeFormant(5400);
  formants[";"] = makeFormant(7500);

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
      var eventVal = event.key || String.fromCharCode(event.keyCode).toLowerCase();
      if(eventVal == key) {
        formants[key].gain.value = 0.75;
      }
    }
  });

  window.addEventListener('keyup', function(event) {
    for(var key in formants) {
      var eventVal = event.key || String.fromCharCode(event.keyCode).toLowerCase();
      if(eventVal == key) {
        formants[key].gain.value = 0.0;
      }
    }
  });
  
}());
