const mongoose = require('mongoose')
const schema = mongoose.Schema

const FootProfileSchema = new schema(
  {
    user_id: { type: schema.Types.ObjectId, ref: 'User', required: true },
    preferred_size: { type: String },
    average_price: { type: Number },
    preferred_style: { type: String },
    preferred_color: { type: String },
    purpose: { type: String },
    foot_width_category: { type: String, enum: ['narrow', 'normal', 'wide'] },
    foot_arch_type: { type: String, enum: ['flat', 'normal', 'high'] },
    foot_length_cm: { type: Number },
    foot_width_cm: { type: Number },
    last_foot_scan_date: { type: Date },
    foot_scan_image_url: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: false }
)

module.exports = mongoose.model('FootProfile', FootProfileSchema, 'footProfiles')
