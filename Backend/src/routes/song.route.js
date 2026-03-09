import Router from "express"
import {  uploadSongController, getSongController } from "../controllers/song.controller.js"
import upload from "../middlewares/upload.middleware.js"

const songRouter = Router()

songRouter.post("/",upload.single("song"),uploadSongController)
songRouter.get("/",getSongController)



export default songRouter