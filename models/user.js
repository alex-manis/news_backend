const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "The email field is required."],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "You must enter a valid email",
      },
    },

    password: {
      type: String,
      required: [true, "The password field is required."],
      select: false,
    },

    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: [true, "The name field is required."],
    },
  },
  { timestamps: true }
);

userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password
) {
  const user = await this.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new Error("Incorrect email or password");
  }

  return user;
};

module.exports = mongoose.model("user", userSchema);
