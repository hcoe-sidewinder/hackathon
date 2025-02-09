import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/user.schema.js";

import HTTP_STATUS_CODE from "../../utils/status.codes.js";
import { SECRET_KEY } from "../../utils/constants.js";

const login = async (req, res) => {
  try {
    const { panNumber, password } = req.body;

    if (!panNumber || !password) {
      return res.status(HTTP_STATUS_CODE.INVALID).json({
        message: "All fields should be filled",
        success: false,
      });
    }

    const loginUser = await User.findOne({ panNo: panNumber });
    if (!loginUser) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        message: "User does not exist",
        success: false,
      });
    }

    //compare passwords
    const passwordMatch = await bcrypt.compare(password, loginUser.password);
    if (!passwordMatch) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: "Incorrect Password",
        success: false,
      });
    }

    const payload = {
      id: loginUser._id,
    };

    //generate the token
    const accessToken = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "7d",
    });

    const passUser = {
      name: loginUser.name,
      panNo: loginUser.panNo,
      email: loginUser.email,
      nob: loginUser.nob,
      phNo: loginUser.phNo,
      profilePic: loginUser.profilePic,
      bankId: loginUser.bankId,
    };

    //put token in cookie and then pass the cookie
    return res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        message: "Login successful",
        success: true,
        passUser,
        accessToken: accessToken,
      });
  } catch (error) {
    console.log(error);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Log in failed",
      success: false,
    });
  }
};

export default login;
