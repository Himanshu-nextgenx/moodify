import ImageKit from "@imagekit/nodejs"

const client = new ImageKit({
    privateKey: process.env.ImageKit_private_key
})


async function uploadFile({buffer,filename,folder}){
    const file = await client.files.upload({
        file: await ImageKit.toFile(Buffer.from(buffer)),
        fileName:filename,
        folder
    })
    return file 
}

export { uploadFile}