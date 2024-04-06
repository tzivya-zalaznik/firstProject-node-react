const express=require("express")
const router=express.Router()
const PhotiController=require("../Controller/PhotoController")

router.post('/',PhotiController.createPhoto)
router.get('/',PhotiController.getAllPhoto)
router.get('/:id',PhotiController.getPhotoById)
router.put('/',PhotiController.updatePhoto)
router.delete('/:id',PhotiController.deletePhoto)

module.exports=router