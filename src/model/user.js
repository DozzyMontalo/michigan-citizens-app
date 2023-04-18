const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => {
          if (!validator.isEmail(value)) {
            throw new Error("Email is invalid");
          }
        },
      },
    },
    password: {
      type: "String",
      trim: true,
      required: true,
      minLength: 7,
      validate: {
        validator: (value) => {
          if (value.toLowerCase().includes("password")) {
            throw new Error("incorrect password");
          }
        },
      },
    },
    roles: {
      type: String,
      required: true,
      enum: ["admin", "read-only"],
      default: "read-only",
    },

    age: {
      type: Number,
      default: 0,
      validate: {
        validator: (value) => {
          if (value < 0) {
            throw new Error("Age must be a positive number");
          }
        },
      },
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      }, //an object with the token property. to access token, use token.token
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("citizens", {
  ref: "Citizen",
  localField: "_id",
  foreignField: "admin",
});

userSchema.virtual("wards", {
  ref: "Ward",
  localField: "_id",
  foreignField: "admin",
});

userSchema.virtual("states", {
  ref: "State",
  localField: "_id",
  foreignField: "admin",
});

userSchema.virtual("lgas", {
  ref: "LGA",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

//create a schema method that helps to query the User model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("unable to login");
  }
  return user;
};

//Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
