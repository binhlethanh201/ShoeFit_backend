const PromptTemplate = require('../models/PromptTemplate')

class PromptTemplateController {
  async getAll(req, res, next) {
    try {
      const { platform } = req.query
      const query = { is_active: true }
      if (platform) query.platform = platform

      const templates = await PromptTemplate.find(query)
      res.status(200).json(templates)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error', error: err.message })
      next()
    }
  }

  async getById(req, res, next) {
    try {
      const { _id } = req.params
      const template = await PromptTemplate.findById(_id)
      if (!template) { return res.status(404).json({ message: 'Template not found' }) }
      res.status(200).json(template)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error', error: error.message })
      next()
    }
  }

  async create(req, res, next) {
    try {
      const template = new PromptTemplate(req.body)
      await template.save()
      res.status(201).json({ message: 'Template created successfully', template })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error creating template', error: err.message })
      next()
    }
  }

  async update(req, res, next) {
    try {
      const { _id } = req.params
      const updated = await PromptTemplate.findByIdAndUpdate(
        _id,
        { ...req.body, updated_at: new Date() },
        { new: true }
      )
      if (!updated) {
        return res.status(404).json({ message: 'Template not found' })
      }
      res.status(200).json({ message: 'Template updated successfully', template: updated })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error updating template', error: err.message })
      next()
    }
  }

  async delete(req, res, next) {
    try {
      const { _id } = req.params
      // Soft delete: Set is_active = false
      const deleted = await PromptTemplate.findByIdAndUpdate(
        _id,
        { is_active: false, updated_at: new Date() },
        { new: true }
      )
      if (!deleted) {
        return res.status(404).json({ message: 'Template not found' })
      }
      res.status(200).json({ message: 'Template deactivated successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error deactivating template', error: err.message })
      next()
    }
  }
}

module.exports = new PromptTemplateController()