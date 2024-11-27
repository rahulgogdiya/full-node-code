const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");

const app = express();
const PORT = 8001;

//mongoose Connection-----------------
mongoose
  .connect("mongodb://localhost:27017/youtube-1")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error", err));
//mongoose Connection-----------------

//Schema---------------------------
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
  },
  Email: {
    type: String,
    require: true,
    unique: true,
  },
  jobtitl: {
    type: String,
  },
  Gender: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

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

app.get("/users", async (req, res) => {
  const allDBusers = await User.find({});
  const html = `
  <ul>
  ${allDBusers
    .map((user) => ` <li>${user.firstName} ${user.Email}</li>`)
    .join("")}
  </ul>
  `;
  res.send(html);
});

//Routes
app.get("/api/users", async (req, res) => {
  const allDBusers = await User.find({});
  return res.json(allDBusers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "change" });
    return res.json({ status: "sucess" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "sucess" });
  });

app.post("/api/users", async (req, res) => {
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
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    Email: body.email,
    Gender: body.gender,
    jobtitl: body.job_title,
  });
  console.log(result);
  return res.status(201).json({ msg: "sucess" });
});

app.listen(PORT, () => console.log(`Srever Started at port : ${PORT}`));
