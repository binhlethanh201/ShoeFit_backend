const mongoose = require('mongoose')
const schema = mongoose.Schema

const AIGenerationSchema = new schema(
  {
    user_id: { type: schema.Types.ObjectId, ref: 'User', required: true },
    product_id: { type: schema.Types.ObjectId, ref: 'Product' },
    
    type: { type: String, enum: ['image_tryon', 'video_walk'], required: true },
    
    // Input đầu vào
    input_image_url: { type: String },
    used_prompt: { type: String },
    
    // Nhà cung cấp AI
    provider: { type: String, enum: ['google-gemini', 'runway-ml', 'replicate'] },
    external_task_id: { type: String }, // ID task bên server AI
    
    // Kết quả
    status: { 
      type: String, 
      enum: ['pending', 'processing', 'completed', 'failed'], 
      default: 'pending' 
    },
    result_url: { type: String },
    error_log: { type: String },
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
  }
)

module.exports = mongoose.model('AIGeneration', AIGenerationSchema, 'aigenerations')