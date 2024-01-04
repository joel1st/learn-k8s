var http = require("http");

console.log("Internal server starting");

//create a server object:
http
  .createServer(function (req, res) {
    console.log("Request received");
    res.write("Internal api response"); //write a response to the client
    res.end(); //end the response
    return;
  })
  .listen(process.env.NODE_PORT ?? 9001); //the server object listens on port 8080

process.on("SIGINT", function () {
  process.exit();
});
