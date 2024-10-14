const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const feedRoutes = require("./routes/feed");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Allow CORS for specific origin
app.use(
  cors({
    origin: "http://localhost:5173", // Update with your frontend URL
  })
);

//
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

// CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes
app.use("/feed", feedRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const { message } = error;

  res.status(statusCode).json({ message: message });
});

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://vishu7128:HNq7auekCz7Dqtr4@messagenode.eoczw.mongodb.net/Posts?retryWrites=true&w=majority&appName=MessageNode"
  )
  .then((result) => app.listen(8080))
  .catch((err) => console.log(err));
