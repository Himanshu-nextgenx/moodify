import { Redis } from 'ioredis'

const Redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

Redis.on("connect",()=>{
    console.log("connected to db ")
})

Redis.on("error",()=>{
    console.log("error in connecting redis ")
})