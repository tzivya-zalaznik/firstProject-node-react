const express=require("express")
const router=express.Router()
const PostsController=require("../Controller/PostsController")

router.post('/',PostsController.createPost)
router.get('/',PostsController.getAllPosts)
router.get('/:id',PostsController.getpostById)
router.put('/',PostsController.updatePost)
router.delete('/:id',PostsController.deletePost)

module.exports=router