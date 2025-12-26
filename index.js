const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const port = process.env.PORT || 9999
const connectDB = require('./config/db')
const router = require('./src/routes/index')
const cors = require('cors')

const allowedOrigins = [
  'http://localhost:3000',
  'https://shoefit-client.pages.dev'
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control']
}))

app.use(morgan('dev'))
app.use(express.json())
connectDB()

app.use('/api', router)

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`)
})
