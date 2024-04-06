const express=require("express")
const router=express.Router()
const TodosController=require("../Controller/TodoController")

router.post('/',TodosController.createTodo)
router.get('/',TodosController.getAllTodos)
router.get('/:id',TodosController.getTodoById)
router.put('/',TodosController.updateTodo)
router.delete('/:id',TodosController.deleteTodo)

module.exports=router