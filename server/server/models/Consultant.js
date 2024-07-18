import mongoose from "mongoose";

const ConsultantSchema = new mongoose.Schema({
    userId:{
        type:String,
        required : true,
    },
    location:String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes:{
        type:Map,
        of: Boolean,
    },
    comments:{
        type:Array,
        default:[]
    }
},
{timestamps:true}
);

const Post = mongoose.model("Consultants", ConsultantSchema);
export default Post;