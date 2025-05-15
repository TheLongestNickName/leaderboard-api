import express, { request, response } from "express";
import Score from "../models/Score.js";

const router = express.Router();

router.post("/submit", async (req, res) => {
  const { username, score } = req.body;

  if (!username || !score) {
    return res.status(400).json({ message: "Need username и score" });
  }

  try {
    await Score.create({ username, score });
    res.status(201).json({ message: "✅ Score has been saved" });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error" });
  }
});

router.get("/top", async (req, res) => {
  try {
    const topScores = await Score.find().sort({ score: -1 }).limit(10);
    res.status(200).json(topScores);
  } catch (error) {
    res.status(500).json({ message: "❌ Server error" });
  }
});

router.get("/rank/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const scores = await Score.find().sort({ score: -1 });
    const rank = scores.findIndex((s) => s.username === username) + 1;

    if (rank === 0) {
      return res.status(404).json({ message: "User is not found" });
    }

    res.status(200).json({ username, rank });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error" });
  }
});

router.get("/test/", async (req, res) => {
  req.session.visited = true;
  req.session.user = { name: "AAA" };

  res.cookie("testName", "testCookie", {
    maxAge: 60000 * 60,
    httpOnly: true,
    signed: true,
  });
  res.status(200).send("asdadas");
});

export default router;
