const express = require('express')
const router = express.Router()
const apiUsageLogController = require('../controllers/ApiUsageLogController')
router.get('/', apiUsageLogController.getAll)
module.exports = router