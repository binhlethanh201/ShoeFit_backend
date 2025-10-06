const mongoose = require('mongoose')
const schema = mongoose.Schema

const StoreSchema = new schema(
  {
    brand_name: { type: String, required: true },
    address: { type: String },
    contact_email: { type: String },
    contact_phone: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: false }
)

module.exports = mongoose.model('Store', StoreSchema, 'stores')
