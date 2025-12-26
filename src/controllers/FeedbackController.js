const Feedback = require('../models/Feedback')

class FeedbackController {
  async getAll(req, res, next) {
    try {
      const { product_id } = req.query
      const query = { deleted_at: null }
      
      if (product_id) query.product_id = product_id

      const feedbacks = await Feedback.find(query)
        .populate('user_id', 'username avatar') // Lấy thông tin người review
        .sort({ created_at: -1 })
        
      res.status(200).json(feedbacks)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error', error: err.message })
      next()
    }
  }

  async create(req, res, next) {
    try {
      const feedback = new Feedback(req.body)
      await feedback.save()
      res.status(201).json({ message: 'Feedback submitted successfully', feedback })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error submitting feedback', error: err.message })
      next()
    }
  }

  async delete(req, res, next) {
    try {
      const { _id } = req.params
      const deleted = await Feedback.findByIdAndUpdate(
        _id,
        { deleted_at: new Date() },
        { new: true }
      )
      if (!deleted) {
        return res.status(404).json({ message: 'Feedback not found' })
      }
      res.status(200).json({ message: 'Feedback deleted successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error deleting feedback', error: err.message })
      next()
    }
  }
}

module.exports = new FeedbackController()