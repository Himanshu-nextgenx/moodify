import userModel from '../models/user.model.js'
import jwt from'jsonwebtoken'

export const authMiddleware = async(req,res,next)=>{

    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message:"token not found "
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        

        req.user = decoded
        next();
        
    } catch (error) {
       message:'token is invaild '
       console.log("invaild token ",error)
        
    }

}