//
// qso.js - supporting function simulating QSOs
//

//------------------------------------------------------------------------------
function createStation() {
  let station = {
    Patience: 0.25 + Math.random() * 3 * (ACTIVITY-1),
    HisCall: pickCall(),
    HisNr: Math.floor(1 + Math.random() * 98),
    Amplitude: (5000 + 25000 * Math.random()) * 0.8,
    Pitch: PITCH + Math.round(RndGaussLim(0, 300)),
    Wpm: Math.round(15 + Math.random() * 19),
  };
  return station;
} // end createStation()
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
function playActivity() {

  for (let i = 0; i < Stations.length; i++) {
    agents[i] = new jscw();

    agents[i].setWpm(Stations[i].Wpm);
    agents[i].setStartDelay(Stations[i].Patience);
    //agents[i].setVolume(Stations[i].Amplitude);
    agents[i].setFreq(Math.round(Stations[i].Pitch));

    agents[i].setText(Stations[i].HisCall);
    //agents[i].play();
    }

  for (let i = 0; i < Stations.length; i++) {
    agents[i].play();
  }
} // end playActivity()
//------------------------------------------------------------------------------



//------------------------------------------------------------------------------
function respondCall() {
    tmp = document.getElementById("theirCALL").value;

    if ((RUN == true) && (event.keyCode === 13) && (tmp.length>0)) {
        theirCALL = tmp;
        theirNr  = NR.string;
        document.getElementById("RST").value = "5NN";
        sendMSG(theirCALL + "|S150 5NN |S150 " + cut_numbers(NR), checkUserResponse);

        document.getElementById("theirNr").focus();
        document.getElementById("theirNr").select();
    }
} // end respondCall()
//------------------------------------------------------------------------------



//------------------------------------------------------------------------------
function concludeQSO() {
    if ((RUN == true) && (event.keyCode === 13) && (document.getElementById("theirNr").value != "")) {
        TU();
        clear_fields();
        focus_CALL();
    }
} // end concludeQSO()
//------------------------------------------------------------------------------
