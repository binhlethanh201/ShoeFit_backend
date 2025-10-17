const Category = require('../models/Category')
const Product = require('../models/Product')

class ProductController {
  async getAll(req, res, next) {
    try {
        const { category } = req.query
        const query = {}
        if (category) {
          const categoryDoc = await Category.findOne({
            name: {$regex: new RegExp(`^${category}$`, 'i')}
          })
          if(!categoryDoc) {
            return res.status(404).json({ message: `Category '${category}' not found` })
          }
          query.category_id = categoryDoc._id
        }
        const products = await Product.find(query)
        res.status(200).json(products)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error', error: err.message })
      next()
    }
  }
  async getById(req, res, next){
    try {
        const {_id} = req.params
        const products = await Product.findById(_id)
        if(!products){return res.status(404).json({ message: 'Product not found' })}
        res.status(200).json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error', error: error.message })
        next()
    }
  }
  async create(req, res, next) {
    try {
      const product = new Product(req.body)
      await product.save()
      res.status(201).json({ message: 'Product created successfully', product })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error creating product', error: err.message })
      next()
    }
  }
  async update(req, res, next) {
    try {
      const {_id} = req.params
      const updated = await Product.findByIdAndUpdate(
        _id,
        { ...req.body, updated_at: new Date() },
        { new: true }
      )
      if (!updated) {
        return res.status(404).json({ message: 'Product not found' })
      }
      res.status(200).json({ message: 'Product updated successfully', product: updated })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error updating product', error: err.message })
      next()
    }
  }
  async delete(req, res, next) {
    try {
      const {_id} = req.params
      const deleted = await Product.findByIdAndUpdate(
        _id,
        { deleted_at: new Date() },
        { new: true }
      )
      if (!deleted) {
        return res.status(404).json({ message: 'Product not found' })
      }
      res.status(200).json({ message: 'Product deleted (soft delete) successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error deleting product', error: err.message })
      next()
    }
  }
}

module.exports = new ProductController()
