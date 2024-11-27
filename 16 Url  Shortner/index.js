const express = require("express");
const urlRouter = require("./routes/url");
const { connectMongoDB } = require("./connect");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

app.use(express.json());

app.use("/url", urlRouter);

connectMongoDB("mongodb://0.0.0.0:27017/short-url").then(() =>
  console.log("MongoDB Connected..")
);

app.get("/:shortId", async (req, res) => {
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
