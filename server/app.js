import express from "express";
import "./config/db.js";
import { authRouter } from "./routes/auth.route.js";
import { linkRouter } from "./routes/link.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import middleware from "./utils/middleware.js";

const app = express();

app.use(
  cors({
    origin: "https://homepage-full-stack-thvn.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/link", linkRouter);

app.use(middleware.errorHandlerMiddleware);

export { app };
