const mongoose = require('mongoose')
const schema = mongoose.Schema

const CategorySchema = new schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: false }
)

module.exports = mongoose.model('Category', CategorySchema, 'categories')
