const Category = require('../models/Category')

class CategoryController {
  async getAll(req, res, next) {
    try {
      const categories = await Category.find({})
      res.status(200).json(categories)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error', error: err.message })
      next()
    }
  }

  async getById(req, res, next) {
    try {
      const { _id } = req.params
      const category = await Category.findById(_id)
      if (!category) { return res.status(404).json({ message: 'Category not found' }) }
      res.status(200).json(category)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error', error: error.message })
      next()
    }
  }

  async create(req, res, next) {
    try {
      const category = new Category(req.body)
      await category.save()
      res.status(201).json({ message: 'Category created successfully', category })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error creating category', error: err.message })
      next()
    }
  }

  async update(req, res, next) {
    try {
      const { _id } = req.params
      const updated = await Category.findByIdAndUpdate(
        _id,
        { ...req.body, updated_at: new Date() },
        { new: true }
      )
      if (!updated) {
        return res.status(404).json({ message: 'Category not found' })
      }
      res.status(200).json({ message: 'Category updated successfully', category: updated })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error updating category', error: err.message })
      next()
    }
  }

  async delete(req, res, next) {
    try {
      const { _id } = req.params
      const deleted = await Category.findByIdAndDelete(_id)
      
      if (!deleted) {
        return res.status(404).json({ message: 'Category not found' })
      }
      res.status(200).json({ message: 'Category deleted successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error deleting category', error: err.message })
      next()
    }
  }
}

module.exports = new CategoryController()