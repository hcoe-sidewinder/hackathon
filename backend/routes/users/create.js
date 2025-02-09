import bcrypt from "bcryptjs";

import User from "../../models/user/user.schema.js";
import validateEmail from "../../middleware/email.validate.js";

import HTTP_STATUS_CODE from "../../utils/status.codes.js";
import { SALT } from "../../utils/constants.js";
import addBank from "../bank/create.js";
import cloudinary from "../../utils/cloudinary.js";

const addUser = async (req, res) => {
  try {
    const userDetails = req.body;
    const profilePicture = req.files["profilePicture"]?.[0];
    const panImage = req.files["panImage"]?.[0];
    console.log(profilePicture);
    console.log(panImage);

    if (!validateEmail(userDetails.email)) {
      return res
        .status(HTTP_STATUS_CODE.INVALID)
        .json({ message: "Not a valid userDetails.email", success: false });
    }

    const panAlreadyExists = await User.findOne({
      panNo: userDetails.panNumber,
    });

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
    const convertToDataURI = (file) => {
      if (!file || !file.buffer) {
        console.log("File buffer is missing or file is undefined");
        return null;
      }
      return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    };

    const profileImageURI = convertToDataURI(profilePicture);
    const panImageURI = convertToDataURI(panImage);
    let cloudResponseProfile;
    let cloudResponsePan;
    try {
      cloudResponseProfile = await cloudinary.uploader.upload(profileImageURI);
      cloudResponsePan = await cloudinary.uploader.upload(panImageURI);
    } catch (error) {
      console.log("cannot upload images", error);
      throw error;
    }

    const bank = await addBank({
      bankName: userDetails.bankName,
      accNo: userDetails.bankAccountNumber,
      accName: userDetails.accountName,
    });

    console.log(bank);

    if (!bank) {
      return res
        .status(HTTP_STATUS_CODE.INVALID)
        .json({ message: "Bank details not provided", success: false });
    }

    userDetails.password = await bcrypt.hash(userDetails.password, SALT);

    console.log(cloudResponsePan);
    console.log(cloudResponseProfile);
    try {
      await User.create({
        panNo: userDetails.panNumber,
        name: userDetails.fullName,
        email: userDetails.email,
        password: userDetails.password,
        nob: userDetails.nob,
        phNo: userDetails.phoneNumber,
        panImg: cloudResponsePan.secure_url,
        profilePic: cloudResponseProfile.secure_url,
        bankId: bank._id,
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
