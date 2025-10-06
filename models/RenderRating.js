const mongoose = require('mongoose')
const schema = mongoose.Schema

const RenderRatingSchema = new schema(
  {
    job_id: { type: schema.Types.ObjectId, ref: 'RenderJob', required: true },
    user_id: { type: schema.Types.ObjectId, ref: 'User', required: true },
    quality_score: { type: Number, min: 1, max: 5 },
    is_realistic: { type: Boolean },
    would_purchase: { type: Boolean },
    feedback_text: { type: String },
    issues: { type: Object },
    created_at: { type: Date, default: Date.now }
  },
  { timestamps: false }
)

module.exports = mongoose.model('RenderRating', RenderRatingSchema, 'renderRatings')
