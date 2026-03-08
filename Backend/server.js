import "dotenv/config";
import {dbconnect }from './src/config/database.js'
import { app } from "./src/app.js";
const PORT = process.env.PORT
dbconnect();








app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})