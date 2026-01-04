const { model } = require('mongoose')
const CategoryModel = require('../model/Categories.model')



const createCategory = async (req, res) => {
    const { name } = req.body
    const userId = req.user.id
    try {
        const category = new CategoryModel({
            name,
            userId,
        })
        if (!name) {
            return res.status(400).json({ message: 'Name is required' })
        }
        const existingCategory = await CategoryModel.findOne({ name, userId })
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' })
        }
        await category.save()
        res.status(201).json({
            message: 'Category created successfully',
            _id: category._id,
            name: category.name,
            userId: category.userId,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getAllCategories(req, res) {
    try {
        const categories = await CategoryModel.find({ userId: req.user.id })
        const formattedCategories = categories.map(category => ({
            _id: category._id,
            name: category.name,
            userId: category.userId,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }))
        res.status(200).json(formattedCategories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


async function updateCategory(req, res) {
    const { name } = req.body
    try {
        const category = await CategoryModel.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { name },
            { new: true }
        )
        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }
        res.status(200).json({
            message: 'Category updated successfully',
            _id: category._id,
            name: category.name,
            userId: category.userId,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteCategory(req, res) {
    try {
        const category = await CategoryModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        })
        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }
        res.status(200).json({ message: 'Category deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


async function getCategoryById(req, res) {
    try {
        const category = await CategoryModel.findOne({
            _id: req.params.id,
            userId: req.user.id
        })
        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const categoryController = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getCategoryById
}

module.exports = categoryController
