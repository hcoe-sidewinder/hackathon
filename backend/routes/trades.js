import express from "express";

import validateUser from "../middleware/user.validate.js";

import addTrade from "./trade/create.js";
import { getTrades, getTradeById } from "./trade/read.js";
import setDonor from "./trade/update.js";
import completePhase from "./trade/phase/update.js";

const router = express.Router();

//get trades
router.get("/", getTrades);

//get trade by id
router.get("/:tradeId(\\w+)", getTradeById);

// add trade
router.post("/add", validateUser, addTrade);

// edit trade by id
router.put("/:tradeId(\\w+)/pledge", validateUser, setDonor);

// complete phase by trade id
router.put(
  "/:tradeId(\\w+)/completePhase/:phase(\\d+)",
  validateUser,
  completePhase,
);

// delete trade by id
//router.delete("/delete/:userId(\\d+)", deleteUser);

export default router;
