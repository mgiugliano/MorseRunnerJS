var calls = [
  "DJ1YFK",
  "SO5CW",
  "DJ9AO",
  "K8GU",
  "DK5TX",
  "WT2P",
  "DM3JAN",
  "SQ9S",
  "SP3BBS",
  "LB6RH",
  "DD4SK",
  "DC1RJJ",
];

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
