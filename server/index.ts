import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/connectDB";

dotenv.config()
const app = express();

const PORT = 9000;

app.listen(PORT, () => {
  connectDB()
  console.log(`Server connected at port ${PORT}`);
});
