import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema(
  {
    doneeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },

    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: false,
    },

    phaseId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Phase",
      require: false,
    },

    nob: {
      type: String,
      require: true,
    },

    totalAmount: {
      type: Number,
      require: true,
    },

    desc: {
      type: String,
      require: true,
    },

    panNo: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const Trade = mongoose.model("Trade", tradeSchema);

export default Trade;
