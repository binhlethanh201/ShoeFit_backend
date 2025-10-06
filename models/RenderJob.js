const mongoose = require('mongoose')
const schema = mongoose.Schema

const RenderJobSchema = new schema(
  {
    user_id: { type: schema.Types.ObjectId, ref: 'User' },
    token_id: { type: schema.Types.ObjectId, ref: 'Token' },
    user_image_id: { type: schema.Types.ObjectId, ref: 'UserImage' },
    product_id: { type: schema.Types.ObjectId, ref: 'Product' },
    variant_id: { type: schema.Types.ObjectId, ref: 'ProductVariant' },
    template_id: { type: schema.Types.ObjectId, ref: 'PromptTemplate' },
    final_prompt: { type: String },
    prompt_parameters: { type: Object },
    ai_provider: { type: String },
    ai_model: { type: String },
    external_job_id: { type: String },
    api_endpoint: { type: String },
    rendered_image_url: { type: String },
    thumbnail_url: { type: String },
    processing_time_ms: { type: Number },
    api_cost_usd: { type: Number },
    quality_score: { type: Number },
    status: { type: String, enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'], default: 'pending' },
    error_code: { type: String },
    error_message: { type: String },
    retry_count: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    started_at: { type: Date },
    completed_at: { type: Date },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: false }
)

module.exports = mongoose.model('RenderJob', RenderJobSchema, 'renderJobs')
