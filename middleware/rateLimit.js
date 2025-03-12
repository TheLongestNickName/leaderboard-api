import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: "⚠️ Too many requests. Try again later.",
  skip: (req) => req.method === "OPTIONS",
});
