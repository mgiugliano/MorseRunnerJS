
// GLOBAL VARIABLES ------------------------------------------------------------
var DEBUG = true;           // Toggles diagnostic messages on the console...
var RUN   = false;          // State of the operation: "running" or "paused"
var NR;                     // Progressive number to be send by the local stat
var MSG;                    // String containing the message(s) to be sent

var STATION;                // Object associated to the local station

var noise = {               // Parameters of the background "RF" noise
  volume: 0.0001,             // 0 - 1
  tau: 0.001,               // 
};
//------------------------------------------------------------------------------

// INITIALISATION

getMASTERSCP();             // Get MASTER.scp in memory
// pickCall();

STATION = new jscw();       // An object is created to "give voice" to the 
STATION.init();             // local station (see the sendMSG() function)





















let Stations = Array();


// document.getElementById("BANDW").addEventListener("keyup", 
// function(event) {
//     if (event.keyCode === 13) {
//         UpdateNoise();
//     }
// })


// function UpdateNoise() {
//     MyBandwidth = document.getElementById("BANDW").value;
//     noise.tau = 1. / parseFloat(MyBandwidth);
//     Noise.stop(noise);
//     Noise.play(noise);
// }



function play() {
// Noise.play(noise);
// Noise.stop(noise);

Stations.push(CreateStation());
Stations.push(CreateStation());
// Stations.push(CreateStation());

PlayActivity();
//sleep(2000);

console.log("Ok!");
console.log(Stations);

}





function play() {

    var m = Array();

    //readGUI();

    for (var i = 0; i < ACTIVITY; i++) {
        m.push(new jscw());
        m[i].init();
        m[i].setWpm(Math.random()*20+20);
        m[i].setFreq(Math.round(Math.random()*600+400));
        m[i].setVolume(Math.random()*0.4);
        m[i].play("|S" + Math.floor(Math.random() * Math.floor(calls.length * 1000)) + " " + pickCall());
    }

}