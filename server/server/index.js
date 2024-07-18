import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRouts from './routes/auth.js'
import {register} from "./controllers/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import consultantsRoutes from "./routes/consultants.js";
import businessRoutes from "./routes/businesses.js";
import { verifyToken } from "./middleware/auth.js";
import {createPost} from "./controllers/posts.js";
import {constcreatePost} from "./controllers/consultants.js";
import {buscreatePost} from "./controllers/businesses.js";
import Post from "./models/Post.js";
import User from "./models/User.js";
import { users} from "./data/index.js";
import { posts } from "./data/index.js";

/*CONFIGURATION*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


/*FILE STORAGE*/
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "public/assets");
    },
    filename : function (req,file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage});

/*ROUTES WITH FILES*/
app.post("/auth/register", upload.single('picture'), register);
app.post("/posts", verifyToken,upload.single('picture'), createPost)
app.post("/const", verifyToken,upload.single('picture'), constcreatePost)
app.post("/business", verifyToken,upload.single('picture'), buscreatePost)

/*ROUTES*/
app.use("/auth", authRouts);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/const", consultantsRoutes);
app.use("/business", businessRoutes);
/*MONGOOSE SETUP*/
const port = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology : true,
}).then(()=>{
    app.listen(port,()=>{console.log(`Server Port : ${port}`)
    //INJECT INITIAL DATA
   /* User.insertMany(users);
    Post.insertMany(posts);*/

})
}).catch((error)=>{console.log(`${error} did not connect`)});
