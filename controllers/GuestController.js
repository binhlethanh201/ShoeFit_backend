const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Token = require("../models/token")
class GuestController {
  async createGuestSession(req, res, next) {
    try {
      const oldToken = req.token
      if (oldToken && !req.tokenError) {
        const existingToken = await Token.findOne({ token_value: oldToken })

        if (existingToken && existingToken.expired_at > new Date()) {
          return res.status(200).json({
            message: "Guest session still valid",
            guest_token: oldToken,
            render_quota: existingToken.render_quota,
            render_count: existingToken.render_count,
          })
        }
      }
      const payload = { guest: true, createdAt: new Date() }
      const guestToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      })

      const now = new Date()
      const expiredAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

      const newToken = new Token({
        token_value: guestToken,
        render_quota: 3,
        render_count: 0,
        session_data: {},
        ip_address: req.ip,
        device_info: req.headers["user-agent"],
        created_at: now,
        expired_at: expiredAt,
        last_activity: now,
      })

      await newToken.save()
      res.status(201).json({
        message: "Guest session created",
        guest_token: guestToken,
        render_quota: newToken.render_quota,
        render_count: newToken.render_count,
        expires_at: expiredAt,
      })
    } catch (error) {
      console.error("Error creating guest session:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  }
}
module.exports = new GuestController()
