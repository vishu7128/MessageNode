const express = require("express");
const feedController = require("../controllers/feed");
const { body } = require("express-validator");
const multer = require("multer");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });

// GET /feed/posts
router.get("/posts", feedController.getPosts);

// POST /feed/post
router.post(
  "/post",
  upload.single("image"), // Apply multer only to this route
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

// GET /feed/posts/:postId
router.get("/posts/:postId", feedController.getPost);
// UPDATE /feed/posts/:postId
router.put("/posts/:postId", feedController.updatePost);
// DELETE /feed/posts/:postId
router.delete("/posts/:postId", feedController.deletePost);

module.exports = router;
