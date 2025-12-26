const mongoose = require('mongoose')
const schema = mongoose.Schema

const ProductSchema = new schema(
  {
    title: { type: String, required: true },
    brand: { type: String },
    description: { type: String },
    
    // Mô tả đặc biệt để tạo Prompt cho AI
    ai_description: { type: String }, 

    category_id: { type: schema.Types.ObjectId, ref: 'Category' },
    
    // Affiliate logic
    price: { type: Number },
    affiliate_link: { type: String, required: true },
    vendor_name: { type: String },
    
    // Cấu trúc ảnh
    images: {
      thumbnail: { type: String, required: true },
      ai_ready: { type: String }, // Ảnh tách nền cho AI
      detail_views: [{ type: String }]
    },

    attributes: {
      material: { type: String },
      color: { type: String },
      style: [{ type: String }]
    },

    uploaded_by: { type: schema.Types.ObjectId, ref: 'User' },
    
    isActive: { type: Boolean, default: true },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
  }
)

module.exports = mongoose.model('Product', ProductSchema, 'products')