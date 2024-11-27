const { getUser } = require("../services/auth");

function checkForAuthorization(req, res, next) {
  const tokencookies = req.cookies?.token;
  req.user = null;

  if (!tokencookies) return next();

  const token = tokencookies;
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("Unauthorized");

    return next();
  };
}

module.exports = { checkForAuthorization, restrictTo };
