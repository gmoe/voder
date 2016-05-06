(function () {
  "use strict";

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function makeFormant(buttonEle, keyPress, freq) {
    var button = document.getElementById(buttonEle);

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


    function muteOff() {
      gainNode.gain.value = 0.75;
    }

    function mute() {
      gainNode.gain.value = 0.0;
    }

    button.onmousedown = muteOff;
    button.onmouseup = mute;
    window.addEventListener('keydown', function(event) { if(event.key == keyPress) muteOff() } );
    window.addEventListener('keyup', function(event) { if(event.key == keyPress) mute() } );
  }

  makeFormant("button1", "a", 225);
  makeFormant("button2", "s", 450);
  makeFormant("button3", "d", 700);
  makeFormant("button4", "f", 1000);
  makeFormant("button5", "v", 1400);
  makeFormant("button6", "n", 2000);
  makeFormant("button7", "j", 2700);
  makeFormant("button8", "k", 3800);
  makeFormant("button9", "l", 5400);
  makeFormant("button10", ";", 7500);

  var noise = audioCtx.createBufferSource();
  var buffer = audioCtx.createBuffer(1, 8192, audioCtx.sampleRate);
  var data = buffer.getChannelData(0);

  for(var i=0; i < 8192; i++) {
    data[i] = Math.random();
  }

  noise.buffer = buffer;
  noise.loop = true;

  var noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = "lowpass";
  noiseFilter.frequency.value = 4000;
  noiseFilter.Q.value = 1;

  var noiseGain = audioCtx.createGain();
  noiseGain.gain.value = 0.0;

  function noiseMute() {
    noiseGain.gain.value = 0.0;
  }

  function noiseMuteOff() {
    noiseGain.gain.value = 0.75;
  }

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);
  noise.start(0);

  var noiseButton = document.getElementById("noise");
  noiseButton.onmousedown = noiseMuteOff;
  noiseButton.onmouseup = noiseMute;
  window.addEventListener('keydown', function(event) { if(event.key == " ") noiseMuteOff() } );
  window.addEventListener('keyup', function(event) { if(event.key == " ") noiseMute() } );
  
}());
