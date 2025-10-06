const ApiUsageLog = require('../models/ApiUsageLog')

class ApiUsageLogController {
  async getAll(req, res, next) {
    try {
      const logs = await ApiUsageLog.find()
      res.status(200).json(logs)
    } catch (err) {
      res.status(500).json({ message: 'Error', error: err.message })
    }
  }
}

module.exports = new ApiUsageLogController()
