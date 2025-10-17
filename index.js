const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 9999
const connectDB = require('./config/db')
const router = require('./routes/index')
const cors = require('cors')

// ✅ Cấu hình CORS kỹ hơn
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'], // 👈 Thêm Cache-Control
}))

app.use(express.json())
connectDB()

app.use('/api', router)

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`)
})
