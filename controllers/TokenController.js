const Token = require('../models/Token')

class TokenController {
  async getAll(req, res, next) {
    try {
      const tokens = await Token.find()
      res.status(200).json(tokens)
    } catch (err) {
      res.status(500).json({ message: 'Error', error: err.message })
    }
  }
}

module.exports = new TokenController()
