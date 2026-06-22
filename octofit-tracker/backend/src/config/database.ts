import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/octofit_db";

export const connectDatabase = async () => {
  await mongoose.connect(mongoUri);
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
};