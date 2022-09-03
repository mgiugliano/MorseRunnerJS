



function sendMSG(MSG) {
// This function sends out the MSG
    readGUI();          // Get the GUI state

    if (RUN == true) {
        STATION.stop();
        STATION.setWpm(WPM);
        STATION.setFreq(PITCH);
        STATION.setVolume(1);
        STATION.play(MSG);
    }

} // end send()




function START() {      // Callback starting the operation as "running"
    readGUI();          // Get the GUI state

    RUN = true;         // The state is changed into "running"
    NR = 1;             // Initialized the progressive number for exchanges

    Noise.play(noise);  // Background "RF" noise starts playing...

    const startTimer = Date.now();          // The current time is noted...
    let DURATION = (TIMER * 60. * 1000.);   // The timer converted in ms
    updateTimer(startTimer, DURATION);  // This is the actual core/cycle

} //end START()



function STOP() {      // Callback stopping the operation 
    RUN = false;       // The state is changed into "pause"
    Noise.stop(noise); // Background "RF" noise is stopped
    STATION.stop();    // The current transmission is stopped (if any)

} //end STOP()



function updateTimer(startTimer, DURATION) {
 let status;

   if  (((Date.now() - startTimer) < DURATION) && RUN) {
        status = 100. * (Date.now() - startTimer) / DURATION;
        document.getElementById("runningTimer").value  = status.toString();
        let t = setTimeout(function(){ updateTimer(startTimer, DURATION) }, 1000);
    }
  else {
    status = 100;
    document.getElementById("runningTimer").value  = status.toString();
    STOP();
  }

  console.log("Hello  ")
}




function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function CreateStation() {
  let Station = {
    Patience: 1 + Math.random() * 4,
    HisCall: PickCall(),
    Amplitude: (5000 + 25000 * Math.random()) * 0.8,
    Pitch: MyPitch + Math.round(RndGaussLim(0, 300)),
    Wpm: Math.round(15 + Math.random() * 19),
  };

  return Station;
}


function PlayActivity() {
  let agents = Array();
  for (let i = 0; i < Stations.length; i++) {
    agents[i] = new jscw();

    agents[i].setWpm(Stations[i].Wpm);
    agents[i].setStartDelay(Stations[i].Patience);
    //agents[i].setVolume(Stations[i].Amplitude);
    agents[i].setFreq(Math.round(Stations[i].Pitch));

    agents[i].setText(Stations[i].HisCall);
  }

  for (let i = 0; i < Stations[i].length; i++) {
    agents[i].play();
  }
  return agents;
}



function RndNormal() {
  // Normal pseudo-random number, by the Box-Muller transform,
  // with zero mean and unitary standard deviation.
  var u = 0;
  var v = 0;

  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random(); //Converting [0,1) to (0,1)

  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}


function RndGaussLim(AMean, ALim) {
  // Normal pseudo-random number, with given mean AMean and stddev 0.5*ALim, but
  // clipped so that the value returned is in [AMean - ALim ; AMean + ALim].
  var r;
  r = AMean + RndNormal() * 0.5 * ALim;
  return Math.max(AMean - ALim, Math.min(AMean + ALim, r));
}





function CQ() {
  if (RUN == true) {
    MSG = "CQ " + CALL + " TEST"; 
    sendMSG(MSG);
  } 
}


function Nr() {
  if (RUN == true) {
    MSG = "5NN " + NR; 
    sendMSG(MSG);
  } 
}

function TU() {
  if (RUN == true) {
    MSG = "TU E E"; 
    sendMSG(MSG);
  } 
}

function MY() {
  if (RUN == true) {
    MSG = CALL; 
    sendMSG(MSG);
  } 
}

function HIS() {


}

function B4() {
  if (RUN == true) {
    MSG = "B4"; 
    sendMSG(MSG);
  } 
}


function QSTN() {
  if (RUN == true) {
    MSG = "?"; 
    sendMSG(MSG);
  } 
}


function AGN() {
  if (RUN == true) {
    MSG = "AGN"; 
    sendMSG(MSG);
  } 
}