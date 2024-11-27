//path request-----------------------------------
const http = require("http");
const fs = require("fs");
const myurl = require("url");
const { parse } = require("path");

const myServer = http.createServer((request, responce) => {
  if (request.url === "/favicon.ico") return responce.end();
  const log = `${Date.now()}: ${request.url} new req resived \n`;
  // const url = myurl.parse(request.url)
  const url = myurl.parse(request.url, true);
  console.log(url); 

  fs.appendFile("log.txt", log, (err, data) => {
    //diffrence same case-----redairect other url to according path ya fir home url
    // switch (request.url) {
    switch (url.pathname) {
      case "/":
        responce.end("Homepage");
        break;

      case "/about":
        const username = url.query.name;
        responce.end(`hi ${username}`);
        break;

      default:
        responce.end("404 page not found");
        break;
    }
  });
});
myServer.listen(8001, () => console.log("server start"));
