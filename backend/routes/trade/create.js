import HTTP_STATUS_CODE from "../../utils/status.codes.js";

import Trade from "../../models/trade.schema.js";
import Phase from "../../models/phase.schema.js";

const addTrade = async (req, res) => {
  try {
    const tradeBody = req.body;
    const userId = req.locals.userId;

    switch (true) {
      case !tradeBody.donorId:
        console.log(`Missing donor id`);
        return res.status(HTTP_STATUS_CODE.INVALID).json({
          message: "Missing donor id",
          success: false,
        });

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

    tradeBody.phases = tradeBody.phases.map(async (item, _index, _array) => {
      const phase = await Phase.create({
        state: item.state,
        amount: item.amount,
        boqImage: item.boqImage,
      });

      return phase._id;
    });

    await Trade.create({
      donorId: tradeBody.donorId,
      nob: tradeBody.nob,
      totalAmount: tradeBody.totalAmount,
      desc: tradeBody.desc,
      panNo: tradeBody.panNo,
      phases: tradeBody.phases,
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
