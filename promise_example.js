const promise = require("promise"); // this is used to import the promise libery

function add(num1, num2) {
  // this is used to create the promise , resolve return when the condition is true and reject return when the condition is false
  return new promise((resolve, reject) => {
    if (num1 == 0) {
      reject("first number is zero"); // it is retuning to catch sections (err) object
    } else {
      resolve(num1 + num2); // it is retuning to then sections (result) object
    }
  });
}

function sub(num1, num2) {
  return new promise((resolve, reject) => {
    if (num1 == 0) {
      reject("first number is zero");
    } else {
      resolve(num1 - num2);
    }
  });
}

function multiply(num1, num2) {
  return new promise((resolve, reject) => {
    if (num1 == 0) {
      reject("first number is zero");
    } else {
      resolve(num1 * num2);
    }
  });
}

function division(num1, num2) {
  return new promise((resolve, reject) => {
    if (num1 == 0) {
      reject("first number is zero");
    } else {
      resolve(num1 / num2);
    }
  });
}

// calling the above promise function
add(10, 10)
  .then((add_result) => {
    console.log(add_result);
    return sub(20, 10);
  })
  .then((sub_result) => {
    console.log(sub_result);
    return multiply(10, 10);
  })
  .then((multiply_result) => {
    console.log(multiply_result);
    return division(10, 10);
  })
  .then((division_Result) => {
    console.log(division_Result);
  })
  .catch((err) => {
    console.log(err);
  });
