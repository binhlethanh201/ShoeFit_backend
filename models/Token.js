const mongoose = require('mongoose')
const schema = mongoose.Schema

const TokenSchema = new schema(
  {
    user_id: { type: schema.Types.ObjectId, ref: 'User' },
    token_value: { type: String, required: true, unique: true },
    render_quota: { type: Number, default: 3 },
    render_count: { type: Number, default: 0 },
    session_data: { type: Object },
    device_info: { type: String },
    ip_address: { type: String },
    created_at: { type: Date, default: Date.now },
    expired_at: { type: Date },
    last_activity: { type: Date, default: null }
  },
  { timestamps: false }
)

module.exports = mongoose.model('Token', TokenSchema, 'tokens')
