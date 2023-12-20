const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Post = require("../models/blogModel");

const createComment = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user || !post) {
      return res.status(404).json({ error: "User or post not found" });
    }

    const newComment = await Comment.create({
      user: userId,
      post: postId,
      content,
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId }).populate(
      "user",
      "username"
    );
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
};
