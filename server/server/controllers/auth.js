import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

/*REGISTER USER*/
export const register = async (req,res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password,salt);
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewProfile : Math.floor(Math.random() * 10000),
            impression : Math.floor(Math.random() * 10000)
            
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

/*LOGIN*/

export const login =async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user =await User.findOne({email:email});
        console.log(user);
        if(!user) return res.status(400).json({msg: "User Not FOunt"});

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if(!isMatch) return res.status(400).json({msg: "Invalid Login"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});
    } catch (error) {
        res.status(500).json({err: error.message})
    }
}
