import mongoose from "mongoose";

const sessionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },

    token: {
      type: String,
      require: true,
    },

    expiresAt: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true },
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
