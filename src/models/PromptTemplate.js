const mongoose = require('mongoose')
const schema = mongoose.Schema

const PromptTemplateSchema = new schema(
  {
    code: { type: String, required: true, unique: true }, // VD: TRYON_V1
    platform: { type: String, enum: ['gemini', 'runway', 'stable-diffusion'] },
    template: { type: String, required: true }, 
    is_active: { type: Boolean, default: true },
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
  }
)

module.exports = mongoose.model('PromptTemplate', PromptTemplateSchema, 'prompttemplates')