import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authToken = req.signedCookies.token;

  if (!authToken) {
    return res.status(401).json({ message: "❌ No token, access denied" });
  }

  if (!authToken) {
    return res.status(401).json({ message: "❌ Token format is incorrect" });
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    console.log("Decoded token:", JSON.stringify(decoded, null, 2));
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(401).json({ message: "❌ Incorrect token" });
  }
};

export default authMiddleware;
