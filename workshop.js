let value = require("readline-sync");

let num1 = value.questionInt("enter the row number : ");

for (let i = 1; i <= num1; i++) {
  for (let j = 1; j <= i; j++) {
    console.log("*");
  }
  console.log("\n");
}
