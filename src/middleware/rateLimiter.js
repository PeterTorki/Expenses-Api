import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // here we just kept it simple.
    // You can customize the rate limit key based on user ID, IP address, etc.
    const { success } = await ratelimit.limit("my-rate-limit");
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }
    next();
  } catch (error) {
    console.log("Rate limit error:", error);
  }
};

export default rateLimiter;
