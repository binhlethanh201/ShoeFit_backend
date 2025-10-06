const mongoose = require('mongoose')
const schema = mongoose.Schema

const ProductSchema = new schema(
  {
    store_id: { type: schema.Types.ObjectId, ref: 'Store', required: true },
    category_id: { type: schema.Types.ObjectId, ref: 'Category' },
    name: { type: String, required: true },
    description: { type: String },
    image_url: { type: String },
    model_3d_url: { type: String },
    external_link: { type: String },
    ai_description: { type: String },
    ai_keywords: { type: Object },
    reference_image_urls: { type: Array },
    preferred_lighting: { type: String, enum: ['natural', 'studio', 'outdoor'] },
    preferred_angle: { type: String, enum: ['front', 'side', 'three-quarter'] },
    min_render_quality: { type: Number, default: 0.7 },
    auto_approve_render: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: false }
)

module.exports = mongoose.model('Product', ProductSchema, 'products')
