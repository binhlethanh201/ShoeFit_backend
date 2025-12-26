const mongoose = require('mongoose')
const schema = mongoose.Schema

const StyleTipSchema = new schema(
  {
    title: { type: String, required: true },
    content: { type: String }, 
    cover_image: { type: String },
    
    tags: [{ type: String }],
    gender: { type: String, enum: ['male', 'female', 'unisex'] },
    
    // Gợi ý sản phẩm đi kèm
    recommended_products: [{ type: schema.Types.ObjectId, ref: 'Product' }],
    
    created_by: { type: schema.Types.ObjectId, ref: 'User' }, // Admin ID
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
  }
)

module.exports = mongoose.model('StyleTip', StyleTipSchema, 'styletips')