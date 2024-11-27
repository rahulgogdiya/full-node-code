const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//socket-io
io.on("connection", (socket) => {
  console.log("he from", socket.id);
  socket.on("user-message", (massage) => {
    console.log("he from", massage);
    io.emit("sand-message", massage);
  });
});

app.use(express.static(path.resolve("./public")));

app.use("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log("server started 9000"));
