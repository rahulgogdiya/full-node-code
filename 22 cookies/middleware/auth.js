const { getUser } = require("../services/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.headers["Authorization"];

  if (!userUid) return res.redirect("/login");
  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);

  if (!userUid) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.headers["authorization"];
  const token = userUid?.split("Bearer")[1];
  const user = getUser(token);
  req.user = user;
  next();
}
module.exports = { restrictToLoggedInUserOnly, checkAuth };