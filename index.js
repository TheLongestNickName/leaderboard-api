import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import leaderboardRoutes from "./routes/leaderboard.js";
import authRoutes from "./routes/auth.js";
import authMiddleware from "./middleware/auth.js";
import { apiLimiter } from "./middleware/rateLimit.js";
import { cacheMiddleware } from "./middleware/cache.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB is run"))
  .catch((err) => console.error("❌ Error to connect to mongo:", err));

app.use(express.json());

app.use(apiLimiter);

app.use("/api/auth", authRoutes);

app.use("/api/leaderboard/top", cacheMiddleware(600));

app.use("/api/leaderboard", authMiddleware, leaderboardRoutes);

app.listen(PORT, () =>
  console.log(`🚀 Server has been runing on server port ${PORT}`)
);
