//
// GUI.js - supporting functions for GUI operation
//


// Add event listening-events and their call back(s):

// document.getElementById("BANDW").addEventListener("keyup", 
// function(event) {
//     if (event.keyCode === 13) {
//         UpdateNoise();
//     }
// })

//------------------------------------------------------------------------------
// Callback functions triggered when pressing ESC, F1, F2...
document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch(evt.keyCode) {
        case 27: // ESC (not working on Safari)
            STATION.stop();
            break;
        case 112: //F1
            CQ();
            break;
        case 113: //F2
            NR();   // name of the function and NOT of the global variable!
            break;
        case 114: //F3
            TU();
            break;
        case 115: //F4
            MY();
            break;
        case 116: //F5
            HIS();
            break;
        case 117: //F6
            B4();
            break;
        case 118: //F6
            QSTN();
            break;
        case 119: //F7
            AGN();
            break;
    default:
    ;
        // code block
    } // end switch

    // if (evt.keyCode == 27) {
    //     STATION.stop();
    // }
};
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
// GUI elements and events when the user interacts 
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

document.getElementById("theirCALL").addEventListener("keyup", respondCall);
document.getElementById("RST").addEventListener("keyup", GUI_updated);
document.getElementById("theirNr").addEventListener("keyup", concludeQSO);
//------------------------------------------------------------------------------



//------------------------------------------------------------------------------
function GUI_updated(event) {
    if (event.keyCode === 13) { // RETURN key, released
            readGUI();
        }
} // end GUI_updated()
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
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

    if (DEBUG) { console.log("readGUI(): done!"); }
} // end readGUI()
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
function focus_CALL() {
// The GUI input text field "hisCALL" is focused
      document.getElementById("theirCALL").focus();
      document.getElementById("theirCALL").select();
} // end focus_CALL()
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
function clear_CALL() {
// The GUI input text field "hisCALL" is cleared
  document.getElementById("theirCALL").value = "";
  theirCALL = "";
} // end clear_CALL() 
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
function clear_fields() {
    document.getElementById("theirCALL").value = "";
    document.getElementById("RST").value = "";
    document.getElementById("theirNr").value = "";

    if (DEBUG) { console.log("clear_fields(): done!"); }
} // end clear_fields()
//------------------------------------------------------------------------------