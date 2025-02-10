import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    panNo: {
      type: String,
      unique: true,
      required: true,
    },

    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      require: true,
    },

    nob: {
      type: String,
      require: true,
    },

    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
      require: true,
    },

    phNo: {
      type: String,
    },

    panImg: {
      type: String,
      require: true,
    },

    profilePic: {
      type: String,
      require: false,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
