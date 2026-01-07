const MyTask = require('../model/MyTask.model')
const CategoryModel = require('../model/Categories.model')
const TaskPriority = require('../model/TaskPriority.model')
const TaskStatus = require('../model/TaskStatus.model')

const getDashboardData = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                status: 401,
                message: 'User not authenticated',
                response: null
            })
        }

        const userId = req.user.id

        // Get last 5 tasks
        const recentTasks = await MyTask.find({ userId })
            .populate('categoryId', 'name')
            .populate('priorityId', 'name')
            .populate('statusId', 'name')
            .sort({ createdAt: -1 })
            .limit(5)

        // Get last 5 categories
        const recentCategories = await CategoryModel.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5)

        // Get last 5 priorities
        const recentPriorities = await TaskPriority.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5)

        // Get last 5 statuses
        const recentStatuses = await TaskStatus.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5)

        res.status(200).json({
            status: 200,
            message: 'Dashboard data retrieved successfully',
            response: {
                recentTasks,
                recentCategories,
                recentPriorities,
                recentStatuses
            }
        })

    } catch (error) {
        console.error('Dashboard error:', error)
        res.status(500).json({
            status: 500,
            message: 'Failed to retrieve dashboard data',
            response: null
        })
    }
}

module.exports = {
    getDashboardData
}