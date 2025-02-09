import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./utils/connect.db.js";
import userRouter from "./routes/users.js";
import bankRouter from "./routes/banks.js";
import tradeRouter from "./routes/trades.js";

const app = express();

// to make app understant JSON
app.use(express.json());

// to parse cookie
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// database connection
connectDB();

// Routes
app.use("/api/user", userRouter);
app.use("/api/bank", bankRouter);
app.use("/api/trade", tradeRouter);

// network port and server
const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
