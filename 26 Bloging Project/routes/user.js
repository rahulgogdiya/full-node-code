const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.matchPassword(email, password);

  console.log("user", user);
  return res.redirect("/");
});

router.post("/signup", async (req, res) => {
  const { fulName, email, password } = req.body;
  await User.create({
    fulName,
    email,
    password,
  });
  return res.redirect("/");
});
module.exports = router;
