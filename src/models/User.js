const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcryptjs');

// Sub-schema cho đặc điểm chân (nhúng trực tiếp vào User)
const FootProfileSchema = new schema({
  shoe_size: { type: Number},
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
    fullname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { 
      type: String, 
      enum: ['user', 'store', 'admin'], 
      default: 'user' 
    },
    avatar: { type: String },
    phone: { type: String },
    address: { type: String },
    
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
// Hook pre-save để hash password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

//Method comparePassword
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema, 'users')