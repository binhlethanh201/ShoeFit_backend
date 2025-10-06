const express = require('express')
const router = express.Router()
const promptTemplateController = require('../controllers/PromptTemplateController')

router.get('/', promptTemplateController.getAll)

module.exports = router
