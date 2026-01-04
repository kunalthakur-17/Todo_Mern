const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

const categoryController = require('../controllers/Category.controller');


router.post('/', authMiddleware, categoryController.createCategory);
router.get('/', authMiddleware, categoryController.getAllCategories);
router.put('/:id', authMiddleware, categoryController.updateCategory);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);
router.get('/:id', authMiddleware, categoryController.getCategoryById);


module.exports = router;