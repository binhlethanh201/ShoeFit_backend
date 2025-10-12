const express = require('express')
const router = express.Router()
const guestController = require('../controllers/GuestController')
router.post('/create-session', guestController.createGuestSession)
module.exports = router