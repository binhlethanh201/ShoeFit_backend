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
        console.error(err)
        res.status(500).json({ message: 'Error', error: err.message })
        next()
    }
  }
}

module.exports = new ProductController()
