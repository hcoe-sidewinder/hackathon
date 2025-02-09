import mongoose from "mongoose";

const phaseSchema = new mongoose.Schema(
  {
    phase: {
      type: Number,
      require: true,
      enum: [1, 2, 3, 4, 5],
    },

    amount: {
      type: Number,
      require: true,
    },

    boqImage: {
      type: String,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Phase = mongoose.model("Phase", phaseSchema);

export default Phase;
