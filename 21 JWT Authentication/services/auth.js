const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secret = "cgfgfygfffhfyfl";

function setUser() {
  return jwt.sign({ _id: User._id, email: User.email }, secret);
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
