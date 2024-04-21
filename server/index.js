import express from "express";
import "./config/db.js";
import { authRouter } from "./routes/auth.route.js";
import { linkRouter } from "./routes/link.route.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
app.use(cors({
  origin: 'https://homepage-full-stack-thvn.vercel.app',
  methods: ['GET', 'POST'], 
  credentials: true, 
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/link", linkRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
