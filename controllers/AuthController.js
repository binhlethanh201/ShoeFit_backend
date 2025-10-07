const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" })
      }
      const existUser = await User.findOne({ email })
      if (existUser) {
        return res.status(400).json({ message: "Email already exists" })
      }
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const newUser = new User({
        name,
        email,
        password_hash: hashedPassword,
      })
      const savedUser = await newUser.save()
      const token = jwt.sign(
        { id: savedUser._id, email: savedUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      )
      res.status(201).json({
        user: {
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
        },
        token,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error", error: error.message })
      next()
    }
  }

  async login(req, res, next){
    try {
        const {email, password} = req.body
        if(!email || !password){return res.status(400).json({ message: "Missing email or password" })}
        const user = await User.findOne({email})
        if(!user){return res.status(400).json({ message: "Invalid credentials" })}
        const isMatch = await bcrypt.compare(password, user.password_hash)
        if(!isMatch){return res.status(400).json({ message: "Invalid credentials" })}
        user.last_login = new Date()
        await user.save()
        const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      )
       res.status(200).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          last_login: user.last_login,
        },
        token,
      })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error", error: error.message })
        next()
    }
  }
}
module.exports = new AuthController()
