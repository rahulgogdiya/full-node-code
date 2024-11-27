const express = require("express");
const fs = require("fs");
const zlib = require("zlib");
const status = require("express-status-monitor");

const app = express();
const PORT = 9000;

app.get("/", (req, res) => {
  // fs.readFile("./sample.txt", (err, data) => {
  //   res.end(data);
  // });

  const stream = fs.createReadStream("./sample.txt", "utf-8");
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => res.end());

  //stream Read (sample.txt) --> Zipper -> fs write stream

  fs.createReadStream("./sample.txt").pipe(
    zlib.createGunzip().pipe(fs.createWriteStream("./sample.zip"))
  );
});

app.use(status());

app.listen(PORT, () => {
  "server stsrted at 9000";
});
