const Product = require('../models/Product')

class ProductController {
  async getAll(req, res, next) {
    try {
        const { category, page = 1, limit = 20 } = req.query
        const filter = {}
        if (category) filter.category = category
        const skip = (page - 1) * limit
        const totalProducts = await Product.countDocuments(filter)
        const products = await Product.find(filter)
            .skip(skip)
            .limit(Number(limit))
        res.status(200).json({
            page: Number(page),
            limit: Number(limit),
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            data: products,
        })
    } catch (err) {
      res.status(500).json({ message: 'Error', error: err.message })
    }
  }
  async getById(req, res, next){
    try {
        const {_id} = req.params
        const products = await Product.findById(_id)
        if(!products){return res.status(404).json({ message: 'Product not found' })}
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: 'Error', error: err.message })
    }
  }
}

module.exports = new ProductController()
