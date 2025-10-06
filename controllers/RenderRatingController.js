const RenderRating = require('../models/RenderRating')

class RenderRatingController {
  async getAll(req, res, next) {
    try {
      const ratings = await RenderRating.find()
      res.status(200).json(ratings)
    } catch (err) {
      res.status(500).json({ message: 'Error', error: err.message })
    }
  }
}

module.exports = new RenderRatingController()
