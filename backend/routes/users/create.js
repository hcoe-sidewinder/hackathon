import User from "../../models/user/user.schema.js";
import validateEmail from "../../middleware/email.validate.js";

import HTTP_STATUS_CODE from "../../utils/status.codes.js";
import { SALT } from "../../utils/constants.js";

const addUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!validateEmail(email)) {
      return res
        .status(HTTP_STATUS_CODE.INVALID)
        .json({ message: "Not a valid email", success: false });
    }

    const emailAlreadyExists = await User.findOne({ email: email });

    if (emailAlreadyExists) {
      return res
        .status(HTTP_STATUS_CODE.INVALID)
        .json({ message: "Email already exists", success: false });
    }

    password = await bcrypt.hash(password, SALT);

    try {
      await User.create({
        name: name,
        email: email,
        password: password,
      });

      res.status(HTTP_STATUS_CODE.OK).json({
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
