var http = require("http");
var fs = require("fs");
/* the routing technique  is used to push each files ("/ => is refer to the home or main page about,sevres's,)into the server
req => is used to give the request to the server to access the url*/
http
  .createServer(function (req, res) {
    if (req.url === "/") {
      //in here we redirected to the aslamHome.html page
      fs.readFile("aslamHome.html", function (error, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
    } else if (req.url === "/about") {
      //in here we redirected to the aslamabout.html page
      fs.readFile("aslamAbout.html", function (error, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
    } else if (req.url === "/servers") {
      //in here we redirected to the aslamServes.html page
      fs.readFile("aslamServers.html", function (error, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
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
