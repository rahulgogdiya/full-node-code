// const User = require("../routes/user");
const User = require("../models/user");

async function handleGetAlluser(req, res) {
  const allDBusers = await User.find({});
  return res.json(allDBusers);
}
async function handlegetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}
async function handlegetUpdateuserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "kumar" });
  return res.json({ status: "sucess" });
}
async function handleDeleteuserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "sucess" });
}
async function handleCreateUser(req, res) {
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
  return res.status(201).json({ msg: "sucess", id: result._id });
}
module.exports = {
  handleGetAlluser,
  handlegetUserById,
  handlegetUpdateuserById,
  handleDeleteuserById,
  handleCreateUser,
};
