const User = require("../models/user");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/login");
  // return res.render("Home");
}
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid User name password",
    });

  return res.redirect("/");
  // return res.render("Home");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
