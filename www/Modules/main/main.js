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

function play() {
// Noise.play(noise);
// Noise.stop(noise);

Stations.push(CreateStation());
Stations.push(CreateStation());
// Stations.push(CreateStation());

PlayActivity();
sleep(2000);

console.log("Ok!");
console.log(Stations);

}