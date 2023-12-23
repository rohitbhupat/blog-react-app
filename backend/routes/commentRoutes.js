const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/addcomments", commentController.createComment);
router.get("/posts/:postId/comments", commentController.getCommentsByPost);
router.put("/comments/:commentId", commentController.editComment);
router.delete("/comments/:commentId", commentController.deleteComment);

module.exports = router;
