const mongoose = require('mongoose')
const schema = mongoose.Schema

const ProductVariantSchema = new schema(
  {
    product_id: { type: schema.Types.ObjectId, ref: 'Product', required: true },
    size: { type: String },
    color: { type: String },
    color_description: { type: String },
    material_description: { type: String },
    texture_keywords: { type: Object },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: false }
)

module.exports = mongoose.model('ProductVariant', ProductVariantSchema, 'productVariants')
