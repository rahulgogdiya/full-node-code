const express = require("express");

const app = express();
const PORT = 9000;

app.get("/", (req, res) => {
  return res.json({ message: `he hellow ${process.pid}` });
});

app.listen(PORT, () => {
  console.log("server stsrted at", PORT);

});

