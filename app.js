const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/reports", reportRoutes);
app.use("/comments", commentRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Madrassa App API is running...");
});

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
