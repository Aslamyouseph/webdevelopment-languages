/* This method is used to create a time delay .A functions that  is need to wait sometime  to complete another fumction.
then we can able to use this method. by shortly we can say that this mehtod is used to create a time delay
 */

const promise = require("promise"); // this is used to import the promise libery

function myName() {
  return new promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello I AM Aslam Youseph");
    }, 3000);
  });
}

function myPlace() {
  return new promise((resolve, reject) => {
    setTimeout(() => {
      resolve("I am from nellimattom");
    }, 3000);
  });
}

/**
 * in here without async and await then when the result function is call then the next line call the myName function . so in myName function there is a 3 second time delay
 * which contain .so this function will return the name after 3seconds only. but console.log(name); will immediately call . it will not wait for 3 seconds so we did not get
 * the result . so we manually say that wants to wait after completion of this let name = await myName(); line then only wants to execute console.log(name); this line.
 * await wants to give the needed wait functions. And always the main function will be async
 */
async function result() {
  let name = await myName();
  console.log(name);

  let place = await myPlace();
  console.log(place);
}

result();
