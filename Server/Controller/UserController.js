const User = require("../models/Users")

const createUser = async (req, res) => {

    const { name, username, email, address, phone } = req.body

    if (!name) {
        return res.status(400).send("Name is required")
    }

    const user=await User.create({ name, username, email, address, phone })

    res.json(user)
}

const getAllUsers=async(req,res)=>{
    
    const users=await User.find().lean()
    if(!users){
        return res.status(400).send("There are no users :(")
    }
    res.json(users)
}

const getUserByID=async(req,res)=>{

    const {id}=req.params
    const user=await User.findById(id).lean()

    if(!user){
        return res.status(400).send(`There is no user with id:${id}  :(`)
    }
    res.json(user)
}

const updateUser=async(req,res)=>{
    const { _id,name, username, email, address, phone } = req.body

    if(!_id ||!name){
        return res.status(400).send("Missing required feilds")
    }

    const user=await User.findById(_id).exec()
    if(!user){
        return res.status(400).send(`There is no user with id:${_id}  :(`)
    }

    user.name=name
    user.username=username
    user.email=email
    user.address=address
    user.phone=phone

    await user.save()

    res.send(`${User.name} is updated`)
}

const deleteUser=async(req,res)=>{
    const{id}=req.params
    const user=await User.findById(id).exec()
    if(!user){
        return res.status(400).send(`There is no user with id:${id}  :(`)
    }

    await user.deleteOne()
    res.send(`User ${user.name} is deleted`)
}

module.exports={createUser,getAllUsers,getUserByID,updateUser,deleteUser}