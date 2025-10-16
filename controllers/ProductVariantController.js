const ProductVariant = require('../models/ProductVariant')
const Product = require('../models/Product')

class ProductVariantController {
  async getAll(req, res, next) {
    try {
      const { product_id } = req.query
      const query = { deleted_at: null }
      if (product_id) query.product_id = product_id

      const variants = await ProductVariant.find(query)
      res.status(200).json(variants)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error fetching variants', error: err.message })
      next()
    }
  }
  async getById(req, res, next) {
    try {
      const {_id} = req.params
      const variant = await ProductVariant.findById(_id)
      if (!variant || variant.deleted_at) {
        return res.status(404).json({ message: 'Variant not found' })
      }
      res.status(200).json(variant)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error fetching variant', error: err.message })
      next()
    }
  }
  async create(req, res, next) {
    try {
      const { product_id } = req.body
      if (!product_id) {
        return res.status(400).json({ message: 'product_id is required' })
      }
      const product = await Product.findById(product_id)
      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }

      const variant = new ProductVariant(req.body)
      await variant.save()
      res.status(201).json({ message: 'Variant created successfully', variant })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error creating variant', error: err.message })
      next()
    }
  }
  async update(req, res, next) {
    try {
      const {_id} = req.params
      const updated = await ProductVariant.findByIdAndUpdate(
        _id,
        { ...req.body, updated_at: new Date() },
        { new: true }
      )
      if (!updated) {
        return res.status(404).json({ message: 'Variant not found' })
      }
      res.status(200).json({ message: 'Variant updated successfully', variant: updated })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error updating variant', error: err.message })
      next()
    }
  }
  async delete(req, res, next) {
    try {
      const {_id} = req.params
      const deleted = await ProductVariant.findByIdAndUpdate(
        _id,
        { deleted_at: new Date() },
        { new: true }
      )
      if (!deleted) {
        return res.status(404).json({ message: 'Variant not found' })
      }
      res.status(200).json({ message: 'Variant deleted (soft delete) successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error deleting variant', error: err.message })
      next()
    }
  }
}

module.exports = new ProductVariantController()
