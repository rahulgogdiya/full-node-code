const { createHash, randomBytes } = require("crypto"); //password hashing
const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    fulName: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/images.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHash("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

// virtul function---------
userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found..");

  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvidedHash = createHash("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassword !== userProvidedHash)
    throw new Error("Increate Password..");

  return user;
});
// virtul function---------

const User = model("user", userSchema);
module.exports = User;
