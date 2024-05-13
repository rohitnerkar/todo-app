const Todo = require("../models/Todo");
const moment = require("moment");

const homeController = async(req, resp, next) => {
    try{
        const todos = await Todo.find({}).sort({createdAt: -1});

        resp.locals.moment = moment;

        resp.render("index", {title: "List Todo", todos})
    }catch(error){
        resp.status(500).json({message: error.message})
    }
}

const addTodoFormController = (req, resp, next) => {
    try {
        resp.render("newTodo", {title: "New Todo"})
    } catch (error) {
        resp.status(500).json({message: error.message})
    }
}

const updateTodoFormController = async(req, resp, next) => {
    try {
        const { id } = req.query;
        const todo = await Todo.findById(id);

        resp.render("updateTodo", {title: "Update Todo", todo})
    } catch (error) {
        resp.status(500).json({message: error.message})
    }
}

const deleteTodoFormController = (req, resp, next) => {
    try {
        const { id } = req.query;
        resp.render("deleteTodo", {title: "Delete Todo", id})
    } catch (error) {
        resp.status(500).json({message: error.message})
    }
}

const addTodoController = async(req, resp, next) => {
    try {
        const { title, desc } = req.body;

        if(!title){
            return resp.status(400).json({ message: "Title is required" })
        }
        
        const newTodo = new Todo({ title, desc });
        await newTodo.save();

        resp.redirect("/");
    } catch (error) {
        resp.status(500).json({message: error.message})
    }
}

const updateTodoController = async(req, resp, next) => {
    try {
        const { id } = req.params
        const { title, desc } = req.body;

        const todo = await Todo.findById(id);
        if(!todo){
            return resp.status(404).json({message: "Todo not found"})
        }

        todo.title = title;
        todo.desc = desc;

        await todo.save();

        resp.redirect("/");
    } catch (error) {
        resp.status(500).json({message: error.message})
    }
}

const deleteTodoController = async(req, resp, next) => {
    try {
        const { id, confirm } = req.query;

        if(confirm === "yes"){
            await Todo.findByIdAndDelete(id);
        }

        resp.redirect("/");

    } catch (error) {
        resp.status(500).json({message: error.message})
    }
}

module.exports = {
    homeController,
    addTodoFormController,
    updateTodoFormController,
    deleteTodoFormController,
    addTodoController,
    updateTodoController,
    deleteTodoController
};