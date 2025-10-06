const express = require('express')
const router = express.Router()
const feedbackController = require('../controllers/FeedbackController')

router.get('/', feedbackController.getAll)

module.exports = router
