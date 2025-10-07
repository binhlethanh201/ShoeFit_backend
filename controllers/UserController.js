const User = require('../models/User')

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error', error: err.message })
      next()
    }
  }
   async getProfile(req, res, next) {
    try {
      const { id } = req.user
      const user = await User.findById(id).select('-password_hash') 
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      res.status(200).json({ user })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error', error: error.message })
    }
  }
}

module.exports = new UserController()
