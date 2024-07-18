import express from "express";
import {
        getFeedPosts, getUserPosts, likePost, deletePost, updatePost
        }from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { getUser } from "../controllers/users.js";

const router = express.Router();

/*READ*/
router.get("/",getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

/*UPDATE*/

router.patch(":id/like", verifyToken, likePost);

export default router;