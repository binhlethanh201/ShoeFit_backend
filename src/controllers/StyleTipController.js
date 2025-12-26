const StyleTip = require('../models/StyleTip')

class StyleTipController {
  async getAll(req, res, next) {
    try {
      const { gender, tag } = req.query
      const query = {}
      
      if (gender) query.gender = gender
      if (tag) query.tags = tag

      const styleTips = await StyleTip.find(query)
      res.status(200).json(styleTips)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error', error: err.message })
      next()
    }
  }

  async getById(req, res, next) {
    try {
      const { _id } = req.params
      const styleTip = await StyleTip.findById(_id).populate('recommended_products')
      if (!styleTip) { return res.status(404).json({ message: 'StyleTip not found' }) }
      res.status(200).json(styleTip)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error', error: error.message })
      next()
    }
  }

  async create(req, res, next) {
    try {
      const styleTip = new StyleTip(req.body)
      await styleTip.save()
      res.status(201).json({ message: 'StyleTip created successfully', styleTip })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error creating StyleTip', error: err.message })
      next()
    }
  }

  async update(req, res, next) {
    try {
      const { _id } = req.params
      const updated = await StyleTip.findByIdAndUpdate(
        _id,
        { ...req.body, updated_at: new Date() },
        { new: true }
      )
      if (!updated) {
        return res.status(404).json({ message: 'StyleTip not found' })
      }
      res.status(200).json({ message: 'StyleTip updated successfully', styleTip: updated })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error updating StyleTip', error: err.message })
      next()
    }
  }

  async delete(req, res, next) {
    try {
      const { _id } = req.params
      const deleted = await StyleTip.findByIdAndDelete(_id)
      if (!deleted) {
        return res.status(404).json({ message: 'StyleTip not found' })
      }
      res.status(200).json({ message: 'StyleTip deleted successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error deleting StyleTip', error: err.message })
      next()
    }
  }
}

module.exports = new StyleTipController()