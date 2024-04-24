(()=>{var e={155:e=>{document.getElementById("canvas-container");const t=document.getElementById("console-display"),n=t.getContext("2d");let o={};e.exports={updateState(e){o=Object.assign(o,e)},clearState(){o={}},render(e){requestAnimationFrame((()=>function(e){n.font="30px Poiret One",n.fillStyle="#340f20",n.clearRect(0,0,t.width,t.height);for(let t=0;t<e.length;++t)a=e[t],n.strokeStyle="#340f20",o[a.boundKey]&&(n.strokeStyle="#ff0000"),n.strokeRect(...a.buttonBounds),n.fillText(a.displayName,...a.textBounds);var a}(e)))}}},626:e=>{let t;const n={};function o(e,t,n){const o=e.createOscillator();o.type="sawtooth",o.frequency.value=110,o.start();const a=e.createBiquadFilter();a.type="bandpass",a.frequency.value=(t+n)/2,a.Q.value=(t+n)/2/(n-t);const i=e.createGain();return i.gain.value=0,o.connect(a),a.connect(i),i.connect(e.destination),{start(){i.gain.setTargetAtTime(.75,e.currentTime,.015)},stop(){i.gain.setTargetAtTime(0,e.currentTime,.015)},panic(){i.gain.cancelScheduledValues(e.currentTime),i.gain.setTargetAtTime(0,e.currentTime,.015)}}}e.exports={initialize:function(){t=new(window.AudioContext||window.webkitAudioContext),n.a=o(t,0,225),n.s=o(t,225,450),n.d=o(t,450,700),n.f=o(t,700,1e3),n.v=o(t,1e3,1400),n.b=o(t,1400,2e3),n.h=o(t,2e3,2700),n.j=o(t,2700,3800),n.k=o(t,3800,5400),n.l=o(t,5400,7500),n[" "]=function(e){const t=e.createBuffer(1,8192,e.sampleRate),n=t.getChannelData(0);for(let e=0;e<8192;++e)n[e]=Math.random();const o=e.createBufferSource();o.buffer=t,o.loop=!0;const a=e.createBiquadFilter();a.type="bandpass",a.frequency.value=5e3,a.Q.value=.5;const i=e.createGain();return i.gain.value=0,o.connect(a),a.connect(i),i.connect(e.destination),o.start(),{start(){i.gain.setTargetAtTime(.75,e.currentTime,.015)},stop(){i.gain.setTargetAtTime(0,e.currentTime,.015)},panic(){i.gain.cancelScheduledValues(e.currentTime),i.gain.setTargetAtTime(0,e.currentTime,.015)}}}(t)},updateState(e){const[t]=Object.keys(e);e[t]?n[t]&&n[t].start():n[t]&&n[t].stop()},clearState(){Object.keys(n).forEach((e=>n[e].panic()))}}}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var o=t.getElementsByTagName("script");if(o.length)for(var a=o.length-1;a>-1&&(!e||!/^http(s?):/.test(e));)e=o[a--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{"use strict";var e=n(626),t=n.n(e),o=n(155),a=n.n(o);const i=[{boundKey:"a",displayName:"A",hitRegionName:"band0",buttonBounds:[0,.1,.08,.45],textBounds:[.015,.35]},{boundKey:"s",displayName:"S",hitRegionName:"band1",buttonBounds:[.1,.05,.08,.45],textBounds:[.125,.3]},{boundKey:"d",displayName:"D",hitRegionName:"band2",buttonBounds:[.2,0,.08,.45],textBounds:[.225,.25]},{boundKey:"f",displayName:"F",hitRegionName:"band3",buttonBounds:[.3,.05,.08,.45],textBounds:[.33,.3]},{boundKey:"v",displayName:"V",hitRegionName:"band4",buttonBounds:[.4,.1,.08,.45],textBounds:[.42,.35]},{boundKey:" ",displayName:"Space",hitRegionName:"noise_band",buttonBounds:[.1,.8,.3,.15],textBounds:[.175,.9]},{boundKey:"b",displayName:"B",hitRegionName:"band5",buttonBounds:[.52,.1,.08,.45],textBounds:[.55,.35]},{boundKey:"h",displayName:"H",hitRegionName:"band6",buttonBounds:[.62,.05,.08,.45],textBounds:[.6425,.3]},{boundKey:"j",displayName:"J",hitRegionName:"band7",buttonBounds:[.72,0,.08,.45],textBounds:[.7455,.25]},{boundKey:"k",displayName:"K",hitRegionName:"band8",buttonBounds:[.82,.05,.08,.45],textBounds:[.845,.3]},{boundKey:"l",displayName:"L",hitRegionName:"band9",buttonBounds:[.92,.1,.08,.45],textBounds:[.9525,.35]}],r=(n.p,n.p,n.p,n.p,n.p,document.getElementById("canvas-container")),d=document.getElementById("console-display");let u={},s=[];function c(){d.width=r.clientWidth,d.height=r.clientHeight,s=i.map((e=>{const t=r.clientWidth,n=r.clientHeight,[o,a,i,d]=e.buttonBounds,[u,s]=e.textBounds;return Object.assign({},e,{buttonBounds:[o*t,a*n,i*t,d*n],textBounds:[u*t,s*n]})})),a().render(s)}window.addEventListener("resize",c,!1),window.addEventListener("orientationchange",c,!1),c(),window.addEventListener("keydown",(function(e){e.target===document.body&&e.preventDefault();const n=e.key||String.fromCharCode(e.keyCode).toLowerCase();t().updateState({[n]:!0}),a().updateState({[n]:!0}),a().render(s)})),window.addEventListener("keyup",(function(e){e.target===document.body&&e.preventDefault();const n=e.key||String.fromCharCode(e.keyCode).toLowerCase();t().updateState({[n]:!1}),a().updateState({[n]:!1}),a().render(s)})),d.addEventListener("mousedown",(function(e){})),d.addEventListener("mouseup",(function(e){})),d.addEventListener("touchstart",(function(e){const n=d.getBoundingClientRect();for(let o=0;o<e.touches.length;++o){const i=(e.touches[o].clientX-n.left)*(d.width/n.width),r=(e.touches[o].clientY-n.top)*(d.height/n.height);for(let n=0;n<s.length;++n){const[d,c,l,p]=s[n].buttonBounds;i>=d&&i<=d+l&&r>=c&&r<=c+p&&(u[e.touches[o].identifier]=s[n].boundKey,t().updateState({[s[n].boundKey]:!0}),a().updateState({[s[n].boundKey]:!0}),a().render(s))}}})),d.addEventListener("touchend",(function(e){for(let n=0;n<e.changedTouches.length;++n)t().updateState({[u[e.changedTouches[n].identifier]]:!1}),a().updateState({[u[e.changedTouches[n].identifier]]:!1}),a().render(s),u[e.changedTouches[n].identifier]=""})),d.addEventListener("touchcancel",(function(e){u={},t().clearState(),a().clearState(),a().render(s)})),document.querySelector("#start-audio-btn").addEventListener("click",(function(){t().initialize(),document.querySelector("#start-audio-overlay").style="animation-name: disappear;"})),document.querySelector("#start-audio-overlay").addEventListener("animationend",(function(){this.remove()})),d.addEventListener("contextmenu",(function(e){return e.preventDefault(),e.stopPropagation(),!1})),setTimeout((()=>a().render(s)),1e3)})()})();