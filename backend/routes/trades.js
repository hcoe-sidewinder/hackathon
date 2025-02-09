import express from "express";

import validateUser from "../middleware/user.validate.js";
import addTrade from "./trade/create.js";
import setDonor from "./trade/update.js";

const router = express.Router();

//get trades
//router.get("/", getBanks);

//get trade by id
//router.get("/:tradeId(\\w+)", getUsersById);

// add trade
router.post("/add", validateUser, addTrade);

// edit trade by id
router.put("/:tradeId(\\w+)/pledge", validateUser, setDonor);

// delete trade by id
//router.delete("/delete/:userId(\\d+)", deleteUser);

export default router;
