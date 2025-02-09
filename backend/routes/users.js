import express from "express";
import login from "./users/login.js";

const router = express.Router();

//get users
//router.get("/", getUsers);

//get user by id
//router.get("/:userId(\\d+)", getUsersById);

// add user
//router.post("/add", addUser);

// edit user by id
//router.put("/edit/:userId(\\d+)", editUser);

// delete user by id
//router.delete("/delete/:userId(\\d+)", deleteUser);

// login
router.post("/login", login);

// refresh token
//router.post("/refresh", refreshToken);

export default router;
