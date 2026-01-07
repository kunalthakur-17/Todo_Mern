const express = require('express')
const router = express.Router()
const taskController = require('../controllers/MyTask.Controller')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/', authMiddleware, taskController.createTask)
router.get('/', authMiddleware, taskController.getTasks)    
router.get('/:id', authMiddleware, taskController.getTaskById)  
router.put('/:id', authMiddleware, taskController.updateTask)
router.delete('/:id', authMiddleware, taskController.deleteTask)

module.exports = router
