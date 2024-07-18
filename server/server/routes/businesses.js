import express from "express";
import {
        getFeedPosts, getUserPosts, likePost, deletePost, updatePost
        }from "../controllers/businesses.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/",getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

/*UPDATE*/
router.patch(":id/like", verifyToken, likePost);

export default router;