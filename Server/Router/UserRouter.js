const express=require("express")
const router=express.Router()
const UserController=require("../Controller/UserController")

router.post('/',UserController.createUser)
router.get('/',UserController.getAllUsers)
router.get('/:id',UserController.getUserByID)
router.put('/',UserController.updateUser)
router.delete('/:id',UserController.deleteUser)

module.exports=router
