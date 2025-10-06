const Store = require('../models/Store')

class StoreController {
  async getAll(req, res, next) {
    try {
      const stores = await Store.find()
      res.status(200).json(stores)
    } catch (err) {
      res.status(500).json({ message: 'Error', error: err.message })
    }
  }
}

module.exports = new StoreController()
