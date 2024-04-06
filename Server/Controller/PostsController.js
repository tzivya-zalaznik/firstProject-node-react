const Post=require("../models/Posts")

const createPost=async(req,res)=>{
    const {title,body}=req.body
    if(!title){
        return res.status(400).send("Body is required")
    }

   const post=await Post.create({title,body})
   res.json(post)
}

const getAllPosts=async(req,res)=>{

    const posts=await Post.find().lean()
    if(!posts)
    {
        return res.status(400).send("There are no Posts :( ")
    }
    res.json(posts)
}

const getpostById=async(req,res)=>{

    const{id}=req.params
    const post=await Post.findById(id).lean()
    if(!post)
    {
        return res.status(400).send(`There is no post with id: ${id}`)
    }

    res.json(post)

}

const updatePost=async(req,res)=>{

    const {body,title, _id}=req.body
    if(!_id||!body){
        return res.status(400).send("Missing required fields")
    }
    
    const post=await Post.findById(_id).exec()
    if(!post)
    {
        return res.status(400).send(`There is no post with id: ${_id}`)
    }

    post.title=title
    post.body=body

    await post.save()
    res.send(`${post.title} is updated`)
}

const deletePost=async(req,res)=>{
    const {id}=req.params
    const post=await Post.findById(id).exec()
    if(!post)
    {
        return res.status(400).send(`There is no post with id: ${id}`)
    }

    await post.deleteOne()
    res.send(`Post ${post.title} is deleted`)
}

module.exports={createPost,getAllPosts,getpostById,updatePost,deletePost}