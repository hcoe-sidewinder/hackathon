import Bank from "../../models/bank.schema.js";
import HTTP_STATUS_CODE from "../../utils/status.codes.js";

export const getBanks = async (_req, res) => {
  try {
    const banks = await Bank.find();

    return res.status(HTTP_STATUS_CODE.OK).json({
      message: "Banks fetched successfully",
      success: true,
      data: banks,
    });
  } catch (error) {
    console.log(`Cannot fetch banks: ${error}`);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Cannot fetch banks",
      success: false,
    });
  }
};
