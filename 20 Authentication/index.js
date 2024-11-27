const express = require("express");
const { connectMongoDB } = require("./connect");
const URL = require("./models/url");
const path = require("path");

const urlRouter = require("./routes/url");
const staticRoute = require("./routes/StaticRouter");
const userRoute = require("./routes/User");

const app = express();
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRouter);
app.use("/user", userRoute);
app.use("/", staticRoute);

//-------------------------------------
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectMongoDB("mongodb://0.0.0.0:27017/short-url").then(() =>
  console.log("MongoDB Connected..")
);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const Entry = await URL.findOneAndUpdate(
    {
      shortID: shortId,
    },
    {
      $push: {
        visiteHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(Entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started Port : ${PORT}`));
