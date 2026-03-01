import mongoose from 'mongoose'


export const dbconnect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected successfully")

    }
    catch(err){
      console.error("error in connecting database ",err.message)
    }
}