const { default: mongoose } = require('mongoose')
const taskModel = require('../models/TaskModel')

// to create task - post
const createTask = async (req, res) => {
    const {title, description} = req.body
    const {user} = req
    try{
        const Task = await taskModel.create({title, description, postedBy: user._id})
        console.log(user._id)
        console.log(Task)
        res.status(200).json(Task)
    } catch(e) {
        res.status(400).json({error: e.message})
    }
}

//to get all task 
const getTasks = async (req, res) => {
    const {user} = req
    console.log('user', user)
    try{
        const Task = await taskModel.find({postedBy: user._id})
        res.status(200).json(Task)
    } catch(e) {
        res.status(400).json({error: e.message})
    }
}

//to get specific task 
const getSpecificTasks = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'Task not Found'})
    }
    try{
        const singleTask = await taskModel.findById(id).exec();
        res.status(200).json(singleTask)
    } catch(e) {
        res.status(400).json({error: e.message})
    }
}

//to update specific task 
const updateSpecificTask = async (req, res) => {
    const {id} = req.params
    const {title, description} = req.body
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'Task not Found'})
    }
    try{
        const updateTask = await taskModel.findByIdAndUpdate(id, { title, description})
        res.status(200).json(updateTask)
    } catch(e) {
        res.status(400).json({error: e.message})
    }
}

//to delete specific task
const deleteSpecificTask = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'Task not Found'})
    }
    try{
        const updateTask = await taskModel.findByIdAndDelete(id)
        res.status(200).json(updateTask)
    } catch(e) {
        res.status(400).json({error: e.message})
    }
}


module.exports = {createTask, getTasks, getSpecificTasks, updateSpecificTask, deleteSpecificTask}