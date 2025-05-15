import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import leaderboardRoutes from "./routes/leaderboard.js";
import authRoutes from "./routes/auth.js";
import authMiddleware from "./middleware/auth.js";
import { apiLimiter } from "./middleware/rateLimit.js";
import { cacheMiddleware } from "./middleware/cache.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";

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
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(apiLimiter);
app.use(cookieParser("mySpecialKey"));
app.use(
  session({
    secret: "my secret session",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.use("/api/auth", authRoutes);

app.use(
  "/api/leaderboard",
  authMiddleware,
  cacheMiddleware(600),
  leaderboardRoutes
);

app.listen(PORT, () =>
  console.log(`🚀 Server has been runing on server port ${PORT}`)
);
