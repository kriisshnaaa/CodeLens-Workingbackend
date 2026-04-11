const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
const session = require("./config/session");
const saveRoutes = require("./routes/save.routes");
require("dotenv").config();
const uploadRoutes = require("./routes/upload.routes");
const authRoutes = require("./routes/auth.routes");
const chatRoutes=require("./routes/chat.routes");
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.set("trust proxy", 1);

app.use(session);
app.use(passport.initialize());
app.use(passport.session());


// Health check endpoint
// This API is used to verify if the server is running properly.
// It returns server status, uptime, timestamp, and environment details.
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date(),
    environment: process.env.NODE_ENV || "development"
  });
});

app.use("/save", saveRoutes);

app.use("/api", uploadRoutes);
app.use("/auth", authRoutes);
app.use("/api", chatRoutes);

module.exports = app;
