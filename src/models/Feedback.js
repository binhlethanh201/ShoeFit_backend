const mongoose = require('mongoose')
const schema = mongoose.Schema

const FeedbackSchema = new schema(
  {
    user_id: { type: schema.Types.ObjectId, ref: 'User', required: true },
    product_id: { type: schema.Types.ObjectId, ref: 'Product', required: true },
    
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    
    // Nếu họ review dựa trên ảnh AI đã tạo
    attached_generation_id: { type: schema.Types.ObjectId, ref: 'AIGeneration' },
    
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: false }
)

module.exports = mongoose.model('Feedback', FeedbackSchema, 'feedbacks')