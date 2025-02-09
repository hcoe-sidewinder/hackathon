import mongoose from "mongoose";

const bankSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
      require: true,
    },

    accNo: {
      type: String,
      unique: true,
      require: true,
    },

    accName: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const Bank = mongoose.model("Bank", bankSchema);

export default Bank;
