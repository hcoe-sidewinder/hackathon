import mongoose from "mongoose";

const dbUserName = String(process.env.DB_USER_NAME);
const dbPassword = encodeURIComponent(String(process.env.DB_PASSWORD));
const dbHost = String(process.env.DB_HOST);
const dbName = "hackathon";
const dbOptions = `retryWrites=true&w=majority&appName=${dbName}`;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/?${dbOptions}`,
    );

    console.log("DB Connection Established...");
  } catch (error) {
    console.log("DB Connection failed...");
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
