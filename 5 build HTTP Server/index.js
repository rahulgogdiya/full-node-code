// const http = require("http")
// const myServer = http.createServer((request,responce)=>{
//     console.log(request)
//     responce.end("Hellow from server")
// })
// myServer.listen(8001,()=>console.log("server start"))

//jab bhi koi new request aayegi-----------------------
// const http = require("http")
// const fs = require("fs")
// const myServer = http.createServer((request,responce)=>{
//     const log = `${Date.now()}:new req resived \n`
//     fs.appendFile("log.txt",log,(err,data)=>{
//         responce.end("Hellow from server")
//     })
// })
// myServer.listen(8001,()=>console.log("server start"))

//path request-----------------------------------
const http = require("http");
const fs = require("fs");
const myServer = http.createServer((request, responce) => {
  const log = `${Date.now()}: ${request.url} new req resived \n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (request.url) {
      case "/":
        responce.end("Homepage");
        break;
      case "/about":
        responce.end("about");
        break;
      default:
        responce.end("404 page not found");
        break;
    }
  });
});
myServer.listen(8001, () => console.log("server start"));