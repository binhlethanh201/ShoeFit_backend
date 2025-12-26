const AIGeneration = require('../models/AIGeneration')

class AIGenerationController {
  async getAll(req, res, next) {
    try {
      const { user_id, status } = req.query
      const query = {}
      
      if (user_id) query.user_id = user_id
      if (status) query.status = status

      const generations = await AIGeneration.find(query).sort({ created_at: -1 })
      res.status(200).json(generations)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error', error: err.message })
      next()
    }
  }

  async getById(req, res, next) {
    try {
      const { _id } = req.params
      const generation = await AIGeneration.findById(_id)
      if (!generation) { return res.status(404).json({ message: 'Generation task not found' }) }
      res.status(200).json(generation)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error', error: error.message })
      next()
    }
  }

  async create(req, res, next) {
    try {
      const generation = new AIGeneration(req.body)
      await generation.save()
      res.status(201).json({ message: 'AI Task started successfully', generation })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error starting AI task', error: err.message })
      next()
    }
  }

  async update(req, res, next) {
    try {
      const { _id } = req.params
      // Thường dùng để cập nhật status: processing -> completed/failed
      const updated = await AIGeneration.findByIdAndUpdate(
        _id,
        { ...req.body, updated_at: new Date() },
        { new: true }
      )
      if (!updated) {
        return res.status(404).json({ message: 'Generation task not found' })
      }
      res.status(200).json({ message: 'AI Task updated successfully', generation: updated })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error updating AI task', error: err.message })
      next()
    }
  }

  // AI Generation history thường không xóa, nhưng nếu xóa thì hard delete
  async delete(req, res, next) {
    try {
      const { _id } = req.params
      const deleted = await AIGeneration.findByIdAndDelete(_id)
      if (!deleted) {
        return res.status(404).json({ message: 'Generation task not found' })
      }
      res.status(200).json({ message: 'Generation task deleted successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error deleting task', error: err.message })
      next()
    }
  }
}

module.exports = new AIGenerationController()