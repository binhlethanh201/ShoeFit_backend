const express = require('express')
const router = express.Router()
const renderRatingController = require('../controllers/RenderRatingController')

router.get('/', renderRatingController.getAll)

module.exports = router
