const express = require("express");
const { conectionMongoDB } = require("./conation");

const { logReqRes } = require("./middlewares/index");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

//Connections--------
conectionMongoDB("mongodb://localhost:27017/youtube-1").then(()=>console.log("connected mongodb"));

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/user", userRouter);
app.listen(PORT, () => console.log(`Srever Started at port : ${PORT}`));
