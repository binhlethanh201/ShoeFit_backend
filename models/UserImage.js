const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserImageSchema = new schema(
  {
    user_id: { type: schema.Types.ObjectId, ref: 'User' },
    token_id: { type: schema.Types.ObjectId, ref: 'Token' },
    original_image_url: { type: String, required: true },
    thumbnail_url: { type: String },
    image_type: { type: String, enum: ['full_body', 'legs', 'feet'] },
    file_size_bytes: { type: Number },
    width_px: { type: Number },
    height_px: { type: Number },
    upload_status: { type: String, enum: ['uploading', 'completed', 'failed'], default: 'completed' },
    is_public: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: false }
)

module.exports = mongoose.model('UserImage', UserImageSchema, 'userImages')
