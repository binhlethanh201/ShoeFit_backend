const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcryptjs');

// Sub-schema FootProfile
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

// Sub-schema Preference
const PreferencesSchema = new schema({
  language: { type: String, default: 'vi' },
  shoe_size_unit: { type: String, enum: ['EU', 'US', 'UK', 'VN'], default: 'EU' },
  theme: { type: String, default: 'light' }
}, { _id: false })

// Sub-schema Notification
const NotificationSettingsSchema = new schema({
  email: { type: Boolean, default: true },
  promo: { type: Boolean, default: false }
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
    foot_profile: { type: FootProfileSchema, default: {} },
    wishlist: [{ type: schema.Types.ObjectId, ref: 'Product' }],
    preferences: { type: PreferencesSchema, default: {} },
    notification_settings: { type: NotificationSettingsSchema, default: {} },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    isActive: { type: Boolean }
  },
  { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
  }
)

// Hook pre-save hash password
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