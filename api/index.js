var http = require("http");

console.log("API server starting");

//create a server object:
http
  .createServer(function (req, res) {
    console.log("Request received");
    if (req.url.includes("/instant")) {
      res.write("Instant API hit"); //write a response to the client
      res.end(); //end the response
      return;
    }
    if (req.url.includes("/proxy")) {
      http.get(
        {
          hostname: process.env.INTERNAL_API_HOST ?? "localhost",
          port: Number(process.env.INTERNAL_API_PORT ?? 9001),
          path: "/",
          agent: false, // Create a new agent just for this one request
        },
        (result) => {
          result.once("data", (stream) => {
            res.write("Instant API hit"); //write a response to the client
            res.write(stream);
            return;
          });
          result.on("end", () => res.end());
        }
      );
      return;
    }
    res.write("Fallback default"); //write a response to the client
    res.end(); //end the response
    return;
  })
  .listen(process.env.NODE_PORT ?? 8080); //the server object listens on port 8080

process.on("SIGINT", function () {
  process.exit();
});
