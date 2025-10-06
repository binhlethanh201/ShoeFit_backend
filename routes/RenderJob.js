const express = require('express')
const router = express.Router()
const renderJobController = require('../controllers/RenderJobController')

router.get('/', renderJobController.getAll)

module.exports = router
