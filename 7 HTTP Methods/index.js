//path request-----------------------------------
const http = require("http");
const fs = require("fs");
const myurl = require("url");
const { parse } = require("path");

const myServer = http.createServer((request, responce) => {
  if (request.url === "/favicon.ico") return responce.end();

  //-----------------
  const log = `${Date.now()}: ${request.method} ${
    request.url
  } new req resived \n`;
  // const url = myurl.parse(request.url)
  const url = myurl.parse(request.url, true);
  console.log(url);

  fs.appendFile("log.txt", log, (err, data) => {
    //diffrence same case-----redairect other url to according path ya fir home url
    // switch (request.url) {
    switch (url.pathname) {
      case "/":
       if (request.method === "GET") {
        responce.end("Homepage");
       }
        break;

      case "/about":
        const username = url.query.name;
        responce.end(`hi ${username}`);
        break;

        case "/Signup":
          if (request.method === "GET") {
            responce.end("This is signup form")
          }else if(request.method==="POST"){
            responce.end("seccess full")
          }

      default:
        responce.end("404 page not found");
        break;
    }
  });
});
myServer.listen(8001, () => console.log("server start"));
