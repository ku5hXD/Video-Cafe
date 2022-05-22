const mongoose = require("mongoose");
const validator = require("validator");
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
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password should not be equal to 'password' ");
        }
      },
    },
    avatar: {
      type: String,
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

// we can create our own custom function using userSchema.statics on Model
// Statics are accessible on models and called model methods
userSchema.statics.findByCrendentials = async function (email, password) {
  const user = await User.findOne({ email });

  // if user not found
  if (!user) {
    throw new Error("There is no such user");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  // if password not match
  if (!isMatch) {
    throw new Error("password is incorrect !");
  }

  return user;
};

// userSchema.methods help to create custom function for specific user
// methods are accessible on instance and called instances method
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY);

  user.tokens = user.tokens.concat({ token: token }); //setting token to tokens array of individual user
  await user.save(); //saving user

  return token;
};

// this toJSON Mehod will call automatically on object
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.tokens;
  delete userObj.avatar;

  return userObj;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// delete the tasks also when user is deleted
userSchema.pre("remove", async function (next) {
  const user = this;

  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema); // this schema creating job is mongoose doing already behind the scenes ,Here we have to do some work before save so we did this with own

module.exports = User;
