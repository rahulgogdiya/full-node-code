const cluster = require("cluster");
const express = require("express");
const os = require("os");

const totalCPUs = os.cpus().length;
console.log(totalCPUs);

if (cluster.isPrimary) {
  //fork -- workers process
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const PORT = 9000;

  app.get("/", (req, res) => {
    return res.json({ message: `he hellow ${process.pid}` });
  });

  app.listen(PORT, () => {
    console.log("server stsrted at", PORT);
  });
}
