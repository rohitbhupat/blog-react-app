const Blog = require("../models/blogModel");

//get funtionality
const getAllPosts = async (req, res) => {
  try {
    const posts = await Blog.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//post functionality
const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Blog({ title, content });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//put functionality
const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  try {
    const updatedPost = await Blog.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true } //this will return the updated doc
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not Found" });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await Blog.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};
