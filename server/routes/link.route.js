import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { addLink, deleteLink, getLinks } from "../controllers/link.controller.js";

const linkRouter = express.Router();

linkRouter.get("/getLinks", verifyToken, getLinks );
linkRouter.post("/addLink", verifyToken, addLink );
linkRouter.post("/deleteLink", verifyToken, deleteLink );

export { linkRouter };