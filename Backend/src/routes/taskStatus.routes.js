const express = require('express')
const router = express.Router()
const taskStatusController = require('../controllers/TaskStatus.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/', authMiddleware, taskStatusController.createTaskStatus)
router.get('/', authMiddleware, taskStatusController.getAllTaskStatuses)
router.get('/:id', authMiddleware, taskStatusController.getTaskStatusById)
router.put('/:id', authMiddleware, taskStatusController.updateTaskStatus)
router.delete('/:id', authMiddleware, taskStatusController.deleteTaskStatus)

module.exports = router