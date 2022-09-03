
// Global variables - containing GUI's state
var CALL;         // string - User's call sign
var WMP;          // number - User's speed [wpm]
var PITCH;        // number - User's CW pitch [Hz]
var BANDW;        // number - User's RX Bandwidth [Hz]
var QSK;          // boolean - User's QSK option
var QRN;          // boolean - Simulate QRN
var QRM;          // boolean - Simulate QRM
var QSB;          // boolean - Simulate QSB
var FLUTTER;      // boolean - Simulate Flutter
var LID;          // boolean - Simulate LID
var ACTIVITY;     // number -  Simultaneous stations
// Default values are set through the html input defs
// (they might be saved as cookie... for later)
//----------------------------------------------------

// QSO Interactions
var theirCALL;    // string - the responding station's call sign
var theirRST;     // number - the report for the responding station
var theirNR;      // number - the progressive number provided by the responding station
//----------------------------------------------------


// Add event listening and its call back(s):

// document.getElementById("BANDW").addEventListener("keyup", 
// function(event) {
//     if (event.keyCode === 13) {
//         UpdateNoise();
//     }
// })

// Pressing ESC
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        STATION.stop();
    }
    if (evt.keyCode == 112) {
        CQ();
    }
    if (evt.keyCode == 113) {
        Nr();
    }
    if (evt.keyCode == 114) {
        TU();
    }
    if (evt.keyCode == 115) {
        MY();
    }
    if (evt.keyCode == 116) {
        HIS();
    }
    if (evt.keyCode == 117) {
        B4();
    }
    if (evt.keyCode == 118) {
        QSTN();
    }
    if (evt.keyCode == 119) {
        AGN();
    }
};



document.getElementById("CALL").addEventListener("keyup", GUI_updated);
document.getElementById("WPM").addEventListener("keyup", GUI_updated);
document.getElementById("PITCH").addEventListener("keyup", GUI_updated);
document.getElementById("BANDW").addEventListener("keyup", GUI_updated);

document.getElementById("QSK").addEventListener("click", readGUI);
document.getElementById("QRN").addEventListener("click", readGUI);
document.getElementById("QRM").addEventListener("click", readGUI);
document.getElementById("QSB").addEventListener("click", readGUI);
document.getElementById("FLUTTER").addEventListener("click", readGUI);
document.getElementById("LID").addEventListener("click", readGUI);

document.getElementById("ACTIVITY").addEventListener("keyup", GUI_updated);
document.getElementById("ACTIVITY").addEventListener("click", readGUI);
document.getElementById("TIMER").addEventListener("keyup", GUI_updated);

function GUI_updated(event) {
    if (event.keyCode === 13) { // return key, released
            readGUI();
        }
} // end GUI_updated()





function readGUI() {
// Get the GUI to the global vars
    CALL     = document.getElementById("CALL").value;
    WPM      = parseInt(document.getElementById("WPM").value);
    PITCH    = parseInt(document.getElementById("PITCH").value);
    BANDW    = parseInt(document.getElementById("BANDW").value);
    QSK      = document.getElementById("QSK").checked;
    QRN      = document.getElementById("QRN").checked;
    QRM      = document.getElementById("QRM").checked;
    QSB      = document.getElementById("QSB").checked;
    FLUTTER  = document.getElementById("FLUTTER").checked;
    LID      = document.getElementById("LID").checked;
    ACTIVITY = parseInt(document.getElementById("ACTIVITY").value); 
    TIMER    = parseInt(document.getElementById("TIMER").value);

    // theirCALL = document.getElementById("theirCALL").value;
    // theirRST  = parseInt(document.getElementById("theirRST").value);
    // theirNR   = parseInt(document.getElementById("theirNR").value);

    if (DEBUG) { console.log("readGUI(): done!"); }
} // end readGUI()




function writeGUI() {
// Copy the global vars to the GUI 
    document.getElementById("CALL").value  = CALL;
    document.getElementById("WPM").value   = WPM;
    document.getElementById("PITCH").value = PITCH;
    document.getElementById("BANDW").value = BANDW;
    document.getElementById("QSK").checked = QSK;
    document.getElementById("QRN").checked = QRN;
    document.getElementById("QRM").checked = QRM;
    document.getElementById("QSB").checked = QSB;
    document.getElementById("FLUTTER").checked = FLUTTER;
    document.getElementById("LID").checked = LID;
    document.getElementById("ACTIVITY").value = ACTIVITY;
    document.getElementById("TIMER").value = TIMER;

    if (DEBUG) { console.log("writeGUI(): done!"); }
} // end writeGUI()



function clearQSO() {
    document.getElementById("theirCALL").value = "";
    document.getElementById("theirRST").value = "";
    document.getElementById("theirNR").value = "";

    if (DEBUG) { console.log("clearQSO(): done!"); }
} // end clearQSO()



