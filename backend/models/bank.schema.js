import mongoose from "mongoose";

const bankSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
      required: true,
    },

    accNo: {
      type: String,
      unique: true,
      required: true,
    },

    accName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Bank = mongoose.model("Bank", bankSchema);

export default Bank;
