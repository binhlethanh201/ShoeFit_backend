const PromptTemplate = require('../models/PromptTemplate')

class PromptTemplateController {
  async getAll(req, res, next) {
    try {
      const templates = await PromptTemplate.find()
      res.status(200).json(templates)
    } catch (err) {
      res.status(500).json({ message: 'Error', error: err.message })
    }
  }
}

module.exports = new PromptTemplateController()
