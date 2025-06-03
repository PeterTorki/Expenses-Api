import express from "express";
import "dotenv/config";
import { initDB } from "./config/db.js"; // Adjust the path as necessary
import rateLimiter from "./middleware/rateLimiter.js"; // Adjust the path as necessary

import transactionsRoute from "./routes/transactionsRoute.js"; // Adjust the path as necessary

const app = express();

// middleware to parse JSON bodies
app.use(rateLimiter);
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT;

// our custom simple middleware
// app.use((req, res, next) => {
//   console.log(
//     "Hey we hit a req, the method is",
//     req.method,
//     "and the url is",
//     req.method // ← 🚨 this is the problem
//   );
//   next();
// });

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.get("/health", (req, res) => {
  res.send("Hello World!");
});
