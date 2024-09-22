// npm install readline-sync  (use this cammand in your terminal to install the library) each folder we need to install readline-sync

let read = require("readline-sync"); // in  this way we are importing readline-sync
let name = read.question("enter a name");
let num = read.questionInt("enter your number"); // use this to get number , otherwise it will be string
console.log(`hello ${name} and the number is ${num}`);
console.log(typeof num);
console.log(typeof name);
