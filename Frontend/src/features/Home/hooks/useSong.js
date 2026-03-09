import { getSong } from "../services/songs.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

 export const useSong = ()=>{
    const context = useContext(SongContext)
    const {loding ,setloding , song , setSong} = context

    async function handleGetSong({mood}){
        setloding(true)
        const data = await getSong({mood})
        setSong(data.song)
        setloding(false)
    }
    return ({
        loding,song,handleGetSong
    })
}