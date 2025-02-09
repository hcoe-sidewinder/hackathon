import Trade from "../../models/trade.schema";
import HTTP_STATUS_CODE from "../../utils/status.codes";

const setDonor = async (req, res) => {
  try {
    const tradeId = req.params.tradeId;
    const userId = req.locals.userId;
    const trade = await Trade.findById(tradeId);
    if (!trade) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: "Invalid tradeId",
        success: false,
      });
    }
    if (trade.doneeId === userId) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: "Donor and donee can't be same user",
        success: false,
      });
    }
    const updatedTrade = await Trade.findByIdAndUpdate(
      tradeId,
      {
        $set: { donorId: userId },
      },
      { new: true }
    );
    return res.status(HTTP_STATUS_CODE.OK).json({
      message: "Donor set successfully",
      success: true,
      data: updatedTrade,
    });
  } catch (error) {
    console.log("Cannot add donor", error);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Cannot add donor",
      success: false,
    });
  }
};

export default setDonor;