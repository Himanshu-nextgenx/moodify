import { Router } from "express";
import { registerController,loginController, getmeController, logoutControlletr } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router()

authRouter.post('/register',registerController)
authRouter.post('/login',loginController)
authRouter.get('/getme',authMiddleware , getmeController)
authRouter.post('/logout',logoutControlletr)
authRouter.get("/", (req,res)=>{
 res.send("API running")
})

export default authRouter;