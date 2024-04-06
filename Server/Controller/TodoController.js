const Todo=require("../models/Todo")

const createTodo=async(req,res)=>{
    const{title,tags}=req.body

    if(!title){
       return res.status(400).send("Title is required!!")
    }

    const todo=await Todo.create({title,tags})
    res.json(`${todo}`)
}

const getAllTodos=async(req,res)=>{
    const todos= await Todo.find().lean()

    if(!todos)
    {
        return res.status(400).send("There are no Todos :( ")
    }

    res.json(todos)
}

const getTodoById=async(req,res)=>{
    const {id}=req.params

    const todo=await Todo.findById(id).lean()

    if(!todo)
    {
        return res.status(400).send(`There is no todo with id ${id}`)
    }

    res.json(todo)
}


const updateTodo=async(req,res)=>{
    const {_id,title,tags,completed}=req.body

    if(!_id || !title)
    {
        return res.status(400).send("Missing required fields ")
    }

    const todo=await Todo.findById(_id).exec()

    if(!todo){
        return res.status(400).send(`There is no todo with id ${_id}`)
    }
    
    todo.title=title
    todo.tags=tags
    todo.completed=completed

    await todo.save()

    res.send(`${todo.title} is updated`)
}


const deleteTodo=async(req,res)=>{
    const {id}=req.params
    const todo=await Todo.findById(id).exec()
    if(!todo)
    {
        return res.status(400).send(`There is no todo with id ${id}`)
    }

    await todo.deleteOne()

    res.send(`Todo ${todo.title} is deleted`)
}


module.exports={createTodo,getAllTodos,getTodoById,updateTodo,deleteTodo}