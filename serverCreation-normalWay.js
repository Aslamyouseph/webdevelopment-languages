var http = require("http"); // this is used to import the server package or libery

http.createServer(server).listen(7000); // this cammand is run in the server when the file where run time ( node .\serverCreation.js) .also the port is running on 7000

/*This below function is run when a user enter the url on the search bar or user requster for the webpage.
req - is  a argument which contain the device informations like IP addresss ,about the device informations etc.
res- is a argument used to specify what is need to respontes after the requset is reached to the server
res.end()- used to inform the browser which the operation is completed
*/

function server(req, res) {
  res.write("normal functoin method is used in here");
  res.end();
}
