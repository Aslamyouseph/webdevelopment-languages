const express = require("express"); // This way we importing the express to our file

const app = express(); // assigning express to a variable for further use

const path = require("path"); //This way we importing the path library to our file

//below block will execute between the  request sending time and receiving time (This is used in section ,cookies creating time ,to check the user has the right to access this page)
app.use(function (req, res, next) {
  console.log(
    "This block execute between the  request sending time and receiving time"
  );
  next();
});

// This way we are accessing the HTML file form server
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "aslamHome.html")); //we need to specify the complete path of our file
});

// This is used to get the form page (appozhum server illakkuu oru html file nu venddee request kodukkunathu get upayogichannuu)
app.get("/signup", function (req, res) {
  res.sendFile(path.join(__dirname, "aslamFormExpress.html"));
});
// This is used to send the data to server from form  (eveda post vachuu annuu koduthirikunnathuu )
app.post("/signup", function (req, res, next) {
  res.sendFile(path.join(__dirname, "aslamform-operations.html"));
  next();
});

app.use(function (req, res) {
  console.log(
    "This block execute between the  request sending time and receiving time"
  );
});

//      console.log(`Display the folder path :=>  ${__dirname}`); // "__dirname" used for finding the folder path
//      console.log(`Display the file path :=>   ${__filename}`); // used for finding the file path

app.listen(7000); // used for creating the port
