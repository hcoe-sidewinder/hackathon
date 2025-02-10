import HTTP_STATUS_CODE from "../../utils/status.codes.js";
import Trade from "../../models/trade.schema.js";

export const getTrades = async (_req, res) => {
  try {
    const trades = await Trade.find({})
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

    console.log(`Fetched trades succesfully`);
    return res.status(HTTP_STATUS_CODE.OK).json({
      message: "Trades fetched succesfully",
      success: true,
      data: trades,
    });
  } catch (error) {
    console.log(`Cannot fetch trades: ${error}`);

    return res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "Cannot fetch trades", success: false });
  }
};

export const getTradeById = async (req, res) => {
  try {
    const tradeId = req.params.tradeId;

    const trade = await Trade.findOne({ _id: tradeId })
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

    console.log(`Fetched trade by id succesfully`);
    return res.status(HTTP_STATUS_CODE.OK).json({
      message: "Trade fetched succesfully",
      success: true,
      data: trade,
    });
  } catch (error) {
    console.log(`Cannot fetch trade with id: ${error}`);

    return res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "Cannot fetch trade with id", success: false });
  }
};

export const getByDonee = async (_req, res) => {
  try {
    const doneeId = res.locals.userId;

    const trades = await Trade.find({ doneeId: doneeId })
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
      message: "Get Trade by Donee successful",
      success: true,
      data: trades,
    });
  } catch (error) {
    console.log(`Cannot fetch users asked trade: ${error}`);

    return res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "Cannot fetch user asked trade", success: false });
  }
};

export const getByDonor = async (_req, res) => {
  try {
    const donorId = res.locals.userId;

    const trades = await Trade.find({ donorId: donorId })
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
      message: "Get Trade by Donee successful",
      success: true,
      data: trades,
    });
  } catch (error) {
    console.log(`Cannot fetch users asked trade: ${error}`);

    return res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "Cannot fetch user asked trade", success: false });
  }
};
