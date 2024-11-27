const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewIDURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required.." });

  const shortID = shortid();

  await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    visiteHistory: [],
  });
  return res.json({ id: shortID });
}

async function handlegetAnalitys(req, res) {
  const shortIds = req.params.shortId;
  const result = await URL.findOne({shortIds})
  return res.json({totalClicks:result})
}

module.exports = {
  handleGenerateNewIDURL,handlegetAnalitys
};
