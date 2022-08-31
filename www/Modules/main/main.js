//
//
//
MyCall = "IV3CWA"; // User's call sign
MyWPM = 30; // User's own speed [WPM]
MyPitch = 600; // User's own CW pitch [Hz]
MyBandwidth = 600; // User's own RX Bandwidth [Hz]

let Stations = Array();

noise.volume = 0.01;
noise.fadeIn = 0.1;
noise.fadeOut = 0;
noise.tau = 0.001;

document.getElementById("BANDW").addEventListener("keyup", 
function(event) {
    if (event.keyCode === 13) {
        UpdateNoise();
    }
})


function UpdateNoise() {
    MyBandwidth = document.getElementById("BANDW").value;
    noise.tau = 1. / parseFloat(MyBandwidth);
    Noise.stop(noise);
    Noise.play(noise);
}



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

function readGUI() {
    MyCall = document.getElementById("CALL").innerText;
    MyWPM = document.getElementById("WPM").innerText;
    MyPitch = document.getElementById("PITCH").innerText;
    MyBandwidth = document.getElementById("BANDW").innerText;
    MyQSK = document.getElementById("QSK").checked;

    MyQRN = document.getElementById("QRN").checked;
    MyQRM = document.getElementById("QRM").checked;
    MyQSB = document.getElementById("QSB").checked;
    MyFlutter = document.getElementById("FLUTTER").checked;
    MyLid = document.getElementById("LID").checked;
    MyActivity = document.getElementById("ACTIVITY").innerText;
}


function play2() {

    var calls = ["DJ1YFK", "SO5CW", "DJ9AO", "K8GU", "DK5TX", "WT2P", "DM3JAN", "SQ9S", "SP3BBS", "LB6RH", "DD4SK", "DC1RJJ"];
 
    var m = Array();

    //readGUI();

    for (var i = 0; i < calls.length; i++) {
        m.push(new jscw());
        m[i].init();
        m[i].setWpm(Math.random()*20+20);
        m[i].setFreq(Math.round(Math.random()*600+400));
        m[i].setVolume(Math.random()*0.4);
        m[i].play("|S" + Math.floor(Math.random() * Math.floor(calls.length * 1000)) + " " + calls[i]);
    }

}