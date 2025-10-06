const mongoose = require('mongoose')
const schema = mongoose.Schema

const FeedbackSchema = new schema(
  {
    product_id: { type: schema.Types.ObjectId, ref: 'Product', required: true },
    user_id: { type: schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: false }
)

module.exports = mongoose.model('Feedback', FeedbackSchema, 'feedbacks')
