import express from "express";

import login from "./users/login.js";
import addUser from "./users/create.js";
import { getUsers, getUserById } from "./users/read.js";
import upload from "../middleware/multer.js";

const router = express.Router();

//get users
router.get("/", getUsers);

//get user by id
router.get("/:userId(\\w+)", getUserById);

// add user
router.post(
  "/register",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "panImage", maxCount: 1 },
  ]),
  addUser
);

// edit user by id
//router.put("/edit/:userId(\\d+)", editUser);

// delete user by id
//router.delete("/delete/:userId(\\d+)", deleteUser);

// login
router.post("/login", login);

// refresh token
//router.post("/refresh", refreshToken);

export default router;
