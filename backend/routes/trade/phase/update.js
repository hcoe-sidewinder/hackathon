import Trade from "../../../models/trade.schema.js";
import Phase from "../../../models/phase.schema.js";

import HTTP_STATUS_CODE from "../../../utils/status.codes.js";

const completePhase = async (req, res) => {
  try {
    const tradeId = req.params.tradeId;
    const phase = Number(req.params.phase);
    const userId = res.locals.userId;

    const boqImage = req.body.boqImage;

    if (!boqImage) {
      console.log(`Boq Image is required to complete phase`);
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: "Boq Image is required to complete phase",
        success: false,
      });
    }

    const trade = await Trade.findOne({ _id: tradeId }).populate({
      path: "phaseId",
      select: "phase amount boqImage completed",
    });

    if (userId != trade.doneeId) {
      console.log(`Only donee can complete phases`);
      return res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({ message: "Only donee can complete phases", success: false });
    }

    if (!trade.donorId) {
      console.log(
        `Trade does not have donor yet, no point in completing phase`,
      );
      return res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({ message: "Trade does not have donor", success: false });
    }

    if (!(phase >= 1 && phase <= 5)) {
      console.log("Phase must be between 1 and 5");

      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: "Phase must be between 1 and 5",
        success: false,
      });
    }

    if (phase > trade.phaseId.length) {
      console.log("Phase does not exists");

      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: "Phase does not exists",
        success: false,
      });
    }

    for (let index = phase - 2; index >= 0; index--) {
      const element = trade.phaseId[index];

      if (!element.completed) {
        console.log("Previous phases need to be completed");

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
          message: "Previous phases need to be completed",
          success: false,
        });
      }
    }

    const phaseId = trade.phaseId[phase - 1];

    await Phase.findByIdAndUpdate(
      { _id: phaseId.id },
      {
        $set: { boqImage: boqImage, completed: true },
      },
    );

    const lastPhase = phase == trade.phaseId.length;

    const updatedTrade = await Trade.findByIdAndUpdate(
      { _id: tradeId },
      {
        $set: { completed: lastPhase },
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
      message: "Phase updated successfully",
      success: true,
      data: updatedTrade,
    });
  } catch (error) {
    console.log(`Cannot complete phase: ${error}`);

    return res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "Cannot complete phase", success: false });
  }
};

export default completePhase;
