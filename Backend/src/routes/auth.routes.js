import { Router } from "express";
import { registerController,loginController } from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.post('/register',registerController)
authRouter.post('/login',loginController)
authRouter.get("/", (req,res)=>{
 res.send("API running")
})

export default authRouter;