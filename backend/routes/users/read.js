import User from "../../models/user/user.schema.js";
import HTTP_STATUS_CODE from "../../utils/status.codes.js";

export const getUsers = async (_req, res) => {
  try {
    const users = await User.find().populate({
      path: "bankId",
      select: "bankName accNo accName",
    });

    return res.status(HTTP_STATUS_CODE.OK).json({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(`Cannot fetch users: ${error}`);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Cannot fetch users",
      success: false,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById({ _id: userId }).populate({
      path: "bankId",
      select: "bankName accNo accName",
    });

    return res.status(HTTP_STATUS_CODE.OK).json({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(`Cannot fetch user with id: ${error}`);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Cannot fetch user by id",
      success: false,
    });
  }
};
