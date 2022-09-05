//
// helper.js - supporting functions
//

// sendMSG()
// cut_numbers()

// START()
// STOP()
// updateTimer()

// CQ()
// Nr()
// TU()
// MY()
// HIS()
// B4()
// QSTN()
// AGN()
// ESC()

//------------------------------------------------------------------------------
function sendMSG() {
// This function sends out the MSG and also triggers a function "onFinished"
    MSG = arguments[0];

    readGUI();          // Get the GUI state

    if (RUN == true) {
        STATION.stop();
        STATION.setWpm(WPM);
        STATION.setFreq(PITCH);
        STATION.setVolume(1);
        STATION.setText(MSG);

        if (arguments.length>1) {
          onFinished = arguments[1];  // user-provided callback
        }
        else {
          onFinished = function () { }
        }

        STATION.onFinished = function () { onFinished(); }

        if (QSK == false) { Noise.stop(noise); }
        STATION.play();
    }
} // end sendMSG()
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
function initiateQSO() {

  if (QSK == false) { Noise.play(noise); }

	for(let k = 0; k < ACTIVITY; k++) {  //  
    Stations.push(createStation());
  }

  playActivity();

} // end onFinished()
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
function checkUserResponse() {
    let distances = Array();
    let best;
    //let idx_best;

    theirCALL = document.getElementById("theirCALL").value;

    for (let k = 0; k < Stations.length; k++) {
      distances[k] = LevenshteinDistance(Stations[k].HisCall, theirCALL)
    }

    best = Math.min(...distances);        // Get minim distance element
    IDX = distances.indexOf(best);   // Get the corresponding index

    if (best == -999) {                   // Perfect copy!!
      QSO();
    }
    else if (best < 10) {
      DE();                       // Quite close.
    }
} // end checkUserResponse()
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
function QSO() {
    Stations[IDX].Patience = 0.25 + Math.random() * 1;
    agents[IDX].setText("R|S150 5NN|S250 " + cut_numbers(Stations[IDX].HisNr));
    agents[IDX].play();
  } // end QSO()
//------------------------------------------------------------------------------



//------------------------------------------------------------------------------
function DE() {
    Stations[IDX].Patience = 0.25 + Math.random() * 1;
    agents[IDX].setText("DE " + Stations[IDX].HisCall);
    agents[IDX].play();
  } // end QSO()
//------------------------------------------------------------------------------




//------------------------------------------------------------------------------
function repeatQSO() {

  if (QSK == false) { Noise.play(noise); }

  playActivity();

} // end onFinished()
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
function cut_numbers(n) {
  // See https://www.swodxa.org/wp-content/uploads/2018/12/Cut-Numbers.pdf
  let tmp;
  tmp = n.toString().padStart(3,'0');
//  tmp = tmp.replace(/1/g, "A");
//  tmp = tmp.replace(/2/g, "U");
//  tmp = tmp.replace(/3/g, "V");
//  tmp = tmp.replace(/5/g, "E");
//  tmp = tmp.replace(/7/g, "G");
//  tmp = tmp.replace(/8/g, "D");
  tmp = tmp.replace(/9/g, "N");
  tmp = tmp.replace(/0/g, "T");
  return tmp;
} // end cut_numbers()
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
function START() {      // Callback starting the operation as "running"
    if (RUN == false) {
      readGUI();          // Get the GUI state

      focus_CALL();       // The GUI input text field "hisCALL" becomes in focus
      clear_fields();     // The GUI input text fields are cleared
      document.getElementById("logTextArea").value = "";
      
      RUN = true;         // The state is changed into "running"
      IDX = -1;           // Current station in QSO initialised
      NR = 1;             // Initialized the progressive number for exchanges

      Noise.play(noise);  // Background "RF" noise starts playing...

      Stations = Array();   // The object is unset to destroy it (if existed)
      agents  = Array();    // The object is unset to destroy it (if existed)
      STATION = undefined;  // The object is unset to destroy it (if existed)
      STATION = new jscw(); // An object is created to "give voice" to the 
      STATION.init();       // local station (see the sendMSG() function)

      const startTimer = Date.now();          // The current time is noted...
      let DURATION = (TIMER * 60. * 1000.);   // The timer converted in ms
      updateTimer(startTimer, DURATION);  // This is the actual core/cycle

    if (DEBUG) { console.log("START(): started operations!"); }
    }
} //end START()
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
function STOP() {      // Callback stopping the operation 
    RUN = false;       // The state is changed into "pause"
    Noise.stop(noise); // Background "RF" noise is stopped
    STATION.stop();    // The current transmission is stopped (if any)

    for (let i = 0; i < agents.length; i++) {
      agents[i].stop();
    }
    agents = Array();

    if (DEBUG) { console.log("STOP(): done!"); }
} //end STOP()
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
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

  if (DEBUG) { console.log("updateTime(): ticking!"); }
}
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
function simpleAlert() {
  alert("Alert fired!");
}
//------------------------------------------------------------------------------




