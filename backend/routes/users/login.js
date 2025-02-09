import User from "../../models/user/user.schema.js";
import Session from "../../models/user/session.schema.js";

import validateEmail from "../../middleware/email.validate.js";

import HTTP_STATUS_CODE from "../../utils/status.codes.js";
import { SECRET_KEY } from "../../utils/constants.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HTTP_STATUS_CODE.INVALID).json({
        message: "All fields should be filled",
        success: false,
      });
    }

    if (!validateEmail(email)) {
      return res
        .status(HTTP_STATUS_CODE.INVALID)
        .json({ message: "Not a valid email", success: false });
    }

    const loginUser = await User.findOne({ email });
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
      expiresIn: "30m",
    });
    const refreshToken = require("crypto").randomBytes(64).toString("hex"); // 64 bytes random string

    try {
      await Session.create({
        userId: loginUser._id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    } catch (error) {
      console.log(`Could not create session for user: ${error}`);
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        message: "Could not create session for user",
        error: error,
        success: false,
      });
    }

    const passUser = {
      name: loginUser.name,
      email: loginUser.email,
    };

    //put token in cookie and then pass the cookie
    return res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 30 * 60 * 1000, // 30 min
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      })
      .json({
        message: "Login successful",
        success: true,
        passUser,
        accessToken: accessToken,
        refreshToken: refreshToken,
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
