import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

const config = { MONGODB_URI, PORT, JWT_SECRET };
export default config;
