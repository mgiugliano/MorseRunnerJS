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
        //WRONG - theirNr  = NR.string;
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


//------------------------------------------------------------------------------
function logQSO() {
  let tmp = document.getElementById("logTextArea").value;

  const date = new Date();
  const loggeddate = date.toLocaleTimeString('en-GB'); // 24h

  let copiedCallSign = document.getElementById("theirCALL").value.toUpperCase();
  let copiedNr       = document.getElementById("theirNr").value.toUpperCase();

  let entry = loggeddate + "  " + copiedCallSign + "\t\t" + "599 " + NR + "\t599 " + copiedNr;

  if ((copiedCallSign == Stations[IDX].HisCall) && (copiedNr == Stations[IDX].HisNr)) {
	tmp = tmp + "\n" + entry + " ✓";
  }else {
  	tmp = tmp + "\n" + entry  + " ✗" + " (" + Stations[IDX].HisCall + ") " + " (" + Stations[IDX].HisNr + ")";
	}

  document.getElementById("logTextArea").value = tmp;

} // end logQSO()
//------------------------------------------------------------------------------
