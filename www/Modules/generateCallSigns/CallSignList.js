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


function pickCall() {
  return CALLSIGNS[Math.round(Math.random() * CALLSIGNS.length)];
} // end pickCall()



function LevenshteinDistance(a, b) {
// The Levenshtein's distance between two strings, a and b, is the minimum no.
// of single-character edits (i.e. insertions, deletions or substitutions) to 
// change one string into the other. Here we use it to compare similarities of
// actual and "copied" call signs (expressed as strings made of dit and dahs). 

            a = ASCII2morse(a); // ASCII is converted into "." and "-"
            b = ASCII2morse(b); // ASCII is converted into "." and "-"

            if(a.length == 0) return b.length; // if a is empty.. d = length of b
            if(b.length == 0) return a.length; // if b is empty.. viceversa

            var matrix = [];

            // increment along the first column of each row
            var i;
            for(i = 0; i <= b.length; i++){
                matrix[i] = [i];
            }

            // increment each column in the first row
            var j;
            for(j = 0; j <= a.length; j++){
                matrix[0][j] = j;
            }

            // Fill in the rest of the matrix
            for(i = 1; i <= b.length; i++){
                for(j = 1; j <= a.length; j++){
                if(b.charAt(i-1) == a.charAt(j-1)){
                    matrix[i][j] = matrix[i-1][j-1];
                } else {
                    matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                            Math.min(matrix[i][j-1] + 1, // insertion
                                                    matrix[i-1][j] + 1)); // deletion
                }
                }
            }
        return matrix[b.length][a.length];
        
} // end LevenshteinDistance()




function ASCII2morse(inputStr) {
// Converts the input string into a new string, made of "." and "-"

	let outputStr = "";                // Output string initialised (as empty)

  inputStr = inputStr.toLowerCase(); // First everything to lowercase

  let values = {"a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", 
            "f": "..-.", "g": "--.", "h": "....", "i": "..", "j": ".---", "k":
            "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---", "p": ".--.",
            "q": "--.-", "r": ".-.", "s": "...", "t": "-", "u": "..-", "v":
            "...-", "w": ".--", "x": "-..-", "y": "-.--", "z": "--..", 
            "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5":
            ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
            "0": "-----", "/": "-..-.", " ": ""};
            // Note: the blank/space character is to be replaced with ""

	for(var i = 0; i < inputStr.length; i++) {  // For each element of the input 
		outputStr += values[inputStr[i]] + "";    // the corresponding Morse code
	}                                           // is appended to the output...
                                              // (without any space)
	
	return outputStr;         // The output string is returned as output!
}
