import mongoose from "mongoose";

const songsSchema = new mongoose.Schema({

    url:{
        type:String,
        required:true

    },
    posterUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        enum : ["sad","happy","suprised"]
    }
})

const songModel = mongoose.model("songs",songsSchema)

export default songModel