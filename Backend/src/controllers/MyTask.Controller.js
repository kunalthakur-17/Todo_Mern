const MyTask = require('../models/MyTask')

const createTask = async(req,res)=>{
       const {title, description} = req.body
    const userId = req.user.id
    const categoryId = req.CategoryModel.id
    const priorityId = req.TaskPriorityModel.id
    const statusId = req.TaskStatusModel.id
try {
    const task = new MyTask({
        title,
        description,
        userId,
        categoryId,
        priorityId,
        statusId
    })
    await task.save()
    res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: {
            _id: task._id,
            title: task.title,
            description: task.description,
            userId: task.userId,
            categoryId: task.categoryId,
            priorityId: task.priorityId,
            statusId: task.statusId,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt
        }
    })
} catch (error) {
    res.status(500).json({
        success: false,
        message: 'Failed to create task',
        error: error.message
    })
}
}

const getTasks = async(req,res)=>{
    const userId = req.user.id
try {
    const tasks = await MyTask.find({userId}).populate('categoryId priorityId statusId')
    res.status(200).json({
        success: true,
        message: 'Tasks retrieved successfully',
        data: tasks
    })
} catch (error) {
    res.status(500).json({
        success: false,
        message: 'Failed to retrieve tasks',
        error: error.message
    })
}
}

const getTaskById = async(req,res)=>{
    const {id} = req.params
    const userId = req.user.id
try {
    const task = await MyTask.findOne({_id: id, userId}).populate('categoryId priorityId statusId')
    if(!task){
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        })
    }
    res.status(200).json({
        success: true,
        message: 'Task retrieved successfully',
        data: task
    })
} catch (error) {
    res.status(500).json({
        success: false,
        message: 'Failed to retrieve task',
        error: error.message
    })
}
}

const updateTask = async(req,res)=>{
    const {id} = req.params
    const userId = req.user.id
try {
    const task = await MyTask.findOneAndUpdate(
        {_id: id, userId},
        req.body,
        {new: true}
    ).populate('categoryId priorityId statusId')
    
    if(!task){
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        })
    }
    
    res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: task
    })
} catch (error) {
    res.status(500).json({
        success: false,
        message: 'Failed to update task',
        error: error.message
    })
}
}

const deleteTask = async(req,res)=>{
    const {id} = req.params
    const userId = req.user.id
try {
    const task = await MyTask.findOneAndDelete({_id: id, userId})
    if(!task){
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        })
    }
    res.status(200).json({
        success: true,
        message: 'Task deleted successfully'
    })
} catch (error) {
    res.status(500).json({
        success: false,
        message: 'Failed to delete task',
        error: error.message
    })
}
}

const taskController = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
}

module.exports = taskController
