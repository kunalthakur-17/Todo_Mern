const MyTask = require('../model/MyTask.model')

const createTask = async(req,res)=>{
    const {title, description, categoryId, priorityId, statusId} = req.body
    const userId = req.user.id
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
        status: 201,
        message: 'Task created successfully',
        response: {
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
        status: 500,
        message: 'Failed to create task',
        response: null
    })
}
}

const getTasks = async(req,res)=>{
try {
    if (!req.user || !req.user.id) {
        return res.status(401).json({
            status: 401,
            message: 'User not authenticated',
            response: null
        })
    }
    
    const userId = req.user.id
    console.log('Getting tasks for userId:', userId)
    
    // Try with populate to get names
    const tasks = await MyTask.find({userId})
        .populate('categoryId', 'name')
        .populate('priorityId', 'name') 
        .populate('statusId', 'name')
    
    console.log('Found tasks:', tasks.length)
    
    res.status(200).json({
        status: 200,
        message: 'Tasks retrieved successfully',
        response: tasks
    })
} catch (error) {
    console.error('Get tasks error:', error.message)
    console.error('Full error:', error)
    res.status(500).json({
        status: 500,
        message: 'Failed to retrieve tasks',
        response: null
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
            status: 404,
            message: 'Task not found',
            response: null
        })
    }
    res.status(200).json({
        status: 200,
        message: 'Task retrieved successfully',
        response: task
    })
} catch (error) {
    res.status(500).json({
        status: 500,
        message: 'Failed to retrieve task',
        response: null
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
            status: 404,
            message: 'Task not found',
            response: null
        })
    }
    
    res.status(200).json({
        status: 200,
        message: 'Task updated successfully',
        response: task
    })
} catch (error) {
    res.status(500).json({
        status: 500,
        message: 'Failed to update task',
        response: null
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
            status: 404,
            message: 'Task not found',
            response: null
        })
    }
    res.status(200).json({
        status: 200,
        message: 'Task deleted successfully',
        response: null
    })
} catch (error) {
    res.status(500).json({
        status: 500,
        message: 'Failed to delete task',
        response: null
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
