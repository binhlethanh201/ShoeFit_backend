const Feedback = require('../models/Feedback')

class FeedbackController {
  async getAll(req, res, next) {
    try {
      const feedbacks = await Feedback.find()
      res.status(200).json(feedbacks)
    } catch (err) {
      res.status(500).json({ message: 'Error', error: err.message })
    }
  }
}

module.exports = new FeedbackController()
