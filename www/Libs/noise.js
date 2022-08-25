var supportsES6 = (function () {
  try {
    new Function("(a = 0) => a");
    return true;
  } catch (err) {
    return false;
  }
})();

// Standard Normal variate using Box-Muller transform.
function randn_bm() {
  var u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Web Audio API - White noise, generate, play (volume, fadeIn, fadeOut, loop), stop, fade - v1.0 MJF @ websemantics.uk
//*
var Noise = (function () {
  "use strict";
  if (!supportsES6) {
    return;
  }

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  let fadeOutTimer;

  // https://noisehack.com/generate-noise-web-audio-api/
  function createNoise(track) {
    const bufferSize = 2 * audioContext.sampleRate;
    const noiseBuffer = audioContext.createBuffer(
      1,
      bufferSize,
      audioContext.sampleRate
    );
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      //output[i] = Math.random() * 2 - 1;
      output[i] = 50 * randn_bm();
    }

    track.audioSource.buffer = noiseBuffer;
  }

  function createColoredNoise(track) {
    const bufferSize = 2 * audioContext.sampleRate;
    const noiseBuffer = audioContext.createBuffer(
      1,
      bufferSize,
      audioContext.sampleRate
    );
    const output = noiseBuffer.getChannelData(0);

    const dt = 1 / audioContext.sampleRate;

    output[0] = 0;

    for (let i = 1; i < bufferSize; i++) {
      //output[i] = Math.random() * 2 - 1;
      //output[i] = 50 * randn_bm();
      output[i] =
        (1 - dt / track.tau) * output[i - 1] +
        50 * Math.sqrt((2 * dt) / track.tau) * randn_bm();
    }

    track.audioSource.buffer = noiseBuffer;
  }

  function stopNoise(track) {
    if (track.audioSource) {
      clearTimeout(fadeOutTimer);
      track.audioSource.stop();
    }
  }

  function fadeNoise(track) {
    if (track.fadeOut) {
      track.fadeOut = track.fadeOut >= 0 ? track.fadeOut : 0.5;
    } else {
      track.fadeOut = 0.5;
    }

    if (track.canFade) {
      track.gainNode.gain.linearRampToValueAtTime(
        0,
        audioContext.currentTime + track.fadeOut
      );

      track.canFade = false;

      fadeOutTimer = setTimeout(() => {
        stopNoise(track);
      }, track.fadeOut * 1000);
    } else {
      stopNoise(track);
    }
  }

  function buildTrack(track) {
    track.audioSource = audioContext.createBufferSource();
    track.gainNode = audioContext.createGain();
    track.audioSource.connect(track.gainNode);
    track.gainNode.connect(audioContext.destination);
    track.canFade = true; // used to prevent fadeOut firing twice
  }

  function setGain(track) {
    track.volume = track.volume >= 0 ? track.volume : 0.5;

    if (track.fadeIn) {
      track.fadeIn = track.fadeIn >= 0 ? track.fadeIn : 0.5;
    } else {
      track.fadeIn = 0.5;
    }

    track.gainNode.gain.setValueAtTime(0, audioContext.currentTime);

    track.gainNode.gain.linearRampToValueAtTime(
      track.volume / 4,
      audioContext.currentTime + track.fadeIn / 2
    );

    track.gainNode.gain.linearRampToValueAtTime(
      track.volume,
      audioContext.currentTime + track.fadeIn
    );
  }

  function playNoise(track) {
    stopNoise(track);
    buildTrack(track);
    //createNoise(track);
    createColoredNoise(track);
    setGain(track);
    track.audioSource.loop = true;
    track.audioSource.start();
  }

  // Expose functions:
  return {
    play: playNoise,
    stop: stopNoise,
    fade: fadeNoise,
  };
})();
//*/

/*
var Noise=function(){function d(a){a.audioSource&&(clearTimeout(c),a.audioSource.stop())}if(supportsES6){var b=new (window.AudioContext||window.webkitAudioContext),c;return{play:function(a){d(a);a.audioSource=b.createBufferSource();a.gainNode=b.createGain();a.audioSource.connect(a.gainNode);a.gainNode.connect(b.destination);a.canFade=!0;for(var c=2*b.sampleRate,f=b.createBuffer(1,c,b.sampleRate),g=f.getChannelData(0),e=0;e<c;e++)g[e]=2*Math.random()-1;a.audioSource.buffer=f;a.volume=0<=a.volume?a.volume:
.5;a.fadeIn=a.fadeIn?0<=a.fadeIn?a.fadeIn:.5:.5;a.gainNode.gain.setValueAtTime(0,b.currentTime);a.gainNode.gain.linearRampToValueAtTime(a.volume/4,b.currentTime+a.fadeIn/2);a.gainNode.gain.linearRampToValueAtTime(a.volume,b.currentTime+a.fadeIn);a.audioSource.loop=!0;a.audioSource.start()},stop:d,fade:function(a){a.fadeOut=a.fadeOut?0<=a.fadeOut?a.fadeOut:.5:.5;a.canFade?(a.gainNode.gain.linearRampToValueAtTime(0,b.currentTime+a.fadeOut),a.canFade=!1,c=setTimeout(function(){d(a)},1E3*a.fadeOut)):
d(a)}}}}();
//*/
var noise = {
  volume: 0.05, // 0 - 1
  fadeIn: 2.5, // time in seconds
  fadeOut: 1.3, // time in seconds
};
