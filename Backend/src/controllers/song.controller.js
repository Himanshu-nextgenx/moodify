import songModel from "../models/songs.model.js";
import storageService from "../services/storage.service.js";
import id3 from "node-id3";



async function uploadSongController(req, res) {
    const mood = req.body;
  const songBufffer = req.file.buffer;
  const tags = id3.read(songBufffer);

  const [songFile, posterFile] = await Promise.all([
    await storageService.uploadFile({
      buffer: songBufffer,
      filename: tags.filename + "mp3",
      folder: "/moodify/songs",
    }),
    await storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + "jpeg",
      folder: "/moodify/posters",
    }),
  ]);
  //     const songFile = await storageService.uploadFile({
  //         buffer: songBufffer,
  //         filename: tags.filename+ "mp3",
  //         folder:"/moodify/songs"
  //     })

  //    const posterFile = await storageService.uploadFile({
  //     buffer : tags.image.imageBuffer,
  //     filename:tags.title + "jpeg",
  //     folder:"/moodify/posters"
  //    })

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });
  res.status(201).json({
    message: "song created successfully",
    song,
  });
}

async function getSongController(req,res){
    const {mood} = req.qurey

    const song =  await songModel.findOne({
        mood
    })
    res.status(200).json({
        message:"song fetched successfuly",
        song, 
    })
}
export {uploadSongController , getSongController};
