const Category = require('../models/Category')
const Product = require('../models/Product')

class ProductController {
  // GET /api/products?category=Sneaker&title=Nike
  async getAll(req, res, next) {
    try {
      const { category, title } = req.query
      
      // Mặc định chỉ lấy sản phẩm chưa bị xóa mềm
      const query = { deleted_at: null }

      // Tìm kiếm theo tên sản phẩm (gần đúng)
      if (title) {
        query.title = { $regex: new RegExp(title, 'i') }
      }

      // Logic tìm kiếm theo tên Category
      if (category) {
        const categoryDoc = await Category.findOne({
          name: { $regex: new RegExp(`^${category}$`, 'i') }
        })
        
        if (!categoryDoc) {
          // Nếu filter theo category mà không tìm thấy category đó -> trả về rỗng
          return res.status(200).json([])
        }
        
        // Gán category_id vào query
        query.category_id = categoryDoc._id
      }

      const products = await Product.find(query)
        .populate('category_id', 'name slug') // Lấy thêm tên danh mục
        .sort({ created_at: -1 }) // Mới nhất lên đầu

      res.status(200).json(products)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error', error: err.message })
      next()
    }
  }

  // GET /api/products/:_id
  async getById(req, res, next) {
    try {
      const { _id } = req.params
      
      const product = await Product.findOne({ _id, deleted_at: null })
        .populate('category_id', 'name slug')
        .populate('uploaded_by', 'username email')

      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }
      
      res.status(200).json(product)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error', error: error.message })
      next()
    }
  }

  // POST /api/products
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

  // PUT /api/products/:_id
  async update(req, res, next) {
    try {
      const { _id } = req.params
      
      const updated = await Product.findOneAndUpdate(
        { _id, deleted_at: null }, // Chỉ update nếu chưa bị xóa
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

  // DELETE /api/products/:_id (Soft Delete)
  async delete(req, res, next) {
    try {
      const { _id } = req.params
      
      const deleted = await Product.findByIdAndUpdate(
        _id,
        { deleted_at: new Date() }, // Đánh dấu ngày xóa
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