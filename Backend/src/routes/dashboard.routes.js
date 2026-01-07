const express = require('express')
const router = express.Router()
const { getDashboardData } = require('../controllers/Dashboard.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', authMiddleware, getDashboardData)

module.exports = router