const mongoose = require('mongoose')
const schema = mongoose.Schema

const CategorySchema = new schema(
  {
    name: { type: String, required: true },
    slug: { type: String, lowercase: true, unique: true },
    description: { type: String },
    parent_id: { type: schema.Types.ObjectId, ref: 'Category', default: null },
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
  }
)

module.exports = mongoose.model('Category', CategorySchema, 'categories')