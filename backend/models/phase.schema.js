import mongoose from "mongoose";

const phaseSchema = new mongoose.Schema(
  {
    state: {
      type: Int32,
      require: true,
    },

    amount: {
      type: Number,
      require: true,
    },

    boqImage: {
      type: [String],
    },
  },
  { timestamps: true },
);

const Phase = mongoose.model("Phase", phaseSchema);

export default Phase;
