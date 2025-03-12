import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://redis:6379",
});

await redisClient.connect();

export const cacheMiddleware = (expiration = 300) => {
  return async (req, res, next) => {
    const key = req.originalUrl;

    try {
      const cachedData = await redisClient.get(key);
      if (cachedData) {
        console.log("Cache hit:", key);
        return res.json(JSON.parse(cachedData));
      }
    } catch (err) {
      console.error("Cache read error:", err);
    }

    const originalSend = res.send;
    res.send = async (body) => {
      if (res.statusCode === 200) {
        await redisClient.setEx(key, expiration, body);
      }
      res.send = originalSend;
      return res.send(body);
    };

    next();
  };
};