//------------------------------------------------------------------------------
function RndNormal() {
  // Normal pseudo-random number, by the Box-Muller transform,
  // with zero mean and unitary standard deviation.
  var u = 0;
  var v = 0;

  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random(); //Converting [0,1) to (0,1)

  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
} // end RndNormal()


//------------------------------------------------------------------------------
function RndGaussLim(AMean, ALim) {
  // Normal pseudo-random number, with given mean AMean and stddev 0.5*ALim, but
  // clipped so that the value returned is in [AMean - ALim ; AMean + ALim].
  var r;
  r = AMean + RndNormal() * 0.5 * ALim;
  return Math.max(AMean - ALim, Math.min(AMean + ALim, r));
} // end RndGaussLim()
//------------------------------------------------------------------------------



//------------------------------------------------------------------------------
// Callback routines, related to individual buttons
function CQ() {
// Calls CQ...
  if (RUN == true) {
    MSG = "CQ " + CALL + " TEST"; 
    sendMSG(MSG, initiateQSO);
    focus_CALL();       // The GUI input text field "hisCALL" becomes in focus
  } 
} // end CQ()

function Nr() {
// Sends the RST and the progressive number to the remote station
  let tmp = document.getElementById("theirCALL").value; 
  if ((RUN == true) && (tmp.length>0)) {
    MSG = "5NN|S250 " + cut_numbers(NR); 
    sendMSG(MSG, checkUserResponse);

    if (DEBUG) { console.log("Nr(): ran!"); }
  } 
} // end Nr()

function TU() {
// Sends TU and concludes the QSO
  if (RUN == true) {
    //MSG = "TU E E"; 
    MSG = "TU"; 
    sendMSG(MSG);

    logQSO();

    if (IDX != -1) {
      agents.splice(IDX, 1);
      Stations.splice(IDX, 1);
    }
    focus_CALL();       // The GUI input text field "hisCALL" becomes in focus
  } 
} // end TU()

function MY() {
// Sends the call sign of the local station
  if (RUN == true) {
    MSG = CALL; 
    sendMSG(MSG);
  } 
} // end MY()

function HIS() {
// Sends the call sign of the remote station (initiating QSO)
  let tmp = document.getElementById("theirCALL").value; 
  if ((RUN == true) && (tmp.length>0)) {
      theirCALL = tmp;
      sendMSG(theirCALL);

    if (DEBUG) { console.log("HIS(): ran!"); }
  }
} // end HIS()

function B4() {
// Sends the message B4 = already contacted before
  if (RUN == true) {
    MSG = "B4"; 
    sendMSG(MSG);
  } 
} // end B4()

function QSTN() {
// Sends the question mark "?"
  if (RUN == true) {
    MSG = "?"; 
    sendMSG(MSG, repeatQSO);
  } 
} // end QSTN()

function AGN() {
// Sends AGN = again please
  if (RUN == true) {
    MSG = "AGN"; 
    sendMSG(MSG, repeatQSO);
  } 
} // end AGN()

function ESC() {
// Stops immediately the local station transmission
  if (RUN == true) {
    STATION.stop();
  }
} // end ESC()
//------------------------------------------------------------------------------


