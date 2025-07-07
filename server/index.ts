import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.routes";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
import compression from "compression";
import helmet from "helmet";
import path from "path";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8000;
console.log("PORT", PORT);

const _dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());

const corsOptions = {
  origin: [
    // process.env.FRONTEND_URI,
    "http://localhost:8000",
    "http://localhost:5173",
    // "https://cravory-y3qu.onrender.com",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

// app.use((req, res, next) => {
//   console.log("404 Not Found:", req.method, req.originalUrl);
//   next();
// });

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  connectDB();
  console.log(`Server connected at port ${PORT}`);
});
