import mongoose from "mongoose";
import { error, info } from "../utils/logger.js";
import { MONGODB_URI } from "../utils/config.js";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info("Connected to Database!");
  })
  .catch((err) => {
    error(err);
  });
