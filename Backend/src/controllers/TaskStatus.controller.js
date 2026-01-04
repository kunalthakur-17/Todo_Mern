const TaskStatusModel = require('../model/TaskStatus.model')

const createTaskStatus = async (req, res) => {
    const { name } = req.body
    const userId = req.user.id
    try {
        const taskStatus = new TaskStatusModel({
            name,
            userId,
        })
        if (!name) {
            return res.status(400).json({ message: 'Name is required' })
        }
        const existingTaskStatus = await TaskStatusModel.findOne({ name, userId })
        if (existingTaskStatus) {
            return res.status(400).json({ message: 'Task status already exists' })
        }
        await taskStatus.save()
        res.status(201).json({
            message: 'Task status created successfully',
            _id: taskStatus._id,
            name: taskStatus.name,
            userId: taskStatus.userId,
            createdAt: taskStatus.createdAt,
            updatedAt: taskStatus.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getAllTaskStatuses(req, res) {
    try {
        const taskStatuses = await TaskStatusModel.find({ userId: req.user.id })
        const formattedTaskStatuses = taskStatuses.map(taskStatus => ({
            _id: taskStatus._id,
            name: taskStatus.name,
            userId: taskStatus.userId,
            createdAt: taskStatus.createdAt,
            updatedAt: taskStatus.updatedAt
        }))
        res.status(200).json(formattedTaskStatuses)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateTaskStatus(req, res) {
    const { name } = req.body
    try {
        const taskStatus = await TaskStatusModel.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { name },
            { new: true }
        )
        if (!taskStatus) {
            return res.status(404).json({ message: 'Task status not found' })
        }
        res.status(200).json({
            message: 'Task status updated successfully',
            _id: taskStatus._id,
            name: taskStatus.name,
            userId: taskStatus.userId,
            createdAt: taskStatus.createdAt,
            updatedAt: taskStatus.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteTaskStatus(req, res) {
    try {
        const taskStatus = await TaskStatusModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        })
        if (!taskStatus) {
            return res.status(404).json({ message: 'Task status not found' })
        }
        res.status(200).json({ message: 'Task status deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getTaskStatusById(req, res) {
    try {
        const taskStatus = await TaskStatusModel.findOne({
            _id: req.params.id,
            userId: req.user.id
        })
        if (!taskStatus) {
            return res.status(404).json({ message: 'Task status not found' })
        }
        res.status(200).json(taskStatus)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const taskStatusController = {
    createTaskStatus,
    getAllTaskStatuses,
    updateTaskStatus,
    deleteTaskStatus,
    getTaskStatusById
}

module.exports = taskStatusController