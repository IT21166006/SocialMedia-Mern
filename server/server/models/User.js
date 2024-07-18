import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type : String,
            require : true,
            min : 2,
            max : 50,
        },
        lastName : {
            type: String,
            require: true,
            min : 2,
            max: 50,
        },
        email : {
            type: String,
            require: true,
            max: 50,
            unique:true,
        },
        password : {
            type: String,
            require: true,
            min : 5,
            max: 50,
        },
        picturePath : {
            type: String,
            default: "",
            require: true,
        },
        friends: {
        type : Array,
        default : [],
        },
        location: String,
        occupation: String,
        viewProfile: Number,
        impression: Number,
    },
    {timestamps: true}
);
const User = mongoose.model("User", UserSchema);
export default User;