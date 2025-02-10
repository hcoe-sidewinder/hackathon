import HTTP_STATUS_CODE from "../../utils/status.codes.js";

import Trade from "../../models/trade.schema.js";
import Phase from "../../models/phase.schema.js";

const addTrade = async (req, res) => {
  try {
    const tradeBody = req.body;
    const userId = res.locals.userId;

    switch (true) {
      case !tradeBody.nob:
        console.log(`Missing name of business`);
        return res.status(HTTP_STATUS_CODE.INVALID).json({
          message: "Missing name of business",
          success: false,
        });

      case !tradeBody.totalAmount:
        console.log(`Missing Amount`);
        return res.status(HTTP_STATUS_CODE.INVALID).json({
          message: "Missing Amount",
          success: false,
        });

      case !tradeBody.desc:
        console.log(`Missing desc`);
        return res.status(HTTP_STATUS_CODE.INVALID).json({
          message: "Missing desc",
          success: false,
        });

      case !tradeBody.panNo:
        console.log(`Missing PAN no`);
        return res.status(HTTP_STATUS_CODE.INVALID).json({
          message: "Missing PAN no",
          success: false,
        });

      case !tradeBody.phases:
        console.log(`Missing phases`);
        return res.status(HTTP_STATUS_CODE.INVALID).json({
          message: "Missing phases",
          success: false,
        });

      default:
        break;
    }

    tradeBody.phases = await Promise.all(
      tradeBody.phases.map(async (item) => {
        const phase = await Phase.create({
          phase: item.phase,
          amount: item.amount,
          boqImage: item.boqImage,
        });

        return phase._id;
      }),
    );

    const newTrade = await Trade.create({
      doneeId: userId,
      nob: tradeBody.nob,
      totalAmount: tradeBody.totalAmount,
      desc: tradeBody.desc,
      panNo: tradeBody.panNo,
      phaseId: tradeBody.phases,
    });

    const trade = await Trade.find({ _id: newTrade.id })
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
      message: "Trade created successfully",
      success: true,
      data: trade,
    });
  } catch (error) {
    console.log(`Cannot create trade: ${error}`);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Cannot create trade",
      success: false,
    });
  }
};

export default addTrade;
