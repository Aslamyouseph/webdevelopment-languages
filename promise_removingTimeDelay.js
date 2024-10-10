/* This method is used to removing the time delay . that means if an operations have a time delay then in between this time
delay we are performing  another operations . the second operations can able to complete on this time delay .so we can able to 
save the time.
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

// When we call in this way it take total 6seconds to complete this operations. it is too long.
// myName()
//   .then((nameResult) => {
//     console.log(nameResult);
//     return myPlace();
//   })
//   .then((placeResult) => {
//     console.log(placeResult);
//   });

/* To save the time we using this methods. in this method it take only 3 seconds to complete the two  operations.
that means for the first functions it need 3 seconds so during this time automatically the second function will start it execution .
so when the first function is complete the second function also completed
*/
promise.all([myName(), myPlace()]).then((allResult) => {
  console.log(allResult);
});
