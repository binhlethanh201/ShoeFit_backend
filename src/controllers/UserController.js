const User = require('../models/User')

class UserController {
  async getAll(req, res, next) {
    try {
      const { role } = req.query
      const query = { isActive: true } 
      
      if (role) {
        query.role = role
      }

      // Loại bỏ password_hash khi trả về danh sách
      const users = await User.find(query).select('-password_hash')
      res.status(200).json(users)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error', error: err.message })
      next()
    }
  }

  async getById(req, res, next) {
    try {
      const { _id } = req.params
      const user = await User.findById(_id).select('-password_hash')
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      res.status(200).json(user)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error', error: error.message })
      next()
    }
  }

  async create(req, res, next) {
    try {
      // Lưu ý: Password nên được hash ở tầng Middleware hoặc Pre-save hook trong Model
      const user = new User({ ...req.body, isActive: true }) 
      await user.save()
      
      // Trả về user không có password
      const userResponse = user.toObject()
      delete userResponse.password_hash
      
      res.status(201).json({ message: 'User created successfully', user: userResponse })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error creating user', error: err.message })
      next()
    }
  }

  async update(req, res, next) {
    try {
      const { _id } = req.params
      const updated = await User.findByIdAndUpdate(
        _id,
        { ...req.body, updated_at: new Date() },
        { new: true }
      ).select('-password_hash')

      if (!updated) {
        return res.status(404).json({ message: 'User not found' })
      }
      res.status(200).json({ message: 'User updated successfully', user: updated })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error updating user', error: err.message })
      next()
    }
  }

  async delete(req, res, next) {
    try {
      const { _id } = req.params
      // Soft delete: Set isActive = false
      const deleted = await User.findByIdAndUpdate(
        _id,
        { isActive: false, updated_at: new Date() },
        { new: true }
      )

      if (!deleted) {
        return res.status(404).json({ message: 'User not found' })
      }
      res.status(200).json({ message: 'User deactivated successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error deactivating user', error: err.message })
      next()
    }
  }
}

module.exports = new UserController()