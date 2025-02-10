import Trade from "../../models/trade.schema.js";
import HTTP_STATUS_CODE from "../../utils/status.codes.js";

const setDonor = async (req, res) => {
  try {
    const tradeId = req.params.tradeId;
    const userId = res.locals.userId;

    const trade = await Trade.findById(tradeId);

    if (!trade) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: "Invalid tradeId",
        success: false,
      });
    }

    console.log(`donorId: ${trade.donorId} doneeId: ${userId}`);

    if (trade.doneeId == userId) {
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
      { new: true },
    )
      .populate({
        path: "donorId",
        select: "panNo name email nob phNo panImg profilePic bankId",
        populate: {
          path: "bankId",
          select: "bankName accNo accName",
        },
      })
      .populate({
        path: "doneeId",
        select: "panNo name email nob phNo panImg profilePic bankId",
        populate: {
          path: "bankId",
          select: "bankName accNo accName",
        },
      })
      .populate({
        path: "phaseId",
        select: "phase amount boqImage completed",
      });

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
