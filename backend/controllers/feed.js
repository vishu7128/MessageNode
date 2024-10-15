const { validationResult } = require("express-validator");
const Post = require("../models/posts");

// Get all posts
exports.getPosts = async (req, res, next) => {
  let currPage = req.query.page;
  const POSTS_PER_PAGE = 2;
  const totalPosts = await Post.find().countDocuments();
  Post.find({})
    .skip((currPage - 1) * POSTS_PER_PAGE)
    .limit(POSTS_PER_PAGE)
    .then((posts) => {
      res.status(200).json({
        posts: posts,
        totalPosts,
      });
    })
    .catch((err) => {
      next(err); // Pass error to error-handling middleware
    });
};

// Create a new post
exports.createPost = (req, res, next) => {
  console.log("Incoming request body:", req.body); // Log body
  console.log("Uploaded file:", req.file); // Log uploaded file

  const errors = validationResult(req);
  if (!errors.isEmpty() || !req.file) {
    const error = new Error("The given inputs are not valid");
    error.statusCode = 422; // Unprocessable Entity status code for validation errors
    error.data = errors.array();
    return next(error); // Pass error to error-handling middleware
  }

  const title = req.body.title;
  const content = req.body.content;

  const post = new Post({
    title: title,
    content: content,
    imageURL: req.file ? req.file.path : null, // Allow for no image
    creator: { name: "Vishwaraj" }, // Adjust the creator as needed
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500; // Internal server error if statusCode is not set
      next(err); // Pass error to error-handling middleware
    });
};

// Get a single post by ID
exports.getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404; // Not found status code
      throw error;
    }

    res.status(200).json({
      post: post,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500; // Internal server error if statusCode is not set
    next(err); // Pass error to error-handling middleware
  }
};

exports.updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty() || !req.file) {
    const error = new Error("The given inputs are not valid");
    error.statusCode = 422; // Unprocessable Entity status code for validation errors
    error.data = errors.array();
    return next(error); // Pass error to error-handling middleware
  }

  try {
    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;
    const imageURL = req.file.path;

    const post = await Post.findById(postId);
    post.title = title;
    post.content = content;
    post.imageURL = imageURL;

    await post.save();
  } catch (err) {
    next(err);
  }
};
exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    const result = await Post.deleteOne({ _id: post._id });
    res.status(200).json({
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
};
