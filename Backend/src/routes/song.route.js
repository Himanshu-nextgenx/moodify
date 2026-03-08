import express from" express"
import {  uploadSongController, getSongController } from "../controllers/song.controller"
import upload from "../middlewares/upload.middleware"

const songRouter = express.Router()

songRouter.post("/",upload.single("song"),uploadSongController)
songRouter.get("/",getSongController)



export default songRouter