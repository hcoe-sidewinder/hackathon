import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema(
  {
    doneeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    phaseId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Phase",
      required: false,
    },

    nob: {
      type: String,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    panNo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Trade = mongoose.model("Trade", tradeSchema);

export default Trade;
