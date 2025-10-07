const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserSchema = new schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    last_login: {type: Date, default: Date.now},
    deleted_at: { type: Date, default: null }
  },
  { timestamps: false }
)

module.exports = mongoose.model('User', UserSchema, 'users')
