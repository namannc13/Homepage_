import mongoose from "mongoose";
import logger from "../utils/logger.js";
import config from "../utils/config.js";

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to Database!");
  })
  .catch((err) => {
    logger.error(err);
  });
