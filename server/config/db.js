import mongoose from "mongoose";
import dotenv from "dotenv";
import { error, info } from "../utils/logger.js";

dotenv.config();

mongoose
  .connect(process.env.mongo_uri)
  .then(() => {
    info("Connected to Database!");
  })
  .catch((err) => {
    error(err);
  });
