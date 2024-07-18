import Post from "../models/Business.js";
import User from "../models/User.js";

/*Create*/

export const buscreatePost = async (req,res)=>{
    try {
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);

        const newPost = new Post({ 
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();

        const post =  await Post.find();
        res.status(201).json(post);
    } catch (error) {
        res.status().json({message: error.message});
    }
}

/*RAED*/
export const getFeedPosts = async (req, res) =>{
    try {
        const post =  await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status().json({message: error.message});
    }
}
export const getUserPosts = async (req, res) =>{
    try {
        const {userId} = req.params;
        const post =  await Post.find({userId});
        res.status(200).json(post);
    } catch (error) {
        res.status().json({message: error.message});
    }
}
/*UPDATE*/
export const likePost = async(req,res)=>{
    try {
        const id = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )
        
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status().json({message: error.message});
    }
}

export const deletePost = async (req, res) =>{
    try {
        const postId = req.params.id;
        const post =  await Post.findByIdAndDelete(postId);
        res.status(200).json(post);
    } catch (error) {
        res.status().json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { description, picturePath } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { description, picturePath },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
