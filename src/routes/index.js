const express = require('express')
const router = express.Router()

const userRouter = require('./User')
const productRouter = require('./Product')
const categoryRouter = require('./Category')
const aiGenerationRouter = require('./AIGeneration') 
const promptTemplateRouter = require('./PromptTemplate')
const feedbackRouter = require('./Feedback')
const styleTipRouter = require('./StyleTip')

// --- Định nghĩa Route ---

// User & Auth
router.use('/users', userRouter)

// Product & Category
router.use('/products', productRouter)
router.use('/categories', categoryRouter)

// AI & Renders
router.use('/renders', aiGenerationRouter) 
router.use('/promptTemplates', promptTemplateRouter)

// Style & Feedback
router.use('/feedbacks', feedbackRouter)
router.use('/styletips', styleTipRouter)


module.exports = router