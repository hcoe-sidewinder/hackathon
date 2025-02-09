import bcrypt from "bcryptjs";

import User from "../../models/user/user.schema.js";
import validateEmail from "../../middleware/email.validate.js";

import HTTP_STATUS_CODE from "../../utils/status.codes.js";
import { SALT } from "../../utils/constants.js";
import addBank from "../bank/create.js";

const addUser = async (req, res) => {
  try {
    const userDetails = req.body;

    if (!validateEmail(userDetails.email)) {
      return res
        .status(HTTP_STATUS_CODE.INVALID)
        .json({ message: "Not a valid userDetails.email", success: false });
    }

    const panAlreadyExists = await User.findOne({ panNo: userDetails.panNo });

    if (panAlreadyExists) {
      return res
        .status(HTTP_STATUS_CODE.INVALID)
        .json({ message: "Duplicate Pan no", success: false });
    }

    const emailAlreadyExists = await User.findOne({ email: userDetails.email });

    if (emailAlreadyExists) {
      return res
        .status(HTTP_STATUS_CODE.INVALID)
        .json({ message: "Email already exists", success: false });
    }

    const bank = await addBank({
      bankName: userDetails.bankName,
      accNo: userDetails.accNo,
      accName: userDetails.accName,
    });

    console.log(bank);

    if (!bank) {
      return res
        .status(HTTP_STATUS_CODE.INVALID)
        .json({ message: "Bank details not provided", success: false });
    }

    userDetails.password = await bcrypt.hash(userDetails.password, SALT);

    try {
      await User.create({
        panNo: userDetails.panNo,
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
        nob: userDetails.nob,
        phNo: userDetails.phNo,
        panImg: userDetails.panImg,
        profilePic: userDetails.profilePic,
        bankId: bank.id,
      });

      return res.status(HTTP_STATUS_CODE.OK).json({
        message: "User created successfully",
        success: true,
      });
    } catch (e) {
      console.log(`Cannot create user: ${e}`);
      throw e;
    }
  } catch (error) {
    console.log(`Cannot add user: ${error}`);
    return res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "Cannot add user", success: false, error: error });
  }
};

export default addUser;
