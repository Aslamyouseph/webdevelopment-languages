var http = require("http");
var fs = require("fs");
var url = require("url"); // this is used to fetch the actual url(without any unwanted information from url) its a library

http
  .createServer(function (req, res) {
    /*in the below we taken the complete request from the 6th line (req argument) and put into the result variable
    "true" is used to print the information(during the from submission time ) in the form fo object*/
    var result = url.parse(req.url, true);

    if (result.pathname === "/") {
      fs.readFile("aslamHome.html", function (error, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
    } else if (result.pathname === "/signup") {
      fs.readFile("aslamform.html", function (error, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
    } else if (result.pathname === "/signupOperations") {
      fs.readFile("aslamform-operations.html", function (error, data) {
        res.writeHead(200, { "Content-Type": "text/html" });

        console.log(result.query); // query is an impulte method used to see the the information on the console

        res.write(data);
        res.end();
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("Sorry some thing went wrong");
      res.end();
    }
  })
  .listen(7000);
