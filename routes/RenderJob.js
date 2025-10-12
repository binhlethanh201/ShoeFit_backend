const express = require('express')
const router = express.Router()
const renderJobController = require('../controllers/RenderJobController')
const verifyToken = require('../middleware/auth')

router.get('/', renderJobController.getAll)
router.get('/history', verifyToken, renderJobController.getHistory)
router.get('/:job_id', verifyToken, renderJobController.getById)
router.post('/:job_id/rate', verifyToken, renderJobController.rateRender)

module.exports = router
