import Session from "../../models/user/session.schema.js";

import HTTP_STATUS_CODE from "../../utils/status.codes.js";
import { SECRET_KEY } from "../../utils/constants.js";

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json({ message: "Unauthorized", success: false });
    }

    const storedToken = await Session.findOne({ token: refreshToken });

    if (!storedToken || storedToken.expiresAt < new Date(Date.now())) {
      return res
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json({ message: "Invalid or expired refresh token", success: false });
    }

    // generate token
    const payload = {
      id: storedToken.userId,
    };

    const newAccessToken = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "30m",
    });
    const newRefreshToken = require("crypto").randomBytes(64).toString("hex"); // 64 bytes random string

    await Session.updateOne(
      { _id: storedToken._id },
      {
        $set: {
          token: newRefreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      },
    );

    res
      .cookie("access_token", newAccessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 30 * 60 * 1000, // 30 min
      })
      .cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      })
      .json({
        message: "Succesfully refreshed token",
        success: true,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
  } catch (error) {
    console.error(`Cannot create refresh token: ${error}`);
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", success: false });
    return;
  }
};

export default refreshToken;
