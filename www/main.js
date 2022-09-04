//
// main.js - Morse Runner JS (work in progress!)
//

// GLOBAL VARIABLES ------------------------------------------------------------
var DEBUG = true;           // Toggles diagnostic messages on the console...

var IDX;                    // Current remote station in QSO 
var RUN   = false;          // State of the operation: "running" or "paused"
var MSG;                    // String containing the message(s) to be sent
var NR;                     // Progressive number to be send by the local stat

var CALLSIGNS;              // Array containing real callsigns as strings

var STATION;                // Object associated to the local station
var Stations = Array();     // Array of remote stations objects
var agents   = Array();     // Array of remote stations objects

var noise = {               // Parameters of the background "RF" noise
  volume: 0.0001,           // 0 - 1
  tau: 0.001,               // [s], autocorrelation length 
};
//------------------------------------------------------------------------------

// GLOBAL VARIABLES - containing GUI's state -----------------------------------
// Default values are set through the html input defs (saved as cookie...?)
var CALL;         // string - User's call sign
var WPM;          // number - User's speed [wpm]
var PITCH;        // number - User's CW pitch [Hz]
var BANDW;        // number - User's RX Bandwidth [Hz]

var QSK;          // boolean - User's QSK option
var QRN;          // boolean - Simulate QRN
var QRM;          // boolean - Simulate QRM
var QSB;          // boolean - Simulate QSB
var FLUTTER;      // boolean - Simulate Flutter
var LID;          // boolean - Simulate LID

var ACTIVITY;     // number -  Simultaneous stations
// QSO Interactions
var theirCALL;    // string - the responding station's call sign
//------------------------------------------------------------------------------


// INITIALISATION
getMASTERSCP();             // Get MASTER.scp to later use pickCall()

