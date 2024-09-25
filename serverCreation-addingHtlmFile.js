var http = require("http");
var fs = require("fs"); // this is used to install the file accessing package

/** fs.readFile() In this there is one argument is contain that is the needed html file name
 * res.writeHead(200, { "Content-Type": "text/html" }) used to inform the server that wants to retun a hmtl page after the request;
  function (error, data) The error which contain the error details and data which contain the html file 
*/

http
  .createServer(function (req, res) {
    fs.readFile("serverHtmFile.html", function (error, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  })
  .listen(7000);
