import Bank from "../../models/bank.schema.js";

const addBank = async ({ bankName, accNo, accName }) => {
  try {
    if (!bankName || !accNo || !accName) {
      throw "Bank Name or Accont Name or Account Number is not available";
    }

    const accNoAlreadyExists = await Bank.findOne({ accNo: accNo }).select({
      accNo: 1,
      _id: 0,
    });

    if (accNoAlreadyExists) {
      throw "Account no already exists";
    }

    const bank = await Bank.create({
      bankName: bankName,
      accNo: accNo,
      accName: accName,
    });

    return bank;
  } catch (error) {
    console.log(`Cannot add bank: ${error}`);
    return;
  }
};

export default addBank;
