const express = require("express")
const router = express.Router();

//Controller
const {getAllPosts, createPost, updatePost, deletePost}= require("../controllers/blogController");

//routes
router.get("/getpost", getAllPosts);
router.post("/addpost", createPost);
router.put("/updatepost/:id", updatePost);
router.delete("/deletepost/:id", deletePost)

module.exports = router;