//
// Background "noise" generator
//

// Based on Web Audio API - https://webaudio.github.io/web-audio-api/
// almost verbatim taken from https://codepen.io/2kool2/pen/xrLeMq/left/

// Note: In the Web Audio API, samples are floating-point numbers in [-1.0, 1.0]

// Sampling rate is 48 kHz (by default)


var supportsES6 = function() {
// Check if the browser supports ECMAScript 6 (ES6) 
// From https://gist.github.com/bendc/d7f3dbc83d0f65ca0433caf90378cd95
  try {
    new Function("(a = 0) => a");
    return true;
  }
  catch (err) {
    return false;
  }
}();


var Noise = (function () {

  "use strict";
  if (!supportsES6) {return;}

  // Create an instance of Audio Context (Web Sound)
  const audioContext = new(window.AudioContext || window.webkitAudioContext);
  


  function createColoredNoise(track) {
  // Generate a realisation of a colored noise (i.e. Ornstein-Uhlenbeck process)
  // Modified from https://noisehack.com/generate-noise-web-audio-api/

    // audioContext.sampleRate is 48'000 Hz (i.e. samples/s) by default
    // bufferSize, below, is thus defined to be 2 second long.
    const bufferSize = 2 * audioContext.sampleRate;
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    const dt = 1 / audioContext.sampleRate;     // Sampling interval [s]
    const A = (1 - dt / track.tau);             // Constant to save operations
    const B = Math.sqrt((2 * dt) / track.tau) / track.tau; // Constant to save op

    output[0] = 0.;     // Initial condition for the "state" variable  

    for (let i = 1; i < bufferSize; i++) {
      output[i] = A * output[i - 1] + B * RndNormal();
    }
    track.audioSource.buffer = noiseBuffer;
  } // end createColoredNoise()


// Stop playback of the noise, if it is played back...
  function stopNoise(track) {
    if (track.audioSource) {
      track.audioSource.stop();
    }
  } // end stopNoise()



function buildTrack(track) {
    track.audioSource = audioContext.createBufferSource();
    track.gainNode = audioContext.createGain();
    track.audioSource.connect(track.gainNode);
    track.gainNode.connect(audioContext.destination);
    track.canFade = true; // used to prevent fadeOut firing twice
  } // end buildTrack()





  function setGain(track) {

    track.volume = (track.volume >= 0) ? track.volume : 0.5;
    
    track.fadeIn = 0.5;
    
    track.gainNode.gain.setValueAtTime(0, audioContext.currentTime);

    track.gainNode.gain.linearRampToValueAtTime(track.volume / 4, audioContext.currentTime + track.fadeIn / 2);

    track.gainNode.gain.linearRampToValueAtTime(track.volume, audioContext.currentTime + track.fadeIn);

  }



// Start playback of the noise...
 function playNoise(track) {
    stopNoise(track);
    buildTrack(track);
    createColoredNoise(track);
    setGain(track);
    track.audioSource.loop = true;
    track.audioSource.start();
  } // end playNoise()



  // Exposed functions:
  return {
    play: playNoise,
    stop: stopNoise
  }


}());
//*/



var noise = {
  volume: 0.05, // 0 - 1
  tau: 0.001,
};


// if (supportsES6) {

//   // Play
//   Noise.play(track1);

//   // Stop
//   Noise.stop(track1);

//   // Fade out
//   Noise.fade(track1);

// }