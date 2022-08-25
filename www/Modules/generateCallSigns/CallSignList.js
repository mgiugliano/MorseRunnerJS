//
// Random call signs are extracted from the famous "master.dta", available from
// https://www.supercheckpartial.com/index.htm
//
// The best file to download is the latest version of "master.scp" (ASCII)
// from https://www.supercheckpartial.com/MASTER.SCP ~400 KB
//

// I avoid reading the entire file from disk into the memory

const readline = require("readline");
const fs = require("fs");
const FILE_PATH = "./MASTER.SCP";

let counter = 0;

// let tmp;
// tmp = readline.createInterface({
//   input: fs.createReadStream(FILE_PATH),
// });

// tmp
//   .on("line", function (line) {
//     counter++;
//   })
//   .on("close", () => {
//     console.log(counter);
//   });

function countline() {
  counter++;
  console.log(counter);
  return counter;
}

function printlines() {
  console.log(counter);
}

// This line opens the file as a readable stream
var readStream = fs.createReadStream(FILE_PATH);
readStream.on("line", (out) => countline());
//.on("close", () => printlines());

console.log(counter);
