import HTTP_STATUS_CODE from "../utils/status.codes";

const validateUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      console.log(`Please log in to get this content`);
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        message: "Please login to get this content",
        success: false,
      });
    }

    let payload;

    try {
      payload = jwt.verify(token, SECRETKEY);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.error(`Token expired: ${error}`);
        return res
          .status(HTTP_STATUS_CODE.UNAUTHORIZED)
          .json({ message: "Token expired" });
      } else if (error instanceof jwt.JsonWebTokenError) {
        console.error(`Invalid token: ${error}`);
        return res
          .status(HTTP_STATUS_CODE.UNAUTHORIZED)
          .json({ message: "Invalid token" });
      } else if (error instanceof jwt.NotBeforeError) {
        console.error(`Token not active: ${error}`);
        return res
          .status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json({ message: "Token not yet active" });
      }

      console.error(`Unexpected authentication error: ${error}`);
      return res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({ message: "Authentication error" });
    }

    req.locals.userId = payload.id;

    next();
  } catch (error) {
    console.log(`Cannot validate user: ${error}`);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Cannot validate user",
      success: false,
    });
  }
};

export default validateUser;
