const RenderJob = require('../models/RenderJob')

class RenderJobController {
  async getAll(req, res, next) {
    try {
      const jobs = await RenderJob.find()
      res.status(200).json(jobs)
    } catch (err) {
      res.status(500).json({ message: 'Error', error: err.message })
    }
  }
}

module.exports = new RenderJobController()
