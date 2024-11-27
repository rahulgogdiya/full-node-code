const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    ` ${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((user) => ` <li>${user.first_name}</li>`).join()}
  </ul>
  `;
  res.send(html);
});

//Routes
app.get("/api/users", (req, res) => {
  res.setHeader("x-myName", "Rahul"); //custome header use allwase use "x"
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "panding" });
  })
  .delete((req, res) => {
    return res.json({ status: "panding" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "all fild are required.." });
  }
  users.push({ ...body, id: users.length + 1 });
  
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "panding" });
  });
});

app.listen(PORT, () => console.log(`Srever Started at port : ${PORT}`));
