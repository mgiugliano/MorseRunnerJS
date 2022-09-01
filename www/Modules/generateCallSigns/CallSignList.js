//
// Random call signs are extracted from the famous "master.dta", available from
// https://www.supercheckpartial.com/index.htm
//
// Note: the best file to download is the latest version of "master.scp" (ASCII)
// from https://www.supercheckpartial.com/MASTER.SCP ~400 KB
//


var CALLSIGNS;    // Global variable: an array of strings, each containing a call sign


function parseMASTERSCP() {
  // This is the callback function, called by get_MASTERSCP() upon "load"
  let content = this.responseText;

  CALLSIGNS = content.split(/\r?\n/);   // split the text into array elements
                                        // on the basis of \r and \n
  CALLSIGNS.splice(0,4);                // The first 4 elements are discarded.

} // end parseMASTERSCP()


// From https://onlinewebtutorblog.com/how-to-read-a-file-from-server-using-javascript/
function getMASTERSCP() {
  // Creates a http request of type GET and downloads the MASTER.SCP
    let xmlhttp;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.addEventListener("load", parseMASTERSCP);  // callback function

    // The file to download is hard-coded below.
    xmlhttp.open("GET", "Modules/generateCallSigns/MASTER.SCP", true);
    xmlhttp.send();
} // end getMASTERSCP()


function PickCall() {
  return CALLSIGNS[Math.round(Math.random() * CALLSIGNS.length)];
}
