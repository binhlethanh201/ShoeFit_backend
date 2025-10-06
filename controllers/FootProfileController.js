const FootProfile = require('../models/FootProfile')

class FootProfileController {
  async getAll(req, res, next) {
    try {
      const profiles = await FootProfile.find()
      res.status(200).json(profiles)
    } catch (err) {
      res.status(500).json({ message: 'Error', error: err.message })
    }
  }
}

module.exports = new FootProfileController()
