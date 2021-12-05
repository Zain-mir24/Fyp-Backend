const mongoose = require("mongoose");
const validator = require("validator");
const sharp = require("sharp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const userSchema = new mongoose.Schema(
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
    userType: {
      type: String,
      required:true
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
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.ACCESS_TOKEN_SECRET
  );
  console.log(token);
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};
userSchema.methods.generateSecretToken = async function () {
  const user = this;
  const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
  const payload = {
    email: user.email,
    _id: user._id.toString(),
  };
  const token = jwt.sign(payload, secret, { expiresIn: "5m" });
  const link = `http://localhost:3000/resetPassword/${user._id}/${token}`;
  await user.save();

  return link;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete user tasks when user is removed
// userSchema.pre('remove', async function (next) {
//     const user = this
//     await Task.deleteMany({ owner: user._id })
//     next()
// })

const User = mongoose.model("User", userSchema);

module.exports = User;
