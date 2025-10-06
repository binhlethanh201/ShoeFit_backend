const mongoose = require('mongoose')
const schema = mongoose.Schema

const PromptTemplateSchema = new schema(
  {
    template_name: { type: String, required: true },
    base_prompt: { type: String, required: true },
    variables: { type: Object },
    ai_provider: { type: String },
    model_name: { type: String },
    default_parameters: { type: Object },
    is_active: { type: Boolean, default: true },
    version: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
  },
  { timestamps: false }
)

module.exports = mongoose.model('PromptTemplate', PromptTemplateSchema, 'promptTemplates')
