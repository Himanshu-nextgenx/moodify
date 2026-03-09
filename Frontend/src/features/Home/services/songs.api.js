import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function getSong({mood}){
     const song = await api.get("/api/songs?mood="+mood)
     return song.data
}