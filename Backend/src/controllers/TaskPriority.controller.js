const TaskPriorityModel = require('../model/TaskPriority.model')

const createTaskPriority = async (req, res) => {
    const { name } = req.body
    const userId = req.user.id
    try {
        const taskPriority = new TaskPriorityModel({
            name,
            userId,
        })
        if (!name) {
            return res.status(400).json({ message: 'Name is required' })
        }
        const existingTaskPriority = await TaskPriorityModel.findOne({ name, userId })
        if (existingTaskPriority) {
            return res.status(400).json({ message: 'Task priority already exists' })
        }
        await taskPriority.save()
        res.status(201).json({
            status: 201,
            message: 'Task priority created successfully',
            response: {
                _id: taskPriority._id,
                name: taskPriority.name,
                userId: taskPriority.userId,
                createdAt: taskPriority.createdAt,
                updatedAt: taskPriority.updatedAt
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getAllTaskPriorities(req, res) {
    try {
        const taskPriorities = await TaskPriorityModel.find({ userId: req.user.id })
        const formattedTaskPriorities = taskPriorities.map(taskPriority => ({
            _id: taskPriority._id,
            name: taskPriority.name,
            userId: taskPriority.userId,
            createdAt: taskPriority.createdAt,
            updatedAt: taskPriority.updatedAt
        }))
        res.status(200).json({
            status: 200,
            message: 'Task priorities retrieved successfully',
            response: formattedTaskPriorities
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateTaskPriority(req, res) {
    const { name } = req.body
    try {
        const taskPriority = await TaskPriorityModel.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { name },
            { new: true }
        )
        if (!taskPriority) {
            return res.status(404).json({ message: 'Task priority not found' })
        }
        res.status(200).json({
            status: 200,
            message: 'Task priority updated successfully',
            response: {
                _id: taskPriority._id,
                name: taskPriority.name,
                userId: taskPriority.userId,
                createdAt: taskPriority.createdAt,
                updatedAt: taskPriority.updatedAt
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteTaskPriority(req, res) {
    try {
        const taskPriority = await TaskPriorityModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        })
        if (!taskPriority) {
            return res.status(404).json({ message: 'Task priority not found' })
        }
        res.status(200).json({
            status: 200,
            message: 'Task priority deleted successfully',
            response: null
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getTaskPriorityById(req, res) {
    try {
        const taskPriority = await TaskPriorityModel.findOne({
            _id: req.params.id,
            userId: req.user.id
        })
        if (!taskPriority) {
            return res.status(404).json({ message: 'Task priority not found' })
        }
        res.status(200).json({
            status: 200,
            message: 'Task priority retrieved successfully',
            response: taskPriority
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const taskPriorityController = {
    createTaskPriority,
    getAllTaskPriorities,
    updateTaskPriority,
    deleteTaskPriority,
    getTaskPriorityById
}

module.exports = taskPriorityController