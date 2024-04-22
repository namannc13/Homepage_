import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import { JWT_SECRET } from "./config.js";
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(errorHandler(401, "Unauthorized"));

  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return next(errorHandler(401, "Unauthorized"));
  }

  const accessToken = tokenParts[1];

  jwt.verify(accessToken, JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    req.user = user;
    next();
  });
};
