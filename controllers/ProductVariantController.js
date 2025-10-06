const ProductVariant = require('../models/ProductVariant')

class ProductVariantController {
  async getAll(req, res, next) {
    try {
      const variants = await ProductVariant.find()
      res.status(200).json(variants)
    } catch (err) {
      res.status(500).json({ message: 'Error', error: err.message })
    }
  }
}

module.exports = new ProductVariantController()
