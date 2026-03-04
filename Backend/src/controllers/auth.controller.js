import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Redis from "ioredis";

const registerController =  async (req,res)=>{
 
    const {username , email , password  } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if (isAlreadyRegistered){
        return res.status(400).json({
            message:"user with same email and password is already exists "
        }

        )
    }
    
 

    const hashedPassword = await bcrypt.hash(password,11)
    const user = await userModel.create(
         { username ,
           email , 
          password:hashedPassword}
    )

       const token = jwt.sign({
        id:user._id ,
        username:user.username,
    
       },
        process.env.JWT_SECRET,{expiresIn:"2d"})
        


        res.cookie("token" , token)

         return res.status(200).json({
            message:"user registered successfully"
         
        })
}

const loginController = async (req,res)=>{
   console.log("Content-Type:", req.headers["content-type"]);
console.log("Body:", req.body);
    const {email,password,username}= req.body;
 

    const user = await userModel.findOne({
        $or:[
            {email},
            {username},
        ]
    })
        if(!user){
            return res.status(400).json({
                message:"invaild credientials"
            })
        }

        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return res.status(400).json({
                 message:"invaild credientials"
            })
        }

        const token = jwt.sign({
            id:user._id,
            username:user.username,

        },process.env.JWT_SECRET,
    {expiresIn:"2d"})

    res.cookie("token",token)

    return res.status(200).json({
        message:"user login sucessfully"
    })
     


}

const logoutControlletr = async(req,res)=>{
    const token = req.cookies.token;
    await Redis.set(token, Date.now().toString(), {EX:60*60})

    res.clearCookie("token");

    res.status(200).json({
        message:"logout successfully "
    })
}

const getmeController = async(req,res)=>{
    const user = await userModel.findById(req.user.id)

return res.status(200).json({
    message:"user feched successfully",
    user
})

}

export {registerController ,loginController,getmeController,logoutControlletr}