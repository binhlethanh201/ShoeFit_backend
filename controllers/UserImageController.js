const UserImage = require('../models/UserImage')

class UserImageController {
  async getAll(req, res, next) {
    try {
      const images = await UserImage.find()
      res.status(200).json(images)
    } catch (err) {
      res.status(500).json({ message: 'Error', error: err.message })
    }
  }
}

module.exports = new UserImageController()
