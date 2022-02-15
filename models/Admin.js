const mongoose = require("mongoose");
const validator = require("validator");
const sharp = require("sharp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    subAdmin: {
      type: Boolean,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
adminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = jwt.sign(
    { _id: admin._id.toString() },
    process.env.ADMIN_TOKEN_SECRET
  );
  console.log(token);
  admin.tokens = admin.tokens.concat({ token });
  await admin.save();

  return token;
};
adminSchema.statics.findByCredentials = async (email, password) => {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new Error("Unable to login");
  }

  // const isMatch = await bcrypt.compare(password, admin.password);

  if (password !== admin.password) {
    throw new Error("Unable to login");
  }

  return admin;
};
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
