const express = require('express')
const router = express.Router()
const taskPriorityController = require('../controllers/TaskPriority.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/', authMiddleware, taskPriorityController.createTaskPriority)
router.get('/', authMiddleware, taskPriorityController.getAllTaskPriorities)
router.get('/:id', authMiddleware, taskPriorityController.getTaskPriorityById)
router.put('/:id', authMiddleware, taskPriorityController.updateTaskPriority)
router.delete('/:id', authMiddleware, taskPriorityController.deleteTaskPriority)

module.exports = router