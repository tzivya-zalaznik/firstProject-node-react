const Photo=require("../models/Photos")
const path=require("path")

const createPhoto=async(req,res)=>{

    const{title,imageUrl}=req.body

    if(!imageUrl)
    {
        return res.status(400).send("imageUrl is required")
    }

    const photo=await Photo.create({title,imageUrl})
    res.json(photo)
}

const getAllPhoto=async(req,res)=>{

    const photos=await Photo.find().lean()

    if(!photos[0])
    {
        return res.status(400).send("There are no photos")
    }


     res.json(photos)
}

const getPhotoById=async (req,res)=>{
    const {id}=req.params
    const photo=await Photo.findById(id).lean()
    if(!photo)
    {
        return res.status(400).send(`There is no photo with id ${id}`)
    }
   res.json(photo)
}

const updatePhoto=async(req,res)=>{
    const {_id,title,imageUrl}=req.body
    if(!_id ||!imageUrl)
    {
        return res.status(400).send("Missing required fields")
    }

    const photo=await Photo.findById(_id).exec()
    if(!photo)
    {
        return res.status(400).send(`There is no photo with id ${_id}`)
    }

    photo.title=title
    photo.imageUrl=imageUrl

    await photo.save()
    res.send(`Photo ${title} is updated`)
}

const deletePhoto=async(req,res)=>{
    const {id}=req.params
    const photo=await Photo.findById(id).exec()
    if(!photo)
    {
        return res.status(400).send(`There is no photo with id ${id}`)
    }

    await photo.deleteOne()
    res.send(`Photo ${photo.title} is deleted`)
}

module.exports={createPhoto,getAllPhoto,getPhotoById,updatePhoto,deletePhoto}