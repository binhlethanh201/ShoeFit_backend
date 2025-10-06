const Category = require('../models/Category')

class CategoryController {
  async getAll(req, res, next) {
    try {
      const categories = await Category.find()
      res.status(200).json(categories)
    } catch (err) {
      res.status(500).json({ message: 'Error', error: err.message })
    }
  }
}

module.exports = new CategoryController()
