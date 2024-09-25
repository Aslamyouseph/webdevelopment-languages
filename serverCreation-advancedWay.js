/*check the serverCreation-normalWay file to see the detailed explanation about it */

var http = require("http");

http
  .createServer(function (req, res) {
    res.write("Advanced funtion method is uded in here!!!");
    res.end();
  })
  .listen(7000);
