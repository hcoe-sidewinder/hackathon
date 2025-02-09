import express from "express";
import { getBanks } from "./bank/read.js";

const router = express.Router();

//get banks
router.get("/", getBanks);

//get bank by id
//router.get("/:userId(\\d+)", getUsersById);

// add bank
//router.post("/register", addUser);

// edit bank by id
//router.put("/edit/:userId(\\d+)", editUser);

// delete bank by id
//router.delete("/delete/:userId(\\d+)", deleteUser);

export default router;
