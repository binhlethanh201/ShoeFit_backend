const mongoose = require('mongoose')
const schema = mongoose.Schema

// Sub-schema cho đặc điểm chân (nhúng trực tiếp vào User)
const FootProfileSchema = new schema({
  shoe_size: { type: Number, required: true },
  foot_shape: { 
    type: String, 
    enum: ['narrow', 'standard', 'wide', 'flat'], 
    default: 'standard' 
  },
  skin_tone: { 
    type: String, 
    enum: ['light', 'medium', 'tan', 'dark', 'deep'], 
    default: 'medium' 
  },
  gender: { type: String, enum: ['male', 'female', 'unisex'], default: 'unisex' },
  preferred_style: [{ type: String }]
}, { _id: false })

const UserSchema = new schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true, select: false },
    role: { 
      type: String, 
      enum: ['user', 'store', 'admin'], 
      default: 'user' 
    },
    avatar: { type: String },
    
    // Nhúng schema đặc điểm chân
    foot_profile: { type: FootProfileSchema, default: {} },
    
    // Mảng ID các sản phẩm yêu thích
    wishlist: [{ type: schema.Types.ObjectId, ref: 'Product' }],

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    isActive: { type: Boolean }
  },
  { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
  }
)

module.exports = mongoose.model('User', UserSchema, 'users')